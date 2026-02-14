"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";



export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-light custom-footer text-dark pt-5">
      <div className="container">
        {/* Top Section */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">
            {t('heading.line1')} <span className="text-primary">{t('heading.line2')}</span> {t('heading.line3')}
          </h3>
          <p className="small">
            {t('tagline')}
          </p>
          <hr />
        </div>

        {/* Middle Section */}
        <div className="row mb-4 align-items-start">
          {/* Left: Logo + Description */}
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="d-flex flex-column">
              <h5 className="fw-bold text-primary">
                {t("brand.primary")}<span className="text-dark">{t("brand.secondary")}</span>
              </h5>
              <p className="small">
                {t('description')}
              </p>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="col-md-6 d-flex justify-content-md-end">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t('links.home')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t('links.features')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t('links.aboutUs')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t('links.qa')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">{t('links.contacts')}</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" href="/legal-notice">{t('links.legalNotice')}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-secondary text-light text-center py-3">
        {t('copyright')}
      </div>
    </footer>
  );
}
