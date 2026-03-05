"use client";

import { useTranslations } from "next-intl";

export default function Body({ data }: { data: any }) {
  const t = useTranslations("employerProfileBody");
  const companyInfo = data || {};

  if (!data) {
    return (
      <div className="rounded-4 p-4 bg-white border">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="py-5">
        <div className="container">

          {/* Company Profile Card */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4 p-md-5">

              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: 4,
                    height: 24,
                    background: "linear-gradient(180deg, #3b82f6, #6366f1)",
                    borderRadius: 4,
                    marginRight: 10,
                  }}
                />
                <h3 className="mb-0 fw-bold">{t("companyProfile.title")}</h3>
              </div>

              <div
                className="lh-lg text-secondary"
                style={{ fontSize: "15px" }}
                dangerouslySetInnerHTML={{
                  __html: companyInfo.profile || t("companyProfile.empty"),
                }}
              />
            </div>
          </div>

          {/* Contact Card */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">

              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: 4,
                    height: 24,
                    background: "linear-gradient(180deg, #10b981, #059669)",
                    borderRadius: 4,
                    marginRight: 10,
                  }}
                />
                <h3 className="mb-0 fw-bold">{t("contact.title")}</h3>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="text-muted small">{t("contact.labels.email")}</div>
                  <div className="fw-semibold">
                    {data.email || t("contact.fallback")}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="text-muted small">{t("contact.labels.phone")}</div>
                  <div className="fw-semibold">
                    {companyInfo.phone || t("contact.fallback")}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
