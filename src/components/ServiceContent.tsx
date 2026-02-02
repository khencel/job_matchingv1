"use client";
import { useTranslations } from "next-intl";

export default function ServiceContent() {
  const t = useTranslations("serviceContent");
  
  // Convert features object to array
  const featuresObject = t.raw("features") as Record<string, { title: string; description: string }>;
  const features = Object.values(featuresObject);

  return (
    <div className="service-content container my-5 wow animate__animated animate__fadeInUp">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div>
            <h2 className="mb-4 text-center primary-custom-color">{t("title")}</h2>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <ul>
                  {features.map((feature, index) => (
                    <li key={index}>
                      {feature.title}
                      <br />
                      ({feature.description})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <img src="/img/service/animated_guy.png" className="img-fluid" alt="" />
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center gap-3">
              <button className="btn btn-primary-custom rounded-3 w-100">
                {t("buttons.forCompanies")}
              </button>
              <button className="btn btn-primary-custom rounded-3 w-100">
                {t("buttons.forJobSeekers")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

