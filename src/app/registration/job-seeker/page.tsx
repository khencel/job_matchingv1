"use client";

import Navbar from "@/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  approachJobSeekerThunk,
  resetApproachJobSeekerState,
  updateApproachJobSeekerData,
} from "@/redux/slices/approachJobSeekerSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";
import { Col, Container, Form, Row, Alert } from "react-bootstrap";

type FormFieldKey =
  | "fullName"
  | "nationality"
  | "dateOfBirth"
  | "phone"
  | "email"
  | "japaneseLevel"
  | "visaStatus"
  | "preferredArea"
  | "preferredJobRole"
  | "preferredEmployment"
  | "desiredSalary"
  | "futureGoals"
  | "currentWorkplace"
  | "currentPrefecture"
  | "jobDuties"
  | "jobChangeDate"
  | "reasonForLeaving"
  | "skills"
  | "dormPreference"
  | "notes";

type FormErrors = Partial<Record<FormFieldKey, string>>;

const ApproachJobSeekerPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data } = useAppSelector((state) => state.approachJobSeeker);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    const key = name as FormFieldKey;

    switch (key) {
      case "fullName":
      case "nationality":
      case "dateOfBirth":
      case "phone":
      case "email":
      case "japaneseLevel":
      case "visaStatus":
        dispatch(
          updateApproachJobSeekerData({
            basicInfo: {
              ...data.basicInfo,
              [key === "phone" ? "contactNumber" : key]: value,
            },
          }),
        );
        break;
      case "preferredArea":
      case "preferredJobRole":
      case "preferredEmployment":
      case "desiredSalary":
      case "futureGoals":
        dispatch(
          updateApproachJobSeekerData({
            preferences: {
              ...data.preferences,
              [key === "desiredSalary" ? "expectedSalary" : key]: value,
            },
          }),
        );
        break;
      case "currentWorkplace":
      case "currentPrefecture":
      case "jobDuties":
      case "jobChangeDate":
      case "reasonForLeaving":
        dispatch(
          updateApproachJobSeekerData({
            currentJob: {
              ...data.currentJob,
              [key === "currentWorkplace" ? "companyNameOrIndustry" : key]:
                value,
            },
          }),
        );
        break;
      case "skills":
      case "dormPreference":
      case "notes":
        dispatch(
          updateApproachJobSeekerData({
            additionalInfo: {
              ...data.additionalInfo,
              [key === "skills" ? "skills" : key]:
                key === "skills"
                  ? value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean)
                  : value,
            },
          }),
        );
        break;
      default:
        break;
    }

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!data.basicInfo.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!data.basicInfo.dateOfBirth.trim())
      newErrors.dateOfBirth = "Date of birth is required.";
    if (!data.basicInfo.contactNumber.trim())
      newErrors.phone = "Phone is required.";
    if (!data.basicInfo.email.trim()) newErrors.email = "Email is required.";
    if (!data.preferences.preferredArea.trim())
      newErrors.preferredArea = "Preferred area is required.";
    if (!data.preferences.preferredJobRole.trim())
      newErrors.preferredJobRole = "Preferred job/role is required.";
    if (!data.preferences.futureGoals.trim())
      newErrors.futureGoals = "Future goals are required.";
    if (!data.currentJob.companyNameOrIndustry.trim())
      newErrors.currentWorkplace = "Current workplace is required.";
    if (!data.currentJob.jobDuties.trim())
      newErrors.jobDuties = "Job duties are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    if (buttons) buttons.style.display = "flex";

    return pdf.output("blob");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const pdfBlob = await generatePDFBlob();
      if (!pdfBlob) {
        setSubmitError("PDF generation failed. Please try again.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append(
        "pdf_file",
        pdfBlob,
        `approach-job-seeker-${Date.now()}.pdf`,
      );

      await dispatch(approachJobSeekerThunk(formDataToSend));
    } catch (error) {
      console.log(error);
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    dispatch(resetApproachJobSeekerState());
    setErrors({});
    setSubmitError(null);
  };
  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-custom">Processing... Please wait</div>
        </div>
      )}
      <Container fluid className="p-5" id="convertPDF">
        <Container fluid className="p-4 bg-white mt-5 shadow-lg rounded-5">
          <div>
            <h2 className="fs-2 fw-bold">
              For Job Seekers | Direct Approach (Consultation / Urgent Support)
            </h2>
            <p className="small text-muted">
              This form is for people looking for a job. Please enter your
              preferences, current job details, and your future goals
              (consultation only is OK).
            </p>
          </div>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
            <p className="fs-6 fw-bold">1) Basic Information</p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Full Name (Required)
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g. Juan Dela Cruz"
                  name="fullName"
                  value={data.basicInfo.fullName}
                  onChange={handleChange}
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">Nationality</Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g. Philippines / Japan"
                  name="nationality"
                  value={data.basicInfo.nationality}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Date of birth (Required)
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={data.basicInfo.dateOfBirth}
                  onChange={handleChange}
                  isInvalid={!!errors.dateOfBirth}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dateOfBirth}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Phone (Required)
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. +81-90-xxxx-xxxx"
                  name="phone"
                  value={data.basicInfo.contactNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Email (Required)
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={data.basicInfo.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Japanese level
                </Form.Label>
                <Form.Select
                  name="japaneseLevel"
                  value={data.basicInfo.japaneseLevel}
                  onChange={handleChange}
                >
                  <option value="">Please select</option>
                  <option value="N1">N1</option>
                  <option value="N2">N2</option>
                  <option value="N3">N3</option>
                  <option value="N4">N4</option>
                  <option value="N5">N5</option>
                  <option value="None">No certificate (conversational)</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Visa status (if known)
                </Form.Label>
                <Form.Select
                  name="visaStatus"
                  value={data.basicInfo.visaStatus}
                  onChange={handleChange}
                >
                  <option value="">Please select</option>
                  <option value="ssw">Specified Skill Worker (SSW)</option>
                  <option value="training">Technical Intern Training</option>
                  <option value="services">
                    Engineer/Specialist in Humanities/Int{"`"}l Services
                  </option>
                  <option value="student">Student</option>
                  <option value="dependent">Dependent</option>
                  <option value="permanent">Permanent/Long-term</option>
                  <option value="notSure">Not-sure(consult)</option>
                </Form.Select>
              </Col>
            </Row>
            <hr />
            <p className="fs-6 fw-bold">2) Job Preferences (Required)</p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Preferred area (Required)
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g., Aichi (Nagoya) / Tokyo / Anywhere"
                  name="preferredArea"
                  value={data.preferences.preferredArea}
                  onChange={handleChange}
                  isInvalid={!!errors.preferredArea}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.preferredArea}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Preferred job/role (Required)
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g., Care / Manufacturing / Restaurant / Hospitality"
                  name="preferredJobRole"
                  value={data.preferences.preferredJobRole}
                  onChange={handleChange}
                  isInvalid={!!errors.preferredJobRole}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.preferredJobRole}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Preferred employment type
                </Form.Label>
                <Form.Select
                  className="py-2"
                  name="preferredEmployment"
                  value={data.preferences.preferredEmployment}
                  onChange={handleChange}
                >
                  <option value="">Please select</option>
                  <option value="full">Full-time</option>
                  <option value="contract">Contract</option>
                  <option value="dispatch">Dispatch</option>
                  <option value="part">Part-time</option>
                  <option value="shift">Shift</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Desired salary (approx.)
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g., JPY 220,000+/month or JPY 1,200+/hour"
                  name="desiredSalary"
                  value={
                    data.preferences.expectedSalary !== null &&
                    data.preferences.expectedSalary !== undefined
                      ? String(data.preferences.expectedSalary)
                      : ""
                  }
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <Form.Label className="fw-bold small">
                  Your future goals (Required)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="e.g., Prefer dorm housing. Less overtime. Want a stable long-term company."
                  name="futureGoals"
                  value={data.preferences.futureGoals}
                  onChange={handleChange}
                  isInvalid={!!errors.futureGoals}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.futureGoals}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  *Write what matters most (housing, days off, overtime,
                  location, duties, skill-up, etc.).
                </Form.Text>
              </Col>
            </Row>
            <hr />
            <p className="fs-6 fw-bold">3) Current Job (Required)</p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Current workplace (company or industry) (Required)
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g., Food factory / Restaurant / Hotel"
                  name="currentWorkplace"
                  value={data.currentJob.companyNameOrIndustry}
                  onChange={handleChange}
                  isInvalid={!!errors.currentWorkplace}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.currentWorkplace}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Current prefecture
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g., Aichi"
                  name="currentPrefecture"
                  value={data.currentJob.currentPrefecture}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <Form.Label className="fw-bold small">
                  Job duties (Required)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="e.g., Food line work (inspection/packing/cleaning) / Kitchen prep, etc."
                  name="jobDuties"
                  value={data.currentJob.jobDuties}
                  onChange={handleChange}
                  isInvalid={!!errors.jobDuties}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.jobDuties}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  When do you want to change jobs?
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g., ASAP / within 1 month / from March"
                  name="jobChangeDate"
                  value={data.currentJob.jobChangeDate}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Reason (optional)
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g., salary, days off, duties, people, commute"
                  name="reasonForLeaving"
                  value={data.currentJob.reasonForLeaving}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <hr />
            <p className="fs-6 fw-bold">4) Additional Info (Optional)</p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Skills / certificates
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  placeholder="e.g., Care training, forklift, cooking experience"
                  name="skills"
                  value={
                    Array.isArray(data.additionalInfo.skills)
                      ? data.additionalInfo.skills.join(", ")
                      : (data.additionalInfo.skills ?? "")
                  }
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Dorm preference
                </Form.Label>
                <Form.Select
                  className="py-2"
                  name="dormPreference"
                  value={data.additionalInfo.dormPreference ?? ""}
                  onChange={handleChange}
                >
                  <option value="">Please select</option>
                  <option value="need">Need dorm</option>
                  <option value="prefer">Dorm preferred</option>
                  <option value="no">Not needed</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <Form.Label className="fw-bold small">
                  Other notes (optional)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="e.g., Contract end date, available interview time, Japanese level, etc."
                  name="notes"
                  value={data.additionalInfo.notes}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <div
              className="d-flex flex-wrap justify-content-end gap-2"
              id="pdfButtons"
            >
              <button
                className="btn btn-outline-primary fw-bold"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                className="btn btn-primary fw-bold"
                type="submit"
                disabled={isLoading}
              >
                Submit (demo)
              </button>
            </div>
          </Form>
        </Container>
      </Container>
    </>
  );
};

export default ApproachJobSeekerPage;
