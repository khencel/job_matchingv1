import Link from "next/link";

export default function JobPost() {
    // TODO: Fetch and display job postings here
  return (
    <div className="container py-4">
      <div className="row justify-content-center wow animate__animated animate__fadeInUp">
        <div className="col-md-10">
          <div className="row justify-content-center">
            <div className="row "></div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <button className="btn btn-primary-custom">
                <Link
                  href="/find-jobs"
                  className="text-white text-decoration-none"
                >
                  View More Jobs
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
