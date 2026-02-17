"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const t = useTranslations("forgotPasswordPage"); // ok lang kahit di mo pa ginagamit
  const router = useRouter();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="login-container d-flex vh-100 flex-column flex-lg-row">
      {/* Left Side */}
      <div className="left-side d-flex flex-column align-items-center justify-content-center position-relative text-center">
        <img
          src="/img/logo.png"
          alt="Logo"
          style={{ width: "40%" }}
          className={`logo ${fadeIn ? "animate-logo" : ""}`}
        />
        <h2 className="logo-text mt-3">Reset Your Password</h2>
        <p className="text-muted mb-0">Create a new secure password.</p>

        {/* Animated shapes */}
        <div className="animated-shape shape1"></div>
        <div className="animated-shape shape2"></div>
        <div className="animated-shape shape3"></div>
      </div>

      {/* Right Side */}
      <div
        className={`right-side d-flex align-items-center justify-content-center ${
          fadeIn ? "fade-in" : ""
        }`}
      >
        <div className="form-container p-4 shadow-lg rounded-4 w-100">
          <h3 className="fw-bold mb-2 text-center">Reset Password</h3>
          <p className="text-muted text-center mb-4">
            Enter your new password below
          </p>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control input-focus"
              id="newPassword"
              placeholder="New Password"
            />
            <label htmlFor="newPassword">New Password</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control input-focus"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>

          <button className="btn btn-gradient w-100 rounded-3 mb-3">
            Reset Password
          </button>

          <div className="text-center">
            <span
              className="text-primary cursor-pointer"
              role="button"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
