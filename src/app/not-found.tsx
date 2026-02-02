"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("notFound");
  
  return (
    <main className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-4">
      <h1 className="display-1 fw-bold text-primary">{t("heading")}</h1>
      <h2 className="h4 mb-3">{t("title")}</h2>
      <p className="text-muted mb-4">{t("description")}</p>
      <p className="text-secondary mb-4">{t("message")}</p>
      <div className="d-flex gap-3">
        <Link href="/" className="btn btn-primary">
          {t("goHome")}
        </Link>
        <button onClick={() => window.history.back()} className="btn btn-outline-primary">
          {t("goBack")}
        </button>
      </div>
    </main>
  );
}