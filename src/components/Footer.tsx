

"use client";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-light custom-footer text-dark pt-5">
      <div className="container">
        {/* Top Section */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">
            {t("title")} <span className="text-primary">{t("titleHighlight")}</span> {t("titleEnd")}
          </h3>
          <p className="small">
            {t("subtitle")}
          </p>
          <hr />
        </div>

        {/* Middle Section */}
        <div className="row mb-4 align-items-start">
          {/* Left: Logo + Description */}
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="d-flex flex-column">
              <h5 className="fw-bold text-primary">JOB<span className="text-dark">Search</span></h5>
              <p className="small">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="col-md-6 d-flex justify-content-md-end">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t("nav.home")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t("nav.features")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t("nav.about")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t("nav.qa")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t("nav.contact")}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-secondary text-light text-center py-3">
        {t("copyright")}
      </div>
    </footer>
  );
}
