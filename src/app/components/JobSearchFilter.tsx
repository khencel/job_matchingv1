export default function JobSearchFiler() {
  return (
    <>
      <div className="row m-0 job-search-filter justify-content-center p-3">
        <div className="col-md-6 bg-white rounded search-filter-box">
          <div className="row g-2 p-1">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-briefcase"></i>
                </span>
                <input type="text" className="form-control job-type" placeholder="Job Type" />
              </div>
            </div>

            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <select className="form-select" defaultValue="">
                  <option value="" disabled hidden>Region</option>
                  <option value="test1">Test1</option>
                  <option value="test2">Test2</option>
                  <option value="test3">Test3</option>
                  <option value="test4">Test4</option>
                </select>
              </div>
            </div>

            <div className="col-md-2 text-center">
              <button className="btn w-100 btn-explore rounded-5">Explore</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
