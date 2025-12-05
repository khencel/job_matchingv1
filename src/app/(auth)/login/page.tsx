export default function Login() {
    return (
        <div className="row m-0">
          <div className="col-md-7 left-content">

          </div>
          <div className="col-md-5 d-flex align-items-center justify-content-center">
            <div className="w-75">
              <div className="input-group">
                <span className="input-group-text">
                  <img src="/img/login/mail.png" alt="email" width="20" height="20" />
                </span>
                <input type="text" className="form-control" placeholder="Email" />
              </div>

              <div className="input-group mt-3">
                <span className="input-group-text">
                  <img src="/img/login/padlock.png" alt="email" width="20" height="20" />
                </span>
                <input type="text" className="form-control" placeholder="Password" />
              </div>
              <div className="mt-3 text-center">
                <div>
                  <button className="btn btn-primary-custom w-75 rounded-3">
                    Sign In
                  </button>
                </div>
                <div className="mt-2">
                  <span className="primary-text">
                    Forgot Password?
                  </span>
                </div>
              </div>
              <hr />
              <div className="text-center">
                
                <span className="">
                  Register As
                </span>
                
                <div className="row mt-2">
                  <div className="col">
                    <button className="btb btn-primary-custom rounded-3">
                      Job Seeker
                    </button>
                  </div>
                  <div className="col">
                    <button className="btb btn-primary-custom rounded-3">
                      Employer
                    </button>
                  </div>
                  <div className="col">
                    <button className="btb btn-primary-custom rounded-3">
                      Supervisory
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}