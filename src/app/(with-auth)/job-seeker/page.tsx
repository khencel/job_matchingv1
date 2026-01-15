"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function JobSeekerPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/job-seeker/profile");
  }, [router]);
}
