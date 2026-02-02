"use client";
import { useTranslations } from "next-intl";

export default function Banner() {
  const t = useTranslations("banner");

  return (
    <section className="banner position-relative overflow-hidden py-5">
      {/* Optional: background color / gradient */}
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-lg-10">

            <div className="row align-items-center">

              {/* LEFT CONTENT */}
              <div className="col-12 col-md-6 mb-4 mb-md-0 text-center text-md-start">
                <h1 className="banner-title fw-bold display-5">
                  {t("title")}
                </h1>

                <p className="mt-3 fs-5 text-muted matching">
                  {t("subtitle")}
                </p>

                <div className="mt-4 d-flex justify-content-center justify-content-md-start">
                  <button className="btn btn-primary-custom rounded-5 px-4 py-3">
                    {t("buttons.findJob")}
                  </button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="col-12 col-md-6 text-center">
                <img
                  src="/banner/img2.png"
                  className="img-fluid banner-image"
                  alt="Banner Illustration"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
