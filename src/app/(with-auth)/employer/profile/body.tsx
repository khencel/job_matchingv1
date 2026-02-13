export default function Body({ data }: { data: any }) {
  const companyInfo = data.userDetails_emp?.company_information || {};

  return (
    <>
      <div className="py-5">
        <div className="container">

          {/* Company Profile Card */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4 p-md-5">

              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: 4,
                    height: 24,
                    background: "linear-gradient(180deg, #3b82f6, #6366f1)",
                    borderRadius: 4,
                    marginRight: 10,
                  }}
                />
                <h3 className="mb-0 fw-bold">Company Profile</h3>
              </div>

              <div
                className="lh-lg text-secondary"
                style={{ fontSize: "15px" }}
                dangerouslySetInnerHTML={{
                  __html: companyInfo.profile || "No company profile available.",
                }}
              />
            </div>
          </div>

          {/* Contact Card */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">

              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: 4,
                    height: 24,
                    background: "linear-gradient(180deg, #10b981, #059669)",
                    borderRadius: 4,
                    marginRight: 10,
                  }}
                />
                <h3 className="mb-0 fw-bold">Contact</h3>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="text-muted small">Email</div>
                  <div className="fw-semibold">
                    {data.email || "—"}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="text-muted small">Phone</div>
                  <div className="fw-semibold">
                    {companyInfo.phone || "—"}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
