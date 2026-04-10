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
import ForgotPassword from "./forgotPassword";

export default function Login() {
  const t = useTranslations("loginPage");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((s) => s.authState.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);


  const forgotPassword = () => {
    setForgotPasswordModal(true);
  }

  const closeForgotPassword = () => {
    setForgotPasswordModal(false);
  }

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showErrorToast(t('alerts.fillAllFields.title'), t('alerts.fillAllFields.message'));
      return;
    }
    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      const verified_email = res.user.is_email_verified;
      const role = res.user.role;

      if (!verified_email) {
        showWarningToast(t('alerts.verifyEmail.title'), t('alerts.verifyEmail.message'));
        return;
      }

      switch (role) {
        case "employer":
          router.push("/employer/company");
          break;
        case "job_seeker":
          router.push("/job-seeker/profile");
          break;
        case "admin":
          router.push("/admin/overview");
          break;
        case "supervisory":
          router.push("/super-visory/profile");
          break;
      }

      showSuccessToast(t('alerts.success.title'), t('alerts.success.message'));
    } catch (error) {
      console.log(error);
      showErrorToast(t('alerts.invalidCredentials.title'), t('alerts.invalidCredentials.message'));
    }
  };

  return (
    <div className="login-container d-flex vh-100 flex-column flex-lg-row">
      {/* Left Side */}
      <div className="left-side d-flex flex-column align-items-center justify-content-center position-relative text-center">
        <img
          onClick={() => router.push("/")}
          src="/img/logo-latest.png"
          alt="Logo"
          style={{width:"40%"}}
          className={`logo ${fadeIn ? "animate-logo" : ""}`}
        />
        <h2 className="logo-text mt-3">{t('hero.heading')}</h2>
        <p className="text-muted mb-0">{t('hero.tagline')}</p>

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
          <h3 className="fw-bold mb-2 text-center">{t('form.heading')}</h3>
          <p className="text-muted text-center mb-4">
            {t('form.subtitle')}
          </p>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control input-focus"
              id="floatingEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <label htmlFor="floatingEmail">{t('form.fields.email.label')}</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control input-focus"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <label htmlFor="floatingPassword">{t('form.fields.password.label')}</label>
          </div>

          <button
            className="btn btn-gradient w-100 rounded-3 mb-3"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? t('form.buttons.signingIn') : t('form.buttons.signIn')}
          </button>

          <div className="text-center">
            <span onClick={forgotPassword} className="text-primary cursor-pointer">{t('form.forgotPassword')}</span>
          </div>
        </div>
      </div>


      <ForgotPassword handleShow={forgotPasswordModal} handleClose={closeForgotPassword} />
    </div>
  );
}
