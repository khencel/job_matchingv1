"use client";
import { useTranslations } from "next-intl";

export default function JobSearchFiler() {
  const t = useTranslations("jobSearchFilter");
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
                <input type="text" className="form-control job-type" placeholder={t("placeholders.jobType")} />
              </div>
            </div>

            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <select className="form-select" defaultValue="">
                  <option value="" disabled hidden>{t("labels.region")}</option>
                  <option value="test1">{t("regions.test1")}</option>
                  <option value="test2">{t("regions.test2")}</option>
                  <option value="test3">{t("regions.test3")}</option>
                  <option value="test4">{t("regions.test4")}</option>
                </select>
              </div>
            </div>

            <div className="col-md-2 text-center">
              <button className="btn w-100 btn-explore rounded-5">{t("buttons.explore")}</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
