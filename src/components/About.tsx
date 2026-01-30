export default function About() {
  return (
    <section className="py-5 bg-light" id="about_us">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="bg-white p-5 rounded-4 shadow-sm text-center">
              <span className="badge bg-primary mb-3">
                About Job Support
              </span>

              <h1 className="fw-bold mb-4">
                Connecting Talent with Opportunity
              </h1>

              <p className="text-muted fs-5 mb-4">
                <strong>Job Support</strong> is a professional matching platform
                that connects employers, job seekers, and support organizations
                in one convenient space.
              </p>

              <p className="text-muted mb-4">
                Our goal is to make the hiring process faster, simpler, and more
                reliable. Whether you’re a company looking for the right talent
                or a job seeker aiming for the best opportunity, Job Support
                helps you find your perfect match efficiently.
              </p>

              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary px-4 py-2">
                  Learn More
                </button>
                <button className="btn btn-outline-primary px-4 py-2">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
