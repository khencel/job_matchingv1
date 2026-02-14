"use client";

import { useTranslations } from "next-intl";

export default function AdminOverviewPage() {
  const t = useTranslations("adminUsers");
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t("overview.title")}</h1>
      <p>{t("overview.description")}</p>
    </div>
  );
}