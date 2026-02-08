"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function ServiceContent() {
  const router = useRouter();
  const t = useTranslations("serviceContent");
  return (
    <div className="">
      <section className="approach-wrap" id="direct-approach">
        <div className="approach-inner">
          <div className="container">
            <div className="approach-head">
              <div className="approach-kicker">{t("approach.kicker")}</div>
              <h3 className="approach-main">{t("approach.title")}</h3>
              <p className="approach-sub">{t("approach.sub")}</p>
            </div>

            <div className="approach-grid">
              <div className="approach-card">
                <div
                  className="approach-chip"
                >
                  {t("approach.companyChip")}
                </div>

                <ul className="approach-list">
                  <li>{t("approach.companyList.item1")}</li>
                  <li>{t("approach.companyList.item2")}</li>
                </ul>

                <p className="approach-note">
                  {t("approach.companyNoteLine1")}
                  <br />
                  {t("approach.companyNoteLine2")}
                </p>

                <button
                  className="approach-btn"
                  onClick={() => {
                    router.push("/registration/employer");
                  }}
                  type="button"
                >
                  {t("approach.companyButton")}
                </button>
              </div>

              <div className="approach-card">
                <div
                  className="approach-chip"
                >
                  {t("approach.jobSeekerChip")}
                </div>

                <ul className="approach-list">
                  <li>{t("approach.jobSeekerList.item1")}</li>
                  <li>{t("approach.jobSeekerList.item2")}</li>
                </ul>

                <p className="approach-note">
                  {t("approach.jobSeekerNoteLine1")}
                  <br />
                  {t("approach.jobSeekerNoteLine2")}
                </p>

                <button
                  className="approach-btn"
                  type="button"
                  onClick={() => router.push("/registration/job-seeker")}
                >
                  {t("approach.jobSeekerButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
