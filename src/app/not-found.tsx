"use client";

import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </main>
  );
}