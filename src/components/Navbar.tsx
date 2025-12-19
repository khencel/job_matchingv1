"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const router = useRouter();

  const setLocale = useCallback(
    (nextLocale: "en" | "ja") => {
      const expiry = new Date(); // 1 year expiry
      expiry.setFullYear(expiry.getFullYear() + 1);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; expires=${expiry.toUTCString()}`;
      router.refresh();
    },
    [router]
  );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as "en" | "ja");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo on the left */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image
            src="/logo.png"
            width="300"
            height="80"
            alt={t("logoAlt")}
          />
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation + language selector */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                {t("home")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {t("ourService")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {t("FAQ")}
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/login">
                {t("signIn")}
              </Link>
            </li>
          </ul>

          {/* Language selector */}
          <div className="ms-3 d-flex align-items-center">
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
        </div>
      </div>
    </nav>
  );
}
