"use client";

import { useTranslations } from "next-intl";

export default function Register() {
  const t = useTranslations("registerPage");
  return <h1>{t("title")}</h1>;
}