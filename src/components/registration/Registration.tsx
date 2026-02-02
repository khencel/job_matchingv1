import { useTranslations } from "next-intl";
import RegistrationButton from "./RegisterButton";

/**
 * Registration component displaying user type selection cards
 * Responsive layout: stacks on mobile, 3 columns on desktop
 */
export default function Registration() {
  const t = useTranslations("registration");
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">{t("title")}</h2>
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100 ">
            <p className="mb-3">{t("jobSeeker.description")}</p>
            <RegistrationButton
              id="jobSeeker"
              buttonTextKey="buttons.registerJobSeeker"
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100">
            <p className="mb-3">{t("employer.description")}</p>
            <RegistrationButton
              id="employer"
              buttonTextKey="buttons.registerEmployer"
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100">
            <p className="mb-3">{t("supervisory.description")}</p>
            <RegistrationButton
              id="superVisory"
              buttonTextKey="buttons.registerSupervisory"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
