import RegistrationButton from "./RegisterButton";

/**
 * Registration component displaying user type selection cards
 * Responsive layout: stacks on mobile, 3 columns on desktop
 */
export default function Registration() {
  return (
    <div className="container py-5 register-div">
      <h2 className="text-center mb-0 mb-sm-5 fw-bold regiter-choose">Choose Your Role</h2>
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100 ">
            <p className="mb-3">Looking for your dream job?</p>
            <RegistrationButton
              id="jobSeeker"
              buttonTextKey="buttons.registerJobSeeker"
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100">
            <p className="mb-3">Hire the best talent!</p>
            <RegistrationButton
              id="employer"
              buttonTextKey="buttons.registerEmployer"
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow p-4 text-center h-100">
            <p className="mb-3">Manage and supervise effectively</p>
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
