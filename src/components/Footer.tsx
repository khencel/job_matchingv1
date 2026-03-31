"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-light custom-footer text-dark pt-4 pt-md-5">
      <div className="container">
        {/* Top Section */}
        <div className="text-center mb-4">
          <h3 className="fw-bold fs-4 fs-md-3">
            {t("heading.line1")}{" "}
            <span className="text-primary">{t("heading.line2")}</span>{" "}
            {t("heading.line3")}
          </h3>
          <p className="small px-2 px-md-0 mb-3">
            {t("tagline")}
          </p>
          <hr />
        </div>

        {/* Middle Section */}
        <div className="row gy-4 mb-4 align-items-start">
          {/* Left: Logo + Description */}
          <div className="col-12 col-md-6 text-center text-md-start">
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <h5 className="fw-bold text-primary mb-2">
                {t("brand.primary")}
                <span className="text-dark">{t("brand.secondary")}</span>
              </h5>
              <p className="small mb-0 px-2 px-md-0">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="col-12 col-md-6">
            <ul className="nav flex-column flex-md-row justify-content-center justify-content-md-end align-items-center align-items-md-start gap-1 gap-md-2 text-center text-md-start">
              <li className="nav-item">
                <a className="nav-link text-dark px-2" href="/">
                  {t("links.home")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark px-2" href="/#job_support_features">
                  {t("links.features")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark px-2" href="/#about_us">
                  {t("links.aboutUs")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark px-2" href="/#q_and_a">
                  {t("links.qa")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark px-2" href="/#contact_us">
                  {t("links.contacts")}
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark px-2" href="/legal-notice">
                  {t("links.legalNotice")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-secondary text-light text-center py-3 small">
        {t("copyright")}
      </div>
    </footer>
  );
}