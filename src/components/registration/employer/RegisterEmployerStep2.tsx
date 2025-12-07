"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep2,
  RegisterEmployerStep2Data,
  goNextStep,
} from "@/redux/slices/register/employerSlice";
import { ChangeEvent, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

// Industry options for dropdown
export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Hospitality",
  "Construction",
  "Transportation",
  "Real Estate",
  "Agriculture",
  "Entertainment",
  "Telecommunications",
  "Energy",
  "Other",
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
  const employerInfo = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.employerInfo
  );

  // State management for form inputs and validation
  const [currentBranch, setCurrentBranch] = useState<string>("");
  const [error, setError] = useState<{ [name: string]: boolean }>({});
  const [data, setData] = useState<RegisterEmployerStep2Data>(employerInfo);

  // Handle input changes and update Redux store
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Clear error for the field on change
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));

    // Normalize numeric fields: drop leading zeroes like "01" -> "1" for fee/appealPoints
    const normalizedValue =
      name === "appealPoints" || name === "fee" || name === "numberOfEmployees"
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
      setData({
        ...data,
        branchOffices: [...data.branchOffices, currentBranch],
      });
      setCurrentBranch("");
    }
  };

  const isPhoneNumberValid = (phoneNumber: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  };
  // Remove branch office from the list
  const handleRemoveBranch = (index: number) => {
    setData({
      ...data,
      branchOffices: data.branchOffices.filter((_, i) => i !== index),
    });
  };

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    // Second validation: Check custom business logic
    let hasError = false;
    const validationErrors: Record<string, boolean> = {};

    // Validate company name
    if (!data.companyName || data.companyName.trim().length < 2) {
      validationErrors.companyName = true;
      hasError = true;
    }

    // Validate company address
    if (!data.companyAddress || data.companyAddress.trim().length < 2) {
      validationErrors.companyAddress = true;
      hasError = true;
    }

    // Validate phone number
    if (!data.phoneNumber || !isPhoneNumberValid(data.phoneNumber)) {
      validationErrors.phoneNumber = true;
      hasError = true;
    }

    // Validate industry
    if (!data.industry) {
      validationErrors.industry = true;
      hasError = true;
    }

    // Validate regions
    if (!data.regions) {
      validationErrors.regions = true;
      hasError = true;
    }

    // Validate number of employees
    const numEmployeesNum = Number(data.numberOfEmployees);
    if (!data.numberOfEmployees || numEmployeesNum < 1) {
      validationErrors.numberOfEmployees = true;
      hasError = true;
    }

    // Validate appeal points
    const appealPointsNum = Number(data.appealPoints);
    if (appealPointsNum <= 0) {
      validationErrors.appealPoints = true;
      hasError = true;
    }

    // Validate fee
    const feeNum = Number(data.fee);
    if (feeNum <= 0) {
      validationErrors.fee = true;
      hasError = true;
    }

    // Validate branch offices
    if (!data.branchOffices || data.branchOffices.length === 0) {
      validationErrors.branchOffices = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      
      // If branch offices error, focus on the branch input field
      if (validationErrors.branchOffices) {
        const branchInput = form.querySelector(
          "input[placeholder*='branchOffice']"
        ) as HTMLElement;
        if (branchInput) {
          setTimeout(() => branchInput.focus(), 0);
        }
      } else {
        // Otherwise focus on the first error field
        const firstErrorField = Object.keys(validationErrors)[0];
        const errorElement = form.querySelector(
          `[name="${firstErrorField}"]`
        ) as HTMLElement;
        if (errorElement) errorElement.focus();
      }
      return;
    }

    // All validations passed - save data and show success message
    setError({});
    Swal.fire({
      icon: "success",
      title: "Company Information Submitted",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });

    dispatch(saveRegEmployerStep2(data));
    dispatch(goNextStep(3));
  };

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
            name="companyName"
            placeholder={t("placeholders.enterCompanyName")}
            value={data.companyName}
            onChange={handleChange}
            isInvalid={
              error.companyName ||
              (data.companyName.trim().length < 2 &&
                data.companyName.trim().length > 0)
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
            name="companyAddress"
            placeholder={t("placeholders.enterCompanyAddress")}
            value={data.companyAddress}
            onChange={handleChange}
            isInvalid={
              error.companyAddress ||
              (data.companyAddress.trim().length < 2 &&
                data.companyAddress.trim().length > 0)
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
            name="phoneNumber"
            placeholder={t("placeholders.enterPhoneNumber")}
            value={data.phoneNumber}
            onChange={handleChange}
            isInvalid={
              error.phoneNumber ||
              (data.phoneNumber.trim().length > 0 &&
                !isPhoneNumberValid(data.phoneNumber))
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
        <Form.Group controlId="industry">
          <Form.Label>{t("labels.industry")}</Form.Label>
          <Form.Select
            required
            name="industry"
            value={data.industry}
            onChange={handleChange}
            isInvalid={error.industry || data.industry.length < 0}
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
        </Form.Group>
      </div>

      {/* Regions Section */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.regions")}</h6>
        <Form.Group controlId="regions">
          <Form.Label>{t("labels.region")}</Form.Label>
          <Form.Select
            required
            name="regions"
            value={data.regions}
            onChange={handleChange}
            isInvalid={error.regions || data.regions.length < 0}
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
            name="numberOfEmployees"
            placeholder={t("placeholders.enterNumEmployees")}
            value={data.numberOfEmployees}
            onChange={handleChange}
            isInvalid={
              error.numberOfEmployees ||
              (data.numberOfEmployees < "0" && data.numberOfEmployees > "1")
            }
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
                placeholder={t("labels.branchOfficePlaceholder")}
                value={currentBranch}
                onChange={(e) => {
                  setCurrentBranch(e.target.value);
                  // Clear error when user starts typing
                  setError((prevErrors) => ({ ...prevErrors, branchOffices: false }));
                }}
                isInvalid={
                  error.branchOffices ||
                  (currentBranch.trim().length > 0 && currentBranch.trim().length < 2)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBranch();
                  }
                }}
              />

              <Form.Control.Feedback type="invalid">
                {currentBranch.trim().length > 0 && currentBranch.trim().length < 2
                  ? t("errors.invalidBranchName")
                  : t("errors.addAtLeastOneBranch")}
              </Form.Control.Feedback>
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
          {data.branchOffices.length > 0 && (
            <div className="mt-3">
              <p className="text-muted small mb-2">
                {t("labels.branchOfficesList")}
              </p>
              {data.branchOffices.map((branch, index) => (
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
            type="number"
            name="appealPoints"
            placeholder={t("placeholders.enterAppealPoints")}
            value={data.appealPoints}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            isInvalid={
              error.appealPoints ||
              (!!data.appealPoints && Number(data.appealPoints) <= 0)
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.fillRequired")}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Fee Field */}
        <Form.Group className="mb-3" controlId="fee">
          <Form.Label>{t("labels.fee")}</Form.Label>
          <Form.Control
            required
            type="number"
            name="fee"
            placeholder={t("placeholders.enterFee")}
            value={data.fee}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            isInvalid={error.fee || (!!data.fee && Number(data.fee) <= 0)}
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.fillRequired")}
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
