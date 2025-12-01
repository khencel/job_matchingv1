"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const router = useRouter();

  const setLocale = useCallback((nextLocale: "en" | "ja") => {
    const expiry = new Date(); // 1 year expiry
    expiry.setFullYear(expiry.getFullYear() + 1);
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; expires=${expiry.toUTCString()}`;
    router.refresh();
  }, [router]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as "en" | "ja");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                {t("home")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                {t("features")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                {t("findJobs")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                {t("qa")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                {t("contact")}
              </a>
            </li>
          </ul>
        </div>

        <div className="me-3 d-flex align-items-center gap-2">
          <select
            id="language-selector"
            className="form-select form-select-sm"
            value={locale}
            onChange={handleLanguageChange}
            aria-label="Language selector"
            style={{ width: "auto", minWidth: "140px" }}
          >
            <option value="en">🇺🇸 English</option>
            <option value="ja">🇯🇵 日本語</option>
          </select>
        </div>
        <a className="navbar-brand d-flex align-items-center ms-auto" href="#">
          <img
            src="/logo.png"
            alt={t("logoAlt")}
            style={{ height: "80px", width: "auto", marginRight: "8px" }}
          />
        </a>
      </div>
    </nav>
  );
}
