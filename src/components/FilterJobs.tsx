"use client";

import { Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { industries } from "./registration/employer/RegisterEmployerStep2";
import { listCategory } from "./listGroupData";
import { useTranslations } from "next-intl";

const FilterJobs = () => {
  const t = useTranslations("filterJobs");
  const tListGroup = useTranslations("listGroupData");
  return (
    <Card className="p-2 h-100 my-5 overflow-auto">
      <Card.Header className="d-flex justify-content-between bg-body">
        <Card.Title className="p-0 my-auto">{t("title")}</Card.Title>
        <Button variant="link" className="p-0 text-danger">
          {t("clearFilters")}
        </Button>
      </Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Label className="primary-text">{t("category")}</Form.Label>
          <select name="" id="" className="form-control" defaultValue="">
            <option value=" " disabled hidden>
              {t("selectCategory")}
            </option>
            {listCategory.map((item: any, index: number) => {
              return (
                <option key={index} value={item.value}>
                  {tListGroup(`categories.${item.value}`)}
                </option>
              );
            })}
          </select>
        </Form.Group>

        <Form.Group>
          <Form.Label className="primary-text">{t("jobType")}</Form.Label>
          {[
            { key: "fullTime", id: "Full-time" },
            { key: "partTime", id: "Part-time" },
            { key: "remote", id: "Remote" },
            { key: "internship", id: "Internship" },
          ].map((type) => (
            <Form.Check
              key={type.key}
              label={t(`jobTypes.${type.key}`)}
              id={type.id}
            />
          ))}
        </Form.Group>

        <hr />
        <Form.Group>
          <Form.Label className="primary-text">{t("salary")}</Form.Label>
          <div className="d-flex justify-content-between">
            <Form.Control type="number" placeholder={t("min")}></Form.Control>
            <p className="text-center mx-auto w-25 fw-bold">-</p>
            <Form.Control type="number" placeholder={t("max")}></Form.Control>
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterJobs;
