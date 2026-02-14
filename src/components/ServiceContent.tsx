"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ServiceContent() {
  const router = useRouter();
  const t = useTranslations("serviceContent");
  return (
    <div className="">
      <section className="approach-wrap" id="direct-approach">
        <div className="approach-inner">
          <div className="container">
            <div className="approach-head">
              <div className="approach-kicker">{t("kicker")}</div>
              <h3 className="approach-main">{t("title")}</h3>
              <p className="approach-sub">{t("subtitle")}</p>
            </div>

            <div className="approach-grid">
              <div className="approach-card">
                <div className="approach-chip">{t("company.chip")}</div>

                <ul className="approach-list">
                  <li>{t("company.list.0")}</li>
                  <li>{t("company.list.1")}</li>
                </ul>

                <p className="approach-note">
                  {t("company.note.line1")}
                  <br />
                  {t("company.note.line2")}
                </p>

                <button
                  className="approach-btn"
                  onClick={() => {
                    router.push("/registration/employer");
                  }}
                  type="button"
                >
                  {t("company.button")}
                </button>
              </div>

              <div className="approach-card">
                <div className="approach-chip">{t("jobSeeker.chip")}</div>

                <ul className="approach-list">
                  <li>{t("jobSeeker.list.0")}</li>
                  <li>{t("jobSeeker.list.1")}</li>
                </ul>

                <p className="approach-note">
                  {t("jobSeeker.note.line1")}
                  <br />
                  {t("jobSeeker.note.line2")}
                </p>

                <button
                  className="approach-btn"
                  type="button"
                  onClick={() => router.push("/registration/job-seeker")}
                >
                  {t("jobSeeker.button")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
