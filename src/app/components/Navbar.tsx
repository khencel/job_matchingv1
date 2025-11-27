"use client";
import { useLocale, useTranslations } from "next-intl";
import { Button, ButtonGroup } from "react-bootstrap";
import React, { useCallback } from "react";

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const setLocale = useCallback((nextLocale: "en" | "ja") => {
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; expires=${expiry.toUTCString()}`;
    window.location.reload();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        {/* Locale switcher - left side of the logo */}
        <div className="me-3">
          <ButtonGroup size="sm" aria-label="Locale switcher">
            <Button
              variant={locale === "en" ? "primary" : "outline-primary"}
              onClick={() => setLocale("en")}
            >
              EN
            </Button>
            <Button
              variant={locale === "ja" ? "primary" : "outline-primary"}
              onClick={() => setLocale("ja")}
            >
              日本語
            </Button>
          </ButtonGroup>
        </div>
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
              <a className="nav-link active" href="#">{t("home")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">{t("features")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">{t("findJobs")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">{t("qa")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">{t("contact")}</a>
            </li>
          </ul>
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