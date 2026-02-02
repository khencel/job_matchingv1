import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  return (
    <section className="py-5 bg-light" id="about_us">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="bg-white p-5 rounded-4 shadow-sm text-center">
              <span className="badge bg-primary mb-3">{t("badge")}</span>

              <h1 className="fw-bold mb-4">{t("title")}</h1>

              <p className="text-muted fs-5 mb-4">
                <strong>{t("platformName")}</strong> {t("description")}
              </p>

              <p className="text-muted mb-4">{t("mission")} </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-outline-primary px-4 py-2">
                  {t("buttons.learnMore")}
                </button>
                <button className="btn btn-outline-primary px-4 py-2">
                  {t("buttons.contactUs")}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
