"use client";

import { verifyAccessToken } from "@/redux/features/auth/auth_thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function AuthRefresher() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.authState.access);

  useEffect(() => {
    const checkAccessToken = async () => {
      await dispatch(verifyAccessToken());
    };
    checkAccessToken();
  }, [accessToken, dispatch]);
  return null;
}
