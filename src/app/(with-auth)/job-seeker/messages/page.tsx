"use client";
import "./app.css";
import Navbar from "@/components/Navbar";
import { SendIcon, UserIcon } from "lucide-react";
import { Nav, Tab, Badge, Form, Button } from "react-bootstrap";

const sampleUserMessages = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Tech Solutions Inc.",
    lastMessage: "Thank you for applying! We'd like to schedule an interview.",
    timestamp: "2 min ago",
    unread: 3,
    messages: [
      {
        sender: "Sarah Johnson",
        text: "Hi! We received your application for the Senior Developer position.",
        time: "10:00 AM",
      },
      {
        sender: "me",
        text: "Thank you! I'm very interested in this opportunity.",
        time: "10:15 AM",
      },
      {
        sender: "me",
        text: "Yes, I'm available. What day works best for you?",
        time: "10:25 AM",
      },
      {
        sender: "Sarah Johnson",
        text: "Great! Are you available for an interview next week?",
        time: "10:20 AM",
      },
      {
        sender: "Sarah Johnson",
        text: "How about Tuesday at 2 PM? We can do it via video call.",
        time: "10:30 AM",
      },
      { sender: "me", text: "That works perfectly for me!", time: "10:35 AM" },
      {
        sender: "Sarah Johnson",
        text: "Excellent! I'll send you the meeting link shortly.",
        time: "10:40 AM",
      },
      {
        sender: "me",
        text: "Should I prepare anything specific for the interview?",
        time: "10:45 AM",
      },
      {
        sender: "Sarah Johnson",
        text: "Please be ready to discuss your previous projects and technical skills.",
        time: "10:50 AM",
      },
      {
        sender: "me",
        text: "Will do! Looking forward to it.",
        time: "10:55 AM",
      },
      {
        sender: "Sarah Johnson",
        text: "Also, our CTO will join us for the technical portion.",
        time: "11:00 AM",
      },
      {
        sender: "me",
        text: "That sounds great. I'll be well prepared.",
        time: "11:10 AM",
      },
      {
        sender: "Sarah Johnson",
        text: "Perfect! See you on Tuesday.",
        time: "11:15 AM",
      },
      {
        sender: "me",
        text: "Thank you so much for the opportunity!",
        time: "11:20 AM",
      },
      {
        sender: "Sarah Johnson",
        text: "Thank you for applying! We'd like to schedule an interview.",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Design Studio Co.",
    lastMessage: "Could you send us your portfolio?",
    timestamp: "1 hour ago",
    unread: 1,
    messages: [
      {
        sender: "Michael Chen",
        text: "Hello! We're impressed with your background.",
        time: "9:00 AM",
      },
      {
        sender: "me",
        text: "Thank you! I'm excited about the UX Designer role.",
        time: "9:15 AM",
      },
      {
        sender: "Michael Chen",
        text: "Your resume shows great experience with design systems.",
        time: "9:20 AM",
      },
      {
        sender: "me",
        text: "Yes, I've worked on several large-scale design projects.",
        time: "9:25 AM",
      },
      {
        sender: "Michael Chen",
        text: "That's exactly what we're looking for!",
        time: "9:30 AM",
      },
      {
        sender: "me",
        text: "I'd love to discuss how I can contribute to your team.",
        time: "9:35 AM",
      },
      {
        sender: "Michael Chen",
        text: "Could you send us your portfolio?",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Marketing Pros LLC",
    lastMessage: "The position has been filled. Thank you for your interest.",
    timestamp: "3 hours ago",
    unread: 0,
    messages: [
      {
        sender: "Emily Rodriguez",
        text: "Thank you for your application.",
        time: "Yesterday",
      },
      {
        sender: "me",
        text: "Looking forward to hearing from you!",
        time: "Yesterday",
      },
      {
        sender: "Emily Rodriguez",
        text: "We had many qualified candidates this time.",
        time: "Yesterday",
      },
      {
        sender: "me",
        text: "I understand. Thank you for considering my application.",
        time: "Yesterday",
      },
      {
        sender: "Emily Rodriguez",
        text: "The position has been filled. Thank you for your interest.",
        time: "8:00 AM",
      },
    ],
  },
  {
    id: 4,
    name: "David Kim",
    company: "Startup Ventures",
    lastMessage: "When can you start?",
    timestamp: "Yesterday",
    unread: 2,
    messages: [
      {
        sender: "David Kim",
        text: "We'd like to offer you the position!",
        time: "Yesterday",
      },
      {
        sender: "me",
        text: "That's wonderful news! Thank you so much!",
        time: "Yesterday",
      },
      {
        sender: "David Kim",
        text: "You really impressed us during the interview process.",
        time: "Yesterday",
      },
      {
        sender: "me",
        text: "I'm thrilled to join your team!",
        time: "Yesterday",
      },
      { sender: "David Kim", text: "When can you start?", time: "Yesterday" },
    ],
  },
  {
    id: 5,
    name: "Jessica Taylor",
    company: "Global Enterprises",
    lastMessage: "Please complete the online assessment.",
    timestamp: "2 days ago",
    unread: 0,
    messages: [
      {
        sender: "Jessica Taylor",
        text: "Hi! Next step is our online assessment.",
        time: "2 days ago",
      },
      {
        sender: "me",
        text: "Sure, I'll complete it today.",
        time: "2 days ago",
      },
      {
        sender: "Jessica Taylor",
        text: "Please complete the online assessment.",
        time: "2 days ago",
      },
    ],
  },
  {
    id: 6,
    name: "Robert Anderson",
    company: "Finance Corp",
    lastMessage: "We received your test results.",
    timestamp: "3 days ago",
    unread: 0,
    messages: [
      {
        sender: "Robert Anderson",
        text: "Thank you for completing the assessment.",
        time: "3 days ago",
      },
      {
        sender: "me",
        text: "You're welcome! How did I do?",
        time: "3 days ago",
      },
      {
        sender: "Robert Anderson",
        text: "We received your test results.",
        time: "3 days ago",
      },
    ],
  },
  {
    id: 7,
    name: "Amanda White",
    company: "Healthcare Solutions",
    lastMessage: "Can we schedule a call?",
    timestamp: "4 days ago",
    unread: 1,
    messages: [
      {
        sender: "Amanda White",
        text: "Your qualifications match our requirements perfectly.",
        time: "4 days ago",
      },
      {
        sender: "me",
        text: "Thank you! I'd love to learn more about the role.",
        time: "4 days ago",
      },
      {
        sender: "Amanda White",
        text: "Can we schedule a call?",
        time: "4 days ago",
      },
    ],
  },
  {
    id: 8,
    name: "Thomas Brown",
    company: "Education Tech Inc",
    lastMessage: "Thanks for your interest.",
    timestamp: "1 week ago",
    unread: 0,
    messages: [
      {
        sender: "Thomas Brown",
        text: "We're reviewing applications now.",
        time: "1 week ago",
      },
      {
        sender: "me",
        text: "Great! Please let me know if you need anything else.",
        time: "1 week ago",
      },
      {
        sender: "Thomas Brown",
        text: "Thanks for your interest.",
        time: "1 week ago",
      },
    ],
  },
];

const page = () => {
  return (
    <div className="vh-100 d-flex flex-column">
      {/* Navbar */}
      <Navbar />
      <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
          {/* Sidebar */}
          <div
            className="border-end p-4 shadow-sm"
            style={{ overflowY: "auto", width: "40%" }}
          >
            <h3 className="fw-bold fs-3 mb-5 text-primary">Messages</h3>
            <Nav variant="pills" className="flex-column gap-2">
              {sampleUserMessages.map((user) => (
                <Nav.Item key={user.id} className="rounded-3 nav-item">
                  <Nav.Link
                    eventKey={user.id.toString()}
                    className="d-flex align-items-center gap-2 position-relative"
                  >
                    <div className="border rounded-circle p-2 bg-primary bg-opacity-10">
                      <UserIcon size={24} />
                    </div>
                    <div className="flex-grow-1 text-start">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-bold">{user.name}</div>
                          <small>{user.company}</small>
                        </div>
                        <small className="custom-text">{user.timestamp}</small>
                      </div>
                      <div className="small custom-text text-truncate mt-1">
                        {user.lastMessage}
                      </div>
                      {user.unread > 0 && (
                        <Badge
                          bg="primary"
                          pill
                          className="position-absolute top-0 end-0 mt-5 me-2"
                        >
                          {user.unread}
                        </Badge>
                      )}
                    </div>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          {/* Content */}
          <div
            className="flex-grow-1 d-flex flex-column"
            style={{ overflow: "hidden" }}
          >
            <Tab.Content
              className="flex-grow-1"
              style={{ overflowY: "auto", padding: "1.5rem" }}
            >
              {sampleUserMessages.map((user) => (
                <Tab.Pane
                  key={user.id}
                  eventKey={user.id.toString()}
                  className="h-100"
                >
                  <div className="mb-4 pb-3 border-bottom">
                    <h4 className="fw-bold">{user.name}</h4>
                    <p className="text-muted mb-0">{user.company}</p>
                  </div>
                  <div className="d-flex flex-column gap-3 pb-3">
                    {user.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`d-flex ${
                          msg.sender === "me"
                            ? "justify-content-end"
                            : "justify-content-start"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-3 ${
                            msg.sender === "me"
                              ? "bg-primary text-white"
                              : "bg-light text-dark"
                          }`}
                          style={{ maxWidth: "70%" }}
                        >
                          <p className="mb-1">{msg.text}</p>
                          <small
                            className={
                              msg.sender === "me"
                                ? "text-white-50"
                                : "text-muted"
                            }
                          >
                            {msg.time}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>

            {/* Message Input Area */}
            <div className="border-top p-3 bg-light">
              <Form className="d-flex gap-2 align-items-end">
                <Form.Group className="flex-grow-1">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Type your message here..."
                    className="resize-none"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="d-flex align-items-center gap-2"
                  style={{ height: "fit-content" }}
                >
                  <SendIcon size={18} />
                  Send
                </Button>
              </Form>
            </div>
          </div>
        </Tab.Container>
      </div>
    </div>
  );
};

export default page;
