"use client";

import "../../../../public/css/employer/registration.css";
import { showErrorToast } from "@/app/(util)/toaster";
import Navbar from "@/components/navbar/Navbar";
import { isEmailValid } from "@/helper/validations";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  approachJobSeekerThunk,
  resetApproachJobSeekerState,
  updateApproachJobSeekerData,
} from "@/redux/slices/approachJobSeekerSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

const ApproachJobSeekerPage = () => {
  const t = useTranslations("registrationJobSeekerPage");
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.approachJobSeeker);

  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [name: string]: string }>({});

  const updateFieldValue = (name: string, value: string) => {
    const updatedData = { ...data };

    switch (name) {
      case "fullName":
      case "nationality":
      case "dateOfBirth":
      case "japaneseLevel":
      case "phone":
      case "email":
      case "visaStatus":
        updatedData.basicInfo = { ...data.basicInfo, [name]: value };
        break;
      case "preferredArea":
      case "preferredJobRole":
      case "preferredEmployment":
      case "futureGoals":
      case "expectedSalary":
        updatedData.preferences = { ...data.preferences, [name]: value };
        break;
      case "currentWorkplace":
        updatedData.currentJob = {
          ...data.currentJob,
          companyNameOrIndustry: value,
        };
        break;
      case "currentPrefecture":
      case "jobDuties":
      case "jobChangeDate":
      case "reasonForLeaving":
        updatedData.currentJob = { ...data.currentJob, [name]: value };
        break;
      case "skills":
        updatedData.additionalInfo = {
          ...data.additionalInfo,
          skills: value,
        };
        break;
      case "dormPreference":
      case "notes":
        updatedData.additionalInfo = { ...data.additionalInfo, [name]: value };
        break;
      default:
        return;
    }

    dispatch(updateApproachJobSeekerData(updatedData));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    updateFieldValue(name, value);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: !value.trim()
          ? t("validation.emailRequired")
          : isEmailValid(value.trim())
            ? ""
            : t("validation.emailInvalid"),
      }));
    }
    if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: !value.trim()
          ? t("validation.phoneRequired")
          : value.trim().length >= 7
            ? ""
            : t("validation.phoneInvalid"),
      }));
    }
  };

  const validateForm = () => {
    const nextErrors: { [name: string]: string } = {};

    if (!data.basicInfo.fullName.trim()) {
      nextErrors.fullName = t("validation.fullNameRequired");
    }
    if (!data.basicInfo.dateOfBirth.trim()) {
      nextErrors.dateOfBirth = t("validation.dateOfBirthRequired");
    }
    if (!data.basicInfo.phone.trim()) {
      nextErrors.phone = t("validation.phoneRequired");
    } else if (data.basicInfo.phone.trim().length < 7) {
      nextErrors.phone = t("validation.phoneInvalid");
    }
    if (!data.basicInfo.email.trim()) {
      nextErrors.email = t("validation.emailRequired");
    } else if (!isEmailValid(data.basicInfo.email.trim())) {
      nextErrors.email = t("validation.emailInvalid");
    }
    if (!data.preferences.preferredArea.trim()) {
      nextErrors.preferredArea = t("validation.preferredAreaRequired");
    }
    if (!data.preferences.preferredJobRole.trim()) {
      nextErrors.preferredJobRole = t("validation.preferredJobRoleRequired");
    }
    if (!data.preferences.futureGoals.trim()) {
      nextErrors.futureGoals = t("validation.futureGoalsRequired");
    }

    if (!data.currentJob.companyNameOrIndustry.trim()) {
      nextErrors.currentWorkplace = t("validation.currentWorkplaceRequired");
    }
    if (!data.currentJob.jobDuties.trim()) {
      nextErrors.jobDuties = t("validation.jobDutiesRequired");
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("1. Submit clicked"); // Debug log

    // 1. Check Validation
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation failed", validationErrors); // Debug log
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const field = formRef.current?.querySelector<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >(`[name="${firstErrorField}"]`);
        field?.focus();
      }
      return;
    }

    if (!formRef.current) return;

    try {
      setIsLoading(true);
      console.log("2. Generating PDF..."); // Debug log

      // generate canvas
      const canvas = await html2canvas(formRef.current, { scale: 1 });
      const imgData = canvas.toDataURL("image/jpeg", 0.7);

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST",
      );

      const blob = pdf.output("blob");

      console.log("3. PDF Generated, preparing FormData..."); // Debug log

      const formData = new FormData();
      formData.append(
        "pdf_file",
        blob,
        `job-seeker-registration-${Date.now()}.pdf`,
      );

      console.log("4. Dispatching Thunk..."); // Debug log

      // 4. Dispatch Thunk
      await dispatch(approachJobSeekerThunk(formData)).unwrap();

      console.log("5. Thunk Success"); // Debug log
      Swal.fire({
        icon: "success",
        title: t("alerts.successTitle"),
        text: t("alerts.successMessage"),
      });
      dispatch(resetApproachJobSeekerState());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("alerts.errorTitle"),
        text: t("alerts.errorMessage"),
      });
      console.error("Error submitting form:", error);
      showErrorToast(t("toasts.errorTitle"), t("toasts.errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    dispatch(resetApproachJobSeekerState());
    setErrors({});
  };

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-custom">{t("loading")}</div>
        </div>
      )}
      <Container
        fluid
        className="p-5"
        id="convertPDF"
        style={{
          background: "linear-gradient(180deg, rgba(47,120,255,.06), #fff)",
        }}
      >
        <Container
          fluid
          ref={formRef}
          className="p-5 bg-white shadow-lg rounded-5"
        >
          <div>
            <h1 className="h1-custom">
              {t("title")}
            </h1>
            <p className="lead">
              {t("lead.line1")}
              {" "}
              {t("lead.line2")}
            </p>
          </div>
          <Form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
            <p className="section-title-reg">{t("sections.basicInfo")}</p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="field-reg" controlId="approach-fullName">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.fullName")} <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    className="py-2"
                    placeholder={t("placeholders.fullName")}
                    name="fullName"
                    type="text"
                    value={data.basicInfo.fullName}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.fullName)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-nationality"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.nationality")}
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.nationality")}
                    name="nationality"
                    value={data.basicInfo.nationality}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-dateOfBirth"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.dateOfBirth")}
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={data.basicInfo.dateOfBirth}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.dateOfBirth)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateOfBirth}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="field-reg" controlId="approach-phone">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.phone")} <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder={t("placeholders.phone")}
                    name="phone"
                    value={data.basicInfo.phone}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.phone)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="field-reg" controlId="approach-email">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.email")} <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    type="email"
                    placeholder={t("placeholders.email")}
                    name="email"
                    value={data.basicInfo.email}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-japaneseLevel"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.japaneseLevel")}
                  </label>
                  <Form.Select
                    name="japaneseLevel"
                    value={data.basicInfo.japaneseLevel}
                    onChange={handleChange}
                  >
                    <option value="">{t("selectPlaceholder")}</option>
                    <option value="N1">{t("options.japaneseLevel.n1")}</option>
                    <option value="N2">{t("options.japaneseLevel.n2")}</option>
                    <option value="N3">{t("options.japaneseLevel.n3")}</option>
                    <option value="N4">{t("options.japaneseLevel.n4")}</option>
                    <option value="N5">{t("options.japaneseLevel.n5")}</option>
                    <option value="None">{t("options.japaneseLevel.none")}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-visaStatus"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.visaStatus")}
                  </label>
                  <Form.Select
                    name="visaStatus"
                    value={data.basicInfo.visaStatus}
                    onChange={handleChange}
                  >
                    <option value="">{t("selectPlaceholder")}</option>
                    <option value="ssw">{t("options.visaStatus.ssw")}</option>
                    <option value="training">{t("options.visaStatus.training")}</option>
                    <option value="services">{t("options.visaStatus.services")}</option>
                    <option value="student">{t("options.visaStatus.student")}</option>
                    <option value="dependent">{t("options.visaStatus.dependent")}</option>
                    <option value="permanent">{t("options.visaStatus.permanent")}</option>
                    <option value="notSure">{t("options.visaStatus.notSure")}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <p className="section-title-reg">
              {t("sections.jobPreferences")}
              <span className="text-danger">*</span>
            </p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-preferredArea"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.preferredArea")}{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.preferredArea")}
                    name="preferredArea"
                    value={data.preferences.preferredArea}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.preferredArea)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.preferredArea}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-preferredJobRole"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.preferredJobRole")}
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.preferredJobRole")}
                    name="preferredJobRole"
                    value={data.preferences.preferredJobRole}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.preferredJobRole)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.preferredJobRole}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-preferredEmployment"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.preferredEmployment")}
                  </label>
                  <Form.Select
                    className="py-2"
                    name="preferredEmployment"
                    value={data.preferences.preferredEmployment}
                    onChange={handleChange}
                  >
                    <option value="">{t("selectPlaceholder")}</option>
                    <option value="full">{t("options.preferredEmployment.full")}</option>
                    <option value="contract">{t("options.preferredEmployment.contract")}</option>
                    <option value="dispatch">{t("options.preferredEmployment.dispatch")}</option>
                    <option value="part">{t("options.preferredEmployment.part")}</option>
                    <option value="shift">{t("options.preferredEmployment.shift")}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-desiredSalary"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.desiredSalary")}
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.desiredSalary")}
                    name="expectedSalary"
                    value={data.preferences.expectedSalary}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <Form.Group
                  className="field-reg"
                  controlId="approach-futureGoals"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.futureGoals")}{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder={t("placeholders.futureGoals")}
                    name="futureGoals"
                    value={data.preferences.futureGoals}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.futureGoals)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.futureGoals}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    {t("helpers.futureGoals")}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <p className="section-title-reg">
              {t("sections.currentJob")}
              <span className="text-danger">*</span>
            </p>

            <Row className="g-3">
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-currentWorkplace"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.currentWorkplace")}
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.currentWorkplace")}
                    name="currentWorkplace"
                    value={data.currentJob.companyNameOrIndustry}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.currentWorkplace)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.currentWorkplace}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-currentPrefecture"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.currentPrefecture")}
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.currentPrefecture")}
                    name="currentPrefecture"
                    value={data.currentJob.currentPrefecture}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <Form.Group
                  className="field-reg"
                  controlId="approach-jobDuties"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.jobDuties")}
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder={t("placeholders.jobDuties")}
                    name="jobDuties"
                    value={data.currentJob.jobDuties}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.jobDuties)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.jobDuties}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-jobChangeDate"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.jobChangeDate")}
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.jobChangeDate")}
                    name="jobChangeDate"
                    value={data.currentJob.jobChangeDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="approach-reasonForLeaving">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.reasonForLeaving")}
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.reasonForLeaving")}
                    name="reasonForLeaving"
                    value={data.currentJob.reasonForLeaving}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <p className="section-title-reg">{t("sections.additionalInfo")}</p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="approach-skills">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.skills")}
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder={t("placeholders.skills")}
                    name="skills"
                    value={data.additionalInfo.skills ?? ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="approach-dormPreference">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.dormPreference")}
                  </label>
                  <Form.Select
                    className="py-2"
                    name="dormPreference"
                    value={data.additionalInfo.dormPreference ?? ""}
                    onChange={handleChange}
                  >
                    <option value="">{t("selectPlaceholder")}</option>
                    <option value="need">{t("options.dormPreference.need")}</option>
                    <option value="prefer">{t("options.dormPreference.prefer")}</option>
                    <option value="no">{t("options.dormPreference.no")}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <Form.Group controlId="approach-notes">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    {t("labels.notes")}
                  </label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder={t("placeholders.notes")}
                    name="notes"
                    value={data.additionalInfo.notes}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div
              className="d-flex flex-wrap justify-content-end gap-2"
              id="pdfButtons"
            >
              {Object.values(errors).some(Boolean) && (
                <small className="text-danger me-auto">
                  {t("helpers.completeRequired")}
                </small>
              )}
              <button
                className="btn btn-default-custom me-1"
                type="button"
                onClick={handleClear}
              >
                {t("buttons.clear")}
              </button>
              <button
                className="btn btn-primary-custom"
                type="submit"
                disabled={isLoading}
              >
                {t("buttons.submit")}
              </button>
            </div>
          </Form>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default ApproachJobSeekerPage;
