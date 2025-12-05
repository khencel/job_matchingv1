export default function ServiceContent() {
  return (
    <div className="service-content container my-5 wow animate__animated animate__fadeInUp">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div>
            <h2 className="mb-4 text-center primary-custom-color">A new job change platform connecting foreign nationals and companies.</h2>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <ul>
                  <li>Free job posting</li>
                      (You can post job listings completely free of charge.)
                  <li>Free introduction to registered support organizations</li>
                      (Smooth acceptance of specified skilled workers.)
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <img src="/img/service/animated_guy.png" className="img-fluid" alt="" />
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center gap-3">
              <button className="btn btn-primary-custom rounded-3 w-100">
                For companies
              </button>
              <button className="btn btn-primary-custom rounded-3 w-100">
                For foreign job seekers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

