import { ResumeBasicInfo, ResumeEducation, ResumeLanguage, ResumeWorkExperience } from "@/types/resume-builder";
import React, { forwardRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

// 1. Define Strict Types
export interface ResumeData {
  basicInfo: ResumeBasicInfo;
  education: ResumeEducation;
  language: ResumeLanguage;
  workExperience: ResumeWorkExperience[];
  skills: string[];
}

interface ResumeTemplateProps {
  data: ResumeData;
}

// 2. Helper for parsing dates (YYYY-MM-DD -> Year, Month)
const parseDate = (dateStr: string): { year: string; month: string } => {
  if (!dateStr) return { year: "", month: "" };
  const parts = dateStr.split("-");
  return { year: parts[0], month: parts[1] || "" };
};

// 3. The Component
export const ResumeTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(
  ({ data }, ref) => {
    const { basicInfo, education, workExperience } = data;
    const educationEntries = [
      education.primary,
      education.secondary,
      education.tertiary,
    ];
    const hasEducation = educationEntries.some((edu) => edu.schoolName);

    // Shared border styles for consistency
    const borderDark = "border-dark"; // Bootstrap class
    const cellStyle = "p-2 border-end border-dark d-flex align-items-center";

    return (
      <div
        ref={ref}
        className="bg-white text-black"
        style={{
          width: "210mm", // A4 Width
          minHeight: "297mm", // A4 Height
          padding: "10mm",
          margin: "0 auto",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: "14px",
          boxSizing: "border-box",
        }}
      >
        <Container fluid className={`border ${borderDark}`}>
          {/* ================= HEADER SECTION ================= */}
          <Row
            className="g-0 border-bottom border-dark"
            style={{ minHeight: "140px" }}
          >
            {/* LEFT SIDE: Info */}
            <Col xs={9}>
              {/* Name Row */}
              <Row className="g-0" style={{ height: "70%" }}>
                <Col className={`p-3 border-end ${borderDark}`}>
                  <div className="small text-muted mb-1">Name</div>
                  <h5 className="fw-bold mb-0">{`${basicInfo.firstName} ${
                    basicInfo.midName || ""
                  } ${basicInfo.lastName}`}</h5>
                </Col>
                <Col
                  xs={3}
                  className="p-3 d-flex flex-column justify-content-center align-items-center"
                >
                  <div className="small text-muted">Gender</div>
                  <div>{basicInfo.gender}</div>
                </Col>
              </Row>

              {/* Birthday & Nationality Row */}
              <Row
                className="g-0 border-top border-dark"
                style={{ height: "30%" }}
              >
                <Col className={`p-2 border-end ${borderDark}`}>
                  <span className="small text-muted me-2">Date of Birth:</span>
                  <strong>{basicInfo.birthday}</strong>
                </Col>
                <Col className="p-2">
                  <span className="small text-muted me-2">Nationality:</span>
                  <strong>{basicInfo.nationality}</strong>
                  <span className="mx-2">/</span>
                  <span className="small text-muted me-2">Status:</span>
                  <strong>{basicInfo.status}</strong>
                </Col>
              </Row>
            </Col>

            {/* RIGHT SIDE: Photo */}
            <Col
              xs={3}
              className="bg-light d-flex align-items-center justify-content-center p-2"
            >
              {basicInfo.photoUrl ? (
                <Image
                  src={basicInfo.photoUrl}
                  alt="Resume Photo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "130px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="text-muted text-center small">PHOTO</div>
              )}
            </Col>
          </Row>

          {/* ================= CONTACT INFO ================= */}
          <Row className="g-0 border-bottom border-dark">
            <Col xs={8} className={`p-2 border-end ${borderDark}`}>
              <div className="small text-muted">Current Address</div>
              <div>{basicInfo.address}</div>
              {basicInfo.landmark && (
                <div className="small text-secondary mt-1">
                  Landmark: {basicInfo.landmark}
                </div>
              )}
            </Col>
            <Col xs={4}>
              <div className={`p-1 border-bottom ${borderDark}`}>
                <span className="small text-muted me-2">Phone:</span>{" "}
                {basicInfo.number}
              </div>
              <div className="p-1 text-break">
                <span className="small text-muted me-2">Email:</span>{" "}
                {basicInfo.email}
              </div>
            </Col>
          </Row>

          {/* ================= HISTORY HEADERS ================= */}
          <Row className="g-0 border-bottom border-dark bg-light fw-bold text-center">
            <Col xs={2} className={`p-1 border-end ${borderDark}`}>
              Year
            </Col>
            <Col xs={10} className="p-1">
              Education & Work History
            </Col>
          </Row>

          {/* ================= EDUCATION ================= */}
          <Row className="g-0">
            <Col xs={2} className={`border-end ${borderDark}`}></Col>
            <Col xs={10} className="p-1 fw-bold text-center">
              Education
            </Col>
          </Row>

          {/* Helper to render rows */}
          {hasEducation ? (
            educationEntries.map((edu, idx) => {
              if (!edu.schoolName) return null;
              const date = parseDate(edu.yearGraduated);
              const labels = ["Primary", "Secondary", "Tertiary"];
              return (
                <Row key={`edu-${idx}`} className="g-0 border-top border-dark">
                  <Col xs={2} className={`text-center ${cellStyle}`}>
                    {date.year}
                  </Col>
                  <Col xs={10} className="p-2">
                    {edu.schoolName} ({labels[idx]}) -{" "}
                    {edu.isNotFinished ? "Incomplete" : "Graduated"}
                  </Col>
                </Row>
              );
            })
          ) : (
            <Row className="g-0 border-top border-dark">
              <Col xs={2} className={`border-end ${borderDark}`}></Col>
              <Col xs={10} className="p-4 text-center text-muted">
                No educational background provided
              </Col>
            </Row>
          )}

          {/* ================= WORK EXPERIENCE ================= */}
          <Row className="g-0 border-top border-dark">
            <Col xs={2} className={`border-end ${borderDark}`}></Col>
            <Col xs={10} className="p-1 fw-bold text-center">
              Work Experience
            </Col>
          </Row>

          {workExperience.length > 0 ? (
            workExperience.map((job, idx) => {
              const startDate = parseDate(job.dateStarted);
              const endDate = parseDate(job.dateEnded);
              return (
                <React.Fragment key={`job-${idx}`}>
                  {/* Start Row */}
                  <Row className="g-0 border-top border-dark">
                    <Col xs={2} className={`text-center ${cellStyle}`}>
                      {startDate.year}
                    </Col>
                    <Col xs={10} className="p-2">
                      Joined <strong>{job.companyName}</strong> ({job.industry})
                    </Col>
                  </Row>
                  {/* Position Row (No date) */}
                  <Row className="g-0 border-top border-dark">
                    <Col xs={2} className={`border-end ${borderDark}`}></Col>
                    <Col xs={10} className="p-2 ps-4">
                      Position: {job.position}
                    </Col>
                  </Row>
                  {/* End Row */}
                  <Row className="g-0 border-top border-dark">
                    <Col xs={2} className={`text-center ${cellStyle}`}>
                      {endDate.year}
                    </Col>
                    <Col xs={10} className="p-2">
                      Left {job.companyName}
                    </Col>
                  </Row>
                </React.Fragment>
              );
            })
          ) : (
            <Row className="g-0 border-top border-dark">
              <Col xs={2} className={`border-end ${borderDark}`}></Col>
              <Col xs={10} className="p-4 text-center text-muted">
                No work experience
              </Col>
            </Row>
          )}

          {/* ================= SKILLS ================= */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <Row className="g-0 border-top border-dark bg-light fw-bold text-center mt-auto">
                <Col xs={12} className="p-1">
                  Skills
                </Col>
              </Row>

              <Row
                className="g-0 border-top border-dark"
                style={{ minHeight: "60px" }}
              >
                <Col xs={12} className="p-2">
                  <div>
                    {data.skills.map((skill, index) => (
                      <span key={index}>
                        {skill}
                        {index < data.skills.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    );
  }
);

ResumeTemplate.displayName = "ResumeTemplate";
