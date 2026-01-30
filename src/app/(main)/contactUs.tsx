export default function ContactUs() {
  return (
    <section className="py-5 bg-white" id="contact_us">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-2">Contact Us</span>
          <h2 className="fw-bold mb-3">
            Get in Touch with Job Support
          </h2>
          <p className="text-muted fs-5">
            Have questions or need assistance? We’re here to help.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Contact Info */}
          <div className="col-lg-5">
            <div className="h-100 p-4 p-md-5 bg-light rounded-4 shadow-sm">
              <h5 className="fw-semibold mb-4">
                Contact Information
              </h5>

              <ul className="list-unstyled text-muted">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-envelope-fill text-primary fs-5 me-3"></i>
                  <span>support@jobsupport.com</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-telephone-fill text-primary fs-5 me-3"></i>
                  <span>+63 900 123 4567</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-geo-alt-fill text-primary fs-5 me-3"></i>
                  <span>Philippines</span>
                </li>
              </ul>

              <p className="text-muted mt-4">
                Our support team is available Monday to Friday,
                9:00 AM – 6:00 PM.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="h-100 p-4 p-md-5 bg-white rounded-4 shadow-sm">
              <h5 className="fw-semibold mb-4">
                Send Us a Message
              </h5>

              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 text-end">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
