"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCurrentUser } from "@/redux/features/auth/auth_thunk";
import Cookies from "js-cookie";
import { Spinner } from "react-bootstrap";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authState.user);
  const { isInitialized } = useAppSelector((state) => state.authState);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // 1. Check if we have a token
      const hasToken = Cookies.get("access") || Cookies.get("refreshToken");

      if (hasToken) {
        try {
          // This will call your API and populate Redux
          await dispatch(fetchCurrentUser()).unwrap();
        } catch (error) {
          console.log("Session expired or invalid.", error);
        }
      }
      // 3. Mark as done
      setIsChecking(false);
    };

    initAuth();
  }, [dispatch]);

  console.log("Redux is working fine",user);

  // 4. While checking, show a full-screen loader (or nothing)
  if (isChecking && !isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // 5. Once done, render the actual app
  return <>{children}</>;
}
