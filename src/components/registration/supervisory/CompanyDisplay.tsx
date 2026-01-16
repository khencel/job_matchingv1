"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { CompanyFormData } from "./CompanyForm";

interface Props {
  data: CompanyFormData;
}

export default function CompanyDisplay({ data }: Props) {
  const t = useTranslations("registerSupervisoryStep2");

  const show = (val: string | number | null | undefined) => {
    if (val === null || val === undefined) return "none";
    if (typeof val === "string" && val.trim() === "") return "none";
    return String(val);
  };

  return (
    <div>
      <h4 className="mb-5 text-center">{t("title")}</h4>

      <Card className="mb-4 p-3 bg-light border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3 text-primary">{t("labels.basicInfo")}</h6>
          <Row className="mb-2">
            <Col md={4}>{t("labels.companyName")}</Col>
            <Col md={8}>{show(data.companyName)}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>{t("labels.companyNamePhonetic")}</Col>
            <Col md={8}>{show(data.companyNamePhonetic)}</Col>
          </Row>

          <Row>
            <Col md={4}>{t("labels.representativeName")}</Col>
            <Col md={8}>{show(data.repName)}</Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4 p-3 bg-light border-0">
        <Card.Body>
          <h6 className="mb-3 fw-bold text-primary">{t("labels.headquartersAddress")}</h6>

          <Row className="mb-2">
            <Col md={4}>{t("labels.prefecture")}</Col>
            <Col md={8}>{show(data.hqAddress.prefecture)}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>{t("labels.city")}</Col>
            <Col md={8}>{show(data.hqAddress.city)}</Col>
          </Row>

          <Row>
            <Col md={4}>{t("labels.street")}</Col>
            <Col md={8}>{show(data.hqAddress.street)}</Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4 p-3 bg-light border-0">
        <Card.Body>
          <h6 className="mb-3 fw-bold text-primary">{t("labels.companyDetails")}</h6>

          <Row className="mb-2">
            <Col md={4}>{t("labels.numberOfEmployees")}</Col>
            <Col md={8}>{show(data.numOfEmployees)}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>{t("labels.industry")}</Col>
            <Col md={8}>{show(data.industry)}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>{t("labels.yearFounded")}</Col>
            <Col md={8}>{show(data.yearFounded)}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>{t("labels.capital")}</Col>
            <Col md={8}>{show(data.capital)}</Col>
          </Row>

          <Row>
            <Col md={4}>{t("labels.businessDescription")}</Col>
            <Col md={8}>{show(data.businessDescription)}</Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
