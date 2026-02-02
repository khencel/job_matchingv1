"use client";

import { Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { industries } from "./registration/employer/RegisterEmployerStep2";
import { useTranslations } from "next-intl";

const FilterJobs = () => {
  const t = useTranslations("filterJobs");
  
  return (
    <Card className="p-2 h-100 my-5 overflow-auto">
      <Card.Header className="d-flex justify-content-between bg-body">
        <Card.Title className="p-0 my-auto">{t("title")}</Card.Title>
        <Button variant="link" className="p-0 text-danger">
          {t("clearFilters")}
        </Button>
      </Card.Header>
      <Card.Body>
        {/* Filter for Job Types */}
        <Form.Group>
          <Form.Label className="primary-text">{t("jobType.label")}</Form.Label>
          {[
            { key: "fullTime", label: t("jobType.fullTime") },
            { key: "partTime", label: t("jobType.partTime") },
            { key: "remote", label: t("jobType.remote") },
            { key: "internship", label: t("jobType.internship") }
          ].map((type) => (
            <Form.Check key={type.key} label={type.label} id={type.key} />
          ))}
        </Form.Group>
        <hr />
        {/* Filter for Work Experience */}
        <Form.Group>
          <Form.Label className="primary-text">{t("workExperience.label")}</Form.Label>
          {[
            { key: "freshGraduate", label: t("workExperience.freshGraduate") },
            { key: "oneToTwo", label: t("workExperience.oneToTwo") },
            { key: "twoToFour", label: t("workExperience.twoToFour") },
            { key: "fivePlus", label: t("workExperience.fivePlus") }
          ].map((xp) => (
            <Form.Check key={xp.key} label={xp.label} name={xp.key} id={xp.key} />
          ))}
        </Form.Group>
        <hr />
        {/* Filter for Industry */}
        <Form.Group>
          <Form.Label className="primary-text">{t("industry.label")}</Form.Label>
          {industries
            .filter((type) => type !== "Other")
            .map((type) => (
              <Form.Check key={type} label={type} name={type} id={type} />
            ))}
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Label className="primary-text">{t("salary.label")}</Form.Label>
          <div className="d-flex justify-content-between">
            <Form.Control type="number" placeholder={t("salary.min")}></Form.Control>
            <p className="text-center mx-auto w-25 fw-bold">-</p>
            <Form.Control type="number" placeholder={t("salary.max")}></Form.Control>
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterJobs;
