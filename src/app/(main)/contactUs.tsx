"use client";
import { useTranslations } from "next-intl";

export default function ContactUs() {
  const t = useTranslations("contactUs");

  return (
    <section className="py-5 bg-white" id="contact_us">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-2">{t("badge")}</span>
          <h2 className="fw-bold mb-3">
            {t("title")}
          </h2>
          <p className="text-muted fs-5">
            {t("subtitle")}
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Contact Info */}
          <div className="col-lg-5">
            <div className="h-100 p-4 p-md-5 bg-light rounded-4 shadow-sm">
              <h5 className="fw-semibold mb-4">
                {t("contactInfoTitle")}
              </h5>

              <ul className="list-unstyled text-muted">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-envelope-fill text-primary fs-5 me-3"></i>
                  <span>{t("email")}</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-telephone-fill text-primary fs-5 me-3"></i>
                  <span>{t("phone")}</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-geo-alt-fill text-primary fs-5 me-3"></i>
                  <span>{t("location")}</span>
                </li>
              </ul>

              <p className="text-muted mt-4">
                {t("availability")}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="h-100 p-4 p-md-5 bg-white rounded-4 shadow-sm">
              <h5 className="fw-semibold mb-4">
                {t("formTitle")}
              </h5>

              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("placeholders.fullName")}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={t("placeholders.email")}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("placeholders.subject")}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder={t("placeholders.message")}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 text-end">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2"
                    >
                      {t("buttons.send")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
