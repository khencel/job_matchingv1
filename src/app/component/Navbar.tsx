"use client"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ height: "40px", width: "auto", marginRight: "8px" }} 
          />
          <span className="company-name">ジョブサポ</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">Job Support Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">Find Jobs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">Q&A</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}