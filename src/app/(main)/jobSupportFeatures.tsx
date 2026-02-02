"use client";
import { useTranslations } from "next-intl";

export default function JobSupportFeatures() {
  const t = useTranslations("jobSupportFeatures");
  
  // Convert object to array for mapping
  const featuresObject = t.raw("features") as Record<string, { title: string; description: string }>;
  const features = Object.values(featuresObject);

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
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4 text-center">
                  <div className="mb-3">
                    {index === 0 && <i className="bi bi-search text-primary fs-1"></i>}
                    {index === 1 && <i className="bi bi-people-fill text-primary fs-1"></i>}
                    {index === 2 && <i className="bi bi-clipboard-check-fill text-primary fs-1"></i>}
                    {index === 3 && <i className="bi bi-graph-up-arrow text-primary fs-1"></i>}
                    {index === 4 && <i className="bi bi-shield-lock-fill text-primary fs-1"></i>}
                    {index === 5 && <i className="bi bi-lightning-fill text-primary fs-1"></i>}
                  </div>
                  <h5 className="fw-semibold mb-3">
                    {feature.title}
                  </h5>
                  <p className="text-muted">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
