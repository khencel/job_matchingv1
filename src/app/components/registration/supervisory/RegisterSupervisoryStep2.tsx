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

  useEffect(() => {
    setData(companyInfo);
  }, [companyInfo]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
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
    // Company Name and Phonetic validation
    if (data.companyName.length < 2 || data.companyNamePhonetic.length < 2) {
      alert(t("errors.tooShortCompanyName")); // sweetalert can be used here
      return;
    }
    if (data.repName.length < 2) {
      alert(t("errors.tooShortRepName")); // sweetalert can be used here
      return;
    }
    // Number of Employees validation
    if (data.numOfEmployees === null || data.numOfEmployees < 1) {
      alert(t("errors.invalidNumOfEmployees")); // sweetalert can be used here
      return;
    }
    // Year Founded validation
    if (
      data.yearFounded === null ||
      data.yearFounded < 1800 ||
      data.yearFounded > new Date().getFullYear()
    ) {
      alert(t("errors.invalidYearFounded")); // sweetalert can be used here
      return;
    }
    // Required fields validation
    if (
      data.companyName.trim() === "" ||
      data.companyNamePhonetic.trim() === "" ||
      data.repName.trim() === "" ||
      data.hqAddress.prefecture.trim() === "" ||
      data.hqAddress.city.trim() === "" ||
      data.hqAddress.street.trim() === "" ||
      !data.numOfEmployees ||
      data.industry.trim() === "" ||
      !data.yearFounded ||
      !data.capital ||
      data.businessDescription.trim() === ""
    ) {
      alert(t("errors.fillRequired"));
      return;
    }

    dispatch(saveRegSuperVisoryStep2(data));
    dispatch(goNextStep(3));
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          />
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
          />
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
          />
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
          >
            <option value="">{t("placeholders.selectPrefecture")}</option>
            {prefectures.map((prefecture) => (
              <option key={prefecture} value={prefecture}>
                {prefecture}
              </option>
            ))}
          </Form.Select>
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
              />
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
              />
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="industry">
          <Form.Label>{t("labels.industry")}</Form.Label>
          <Form.Select
            name="industry"
            value={data.industry}
            onChange={handleChange}
            required
          >
            <option value="">{t("placeholders.selectIndustry")}</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Form.Select>
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
              />
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
              />
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
          />
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
