"use client";

import "../../../../public/css/employer/registration.css";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  updateField,
  validateForm,
} from "@/redux/slices/employer/registration/employerRegistrationSlice";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { createJobApproach } from "@/redux/slices/employer/registration/employerRegistrationThunk";
import { useStore } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { showErrorToast } from "@/app/(util)/toaster";
import { popup } from "@/helper/pop_up";
import { useTranslations } from "next-intl";

export default function RegistrationEmployer() {
  const t = useTranslations("registrationEmployer");
  const tPrefecture = useTranslations("jobSearchFilter");
  const store = useStore();
  const dispatch = useAppDispatch();
  const { form, errors } = useSelector(
    (state: RootState) => state.employerRegistration,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    dispatch(
      updateField({
        name: name as any,
        value: type === "checkbox" ? value : value,
        type,
        checked: type === "checkbox" ? checked : undefined,
      }),
    );
  };

  const handleSubmit = async () => {
    dispatch(validateForm());
    const currentErrors = (store.getState() as RootState).employerRegistration
      .errors;
    if (Object.keys(currentErrors).length !== 0) {
      showErrorToast(
        t("alerts.invalidInput.title"),
        t("alerts.invalidInput.text"),
      );
      console.log("Validation failed", currentErrors);
      return;
    }

    popup({
      title: t("popup.confirmTitle"),
      text: t("popup.confirmText"),
      icon: "warning",
      onConfirm: async () => {
        try {
          setIsLoading(true);

          const pdfBlob = await generatePDFBlob();
          if (!pdfBlob) {
            console.error("PDF generation failed");
            return;
          }

          const formDataToSend = new FormData();
          formDataToSend.append(
            "pdf_file",
            pdfBlob,
            `company-registration-${Date.now()}.pdf`,
          );
          await dispatch(createJobApproach(formDataToSend));
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  const generatePDFBlob = async (): Promise<Blob | null> => {
    const element = document.getElementById("convertPDF");
    if (!element) return null;

    const buttons = document.getElementById("pdfButtons");
    if (buttons) buttons.style.display = "none";

    const canvas = await html2canvas(element, { scale: 1.5 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    if (buttons) buttons.style.display = "block";

    return pdf.output("blob");
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      console.log("READY TO SUBMIT", form);
    }
  }, [errors]);

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-custom">{t("loadingOverlay")}</div>
        </div>
      )}
      <div
        id="convertPDF"
        className=" p-5"
        style={{
          background: "linear-gradient(180deg, rgba(47,120,255,.06), #fff)",
        }}
      >
        <div className="container p-5 bg-white rounded-5 shadow">
          <div className="card-registration ">
            <h1 className="h1-custom">{t("title")}</h1>
            <p className="lead">
              {t("lead.line1")}
              <br />
              {t("lead.line2")}
            </p>

            <div className="section-title-reg">{t("sections.companyInfo")}</div>
            <div className="grid-reg">
              <div className="field-reg">
                <label>
                  {t("labels.companyName")} <span className="text-danger">*</span>
                </label>
                <input
                  name="company_name"
                  placeholder={t("placeholders.companyName")}
                  value={form.company_name}
                  onChange={handleChange}
                />
                {errors.company_name && (
                  <small className="text-danger">{errors.company_name}</small>
                )}
              </div>

              <div className="field-reg">
                <label>
                  {t("labels.companyPrefecture")}{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  name="company_pref"
                  value={form.company_pref}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  {[
                    "hokkaido",
                    "aomori",
                    "iwate",
                    "miyagi",
                    "akita",
                    "yamagata",
                    "fukushima",
                    "ibaraki",
                    "tochigi",
                    "gunma",
                    "saitama",
                    "chiba",
                    "tokyo",
                    "kanagawa",
                    "niigata",
                    "toyama",
                    "ishikawa",
                    "fukui",
                    "yamanashi",
                    "nagano",
                    "gifu",
                    "shizuoka",
                    "aichi",
                    "mie",
                    "shiga",
                    "kyoto",
                    "osaka",
                    "hyogo",
                    "nara",
                    "wakayama",
                    "tottori",
                    "shimane",
                    "okayama",
                    "hiroshima",
                    "yamaguchi",
                    "tokushima",
                    "kagawa",
                    "ehime",
                    "kochi",
                    "fukuoka",
                    "saga",
                    "nagasaki",
                    "kumamoto",
                    "oita",
                    "miyazaki",
                    "kagoshima",
                    "okinawa",
                  ].map((prefecture) => (
                    <option key={prefecture}>
                      {tPrefecture(`prefecture.${prefecture}`)}
                    </option>
                  ))}
                </select>
                {errors.company_pref && (
                  <small className="text-danger">{errors.company_pref}</small>
                )}
              </div>

              <div className="field-reg">
                <label>
                  {t("labels.contactName")}{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="contact_name"
                  placeholder={t("placeholders.contactName")}
                  value={form.contact_name}
                  onChange={handleChange}
                />
                {errors.contact_name && (
                  <small className="text-danger">{errors.contact_name}</small>
                )}
              </div>

              <div className="field-reg">
                <label>{t("labels.contactTitle")}</label>
                <input
                  name="job_title"
                  value={form.job_title}
                  onChange={handleChange}
                  placeholder={t("placeholders.contactTitle")}
                />
              </div>

              <div className="field-reg">
                <label>
                  {t("labels.phone")} <span className="text-danger">*</span>
                </label>
                <input
                  name="phone"
                  placeholder={t("placeholders.phone")}
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>

              <div className="field-reg">
                <label>
                  {t("labels.email")} <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={t("placeholders.email")}
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              <div className="field-reg">
                <label>{t("labels.companyUrl")}</label>
                <input
                  name="company_url"
                  value={form.company_url}
                  onChange={handleChange}
                  placeholder={t("placeholders.companyUrl")}
                />
              </div>

              <div className="field-reg">
                <label>{t("labels.industry")}</label>
                <input
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder={t("placeholders.industry")}
                />
              </div>
            </div>

            <div className="section-title-reg">
              {t("sections.hiringNeeds")}
            </div>

            <div className="field-reg">
              <label>
                {t("labels.needs")} <span className="text-danger">*</span>
              </label>
              <div className="pillrow">
                <label className="pill">
                  <input
                    type="checkbox"
                    name="needs"
                    value="overseas_new"
                    checked={form.needs.includes("overseas_new")}
                    onChange={handleChange}
                  />
                  <span>{t("needs.overseas")}</span>
                </label>
                <label className="pill">
                  <input
                    type="checkbox"
                    name="needs"
                    value="domestic_change"
                    checked={form.needs.includes("domestic_change")}
                    onChange={handleChange}
                  />
                  <span>{t("needs.domestic")}</span>
                </label>
                <label className="pill">
                  <input
                    type="checkbox"
                    name="needs"
                    value="both"
                    checked={form.needs.includes("both")}
                    onChange={handleChange}
                  />
                  <span>{t("needs.both")}</span>
                </label>
                <label className="pill">
                  <input
                    type="checkbox"
                    name="needs"
                    value="consult"
                    checked={form.needs.includes("consult")}
                    onChange={handleChange}
                  />
                  <span>{t("needs.consult")}</span>
                </label>
                {errors.needs && (
                  <small className="text-danger">{errors.needs}</small>
                )}
              </div>

              <div className="hint">{t("hints.needs")}</div>
            </div>

            <div className="grid-reg" style={{ marginTop: "12px" }}>
              <div className="field-reg">
                <label>
                  {t("labels.role")} <span className="text-danger">*</span>
                </label>
                <input
                  name="role"
                  placeholder={t("placeholders.role")}
                  value={form.role}
                  onChange={handleChange}
                />
                {errors.role && (
                  <small className="text-danger">{errors.role}</small>
                )}
              </div>

              <div className="field-reg">
                <label>{t("labels.visa")}</label>
                <select
                  name="visa_type"
                  value={form.visa_type}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.visa.ssw")}</option>
                  <option>{t("options.visa.titp")}</option>
                  <option>{t("options.visa.gijinkoku")}</option>
                  <option>{t("options.visa.student")}</option>
                  <option>{t("options.visa.unknown")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>
                  {t("labels.headcount")} <span className="text-danger">*</span>
                </label>
                <select
                  name="head_count"
                  value={form.head_count}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.headcount.one")}</option>
                  <option>{t("options.headcount.two")}</option>
                  <option>{t("options.headcount.three")}</option>
                  <option>{t("options.headcount.fourFive")}</option>
                  <option>{t("options.headcount.sixTen")}</option>
                  <option>{t("options.headcount.tenPlus")}</option>
                </select>
                {errors.head_count && (
                  <small className="text-danger">{errors.head_count}</small>
                )}
              </div>

              <div className="field-reg">
                <label>{t("labels.startTiming")}</label>
                <input
                  name="start_timing"
                  value={form.start_timing}
                  onChange={handleChange}
                  placeholder={t("placeholders.startTiming")}
                />
              </div>
            </div>

            {/* <!-- ✅追加：希望国籍 --> */}
            <div className="grid-reg" style={{ marginTop: "12px" }}>
              <div className="field-reg">
                <label>{t("labels.preferredNationality")}</label>
                <input
                  name="preferred_nationality"
                  value={form.preferred_nationality}
                  onChange={handleChange}
                  placeholder={t("placeholders.preferredNationality")}
                />
                <div className="hint">{t("hints.preferredNationality")}</div>
              </div>

              <div className="field-reg">
                <label>{t("labels.workCity")}</label>
                <input
                  name="work_city"
                  value={form.work_city}
                  onChange={handleChange}
                  placeholder={t("placeholders.workCity")}
                />
              </div>
            </div>

            <div className="grid-reg" style={{ marginTop: "12px" }}>
              <div className="field-reg">
                <label>{t("labels.employmentType")}</label>
                <select
                  name="employment_type"
                  value={form.employment_type}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.employment.fullTime")}</option>
                  <option>{t("options.employment.contract")}</option>
                  <option>{t("options.employment.dispatch")}</option>
                  <option>{t("options.employment.partTime")}</option>
                  <option>{t("options.employment.shift")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.salaryRange")}</label>
                <input
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder={t("placeholders.salaryRange")}
                />
              </div>

              <div className="field-reg">
                <label>{t("labels.jpLevel")}</label>
                <select
                  name="jp_level"
                  value={form.jp_level}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.jpLevel.n5")}</option>
                  <option>{t("options.jpLevel.n4")}</option>
                  <option>{t("options.jpLevel.n3")}</option>
                  <option>{t("options.jpLevel.n2")}</option>
                  <option>{t("options.jpLevel.n1")}</option>
                  <option>{t("options.jpLevel.any")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.experienceRequirement")}</label>
                <select
                  name="experience_need"
                  value={form.experience_need}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.experience.required")}</option>
                  <option>{t("options.experience.preferred")}</option>
                  <option>{t("options.experience.ok")}</option>
                  <option>{t("options.experience.consult")}</option>
                </select>
              </div>
            </div>

            <div className="divider"></div>

            <div className="section-title-reg">{t("sections.readiness")}</div>
            <div className="grid-reg">
              <div className="field-reg">
                <label>{t("labels.housing")}</label>
                <select
                  name="housing"
                  value={form.housing}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.housing.dorm")}</option>
                  <option>{t("options.housing.company")}</option>
                  <option>{t("options.housing.allowance")}</option>
                  <option>{t("options.housing.none")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.shuttle")}</label>
                <select
                  name="shuttle"
                  value={form.shuttle}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.yesNo.yes")}</option>
                  <option>{t("options.yesNo.no")}</option>
                  <option>{t("options.yesNo.consult")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.interviewMethod")}</label>
                <select
                  name="interview_method"
                  value={form.interview_method}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.interview.online")}</option>
                  <option>{t("options.interview.local")}</option>
                  <option>{t("options.interview.either")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.acceptConfirm")}</label>
                <select
                  name="accept_confirm"
                  value={form.accept_confirm}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.accept.yes")}</option>
                  <option>{t("options.accept.maybe")}</option>
                  <option>{t("options.accept.consult")}</option>
                </select>
                <div className="hint">{t("hints.acceptConfirm")}</div>
              </div>
            </div>

            <div className="field-reg" style={{ marginTop: "12px" }}>
              <label>{t("labels.requirements")}</label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder={t("placeholders.requirements")}
              ></textarea>
            </div>

            <div className="divider"></div>

            <div className="section-title-reg">{t("sections.contact")}</div>
            <div className="grid-reg">
              <div className="field-reg">
                <label>{t("labels.contactMethod")}</label>
                <select
                  name="contact_method"
                  value={form.contact_method}
                  onChange={handleChange}
                >
                  <option value="">{t("options.selectPlaceholder")}</option>
                  <option>{t("options.contactMethod.phone")}</option>
                  <option>{t("options.contactMethod.email")}</option>
                  <option>{t("options.contactMethod.online")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.contactTime")}</label>
                <input
                  name="contact_time"
                  value={form.contact_time}
                  onChange={handleChange}
                  placeholder={t("placeholders.contactTime")}
                />
              </div>
            </div>

            <div className="field-reg" style={{ marginTop: "12px" }}>
              <label>{t("labels.message")}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("placeholders.message")}
              ></textarea>
            </div>

            <div className="actions text-end mt-5" id="pdfButtons">
              <button
                className="btn btn-default-custom me-1"
                type="button"
              >
                {t("buttons.clear")}
              </button>
              <button className="btn btn-primary-custom" onClick={handleSubmit}>
                {t("buttons.submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
