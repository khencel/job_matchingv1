"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuperVisoryPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/super-visory/overview");
  }, [router]);
}
