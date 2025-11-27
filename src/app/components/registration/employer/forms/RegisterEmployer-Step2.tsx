"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep2,
  RegisterEmployerStep2Data,
  goNextStep,
} from "@/redux/slices/register/employerSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";

export default function RegisterEmployerStep2() {
  const dispatch = useAppDispatch();
  // i18n for labels/placeholders in Step 2
  const t = useTranslations("registerEmployerStep2");
  const employerInfo = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.employerInfo
  );

  const [currentBranch, setCurrentBranch] = useState<string>("");
  const [data, setData] = useState<RegisterEmployerStep2Data>({
    companyName: "",
    companyAddress: "",
    phoneNumber: "",
    industry: "",
    regions: "",
    numberOfEmployees: "",
    branchOffices: [],
    appealPoints: "",
    fee: "",
  });

  useEffect(() => {
    setData(employerInfo);
  }, [employerInfo]);

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

  // Japan regions
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    dispatch(saveRegEmployerStep2({ ...data, [name]: value }));
  };

  const handleAddBranch = () => {
    if (currentBranch.trim() !== "") {
      setData({
        ...data,
        branchOffices: [...data.branchOffices, currentBranch],
      });
      setCurrentBranch("");
    }
  };

  const handleRemoveBranch = (index: number) => {
    setData({
      ...data,
      branchOffices: data.branchOffices.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.branchOffices.length === 0) {
      alert(t("errors.addAtLeastOneBranch"));
      return;
    }
    if (
      data.companyName.trim() === "" ||
      data.companyAddress.trim() === "" ||
      data.phoneNumber.trim() === "" ||
      data.industry.trim() === "" ||
      data.regions.trim() === "" ||
      data.numberOfEmployees.trim() === "" ||
      data.appealPoints.trim() === "" ||
      data.fee.trim() === ""
    ) {
      alert(t("errors.fillRequired"));
      return;
    }
    // Save branches as comma-separated string
    dispatch(saveRegEmployerStep2(data));
    dispatch(goNextStep(3));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mb-5 text-center">{t("title")}</h4>
      {/* Basic Information */}
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

        <Form.Group className="mb-3" controlId="companyAddress">
          <Form.Label>{t("labels.companyAddress")}</Form.Label>
          <Form.Control
            type="text"
            name="companyAddress"
            placeholder={t("placeholders.enterCompanyAddress")}
            value={data.companyAddress}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>{t("labels.phoneNumber")}</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            placeholder={t("placeholders.enterPhoneNumber")}
            value={data.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </div>

      {/* Company Industry */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.companyIndustry")}</h6>
        <Form.Group controlId="industry">
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
      </div>

      {/* Regions */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.regions")}</h6>
        <Form.Group controlId="regions">
          <Form.Label>{t("labels.region")}</Form.Label>
          <Form.Select
            name="regions"
            value={data.regions}
            onChange={handleChange}
            required
          >
            <option value="">{t("placeholders.selectRegion")}</option>
            {japanRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      {/* Organizational Information */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.orgInfo")}</h6>
        <Form.Group className="mb-3" controlId="numberOfEmployees">
          <Form.Label>{t("labels.numEmployees")}</Form.Label>
          <Form.Control
            type="number"
            name="numberOfEmployees"
            placeholder={t("placeholders.enterNumEmployees")}
            value={data.numberOfEmployees}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="branchOffices">
          <Form.Label>{t("labels.branchOffices")}</Form.Label>
          <Row>
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder={t("labels.branchOfficePlaceholder")}
                value={currentBranch}
                onChange={(e) => setCurrentBranch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBranch();
                  }
                }}
              />
            </Col>
            <Col xs={3}>
              <Button
                variant="secondary"
                type="button"
                onClick={handleAddBranch}
                className="w-100"
              >
                {t("buttons.add")}
              </Button>
            </Col>
          </Row>

          {/* Collection of Branch Offices */}
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

      {/* PR Information */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">{t("labels.prInfo")}</h6>
        <Form.Group className="mb-3" controlId="appealPoints">
          <Form.Label>{t("labels.appealPoints")}</Form.Label>
          <Form.Control
            type="number"
            name="appealPoints"
            placeholder={t("placeholders.enterAppealPoints")}
            value={data.appealPoints}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fee">
          <Form.Label>{t("labels.fee")}</Form.Label>
          <Form.Control
            type="number"
            name="fee"
            placeholder={t("placeholders.enterFee")}
            value={data.fee}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          {t("buttons.next")}
        </Button>
      </div>
    </Form>
  );
}
