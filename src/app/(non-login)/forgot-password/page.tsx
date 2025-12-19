"use client";
import { useTranslations } from "next-intl";

export default function ForgotPassword() {
  const t = useTranslations("forgotPasswordPage");
  return <h1>{t("title")}</h1>;
}
