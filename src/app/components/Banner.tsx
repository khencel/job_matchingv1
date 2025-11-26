export default function Banner() {
    return (
        <>
            <div className="row m-0 banner">
                <div className="col position-relative">
                    <div className="position-absolute w-75 banner-left-content">
                      <h1>
                          One platform, Endless Opportunities, Your future, Unlocked
                      </h1>
                      <div className="w-50">
                          <p>
                            Because your future deserves the best opportunities, more than lucky breaks.
                          </p>
                      </div>
                      <div>
                        <button className="btn btn-explore rounded-3 w-50">Find Job</button>
                      </div>
                    </div>
                </div>
                <div className="col position-relative d-none d-md-block">
                    <div className="position-absolute banner-right-content w-75">
                      <img src="/banner/img1.png" alt="banner-image" className="img-fluid"/> 
                    </div>
                </div>
            </div>    
        </>
    );
}