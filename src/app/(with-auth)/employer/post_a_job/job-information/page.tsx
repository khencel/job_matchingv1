"use client"
import Header from "../headerPostAJob"
// import MultiSelectDropdown from "@/components/MultipleSelect"
import MultipleSelect from "@/components/MultipleSelectStandard"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from '@/redux/store'
import { setField, addSkill, removeSkill, setInitialData } from "@/redux/slices/employer/post_a_job/basicInfoSlice"
import { showErrorToast } from "@/app/(util)/toaster";
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";
import { regionList, listCategory } from "@/components/listGroupData"
import { useTranslations } from "next-intl"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { indexCompany } from "@/redux/slices/employer/company/companyThunk";

export default function PostAJob() {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState<string>("")
  const router = useRouter();
  const t = useTranslations("employerJobInformation");
  

  const dispatch = useAppDispatch();
  const basicInfo = useSelector((state: RootState) => state.basicInfo);

  const { companies } = useAppSelector((state) => state.companySlice);

  const i  = useTranslations("list");
  
  const regionListData = regionList(i)
  const industryListData = listCategory(i)

  
  
  const handleAddSkill = () => {
    const value = input.trim();
    if (value) {
      dispatch(addSkill(value));
      setInput("");
    }
  }

  const handleNext = () => {
    const title = basicInfo.title.trim();
    const employmentTypes = basicInfo.type_of_emp;

    if (!title) {
      showErrorToast(t("errors.jobTitleRequired.title"), t("errors.jobTitleRequired.description"));
      return;
    }
    if (employmentTypes.length === 0) {
      showErrorToast(t("errors.employmentTypeRequired.title"), t("errors.employmentTypeRequired.description"));
      return;
    }

    router.push("/employer/post_a_job/job-description");
    console.log(dispatch(setInitialData(basicInfo)));
  }

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let updatedTypes = [...basicInfo.type_of_emp];
    if (e.target.checked) {
      updatedTypes.push(value);
    } else {
      updatedTypes = updatedTypes.filter(type => type !== value);
    }
    dispatch(setField({ type_of_emp: updatedTypes }));
  }

  const selectedCompany = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyId = e.target.value;
    dispatch(setField({ company: Number(selectedCompanyId) }));
    dispatch(setField({ company_name: (companies || []).find(c => c.id === Number(selectedCompanyId))?.information?.company_information?.name || "" }));
  }

  useEffect(() => {
    setMounted(true);
    dispatch(indexCompany({ page: 1, pageSize: 100 }));
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Header />

      <div className="container-fluid px-0">
        <div className="emp-component-style mt-3">
          {/* Header */}
          <div className="d-flex flex-column gap-1 mb-3">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div>
                <h5 className="mb-0">{t("header.title")}</h5>
                <small className="text-muted">
                  {t("header.subtitle")}
                </small>
              </div>

              <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                {t("header.stepBadge")}
              </span>
            </div>
            <hr className="my-3" />
          </div>

          {/* Card wrapper */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">

              <div className="row g-3 align-items-start mb-4">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-1">
                    Company <span className="text-danger">*</span>
                  </label>
                  <div className="text-muted small">
                    The company associated with this job posting. You can manage your company information in the Company Profile section.
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <select name="" id="" className="form-select rounded-3" value={basicInfo.company || ""} onChange={(e) => selectedCompany(e)}>
                    <option value="" disabled>Select a company</option>
                    {(companies || []).map((company) => (
                      <option key={company.id} value={company.id}>
                        {company?.information?.company_information?.name}
                      </option>
                    ))}
                  </select>
                  
                </div>
              </div>

              {/* Job title */}
              <div className="row g-3 align-items-start mb-4">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-1">
                    {t("fields.jobTitle.label")} <span className="text-danger">*</span>
                  </label>
                  <div className="text-muted small">
                    {t("fields.jobTitle.help")}
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <textarea
                    value={basicInfo.title}
                    onChange={(e) => dispatch(setField({ title: e.target.value }))}
                    placeholder={t("fields.jobTitle.placeholder")}
                    className="form-control rounded-3"
                    rows={3}
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <small className="text-muted">{t("fields.jobTitle.minChars")}</small>
                    <small className="text-muted">{basicInfo.title?.length ?? 0}/80</small>
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="row g-3 align-items-center mb-4">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-1">{t("fields.salary.label")}</label>
                  <div className="text-muted small">
                    {t("fields.salary.help")}
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="input-group">
                    <span className="input-group-text bg-white border rounded-start-3">¥</span>
                    <input
                      type="number"
                      value={basicInfo.salary ?? ""}
                      onChange={(e) => dispatch(setField({ salary: e.target.valueAsNumber }))}
                      className="form-control rounded-end-3"
                      placeholder={t("fields.salary.placeholder")}
                    />
                  </div>
                  <small className="text-muted d-block mt-2">
                    {t("fields.salary.tip")}
                  </small>
                </div>
              </div>

              {/* Type of employment */}
              <div className="row g-3 align-items-start mb-4">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-1">
                    {t("fields.employmentType.label")} <span className="text-danger">*</span>
                  </label>
                  <div className="text-muted small">
                    {t("fields.employmentType.help")}
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="d-flex flex-wrap gap-2">
                    {[
                      { label: t("fields.employmentType.options.fullTime"), value: "Full-Time" },
                      { label: t("fields.employmentType.options.partTime"), value: "Part-Time" },
                      { label: t("fields.employmentType.options.remote"), value: "Remote" },
                      { label: t("fields.employmentType.options.internship"), value: "Internship" },
                    ].map((item) => {
                      const checked = basicInfo.type_of_emp.includes(item.value);
                      return (
                        <label
                          key={item.value}
                          className={`px-3 py-2 border rounded-pill d-flex align-items-center gap-2 clickable ${
                            checked ? "bg-light" : "bg-white"
                          }`}
                          style={{ cursor: "pointer", userSelect: "none" }}
                        >
                          <input
                            type="checkbox"
                            value={item.value}
                            checked={checked}
                            onChange={handleCheckBox}
                            className="form-check-input m-0"
                          />
                          <span className="small fw-semibold">{item.label}</span>
                        </label>
                      );
                    })}
                  </div>

                  {basicInfo.type_of_emp.length > 0 && (
                    <div className="mt-2 text-muted small">
                      {t("fields.employmentType.selectedLabel")} <strong>{basicInfo.type_of_emp.join(", ")}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Prefecture */}
              <div className="row g-3 align-items-center mb-4">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-1">
                    {t("fields.prefecture.label")} <span className="text-danger">*</span>
                  </label>
                  <div className="text-muted small">
                    {t("fields.prefecture.help")}
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <select
                    value={basicInfo.region || ""}
                    onChange={(e) => dispatch(setField({ region: e.target.value }))}
                    className="form-select rounded-3"
                  >
                    <option disabled hidden value="">{t("fields.prefecture.placeholder")}</option>
                    {regionListData.map((item: any, index: number) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                  <small className="text-muted d-block mt-2">
                    {t("fields.prefecture.tip")}
                  </small>
                </div>
              </div>

              {/* Categories */}
              <div className="row g-3 align-items-start mb-2">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-1">{t("fields.categories.label")}</label>
                  <div className="text-muted small">
                    {t("fields.categories.help")}
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="p-3 border rounded-3 bg-white">

                    <MultipleSelect
                        data={industryListData}
                        value={basicInfo.category || []}
                        onChange={(selected) => {
                          dispatch(setField({ category: selected }));
                        }}
                        placeholder={"Select categories"}
                      />
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="d-flex flex-column flex-md-row justify-content-end gap-2 mt-5">
                <button
                  className="btn btn-primary-custom rounded-3 px-4 py-2"
                  onClick={handleNext}
                >
                  {t("buttons.next")}
                </button>
              </div>

            </div>
          </div>

          {/* Helper note */}
          <div className="text-muted small mt-3">
            {t("footer.requiredNote.prefix")}<span className="text-danger">*</span>{t("footer.requiredNote.suffix")}
          </div>
        </div>
      </div>
    </>
  )
}
