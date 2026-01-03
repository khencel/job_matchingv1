"use client";
import { SendIcon } from "lucide-react";
import { Form, Button, Spinner, Alert, Tab } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import { showErrorToast } from "@/app/(util)/toaster";
import { useParams } from "next/navigation";
import { ConversationInterface } from "@/app/mock-api/messages/[userId]/route";

const MessagesPage = () => {
  const params = useParams();
  const chatId = params?.chatId as string; // Get ID from URL

  const [activeConversation, setActiveConversation] =
    useState<ConversationInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const latestMessageRef = useRef<HTMLDivElement>(null);
  const USER_ID = "3"; // Get the UserID from the AuthState

  const fetchMessages = async () => {
    try {
      // Fetch all messages (Mock API limitation)
      const res = await axios.get(`/mock-api/messages/${USER_ID}`);
      const allConversations: ConversationInterface[] = res.data;

      // Filter to find ONLY the active chat
      const current = allConversations.find((c) => c.messageId === chatId);

      if (current) {
        setActiveConversation(current);
      } else {
        setError("Conversation not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load chat.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch Data
    if (chatId) fetchMessages();
  }, []);

  // Auto-scroll to bottom when conversation loads
  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: "instant" });
  }, [activeConversation]);

  // 2. Handle Send
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      await axios.post(`/mock-api/messages/${USER_ID}`, {
        conversationId: chatId, // Use the URL param ID
        text: newMessage,
      });
      // Refresh data to show new message
      fetchMessages();
      setNewMessage("");
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast("Server Error", "Failed to send message");
      }
      showErrorToast("Error", "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  if (loading)
    return (
      <div className="p-5 text-center">
        <Spinner animation="border" />
      </div>
    );
  if (error || !activeConversation)
    return (
      <Alert variant="warning" className="m-4">
        {error || "Select a chat"}
      </Alert>
    );
  return (
    <div className="d-flex flex-column h-100" style={{ overflow: "hidden" }}>
      {/* Header */}
      <div className="p-4 border-bottom">
        <h4 className="fw-bold m-0">{activeConversation.name}</h4>
        <p className="text-muted mb-0">{activeConversation.company}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
        <div className="d-flex flex-column gap-3">
          {activeConversation.messages.length === 0 ? (
            <p className="text-center text-muted mt-5">No messages yet.</p>
          ) : (
            activeConversation.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex ${
                  msg.sender === "me"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-3 rounded-3 shadow-sm ${
                    msg.sender === "me"
                      ? "bg-primary text-white"
                      : "bg-light text-dark border"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  <p className="mb-1">{msg.text}</p>
                  <small
                    className={`d-block text-end ${
                      msg.sender === "me" ? "text-white-50" : "text-muted"
                    }`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {msg.time}
                  </small>
                </div>
              </div>
            ))
          )}
          {/* Scroll Anchor */}
          <div ref={latestMessageRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 bg-light border-top">
        <Form onSubmit={handleSendMessage} className="d-flex gap-2">
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ resize: "none" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button type="submit" disabled={isSending || !newMessage.trim()}>
            {isSending ? <Spinner size="sm" /> : <SendIcon size={18} />}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default MessagesPage;
