"use client";

import FormattedDate from "@/components/date_format";
import EditModalProfile from "./editModal";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export default function Header({ data }: { data: any }) {
  const t = useTranslations("employerProfileHeader");
  const [showModal, setShowModal] = useState(false);

  const handleEditModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  const industryText = useMemo(() => {
    const v = data?.industry;
    if (!v) return t("fallback.notSpecified");
    if (Array.isArray(v)) return v.join(", ");
    return String(v);
  }, [data?.industry, t]);

  if (!data) {
    return (
      <div className="rounded-4 p-4 bg-white border">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div
        className="position-relative overflow-hidden rounded-4 shadow-sm"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.55), rgba(255, 255, 255, 0.92)), url(${data?.banner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* subtle top gradient strip */}
        <div
          className="position-absolute top-0 start-0 w-100"
          style={{
            height: 6,
            background:
              "linear-gradient(90deg, rgba(59,130,246,1), rgba(99,102,241,1), rgba(16,185,129,1))",
            opacity: 0.9,
          }}
        />

        <div className="p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            {/* Left: Avatar + Title */}
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                style={{
                  width: 92,
                  height: 92,
                  border: "4px solid rgba(255,255,255,0.9)",
                }}
              >
                <img
                  src={
                    data?.avatar ||
                    `${process.env.NEXT_PUBLIC_API_CONTENT_URL}media/placeholder.jpg`
                  }
                  alt=""
                  style={{
                    width: 84,
                    height: 84,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>

              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h2 className="m-0 fw-bold text-white">{t("heading")}</h2>
                  <span
                    className="badge rounded-pill"
                    style={{
                      backgroundColor: "rgba(59,130,246,0.15)",
                      color: "#0b5ed7",
                      border: "1px solid rgba(59,130,246,0.25)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {/* {data?.region || t("fallback.noLocation")} */}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="fw-semibold" style={{ color: "#0b5ed7" }}>
                    {data?.name || t("fallback.notSpecified")}
                  </div>
                  <div className="small text-muted">{data.email || t("fallback.notSpecified")}</div>
                </div>
              </div>
            </div>

            {/* Right: Action */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary-custom rounded-3 px-4 shadow-sm"
                onClick={handleEditModal}
              >
                {t("buttons.editProfile")}
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div
            className="mt-4 rounded-4 p-3 p-md-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(226,232,240,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="row g-3">
              <div className="col-6 col-lg-3">
                <div className="small text-muted">{t("stats.founded")}</div>
                <div className="fw-semibold text-dark">
                  {data.founded}
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="small text-muted">{t("stats.employees")}</div>
                <div className="fw-semibold text-dark">
                  {data.no_of_emp || t("fallback.notSpecified")}
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="small text-muted">{t("stats.location")}</div>
                <div className="fw-semibold text-dark">
                  {data?.region || t("fallback.notSpecified")}
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="small text-muted">{t("stats.industry")}</div>
                <div className="fw-semibold text-dark text-truncate">
                  {industryText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModalProfile
        handleShow={showModal}
        handleClose={handleClose}
        companyProfile={data}
      />
    </>
  );
}
