"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../public/css/login/app.css"
import "../../../public/css/app.css"
import ReduxProvider from "./ReduxProvider"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ReduxProvider>
          {children}
          <ToastContainer position="bottom-right" autoClose={3000} />
        </ReduxProvider>
      </body>
    </html>
  );
}