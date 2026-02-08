"use client";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  return (
    <section id="about_us" className="about">
      <div className="container">
        <div className="about-card">
          <div className="pill">{t("pill")}</div>
          <h2>{t("title")}</h2>
          <p>
            {t("bodyLine1")}
            <br />
            {t("bodyLine2")}
            <br />
            {t("bodyLine3")}
            <br />
          </p>
        </div>
      </div>
    </section>
  );
}
