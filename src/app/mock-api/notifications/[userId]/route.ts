import { NextResponse } from "next/server";

export interface NotificationInterface {
  title: string;
  description: string;
}

const MOCK_NOTIFICATIONS: Record<string, NotificationInterface[]> = {
  "1": [
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
  ],
  "2": [
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
  ],
  "3": [
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
    {
      title: "McDonald's Message You.",
      description: "Click here to view message",
    },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!userId)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const UserNotifications: NotificationInterface[] = MOCK_NOTIFICATIONS[userId];

  return NextResponse.json(UserNotifications);
}
