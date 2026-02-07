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

const ApproachJobSeekerPage = () => {
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
          ? "Email is required."
          : isEmailValid(value.trim())
            ? ""
            : "Enter a valid email address.",
      }));
    }
    if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: !value.trim()
          ? "Phone number is required."
          : value.trim().length >= 7
            ? ""
            : "Enter a valid phone number.",
      }));
    }
  };

  const validateForm = () => {
    const nextErrors: { [name: string]: string } = {};

    if (!data.basicInfo.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }
    if (!data.basicInfo.dateOfBirth.trim()) {
      nextErrors.dateOfBirth = "Date of birth is required.";
    }
    if (!data.basicInfo.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (data.basicInfo.phone.trim().length < 7) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!data.basicInfo.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isEmailValid(data.basicInfo.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!data.preferences.preferredArea.trim()) {
      nextErrors.preferredArea = "Preferred area is required.";
    }
    if (!data.preferences.preferredJobRole.trim()) {
      nextErrors.preferredJobRole = "Preferred job/role is required.";
    }
    if (!data.preferences.futureGoals.trim()) {
      nextErrors.futureGoals = "Future goals are required.";
    }

    if (!data.currentJob.companyNameOrIndustry.trim()) {
      nextErrors.currentWorkplace = "Current workplace is required.";
    }
    if (!data.currentJob.jobDuties.trim()) {
      nextErrors.jobDuties = "Job duties are required.";
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
        title: "Application Submitted",
        text: "Your application has been submitted successfully.",
      });
      dispatch(resetApproachJobSeekerState());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your application. Please try again later.",
      });
      console.error("Error submitting form:", error);
      showErrorToast("Error", "Failed to submit application");
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
          <div className="spinner-custom">Processing... Please wait</div>
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
              For Job Seekers | Direct Approach (Consultation / Urgent Support)
            </h1>
            <p className="lead">
              This form is for people looking for a job. Please enter your
              preferences, current job details, and your future goals
              (consultation only is OK).
            </p>
          </div>
          <Form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
            <p className="section-title-reg">1) Basic Information</p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="field-reg" controlId="approach-fullName">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Full Name (Required) <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    className="py-2"
                    placeholder="e.g. Juan Dela Cruz"
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
                    Nationality
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g. Philippines / Japan"
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
                    Date of birth (Required)
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
                    Phone (Required) <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. +81-90-xxxx-xxxx"
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
                    Email (Required) <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    type="email"
                    placeholder="example@email.com"
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
                    Japanese level
                  </label>
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
                    <option value="None">
                      No certificate (conversational)
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-visaStatus"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Visa status (if known)
                  </label>
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
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <p className="section-title-reg">
              2) Job Preferences (Required)
              <span className="text-danger">*</span>
            </p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-preferredArea"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Preferred area (Required){" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g., Aichi (Nagoya) / Tokyo / Anywhere"
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
                    Preferred job/role (Required)
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g., Care / Manufacturing / Restaurant / Hospitality"
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
                    Preferred employment type
                  </label>
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
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-desiredSalary"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Desired salary (approx.)
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g., JPY 220,000+/month or JPY 1,200+/hour"
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
                    Your future goals (Required){" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="e.g., Prefer dorm housing. Less overtime. Want a stable long-term company."
                    name="futureGoals"
                    value={data.preferences.futureGoals}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.futureGoals)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.futureGoals}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    *Write what matters most (housing, days off, overtime,
                    location, duties, skill-up, etc.).
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <p className="section-title-reg">
              3) Current Job (Required)<span className="text-danger">*</span>
            </p>

            <Row className="g-3">
              <Col md={6}>
                <Form.Group
                  className="field-reg"
                  controlId="approach-currentWorkplace"
                >
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Current workplace (company or industry) (Required)
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g., Food factory / Restaurant / Hotel"
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
                    Current prefecture
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g., Aichi"
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
                    Job duties (Required)
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="e.g., Food line work (inspection/packing/cleaning) / Kitchen prep, etc."
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
                    When do you want to change jobs?
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g., ASAP / within 1 month / from March"
                    name="jobChangeDate"
                    value={data.currentJob.jobChangeDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="approach-reasonForLeaving">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Reason (optional)
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g., salary, days off, duties, people, commute"
                    name="reasonForLeaving"
                    value={data.currentJob.reasonForLeaving}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <p className="section-title-reg">4) Additional Info (Optional)</p>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="approach-skills">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Skills / certificates
                  </label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="e.g., Care training, forklift, cooking experience"
                    name="skills"
                    value={data.additionalInfo.skills ?? ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="approach-dormPreference">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Dorm preference
                  </label>
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
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <Form.Group controlId="approach-notes">
                  <label style={{ fontWeight: 900, fontSize: "13px" }}>
                    Other notes (optional)
                  </label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="e.g., Contract end date, available interview time, Japanese level, etc."
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
                  Complete the required fields before submitting.
                </small>
              )}
              <button
                className="btn btn-default-custom me-1"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                className="btn btn-primary-custom"
                type="submit"
                disabled={isLoading}
              >
                Submit
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
