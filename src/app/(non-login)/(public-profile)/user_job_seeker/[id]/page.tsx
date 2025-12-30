"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // <--- Hook to get ID from URL
import axios from "axios";

export default function PublicJobSeekerPage() {
  // Get the ID from the URL(e.g. / user_job_seeker / 1 -> id="1")
  const params = useParams();
  const userId = params?.id as string;

  // Local State for fetching
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Hit your internal Mock API
        const response = await axios.get(`/api/profile/${userId}`);
        setProfile(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return <div>Public Job Seeker Profile : {userId}</div>;
}
