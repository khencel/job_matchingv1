import RegistrationButton from "./registration/RegisterButton";

/**
 * Registration component displaying user type selection cards
 * Responsive layout: stacks on mobile, 3 columns on desktop
 */
export default function Registration() {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="row g-4">
            {/* Job Seeker Card */}
            <div className="col-12 col-sm-6 col-lg-4"> 
              <RegistrationButton
                id="jobSeeker"
                buttonTextKey="buttons.registerJobSeeker"
              />
            </div>
            {/* Employer Card */}
            <div className="col-12 col-sm-6 col-lg-4">
              <RegistrationButton
                id="employer"
                buttonTextKey="buttons.registerEmployer"
              />
            </div>
            {/* Supervisory Card */}
            <div className="col-12 col-sm-6 col-lg-4">
              <RegistrationButton
                id="superVisory"
                buttonTextKey="buttons.registerSupervisory"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
