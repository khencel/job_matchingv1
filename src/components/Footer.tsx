

export default function Footer() {
  return (
    <footer className="bg-light custom-footer text-dark pt-5">
      <div className="container">
        {/* Top Section */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">
            Explore Your <span className="text-primary">Next Career</span> Move
          </h3>
          <p className="small">
            Are you ready to take the next step in your career? JobLink helps you discover
            exciting opportunities tailored to your skills and aspirations
          </p>
          <hr />
        </div>

        {/* Middle Section */}
        <div className="row mb-4 align-items-start">
          {/* Left: Logo + Description */}
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="d-flex flex-column">
              <h5 className="fw-bold text-primary">JOB<span className="text-dark">Search</span></h5>
              <p className="small">
                Join thousands of successful job seekers who have found their dream careers
                through our platform. Your future begins here!
              </p>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="col-md-6 d-flex justify-content-md-end">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Job Support Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Find Jobs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Q&A</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Contacts</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-secondary text-light text-center py-3">
        &copy; Copyright Jobsearch 2025. All rights reserved
      </div>
    </footer>
  );
}
