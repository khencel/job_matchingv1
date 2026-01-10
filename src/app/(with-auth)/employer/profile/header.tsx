export default function Header(){
    return(
        <>
            <div className="" style={{
                                        backgroundImage:"linear-gradient(rgba(235, 235, 235, 0.94), rgba(255, 255, 255, 0.85)), url('/img/employer/images.jpg')",
                                        backgroundSize:"cover",
                                        backgroundRepeat:"no-repeat",
                                        backgroundPosition:"center",
                                    }}>
                <div className="row">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-3 d-flex justify-content-center align-items-center">
                                <img src="/logo.png" className="img-fluid" alt="" />
                            </div>
                            <div className="col-9">
                                <div className="">
                                    <strong><h2>Employer Profile</h2></strong>
                                    <br />
                                    <span className="text-primary">JOBSupport</span>
                                    <br />
                                    <span className="text-primary">https://JOBSupport.com</span>
                                    <br />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <small className="text-style">Founded</small>
                                        <br />
                                        <strong className="info-style">November 28, 2025</strong>
                                    </div>
                                    <div className="col">
                                        <small className="text-style">Employees</small>
                                        <br />
                                        <strong className="info-style">1823</strong>
                                    </div>
                                    <div className="col">
                                        <small className="text-style">Location</small>
                                        <br />
                                        <strong className="info-style">Japan</strong>
                                    </div>
                                    <div className="col">
                                        <small className="text-style">Industry</small>
                                        <br />
                                        <strong className="info-style">Information Technology</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-center">
                        <button className="btn btn-primary-custom rounded-3">Edit Profile</button>
                    </div>
                </div>
            </div>
        </>
    )
}