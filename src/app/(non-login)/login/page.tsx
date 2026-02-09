"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/features/auth/auth_thunk";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from "@/app/(util)/toaster";
import { useTranslations } from "next-intl";

export default function Login() {
  const t = useTranslations("login");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((s) => s.authState.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showErrorToast(t("toasts.signInFailed"), t("toasts.fillAllFields"));
      return;
    }
    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      const verified_email = res.user.is_email_verified;
      const role = res.user.role;

      if (!verified_email) {
        showWarningToast(t("toasts.signInFailed"), t("toasts.verifyEmail"));
        return;
      }

      switch (role) {
        case "employer":
          router.push("/employer/profile");
          break;
        case "job_seeker":
          router.push("/");
          break;
        case "admin":
          router.push("/admin/overview");
          break;
        case "supervisory":
          router.push("/super-visory/profile");
          break;
      }

      showSuccessToast(t("toasts.signInSuccess"), t("toasts.welcomeBack"));
    } catch (error) {
      console.log(error);
      showErrorToast(t("toasts.signInFailed"), t("toasts.invalidCredentials"));
    }
  };

  return (
    <div className="login-container d-flex vh-100 flex-column flex-lg-row">
      {/* Left Side */}
      <div className="left-side d-flex flex-column align-items-center justify-content-center position-relative text-center">
        <img
          onClick={() => router.push("/")}
          src="/img/logo.png"
          alt={t("logoAlt")}
          className={`logo ${fadeIn ? "animate-logo" : ""}`}
        />
        <h2 className="logo-text mt-3">{t("welcomeTitle")}</h2>
        <p className="text-muted mb-0">{t("welcomeSubtitle")}</p>

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
          <h3 className="fw-bold mb-2 text-center">{t("formTitle")}</h3>
          <p className="text-muted text-center mb-4">
            {t("formSubtitle")}
          </p>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control input-focus"
              id="floatingEmail"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <label htmlFor="floatingEmail">{t("emailLabel")}</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control input-focus"
              id="floatingPassword"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <label htmlFor="floatingPassword">{t("passwordLabel")}</label>
          </div>

          <button
            className="btn btn-gradient w-100 rounded-3 mb-3"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? t("signingIn") : t("signIn")}
          </button>

          <div className="text-center">
            <span className="text-primary cursor-pointer">
              {t("forgotPassword")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
