"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegSuperVisoryStep2,
  RegisterSuperVisoryStep2Data,
  goNextStep,
} from "@/redux/slices/register/superVisorySlice";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

// Industry options
const industries = [
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
//Japan Prefectures
const prefectures = [
  "Hokkaido",
  "Aomori",
  "Iwate",
  "Miyagi",
  "Akita",
  "Yamagata",
  "Fukushima",
  "Ibaraki",
  "Tochigi",
  "Gunma",
  "Saitama",
  "Chiba",
  "Tokyo",
  "Kanagawa",
  "Niigata",
  "Toyama",
  "Ishikawa",
  "Fukui",
  "Yamanashi",
  "Nagano",
  "Gifu",
  "Shizuoka",
  "Aichi",
  "Mie",
  "Shiga",
  "Kyoto",
  "Osaka",
  "Hyogo",
  "Nara",
  "Wakayama",
  "Tottori",
  "Shimane",
  "Okayama",
  "Hiroshima",
  "Yamaguchi",
  "Tokushima",
  "Kagawa",
  "Ehime",
  "Kochi",
  "Fukuoka",
  "Saga",
  "Nagasaki",
  "Kumamoto",
  "Oita",
  "Miyazaki",
  "Kagoshima",
  "Okinawa",
];

export default function RegisterSupervisoryStep2() {
  const dispatch = useAppDispatch();
  const t = useTranslations("registerSupervisoryStep2");
  const companyInfo = useAppSelector(
    (s) => s.registerSuperVisory.registerSuperVisoryData.companyInfo
  );

  const [data, setData] = useState<RegisterSuperVisoryStep2Data>(
    companyInfo || {
      companyName: "",
      companyNamePhonetic: "",
      repName: "",
      hqAddress: {
        prefecture: "",
        city: "",
        street: "",
      },
      numOfEmployees: null,
      industry: "",
      yearFounded: null,
      capital: null,
      businessDescription: "",
    }
  );
  const [error, setError] = useState<{ [name: string]: boolean }>({});

  useEffect(() => {
    setData(companyInfo);
  }, [companyInfo]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Clear error for the field on change
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));

    // Handle nested hqAddress fields
    if (name === "prefecture" || name === "city" || name === "street") {
      setData((prev) => ({
        ...prev,
        hqAddress: { ...prev.hqAddress, [name]: value },
      }));
    } else if (
      name === "numOfEmployees" ||
      name === "yearFounded" ||
      name === "capital"
    ) {
      setData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

    // Validate company name phonetic
    if (!data.companyNamePhonetic || data.companyNamePhonetic.trim().length < 2) {
      validationErrors.companyNamePhonetic = true;
      hasError = true;
    }

    // Validate representative name
    if (!data.repName || data.repName.trim().length < 2) {
      validationErrors.repName = true;
      hasError = true;
    }

    // Validate prefecture
    if (!data.hqAddress.prefecture) {
      validationErrors.prefecture = true;
      hasError = true;
    }

    // Validate city
    if (!data.hqAddress.city || data.hqAddress.city.trim().length < 2) {
      validationErrors.city = true;
      hasError = true;
    }

    // Validate street
    if (!data.hqAddress.street || data.hqAddress.street.trim().length < 2) {
      validationErrors.street = true;
      hasError = true;
    }

    // Validate number of employees
    const numEmployeesNum = Number(data.numOfEmployees);
    if (!data.numOfEmployees || numEmployeesNum < 1) {
      validationErrors.numOfEmployees = true;
      hasError = true;
    }

    // Validate industry
    if (!data.industry) {
      validationErrors.industry = true;
      hasError = true;
    }

    // Validate year founded
    const yearNum = Number(data.yearFounded);
    if (!data.yearFounded || yearNum < 1800 || yearNum > new Date().getFullYear()) {
      validationErrors.yearFounded = true;
      hasError = true;
    }

    // Validate capital
    if (!data.capital) {
      validationErrors.capital = true;
      hasError = true;
    }

    // Validate business description
    if (!data.businessDescription || data.businessDescription.trim().length === 0) {
      validationErrors.businessDescription = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      // Focus on first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = form.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement;
      if (errorElement) errorElement.focus();
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

    dispatch(saveRegSuperVisoryStep2(data));
    dispatch(goNextStep(3));
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h4 className="mb-5 text-center">{t("title")}</h4>

      {/* Company Basic Information */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.basicInfo")}</h6>

        <Form.Group className="mb-3" controlId="companyName">
          <Form.Label>{t("labels.companyName")}</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            placeholder={t("placeholders.enterCompanyName")}
            value={data.companyName}
            onChange={handleChange}
            autoFocus
            required
            isInvalid={
              error.companyName ||
              (data.companyName.trim().length > 0 &&
                data.companyName.trim().length < 2)
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.tooShortCompanyName")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="companyNamePhonetic">
          <Form.Label>{t("labels.companyNamePhonetic")}</Form.Label>
          <Form.Control
            type="text"
            name="companyNamePhonetic"
            placeholder={t("placeholders.enterCompanyNamePhonetic")}
            value={data.companyNamePhonetic}
            onChange={handleChange}
            required
            isInvalid={
              error.companyNamePhonetic ||
              (data.companyNamePhonetic.trim().length > 0 &&
                data.companyNamePhonetic.trim().length < 2)
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.tooShortCompanyName")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="repName">
          <Form.Label>{t("labels.representativeName")}</Form.Label>
          <Form.Control
            type="text"
            name="repName"
            placeholder={t("placeholders.enterRepresentativeName")}
            value={data.repName}
            onChange={handleChange}
            required
            isInvalid={
              error.repName ||
              (data.repName.trim().length > 0 && data.repName.trim().length < 2)
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.tooShortRepName")}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* Headquarters Address */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.headquartersAddress")}</h6>

        <Form.Group className="mb-3" controlId="prefecture">
          <Form.Label>{t("labels.prefecture")}</Form.Label>
          <Form.Select
            name="prefecture"
            value={data.hqAddress.prefecture}
            onChange={handleChange}
            required
            isInvalid={!!error.prefecture}
          >
            <option value="">{t("placeholders.selectPrefecture")}</option>
            {prefectures.map((prefecture) => (
              <option key={prefecture} value={prefecture}>
                {prefecture}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {t("errors.fillRequired")}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>{t("labels.city")}</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder={t("placeholders.enterCity")}
                value={data.hqAddress.city}
                onChange={handleChange}
                required
                minLength={2}
                isInvalid={
                  !!error.city ||
                  (data.hqAddress.city.length > 0 && data.hqAddress.city.length < 2)
                }
              />
              <Form.Control.Feedback type="invalid">
                {t("errors.invalidCity")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="street">
              <Form.Label>{t("labels.street")}</Form.Label>
              <Form.Control
                type="text"
                name="street"
                placeholder={t("placeholders.enterStreet")}
                value={data.hqAddress.street}
                onChange={handleChange}
                required
                minLength={2}
                isInvalid={
                  !!error.street ||
                  (data.hqAddress.street.length > 0 && data.hqAddress.street.length < 2)
                }
              />
              <Form.Control.Feedback type="invalid">
                {t("errors.invalidStreet")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Company Details */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.companyDetails")}</h6>

        <Form.Group className="mb-3" controlId="numOfEmployees">
          <Form.Label>{t("labels.numberOfEmployees")}</Form.Label>
          <Form.Control
            type="number"
            name="numOfEmployees"
            placeholder={t("placeholders.enterNumberOfEmployees")}
            value={data.numOfEmployees || ""}
            onChange={handleChange}
            required
            isInvalid={
              error.numOfEmployees ||
              (data.numOfEmployees !== null && data.numOfEmployees < 1)
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidNumOfEmployees")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="industry">
          <Form.Label>{t("labels.industry")}</Form.Label>
          <Form.Select
            name="industry"
            value={data.industry}
            onChange={handleChange}
            required
            isInvalid={!!error.industry}
          >
            <option value="">{t("placeholders.selectIndustry")}</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {t("errors.fillRequired")}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="yearFounded">
              <Form.Label>{t("labels.yearFounded")}</Form.Label>
              <Form.Control
                type="number"
                name="yearFounded"
                placeholder={t("placeholders.enterYearFounded")}
                value={data.yearFounded || ""}
                onChange={handleChange}
                min="1800"
                max={new Date().getFullYear()}
                required
                isInvalid={
                  error.yearFounded ||
                  (data.yearFounded !== null &&
                    (data.yearFounded < 1800 ||
                      data.yearFounded > new Date().getFullYear()))
                }
              />
              <Form.Control.Feedback type="invalid">
                {t("errors.invalidYearFounded")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="capital">
              <Form.Label>{t("labels.capital")}</Form.Label>
              <Form.Control
                type="number"
                name="capital"
                placeholder={t("placeholders.enterCapital")}
                value={data.capital || ""}
                onChange={handleChange}
                required
                isInvalid={!!error.capital}
              />
              <Form.Control.Feedback type="invalid">
                {t("errors.fillRequired")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="businessDescription">
          <Form.Label>{t("labels.businessDescription")}</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="businessDescription"
            placeholder={t("placeholders.enterBusinessDescription")}
            value={data.businessDescription}
            onChange={handleChange}
            required
            isInvalid={!!error.businessDescription}
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
