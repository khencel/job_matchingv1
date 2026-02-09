"use client";

import { useTranslations } from "next-intl";
import RegistrationButton from "./RegisterButton";


/**
 * Registration component displaying user type selection cards
 * Responsive layout: stacks on mobile, 3 columns on desktop
 */
export default function Registration() {
  const t = useTranslations("registration");

  return (
    <div className="container py-5 register-div">
      <h2 className="text-center mb-0 mb-sm-5 fw-bold regiter-choose">{t("title")}</h2>
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100 ">
            <p className="mb-3">{t("jobSeekerPrompt")}</p>
            <RegistrationButton
              id="jobSeeker"
              buttonTextKey="buttons.registerJobSeeker"
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100">
            <p className="mb-3">{t("employerPrompt")}</p>
  
            <RegistrationButton
              id="employer"
              buttonTextKey="buttons.registerEmployer"
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100">
            <p className="mb-3">{t("supervisoryPrompt")}</p>
            <RegistrationButton
              id="superVisory"
              buttonTextKey="buttons.registerSupervisory"
            />
          </div>
        </div>
      </div>

      <div className="row mt-2 justify-content-center">
        <div className="col-md-7 section-subtitle">
          {t("subtitleLine1")}
          <br />
          {t("subtitleLine2")}
        </div>
      </div>
    </div>
  );
}
