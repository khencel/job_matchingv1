"use client";

import { Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { industries } from "./registration/employer/RegisterEmployerStep2";
import { listCategory } from "./listGroupData";
import { useTranslations } from "next-intl";


const FilterJobs = () => {
  const t = useTranslations("filterJobs");
  return (
    <Card className="p-2 h-100 my-5 overflow-auto">
      <Card.Header className="d-flex justify-content-between bg-body">
        <Card.Title className="p-0 my-auto">{t("title")}</Card.Title>
        <Button variant="link" className="p-0 text-danger">
          {t("buttons.clearFilters")}
        </Button>
      </Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Label className="primary-text">{t("fields.category.label")}</Form.Label>
          <select name="" id="" className="form-control" defaultValue="">
            <option value="" disabled hidden>
              {t("fields.category.placeholder")}
            </option>
            {
              listCategory(t).map((item:any, index:number)=>{
                return (
                  <option key={index} value={item.value}>{item.label}</option>
                )
              })
            }
          </select>
       
        </Form.Group>
      
        <Form.Group>
          <Form.Label className="primary-text">{t("fields.jobType.label")}</Form.Label>
          {[
            t("fields.jobType.options.fullTime"),
            t("fields.jobType.options.partTime"),
            t("fields.jobType.options.remote"),
            t("fields.jobType.options.internship"),
          ].map((type) => (
            <Form.Check key={type} label={type} id={type} />
          ))}
        </Form.Group>
        
        <hr />
        <Form.Group>
          <Form.Label className="primary-text">{t("fields.salary.label")}</Form.Label>
          <div className="d-flex justify-content-between">
            <Form.Control type="number" placeholder={t("fields.salary.min")}></Form.Control>
            <p className="text-center mx-auto w-25 fw-bold">-</p>
            <Form.Control type="number" placeholder={t("fields.salary.max")}></Form.Control>
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterJobs;
