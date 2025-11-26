import RegistrationCard from "./registration/card";

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
              <RegistrationCard
                id="jobSeeker"
                imageUrl="/registration/job_seeker.jpg"
                buttonText="Register as Job Seeker"
              />
            </div>
            {/* Employer Card */}
            <div className="col-12 col-sm-6 col-lg-4">
              <RegistrationCard
                id="employer"
                imageUrl="/registration/employer.jpg"
                buttonText="Register as Employer"
              />
            </div>
            {/* Supervisory Card */}
            <div className="col-12 col-sm-6 col-lg-4">
              <RegistrationCard
                id="superVisory"
                imageUrl="/registration/supervisory.jpg"
                buttonText="Register as Supervisory"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
