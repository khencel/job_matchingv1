"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function MessagesIndexPage() {
  const router = useRouter();

  const USER_ID = "3";

  useEffect(() => {
    const redirectToLatest = async () => {
      try {
        const res = await axios.get(`/mock-api/messages/${USER_ID}`);

        // If the user has conversations, redirect to the first one (Index 0)
        if (res.data && res.data.length > 0) {
          const latestChatId = res.data[0].messageId;

          // Use 'replace' instead of 'push' so the "Back" button works correctly
          router.replace(`/job-seeker/messages/${latestChatId}`);
        }
      } catch (error) {
        console.error("Failed to fetch messages for redirect", error);
      }
    };

    redirectToLatest();
  }, [router]);

  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
