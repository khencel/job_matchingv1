import { useTranslations } from "next-intl";

export default function JobSupportFeatures() {
  const t = useTranslations("jobSupportFeatures");
  return (
    <section className="py-5 bg-white" id="job_support_features">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-2">
            {t("badge")}
          </span>
          <h2 className="fw-bold mb-3">
            {t("title")}
          </h2>
          <p className="text-muted fs-5">
            {t("subtitle")}
          </p>
        </div>

        <div className="row g-4">
          {/* Feature 1 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4 text-center">
                <div className="mb-3">
                  <i className="bi bi-search text-primary fs-1"></i>
                </div>
                <h5 className="fw-semibold mb-3">
                  {t("features.matching.title")}
                </h5>
                <p className="text-muted">
                  {t("features.matching.body")}
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4 text-center">
                <div className="mb-3">
                  <i className="bi bi-people-fill text-primary fs-1"></i>
                </div>
                <h5 className="fw-semibold mb-3">
                  {t("features.profiles.title")}
                </h5>
                <p className="text-muted">
                  {t("features.profiles.body")}
                </p>
              </div>
            </div>
          </div>

        {/* Feature 3 */}
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4 text-center">
                <div className="mb-3">
                    <i className="bi bi-clipboard-check-fill text-primary fs-1"></i>
                </div>
                <h5 className="fw-semibold mb-3">
                  {t("features.tracking.title")}
                </h5>
                <p className="text-muted">
                  {t("features.tracking.body")}
                </p>
                </div>
            </div>
        </div>

          {/* Feature 4 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4 text-center">
                <div className="mb-3">
                  <i className="bi bi-graph-up-arrow text-primary fs-1"></i>
                </div>
                <h5 className="fw-semibold mb-3">
                  {t("features.insights.title")}
                </h5>
                <p className="text-muted">
                  {t("features.insights.body")}
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4 text-center">
                <div className="mb-3">
                  <i className="bi bi-shield-lock-fill text-primary fs-1"></i>
                </div>
                <h5 className="fw-semibold mb-3">
                  {t("features.secure.title")}
                </h5>
                <p className="text-muted">
                  {t("features.secure.body")}
                </p>
              </div>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4 text-center">
                <div className="mb-3">
                  <i className="bi bi-lightning-fill text-primary fs-1"></i>
                </div>
                <h5 className="fw-semibold mb-3">
                  {t("features.fast.title")}
                </h5>
                <p className="text-muted">
                  {t("features.fast.body")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
