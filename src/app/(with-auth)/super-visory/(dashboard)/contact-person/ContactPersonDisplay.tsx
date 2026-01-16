"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { RegisterSuperVisoryStep3Data } from "@/redux/slices/register/super-visory/superVisorySlice";

interface Props {
  data: RegisterSuperVisoryStep3Data;
}

export default function ContactPersonDisplay({ data }: Props) {
  const t = useTranslations("registerSupervisoryStep3");

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
          <h6 className="fw-bold mb-3 text-primary">Contact Person </h6>

          <Row className="mb-2">
            <Col md={4}>{t("labels.name")}</Col>
            <Col md={8}>{show(data.name)}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>{t("labels.department")}</Col>
            <Col md={8}>{show(data.department)}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>{t("labels.phoneNumber")}</Col>
            <Col md={8}>{show(data.phoneNumber)}</Col>
          </Row>

          <Row>
            <Col md={4}>{t("labels.email")}</Col>
            <Col md={8}>{show(data.email)}</Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
