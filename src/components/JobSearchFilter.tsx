export default function JobSearchFiler() {
  return (
    <>
      <div className="job-search-filter d-flex justify-content-center p-3" style={{marginTop:"7%"}}>
        <div className="w-75 bg-white rounded search-filter-box">
          <div className="row g-2 p-1">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-briefcase"></i>
                </span>
                <input
                  type="text"
                  className="form-control job-type"
                  placeholder="Job Type"
                />
              </div>
            </div>

            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <select className="form-select" defaultValue="">
                  <option value="" disabled hidden>
                    Select Region
                  </option>
                  <option value="test1">test1</option>
                  <option value="test2">test2</option>
                  <option value="test3">test3</option>
                  <option value="test4">test4</option>
                </select>
              </div>
            </div>

            <div className="col-md-2 filter-search">
              <button className="btn btn-primary-custom w-100 rounded-4">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
