"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChangeEvent, useRef, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { isPhoneNumberValid } from "@/helper/validations";
import { RegisterEmployerStep2Data } from "@/types/employer";
import {
  goNextStep,
  saveRegEmployerStep2,
} from "@/redux/slices/register/employer/employerSlice";

// Industry options for dropdown
export const industries = [
  "Tech & IT",
  "Creative & Design",
  "Business & Office",
  "Sales & Marketing",
  "Finance & Accounting",
  "E-commerce & Retail",
  "Education & Training",
  "Healthcare",
  "Skilled Trades",
  "Logistics & Transportation",
  "Hospitality & Tourism",
  "Customer Service & BPO",
  "Construction & Engineering",
  "Legal & Compliance",
  "Others / General",
];

// Japan regions for dropdown
const japanRegions = [
  "Hokkaido",
  "Tohoku",
  "Kanto",
  "Chubu",
  "Kansai",
  "Chugoku",
  "Shikoku",
  "Kyushu",
  "Okinawa",
];

export default function RegisterEmployerStep2() {
  const dispatch = useAppDispatch();
  // i18n for labels/placeholders in Step 2
  const t = useTranslations("registerEmployerStep2");
  const tExtended = useTranslations("registerEmployerStep2Extended");
  const employerInfo = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.company_information,
  );

  // State management for form inputs and validation
  const [currentBranch, setCurrentBranch] = useState<string>("");
  const [currentIndustry, setCurrentIndustry] = useState<string>("");
  const [error, setError] = useState<{ [name: string]: boolean }>({});
  const [data, setData] = useState<RegisterEmployerStep2Data>(employerInfo);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const branchInputRef = useRef<HTMLInputElement>(null);
  const industrySelectRef = useRef<HTMLSelectElement>(null);

  // Handle input changes and update Redux store
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // Clear error for the field on change
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));

    // Normalize numeric fields: drop leading zeroes like "01" -> "1" for fee/appealPoints
    const normalizedValue =
      name === "appeal_point" || name === "fee" || name === "no_of_emp"
        ? value.replace(/^0+(?=\d)/, "")
        : value;

    // update data
    const updatedData = {
      ...data,
      [name]: normalizedValue,
    };

    setData(updatedData);
    dispatch(saveRegEmployerStep2(updatedData));
  };

  // Add branch office to the list
  const handleAddBranch = () => {
    if (currentBranch.trim() !== "") {
      const updatedData = {
        ...data,
        branch_office: [...data.branch_office, currentBranch],
      };
      setData(updatedData);
      dispatch(saveRegEmployerStep2(updatedData));
      setCurrentBranch("");
      setError((prevErrors) => ({ ...prevErrors, branch_office: false }));
    }
  };

  // Remove branch office from the list
  const handleRemoveBranch = (index: number) => {
    setData({
      ...data,
      branch_office: data.branch_office.filter((_, i) => i !== index),
    });
  };

  // Add industry to the list
  const handleAddIndustry = () => {
    if (
      currentIndustry.trim() !== "" &&
      !data.company_industry.includes(currentIndustry)
    ) {
      const updatedData = {
        ...data,
        company_industry: [...data.company_industry, currentIndustry],
      };
      setData(updatedData);
      dispatch(saveRegEmployerStep2(updatedData));
      setCurrentIndustry("");
      setError((prevErrors) => ({ ...prevErrors, company_industry: false }));
    }
  };

  // Remove industry from the list
  const handleRemoveIndustry = (index: number) => {
    setData({
      ...data,
      company_industry: data.company_industry.filter((_, i) => i !== index),
    });
  };

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const form = e.currentTarget as HTMLFormElement;

    // First validation: Check HTML5 form validity
    if (form.checkValidity() === false) {
      e.stopPropagation();

      const invalidFields = form.querySelectorAll(":invalid");
      const newErrors: Record<string, boolean> = {};

      invalidFields.forEach((field) => {
        const input = field as HTMLInputElement;
        if (input.name) {
          newErrors[input.name] = true;
        }
      });
      setError(newErrors);

      // Find and focus on first invalid field
      const firstInvalidField = form.querySelector(":invalid") as HTMLElement;
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    let hasError = false;
    const validationErrors: Record<string, boolean> = {};

    // Validate company name
    if (!data.name || data.name.trim().length < 2) {
      validationErrors.name = true;
      hasError = true;
    }

    // Validate company address
    if (!data.address || data.address.trim().length < 2) {
      validationErrors.address = true;
      hasError = true;
    }

    // Validate phone number
    if (!data.phone || !isPhoneNumberValid(data.phone.trim())) {
      validationErrors.phone = true;
      hasError = true;
    }

    // Validate industries
    if (!data.company_industry || data.company_industry.length === 0) {
      validationErrors.company_industry = true;
      hasError = true;
    }

    // Validate regions
    if (!data.region) {
      validationErrors.region = true;
      hasError = true;
    }

    // Validate number of employees
    const numEmployeesNum = Number(data.no_of_emp);
    if (!data.no_of_emp || numEmployeesNum < 1) {
      validationErrors.no_of_emp = true;
      hasError = true;
    }

    // Validate appeal points
    const appealPointsNum = Number(data.appeal_point);
    if (appealPointsNum <= 0) {
      validationErrors.appeal_point = true;
      hasError = true;
    }

    if (data.founded <= 1000 || data.founded > new Date().getFullYear()) {
      validationErrors.founded = true;
      hasError = true;
    }

    if (!data.profile || data.profile.length < 5) {
      validationErrors.profile = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);

      if (validationErrors.company_industry) {
        setTimeout(() => industrySelectRef.current?.focus(), 0);
      } else {
        const firstErrorField = Object.keys(validationErrors)[0];
        const errorElement = form.querySelector(
          `[name="${firstErrorField}"]`,
        ) as HTMLElement | null;
        errorElement?.focus();
      }
      return;
    }
    setError({});
    setIsSubmitted(false);
    Swal.fire({
      icon: "success",
      title: t("alerts.submitted"),
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });

    dispatch(saveRegEmployerStep2(data));
    dispatch(goNextStep(3));
  };

  const showIndustryError =
    error.company_industry ||
    (isSubmitted && data.company_industry.length === 0);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h4 className="mb-5 text-center">{t("title")}</h4>

      {/* Basic Information Section */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.basicInfo")}</h6>

        {/* Company Name Field */}
        <Form.Group className="mb-3" controlId="companyName">
          <Form.Label>{t("labels.companyName")}</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder={t("placeholders.enterCompanyName")}
            value={data.name}
            onChange={handleChange}
            isInvalid={
              error.name ||
              (data.name.trim().length < 2 && data.name.trim().length > 0)
            }
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidCompanyName")}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Company Address Field */}
        <Form.Group className="mb-3" controlId="companyAddress">
          <Form.Label>{t("labels.companyAddress")}</Form.Label>
          <Form.Control
            required
            type="text"
            name="address"
            placeholder={t("placeholders.enterCompanyAddress")}
            value={data.address}
            onChange={handleChange}
            isInvalid={
              error.address ||
              (data.address.trim().length < 2 && data.address.trim().length > 0)
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidCompanyAddress")}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone Number Field */}
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>{t("labels.phoneNumber")}</Form.Label>
          <Form.Control
            required
            type="tel"
            name="phone"
            placeholder={t("placeholders.enterPhoneNumber")}
            value={data.phone}
            onChange={handleChange}
            isInvalid={
              error.phone ||
              (data.phone.trim().length > 0 && !isPhoneNumberValid(data.phone))
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidPhoneNumber")}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* Company Industry Section */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.companyIndustry")}</h6>
        <Form.Group controlId="company_industry">
          <Form.Label>{t("labels.industry")}</Form.Label>
          <Row>
            <Col xs={9}>
              <Form.Select
                name="current_industry"
                ref={industrySelectRef}
                value={currentIndustry}
                onChange={(e) => {
                  setCurrentIndustry(e.target.value);
                  setError((prevErrors) => ({
                    ...prevErrors,
                    company_industry: false,
                  }));
                }}
                isInvalid={showIndustryError}
              >
                <option value="">{t("placeholders.selectIndustry")}</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {t("errors.invalidIndustry")}
              </Form.Control.Feedback>
            </Col>
            <Col xs={3}>
              <Button
                disabled={
                  currentIndustry === "" ||
                  data.company_industry.includes(currentIndustry)
                }
                variant="outline-primary"
                type="button"
                onClick={handleAddIndustry}
                className="w-100"
              >
                {t("buttons.add")}
              </Button>
            </Col>
          </Row>

          {/* Display Added Industries */}
          {data.company_industry.length > 0 && (
            <div className="mt-3">
              <p className="text-muted small mb-2">
                {t("labels.selectedIndustries")}
              </p>
              {data.company_industry.map((industry, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
                >
                  <span>{industry}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    type="button"
                    onClick={() => handleRemoveIndustry(index)}
                  >
                    {t("buttons.remove")}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Form.Group>
      </div>

      {/* Regions Section */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.regions")}</h6>
        <Form.Group controlId="regions">
          <Form.Label>{t("labels.region")}</Form.Label>
          <Form.Select
            required
            name="region"
            value={data.region}
            onChange={handleChange}
            isInvalid={error.region || data.region.length < 0}
          >
            <option value="">{t("placeholders.selectRegion")}</option>
            {japanRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidRegion")}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* Organizational Information Section */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.orgInfo")}</h6>

        {/* Number of Employees Field */}
        <Form.Group className="mb-3" controlId="numberOfEmployees">
          <Form.Label>{t("labels.numEmployees")}</Form.Label>
          <Form.Control
            required
            type="number"
            name="no_of_emp"
            placeholder={t("placeholders.enterNumEmployees")}
            value={data.no_of_emp}
            onChange={handleChange}
            isInvalid={error.no_of_emp || data.no_of_emp < 0}
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidNumOfEmployees")}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Branch Offices Input Section */}
        <Form.Group className="mb-3" controlId="branchOffices">
          <Form.Label>{t("labels.branchOffices")}</Form.Label>
          <Row>
            <Col xs={9}>
              <Form.Control
                type="text"
                ref={branchInputRef}
                placeholder={t("labels.branchOfficePlaceholder")}
                value={currentBranch}
                onChange={(e) => {
                  setCurrentBranch(e.target.value);
                  setError((prevErrors) => ({
                    ...prevErrors,
                    branch_office: false,
                  }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBranch();
                  }
                }}
              />
            </Col>
            <Col xs={3}>
              <Button
                disabled={
                  currentBranch.trim() === "" || currentBranch.length < 2
                }
                variant="outline-primary"
                type="button"
                onClick={handleAddBranch}
                className="w-100"
              >
                {t("buttons.add")}
              </Button>
            </Col>
          </Row>

          {/* Display Added Branch Offices */}
          {data.branch_office.length > 0 && (
            <div className="mt-3">
              <p className="text-muted small mb-2">
                {t("labels.branchOfficesList")}
              </p>
              {data.branch_office.map((branch, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
                >
                  <span>{branch}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    type="button"
                    onClick={() => handleRemoveBranch(index)}
                  >
                    {t("buttons.remove")}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Form.Group>
      </div>

      {/* PR Information Section */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.prInfo")}</h6>

        {/* Appeal Points Field */}
        <Form.Group className="mb-3" controlId="appealPoints">
          <Form.Label>{t("labels.appealPoints")}</Form.Label>
          <Form.Control
            required
            type="text"
            name="appeal_point"
            placeholder={t("placeholders.enterAppealPoints")}
            value={data.appeal_point}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            isInvalid={error.appeal_point}
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.fillRequired")}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Founded Date */}
        <Form.Group className="mb-3" controlId="founded">
          <Form.Label>
            {tExtended("additionalFields.foundedYear.label")}
          </Form.Label>
          <Form.Control
            required
            type="number"
            name="founded"
            placeholder={tExtended("additionalFields.foundedYear.placeholder")}
            value={data.founded}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            isInvalid={
              error.founded || (data.founded > 0 && data.founded <= 1000)
            }
          />
          <Form.Control.Feedback type="invalid">
            {tExtended("additionalFields.foundedYear.error")}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Company Profile */}
        <Form.Group className="mb-3" controlId="profile">
          <Form.Label>
            {tExtended("additionalFields.companyProfile.label")}
          </Form.Label>
          <Form.Control
            required
            type="text"
            as="textarea"
            name="profile"
            placeholder={tExtended(
              "additionalFields.companyProfile.placeholder",
            )}
            value={data.profile}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            isInvalid={
              error.profile ||
              (data.profile.length > 0 && data.profile.length < 5)
            }
          />
          <Form.Control.Feedback type="invalid">
            {tExtended("additionalFields.companyProfile.error")}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-100 mb-3 fw-bold p-2"
      >
        {t("buttons.next")}
      </Button>
    </Form>
  );
}
