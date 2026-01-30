export default function JobSupportFeatures() {
  return (
    <section className="py-5 bg-white" id="job_support_features">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-2">
            Job Support Features
          </span>
          <h2 className="fw-bold mb-3">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted fs-5">
            Powerful tools designed to help employers and job seekers connect,
            collaborate, and grow.
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
                  Smart Job Matching
                </h5>
                <p className="text-muted">
                  Automatically match job seekers with the right opportunities
                  based on skills, experience, and preferences.
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
                  Employer & Seeker Profiles
                </h5>
                <p className="text-muted">
                  Create detailed profiles to showcase skills, experience, and
                  company culture.
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
                    Application Tracking
                </h5>
                <p className="text-muted">
                    Track job applications in real time with clear status updates from
                    submission to hiring.
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
                  Career Insights
                </h5>
                <p className="text-muted">
                  Get insights on job trends, salary ranges, and career growth
                  opportunities.
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
                  Secure & Reliable
                </h5>
                <p className="text-muted">
                  Your data is protected with industry-standard security and
                  privacy measures.
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
                  Fast & Easy Hiring
                </h5>
                <p className="text-muted">
                  Streamline the hiring process with intuitive tools that save
                  time and effort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
