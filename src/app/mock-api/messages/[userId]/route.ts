import { NextResponse } from "next/server";

interface Messages {
  sender: string;
  text: string;
  time: string;
}

export interface ConversationInterface {
  messageId: string;
  name: string;
  company: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Messages[];
}

const MOCK_CONVERSATIONS: Record<string, ConversationInterface[]> = {
  "1": [
    {
      messageId: "1",
      name: "Sarah Johnson",
      company: "Tech Solutions Inc.",
      lastMessage:
        "Thank you for applying! We'd like to schedule an interview.",
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
        {
          sender: "me",
          text: "That works perfectly for me!",
          time: "10:35 AM",
        },
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
  ],
  "2": [
    {
      messageId: "2",
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
  ],
  "3": [
    {
      messageId: "3",
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
      messageId: "4",
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
  ],
  "5": [
    {
      messageId: "5",
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
  ],
  "6": [
    {
      messageId: "6",
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
  ],
  "7": [
    {
      messageId: "7",
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
  ],
  "8": [
    {
      messageId: "8",
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
  ],
};

// GET: Fetch all conversations for the user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const UserConversation: ConversationInterface[] = MOCK_CONVERSATIONS[userId];

  if (!UserConversation) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(UserConversation);
}

// POST: Send a new message
// Dynamic Route Handler
export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const body = await request.json();
  const { conversationId, text } = body;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userConversations = MOCK_CONVERSATIONS[userId];

  if (!userConversations) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Find the conversation within THIS user's list
  const convIndex = userConversations.findIndex(
    (c) => c.messageId === conversationId
  );

  if (convIndex === -1) {
    return NextResponse.json(
      { message: "Conversation not found" },
      { status: 404 }
    );
  }

  const newMessage = {
    sender: "me",
    text: text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  // Update Data
  userConversations[convIndex].messages.push(newMessage);
  userConversations[convIndex].lastMessage = text;
  userConversations[convIndex].timestamp = "Just now";

  return NextResponse.json(newMessage, { status: 201 });
}
