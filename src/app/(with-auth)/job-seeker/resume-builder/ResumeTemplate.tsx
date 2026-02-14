"use client";

import { ResumeData } from "@/types/resume-builder";
import React, { forwardRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useTranslations } from "next-intl";
interface ResumeTemplateProps {
  data: ResumeData;
}

export const ResumeTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(
  ({ data }, ref) => {
    const t = useTranslations("jobSeekerResumeTemplate");
    const borderDark = "border-dark";
    const cellStyle =
      "p-2 border-end border-dark d-flex align-items-center justify-content-center";

    return (
      <div
        ref={ref}
        className="bg-white text-black"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "10mm",
          margin: "0 auto",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: "14px",
          boxSizing: "border-box",
        }}
      >
        <Container fluid className="p-0">
          {/* Title + Date */}
          <Row
            className="g-0 border border-dark align-items-center"
            style={{ minHeight: "60px" }}
          >
            <Col xs={8} className="p-2">
              <div className="text-center fw-bold fs-4">{t("title")}</div>
            </Col>
            <Col xs={4} className="p-2 border-start border-dark text-end">
              <span className="small text-muted me-2">{t("dateLabel")}</span>
              <strong>{data.createdAt || ""}</strong>
            </Col>
          </Row>

          {/* Header info (left) and Photo (right) */}
          <Row
            className="g-0 border-start border-end border-bottom border-dark"
            style={{ minHeight: "160px" }}
          >
            <Col xs={9} className="p-0">
              {/* Phonetic of name */}
              <Row className="g-0" style={{ minHeight: "40px" }}>
                <Col
                  xs={12}
                  className="d-flex align-items-center px-3 border-bottom border-dark"
                >
                  <span className="small text-muted me-2">{t("header.phonetic")}</span>
                  <strong>{data.namePhonetic}</strong>
                </Col>
              </Row>

              {/* Full name */}
              <Row className="g-0" style={{ minHeight: "60px" }}>
                <Col
                  xs={12}
                  className="d-flex align-items-center px-3 border-bottom border-dark"
                >
                  <span className="small text-muted me-2">{t("header.fullName")}</span>
                  <h5 className="fs-5 fw-bold mb-0">{data.fullName}</h5>
                </Col>
              </Row>

              {/* Birthdate with age + Gender */}
              <Row className="g-0" style={{ minHeight: "60px" }}>
                <Col xs={12} className="d-flex align-items-center px-3">
                  <span className="small text-muted me-2">{t("header.birthdate")}</span>
                  <strong className="me-3">{data.birthdate}</strong>
                  <span className="small text-muted me-2">{t("header.age")}</span>
                  <strong className="me-3">
                    {typeof data.age === "number" ? data.age : ""}
                  </strong>
                  <span className="small text-muted me-2">{t("header.gender")}</span>
                  <strong>{data.gender || ""}</strong>
                </Col>
              </Row>
            </Col>

            {/* Photo */}
            <Col
              xs={3}
              className="p-2 border-start border-dark d-flex align-items-center justify-content-center bg-light"
            >
              {data.photoUrl ? (
                <Image
                  src={data.photoUrl}
                  alt="Resume Photo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="text-muted small">
                  <div className="fw-bold text-center mb-1">{t("photo.title")}</div>
                  <ol className="m-0 ps-3">
                    <li>{t("photo.instructions.size")}</li>
                    <li>{t("photo.instructions.pose")}</li>
                    <li>{t("photo.instructions.glue")}</li>
                  </ol>
                </div>
              )}
            </Col>
          </Row>

          {/* Current address (phonetic + phone) | Address + postal code + email */}
          <Row className="g-0 border-start border-end border-bottom border-dark">
            <Col xs={6} className="p-2 border-end border-dark">
              <div className="d-flex align-items-center gap-3">
                <span className="small text-muted">{t("contact.addressPhonetic")}</span>
                <strong>{data.addressPhonetic}</strong>
              </div>
              <div className="mt-1">
                <span className="small text-muted me-2">{t("contact.phone")}</span>
                <strong>{data.phone}</strong>
              </div>
            </Col>
            <Col xs={6} className="p-2">
              <div className="text-break">
                <span className="small text-muted me-2">{t("contact.currentAddress")}</span>
                <strong>{data.address}</strong>
              </div>
              <div className="mt-1 d-flex align-items-center flex-wrap">
                <span className="small text-muted me-2">{t("contact.postalCode")}</span>
                <strong className="me-3">{data.postalCode || ""}</strong>
                <span className="small text-muted me-2">{t("contact.email")}</span>
                <strong className="text-break">{data.email}</strong>
              </div>
            </Col>
          </Row>

          {/* Other contact (optional) */}
          <Row className="g-0 border-start border-end border-bottom border-dark">
            <Col xs={6} className="p-2 border-end border-dark">
              <div className="d-flex align-items-center gap-3">
                <span className="small text-muted">{t("otherContact.phonetic")}</span>
                <strong>{data.otherContact?.phonetic || ""}</strong>
              </div>
              <div className="mt-1">
                <span className="small text-muted me-2">{t("otherContact.phone")}</span>
                <strong>{data.otherContact?.phone || ""}</strong>
              </div>
            </Col>
            <Col xs={6} className="p-2">
              <div className="text-break">
                <span className="small text-muted me-2">
                  {t("otherContact.address")}
                </span>
                <strong>{data.otherContact?.address || ""}</strong>
              </div>
              <div className="mt-1 d-flex align-items-center flex-wrap">
                <span className="small text-muted me-2">{t("otherContact.email")}</span>
                <strong className="text-break">
                  {data.otherContact?.email || ""}
                </strong>
              </div>
              <div className="small text-muted mt-1">
                {t("otherContact.note")}
              </div>
            </Col>
          </Row>

          {/* Education & Work History (Year | Month | Item) */}
          <Row className="g-0 border border-dark bg-light fw-bold text-center">
            <Col xs={2} className={`p-1 border-end ${borderDark}`}>
              {t("tables.year")}
            </Col>
            <Col xs={2} className={`p-1 border-end ${borderDark}`}>
              {t("tables.month")}
            </Col>
            <Col xs={8} className="p-1">
              {t("tables.educationWork")}
            </Col>
          </Row>

          {/* Education placeholder */}
          {data.education && data.education.length > 0 ? (
            data.education.map((item, idx) => (
              <Row
                key={`edu-${idx}`}
                className="g-0 border-start border-end border-bottom border-dark"
              >
                <Col xs={2} className={cellStyle}>
                  {item.year}
                </Col>
                <Col xs={2} className={cellStyle}>
                  {item.month}
                </Col>
                <Col xs={8} className="p-2">
                  {item.description}
                </Col>
              </Row>
            ))
          ) : (
            <Row className="g-0 border-start border-end border-bottom border-dark">
              <Col xs={2} className={cellStyle}></Col>
              <Col xs={2} className={cellStyle}></Col>
              <Col xs={8} className="p-3 text-center text-muted">
                {t("tables.noEducation")}
              </Col>
            </Row>
          )}

          {/* Work placeholder */}
          {data.work && data.work.length > 0 ? (
            data.work.map((item, idx) => (
              <Row
                key={`work-${idx}`}
                className="g-0 border-start border-end border-bottom border-dark"
              >
                <Col xs={2} className={cellStyle}>
                  {item.year}
                </Col>
                <Col xs={2} className={cellStyle}>
                  {item.month}
                </Col>
                <Col xs={8} className="p-2">
                  {item.description}
                </Col>
              </Row>
            ))
          ) : (
            <Row className="g-0 border-start border-end border-bottom border-dark">
              <Col xs={2} className={cellStyle}></Col>
              <Col xs={2} className={cellStyle}></Col>
              <Col xs={8} className="p-3 text-center text-muted">
                {t("tables.noWork")}
              </Col>
            </Row>
          )}

          {/* Licenses & Qualifications */}
          <Row className="g-0 border border-dark bg-light fw-bold text-center mt-2">
            <Col xs={2} className={`p-1 border-end ${borderDark}`}>
              {t("tables.year")}
            </Col>
            <Col xs={2} className={`p-1 border-end ${borderDark}`}>
              {t("tables.month")}
            </Col>
            <Col xs={8} className="p-1">
              {t("tables.licenses")}
            </Col>
          </Row>
          {data.licenses && data.licenses.length > 0 ? (
            data.licenses.map((lic, idx) => (
              <Row
                key={`lic-${idx}`}
                className="g-0 border-start border-end border-bottom border-dark"
              >
                <Col xs={2} className={cellStyle}>
                  {lic.year}
                </Col>
                <Col xs={2} className={cellStyle}>
                  {lic.month}
                </Col>
                <Col xs={8} className="p-2">
                  {lic.qualification}
                </Col>
              </Row>
            ))
          ) : (
            <Row className="g-0 border-start border-end border-bottom border-dark">
              <Col xs={2} className={cellStyle}></Col>
              <Col xs={2} className={cellStyle}></Col>
              <Col xs={8} className="p-3 text-center text-muted">
                {t("tables.noLicenses")}
              </Col>
            </Row>
          )}

          {/* Motivation, Self-PR, etc. */}
          <Row className="g-0 border border-dark bg-light fw-bold text-center mt-2">
            <Col xs={12} className="p-1">
              {t("motivation.title")}
            </Col>
          </Row>
          <Row
            className="g-0 border-start border-end border-bottom border-dark"
            style={{ minHeight: "100px" }}
          >
            <Col xs={12} className="p-3" style={{ whiteSpace: "pre-wrap" }}>
              {data.reasons && data.reasons.trim() ? (
                <div>{data.reasons}</div>
              ) : (
                <div className="text-muted">
                  {t("motivation.placeholder")}
                </div>
              )}
            </Col>
          </Row>

          {/* Personal Preferences */}
          <Row className="g-0 border border-dark bg-light fw-bold text-center mt-2">
            <Col xs={12} className="p-1">
              {t("preferences.title")}
            </Col>
          </Row>
          {data.preferences && data.preferences.length > 0 ? (
            data.preferences.map((pref, idx) => (
              <Row
                key={`pref-${idx}`}
                className="g-0 border-start border-end border-bottom border-dark"
              >
                <Col xs={12} className="p-2">
                  • {pref}
                </Col>
              </Row>
            ))
          ) : (
            <Row className="g-0 border-start border-end border-bottom border-dark">
              <Col xs={12} className="p-3 text-muted">
                {t("preferences.placeholder")}
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  },
);

ResumeTemplate.displayName = "ResumeTemplate";
