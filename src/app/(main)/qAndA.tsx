export default function QASection() {
  return (
    <section className="py-5 bg-light" id="q_and_a">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-2">Q&amp;A</span>
          <h2 className="fw-bold mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted fs-5">
            Find quick answers to common questions about Job Support.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="accordion" id="qaAccordion">
              
              {/* Question 1 */}
              <div className="accordion-item border-0 mb-3 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#qaOne"
                  >
                    What is Job Support?
                  </button>
                </h2>
                <div
                  id="qaOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    Job Support is a professional platform that connects
                    employers, job seekers, and support organizations to make
                    the hiring process faster, easier, and more reliable.
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="accordion-item border-0 mb-3 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#qaTwo"
                  >
                    Is Job Support free to use?
                  </button>
                </h2>
                <div
                  id="qaTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    Job Support offers both free and premium plans depending on
                    your needs. Job seekers can start for free, while employers
                    can choose advanced hiring tools.
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div className="accordion-item border-0 mb-3 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#qaThree"
                  >
                    How do I apply for a job?
                  </button>
                </h2>
                <div
                  id="qaThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    Simply create a profile, upload your resume, and browse job
                    listings. You can apply directly through the platform in
                    just a few clicks.
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div className="accordion-item border-0 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#qaFour"
                  >
                    How can employers post jobs?
                  </button>
                </h2>
                <div
                  id="qaFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#qaAccordion"
                >
                  <div className="accordion-body text-muted">
                    Employers can register, create a company profile, and post
                    job openings easily through the employer dashboard.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
