"use client";
import "./app.css";
import { PropsWithChildren, useEffect, useState } from "react";
import { UserIcon } from "lucide-react";
import { Nav, Badge, Spinner } from "react-bootstrap";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ConversationInterface } from "@/app/mock-api/messages/[userId]/route";

export const MessagesLayout = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const activeChatId = params?.chatId ? String(params.chatId) : "";
  // State
  const [conversations, setConversations] = useState<ConversationInterface[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Conversations on Mount
  const USER_ID = "3"; // Get the UserID from the AuthState
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/mock-api/messages/${USER_ID}`);
        setConversations(res.data);
        if (res.data.length > 0) {
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-grow-1"
      style={{ overflow: "hidden", height: "100vh" }}
    >
      {/* Sidebar - Always Visible */}
      <div
        className="border-end p-4 shadow-sm bg-white"
        style={{ overflowY: "auto", width: "40%", minWidth: "300px" }}
      >
        <h3 className="fw-bold fs-3 mb-4 text-primary">Messages</h3>
        <Nav variant="pills" className="flex-column gap-2">
          {conversations.map((conv) => (
            <Nav.Item key={conv.messageId} className="rounded-3 nav-item">
              <Nav.Link
                as={Link}
                href={`/job-seeker/messages/${conv.messageId}`}
                active={activeChatId === conv.messageId.toString()} // Highlight active
                className="d-flex align-items-center gap-2 position-relative p-3"
                style={{ cursor: "pointer" }}
              >
                <div className="rounded-circle p-2 bg-primary">
                  <UserIcon size={24} color="white" />
                </div>
                <div className="flex-grow-1 text-start overflow-hidden">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fw-bold text-truncate text-primary">
                      {conv.name}
                    </div>
                    <small
                      className="text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {conv.timestamp}
                    </small>
                  </div>
                  <div className="text-muted small text-truncate">
                    {conv.company}
                  </div>
                  <div className="text-secondary small text-truncate mt-1">
                    {conv.lastMessage}
                  </div>
                  {conv.unread > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                    >
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      {/* Main Content (The Page) Renders Here */}
      <div className="flex-grow-1 d-flex flex-column bg-white">{children}</div>
    </div>
  );
};

export default MessagesLayout;
