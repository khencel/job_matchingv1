"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store/index";

export const metadata = {
  title: "Next.js Job Matching",
  description: "A job matching application built with Next.js",
};

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
