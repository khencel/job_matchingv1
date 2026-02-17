"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import {resetPassword } from "@/redux/slices/auth/genericAuthThunk";
import { showSuccessToast } from "@/app/(util)/toaster";


export default function ResetPassword() {
  const t = useTranslations("forgotPassword");
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch()
  const [fadeIn, setFadeIn] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    const payload = {
      new_password: password,
      uidb64: searchParams.get('uid'),
      token: searchParams.get('token')
    }

    dispatch(resetPassword(payload))
      .unwrap()
      .then((res) => {
        showSuccessToast(
          t("resetPasswordToase.title"),
          t("resetPasswordToase.text")
        );

        // ⏳ Wait 3 seconds before redirect
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      });
  }

  useEffect(() => {
    setFadeIn(true);
  }, []);

  
  const rules = useMemo(() => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const match = confirmPassword.length > 0 ? password === confirmPassword : true;

    return {
      hasUppercase,
      hasNumber,
      match,
      ok: hasUppercase && hasNumber && match && password.length > 0 && confirmPassword.length > 0,
    };
  }, [password, confirmPassword]);

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
        <h2 className="logo-text mt-3">{t("resetPassword.lefeContent.title")}</h2>
        <p className="text-muted mb-0">{t("resetPassword.lefeContent.subtext")}</p>

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
          <h3 className="fw-bold mb-2 text-center">{t("resetPassword.title")}</h3>
          <p className="text-muted text-center mb-4">{t("resetPassword.subtext")}</p>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control input-focus"
              id="newPassword"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="newPassword">{t("resetPassword.placeholder")}</label>

      
            {password.length > 0 && (!rules.hasUppercase || !rules.hasNumber) && (
              <small className="text-danger d-block mt-1">
                Password must contain at least 1 uppercase letter and 1 number.
              </small>
            )}
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control input-focus"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">{t("resetPassword.placeholder1")}</label>

      
            {confirmPassword.length > 0 && !rules.match && (
              <small className="text-danger d-block mt-1">
                Passwords do not match.
              </small>
            )}
          </div>

          <button className="btn btn-gradient w-100 rounded-3 mb-3" onClick={handleSubmit} disabled={!rules.ok}>
            {t("resetPassword.button")}
          </button>

          <div className="text-center">
            <span
              className="text-primary cursor-pointer"
              role="button"
              onClick={() => router.push("/login")}
            >
              {t("resetPassword.back")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
