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
  const t = useTranslations("registrationEmployerPage");
  const store = useStore();
  const dispatch = useAppDispatch();
  const { form, errors } = useSelector(
    (state: RootState) => state.employerRegistration,
  );
  const [isLoading, setIsLoading] = useState(false);

  const prefectureOptions = [
    { key: "hokkaido", value: "北海道" },
    { key: "aomori", value: "青森県" },
    { key: "iwate", value: "岩手県" },
    { key: "miyagi", value: "宮城県" },
    { key: "akita", value: "秋田県" },
    { key: "yamagata", value: "山形県" },
    { key: "fukushima", value: "福島県" },
    { key: "ibaraki", value: "茨城県" },
    { key: "tochigi", value: "栃木県" },
    { key: "gunma", value: "群馬県" },
    { key: "saitama", value: "埼玉県" },
    { key: "chiba", value: "千葉県" },
    { key: "tokyo", value: "東京都" },
    { key: "kanagawa", value: "神奈川県" },
    { key: "niigata", value: "新潟県" },
    { key: "toyama", value: "富山県" },
    { key: "ishikawa", value: "石川県" },
    { key: "fukui", value: "福井県" },
    { key: "yamanashi", value: "山梨県" },
    { key: "nagano", value: "長野県" },
    { key: "gifu", value: "岐阜県" },
    { key: "shizuoka", value: "静岡県" },
    { key: "aichi", value: "愛知県" },
    { key: "mie", value: "三重県" },
    { key: "shiga", value: "滋賀県" },
    { key: "kyoto", value: "京都府" },
    { key: "osaka", value: "大阪府" },
    { key: "hyogo", value: "兵庫県" },
    { key: "nara", value: "奈良県" },
    { key: "wakayama", value: "和歌山県" },
    { key: "tottori", value: "鳥取県" },
    { key: "shimane", value: "島根県" },
    { key: "okayama", value: "岡山県" },
    { key: "hiroshima", value: "広島県" },
    { key: "yamaguchi", value: "山口県" },
    { key: "tokushima", value: "徳島県" },
    { key: "kagawa", value: "香川県" },
    { key: "ehime", value: "愛媛県" },
    { key: "kochi", value: "高知県" },
    { key: "fukuoka", value: "福岡県" },
    { key: "saga", value: "佐賀県" },
    { key: "nagasaki", value: "長崎県" },
    { key: "kumamoto", value: "熊本県" },
    { key: "oita", value: "大分県" },
    { key: "miyazaki", value: "宮崎県" },
    { key: "kagoshima", value: "鹿児島県" },
    { key: "okinawa", value: "沖縄県" },
  ];

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
      showErrorToast(t("toasts.invalidTitle"), t("toasts.invalidMessage"));
      console.log("Validation failed", currentErrors);
      return;
    }

    popup({
      title: t("confirm.title"),
      text: t("confirm.message"),
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

  const resolveError = (message?: string) => {
    if (!message) return "";
    return message.startsWith("errors.") ? t(message) : message;
  };

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-custom">{t("loading")}</div>
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
                  <small className="text-danger">{resolveError(errors.company_name)}</small>
                )}
              </div>

              <div className="field-reg">
                <label>
                  {t("labels.prefecture")} <span className="text-danger">*</span>
                </label>
                <select
                  name="company_pref"
                  value={form.company_pref}
                  onChange={handleChange}
                >
                  <option value="">{t("selectPlaceholder")}</option>
                  {prefectureOptions.map((prefecture) => (
                    <option key={prefecture.key} value={prefecture.value}>
                      {t(`prefectures.${prefecture.key}`)}
                    </option>
                  ))}
                </select>
                {errors.company_pref && (
                  <small className="text-danger">{resolveError(errors.company_pref)}</small>
                )}
              </div>

              <div className="field-reg">
                <label>
                  {t("labels.contactName")} <span className="text-danger">*</span>
                </label>
                <input
                  name="contact_name"
                  placeholder={t("placeholders.contactName")}
                  value={form.contact_name}
                  onChange={handleChange}
                />
                {errors.contact_name && (
                  <small className="text-danger">{resolveError(errors.contact_name)}</small>
                )}
              </div>

              <div className="field-reg">
                <label>{t("labels.contactTitle")}</label>
                <input
                  name="job_title"
                  value={form.job_title}
                  onChange={handleChange}
                  placeholder={t("placeholders.jobTitle")}
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
                  <small className="text-danger">{resolveError(errors.phone)}</small>
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
                  <small className="text-danger">{resolveError(errors.email)}</small>
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

            <div className="section-title-reg">{t("sections.hiringNeeds")}</div>

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
                  <span>{t("needsOptions.overseasNew")}</span>
                </label>
                <label className="pill">
                  <input
                    type="checkbox"
                    name="needs"
                    value="domestic_change"
                    checked={form.needs.includes("domestic_change")}
                    onChange={handleChange}
                  />
                  <span>{t("needsOptions.domesticChange")}</span>
                </label>
                <label className="pill">
                  <input
                    type="checkbox"
                    name="needs"
                    value="both"
                    checked={form.needs.includes("both")}
                    onChange={handleChange}
                  />
                  <span>{t("needsOptions.both")}</span>
                </label>
                <label className="pill">
                  <input
                    type="checkbox"
                    name="needs"
                    value="consult"
                    checked={form.needs.includes("consult")}
                    onChange={handleChange}
                  />
                  <span>{t("needsOptions.consult")}</span>
                </label>
                {errors.needs && (
                  <small className="text-danger">{resolveError(errors.needs)}</small>
                )}
              </div>

              <div className="hint">{t("needsHint")}</div>
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
                  <small className="text-danger">{resolveError(errors.role)}</small>
                )}
              </div>

              <div className="field-reg">
                <label>{t("labels.visa")}</label>
                <select
                  name="visa_type"
                  value={form.visa_type}
                  onChange={handleChange}
                >
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("visaOptions.ssw")}</option>
                  <option>{t("visaOptions.titp")}</option>
                  <option>{t("visaOptions.gijinkoku")}</option>
                  <option>{t("visaOptions.student")}</option>
                  <option>{t("visaOptions.unknown")}</option>
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
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("headcountOptions.one")}</option>
                  <option>{t("headcountOptions.two")}</option>
                  <option>{t("headcountOptions.three")}</option>
                  <option>{t("headcountOptions.fourFive")}</option>
                  <option>{t("headcountOptions.sixTen")}</option>
                  <option>{t("headcountOptions.tenPlus")}</option>
                </select>
                {errors.head_count && (
                  <small className="text-danger">{resolveError(errors.head_count)}</small>
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
                <div className="hint">{t("preferredNationalityHint")}</div>
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
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("employmentOptions.fullTime")}</option>
                  <option>{t("employmentOptions.contract")}</option>
                  <option>{t("employmentOptions.dispatch")}</option>
                  <option>{t("employmentOptions.partTime")}</option>
                  <option>{t("employmentOptions.shift")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.salary")}</label>
                <input
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder={t("placeholders.salary")}
                />
              </div>

              <div className="field-reg">
                <label>{t("labels.jpLevel")}</label>
                <select
                  name="jp_level"
                  value={form.jp_level}
                  onChange={handleChange}
                >
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("jpLevelOptions.n5")}</option>
                  <option>{t("jpLevelOptions.n4")}</option>
                  <option>{t("jpLevelOptions.n3")}</option>
                  <option>{t("jpLevelOptions.n2")}</option>
                  <option>{t("jpLevelOptions.n1")}</option>
                  <option>{t("jpLevelOptions.any")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.experience")}</label>
                <select
                  name="experience_need"
                  value={form.experience_need}
                  onChange={handleChange}
                >
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("experienceOptions.required")}</option>
                  <option>{t("experienceOptions.preferred")}</option>
                  <option>{t("experienceOptions.ok")}</option>
                  <option>{t("experienceOptions.consult")}</option>
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
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("housingOptions.dorm")}</option>
                  <option>{t("housingOptions.company")}</option>
                  <option>{t("housingOptions.allowance")}</option>
                  <option>{t("housingOptions.none")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.shuttle")}</label>
                <select
                  name="shuttle"
                  value={form.shuttle}
                  onChange={handleChange}
                >
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("yesNoOptions.yes")}</option>
                  <option>{t("yesNoOptions.no")}</option>
                  <option>{t("yesNoOptions.consult")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.interviewMethod")}</label>
                <select
                  name="interview_method"
                  value={form.interview_method}
                  onChange={handleChange}
                >
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("interviewOptions.online")}</option>
                  <option>{t("interviewOptions.local")}</option>
                  <option>{t("interviewOptions.either")}</option>
                </select>
              </div>

              <div className="field-reg">
                <label>{t("labels.acceptConfirm")}</label>
                <select
                  name="accept_confirm"
                  value={form.accept_confirm}
                  onChange={handleChange}
                >
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("acceptOptions.yes")}</option>
                  <option>{t("acceptOptions.maybe")}</option>
                  <option>{t("acceptOptions.consult")}</option>
                </select>
                <div className="hint">{t("acceptHint")}</div>
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
                  <option value="">{t("selectPlaceholder")}</option>
                  <option>{t("contactMethodOptions.phone")}</option>
                  <option>{t("contactMethodOptions.email")}</option>
                  <option>{t("contactMethodOptions.online")}</option>
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
