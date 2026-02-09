"use client";

import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { listCategory, regionList } from "@/components/listGroupData";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  setFilterField,
  setFieldClear,
} from "@/redux/slices/filterJobPost/filterJobPostSlice";

import { useAppDispatch } from "@/redux/hooks";
import { filterJobPostV1 } from "@/redux/slices/filterJobPost/filterJobPostThunk";

const FindJobPage = () => {
  const router = useRouter();
  const t = useTranslations("findJobs");
  const tListGroup = useTranslations("listGroupData");
  const dispatch = useAppDispatch();

  const jobTypeOptions = [
    { value: "Full-Time", label: t("jobTypes.fullTime") },
    { value: "Part-Time", label: t("jobTypes.partTime") },
    { value: "Remote", label: t("jobTypes.remote") },
    { value: "Internship", label: t("jobTypes.internship") },
  ];

  const {
    items,
    status,
    error,
    category,
    type_of_emp,
    salary_start,
    salary_end,
    region,
  } = useSelector((state: RootState) => state.jobSearchFilterSlice);

  const handleApplyFilter = () => {};

  useEffect(() => {
    const payload = {
      category,
      type_of_emp: JSON.stringify(type_of_emp ?? []),
      salary_start,
      salary_end,
      region,
    };
    dispatch(filterJobPostV1(payload));
  }, [dispatch, category, region, salary_start, salary_end, type_of_emp]);

  return (
    <div>
      <Navbar />
      {/* <JobSearchFiler /> */}
      <Container fluid className="p-0" style={{ overflow: "hidden" }}>
        <Row className="h-100 g-0">
          <Col
            xs={12}
            sm={3}
            className="bg-light border-end"
            style={{ height: "100%", overflowY: "auto" }}
          >
            <div className="px-2">
              {/* <FilterJobs /> */}
              <Card className="p-2 h-100 my-5 overflow-auto">
                <Card.Header className="d-flex justify-content-between bg-body">
                  <Card.Title className="p-0 my-auto">
                    {t("filters.title")}
                  </Card.Title>
                  <Button
                    variant="link"
                    onClick={() => dispatch(setFieldClear())}
                    className="p-0 text-danger"
                  >
                    {t("filters.clear")}
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Label className="primary-text">
                      {t("filters.prefecture")}
                    </Form.Label>
                    <select
                      name=""
                      id=""
                      value={region}
                      onChange={(e) =>
                        dispatch(setFilterField({ region: e.target.value }))
                      }
                      className="form-control"
                    >
                      <option value="" disabled hidden>
                        {t("filters.selectPrefecture")}
                      </option>
                      <option value="">{t("filters.none")}</option>
                      {regionList.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.value}>
                            {tListGroup(`prefecture.${item.value}`)}
                          </option>
                        );
                      })}
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="primary-text">
                      {t("filters.category")}
                    </Form.Label>
                    <select
                      name=""
                      value={category}
                      onChange={(e) =>
                        dispatch(setFilterField({ category: e.target.value }))
                      }
                      id=""
                      className="form-control"
                    >
                      <option value="" disabled hidden>
                        {t("filters.selectCategory")}
                      </option>
                      <option value="">{t("filters.none")}</option>
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
                    <Form.Label className="primary-text">
                      {t("filters.jobType")}
                    </Form.Label>
                    {jobTypeOptions.map((type) => (
                      <Form.Check
                        type="checkbox"
                        key={type.value}
                        label={type.label}
                        value={type.value}
                        id={type.value}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          if (checked) {
                            dispatch(
                              setFilterField({
                                type_of_emp: [...type_of_emp, value],
                              }),
                            );
                          } else {
                            dispatch(
                              setFilterField({
                                type_of_emp: type_of_emp.filter(
                                  (item) => item !== value,
                                ),
                              }),
                            );
                          }
                        }}
                        checked={type_of_emp.includes(type.value)}
                      />
                    ))}
                  </Form.Group>

                  <hr />
                  <Form.Group>
                    <Form.Label className="primary-text">
                      {t("filters.salary")}
                    </Form.Label>
                    <div className="d-flex justify-content-between">
                      <Form.Control
                        type="number"
                        value={salary_start}
                        onChange={(e) =>
                          dispatch(
                            setFilterField({
                              salary_start: Number(e.target.value),
                            }),
                          )
                        }
                        placeholder={t("filters.salaryMin")}
                      ></Form.Control>
                      <p className="text-center mx-auto w-25 fw-bold">-</p>
                      <Form.Control
                        type="number"
                        value={salary_end}
                        onChange={(e) =>
                          dispatch(
                            setFilterField({
                              salary_end: Number(e.target.value),
                            }),
                          )
                        }
                        placeholder={t("filters.salaryMax")}
                      ></Form.Control>
                    </div>
                  </Form.Group>
                  {/* <button className="mt-5 btn btn-primary-custom rounded-3 w-100" onClick={handleApplyFilter}>Apply Filter</button> */}
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col style={{ height: "100%", overflowY: "auto" }}>
            <Row className="g-3 m-0 p-3">
              {items.map((job) => (
                <Col lg={3} md={4} sm={6} key={job.id} className="">
                  <article
                    className="job-card"
                    style={{ height: "380px" }}
                    key={job.id}
                  >
                    <div className="job-img">
                      <img
                        src={
                          job?.employer?.[0]?.avatar
                            ? `http://127.0.0.1:8000/media/${job.employer[0].avatar}`
                            : "http://127.0.0.1:8000/media/placeholder.jpg"
                        }
                        className="img-fluid"
                        alt={t("companyImageAlt")}
                      />
                      <span className="job-badge">{t("badgeNew")}</span>
                    </div>
                    <div className="job-body">
                      <div className="job-top">
                        <div className="job-company">
                          {
                            job?.employer?.[0]?.userDetails_emp
                              ?.company_information?.name
                          }
                        </div>
                        <div className="job-date">
                          {t("updatedLabel", { date: "2/2" })}
                        </div>
                        <div className="job-title" data-i18n="job1_title">
                          {job.title}
                        </div>
                        <div className="job-meta">
                          <span
                            className="meta-pill text-capitalize"
                            data-i18n="job1_meta1"
                          >
                            📍 {job.region}
                          </span>
                          {job.type_of_emp?.map((type: any, index: number) => (
                            <span key={index} className="meta-pill">
                              💼 {type}
                            </span>
                          ))}

                          <span className="meta-pill" data-i18n="job1_meta3">
                            💰 {job.salary}
                          </span>
                        </div>
                        <div className="job-cta">
                          <button
                            className="job-btn"
                            onClick={() =>
                              router.push(`job-description/${job.id}`)
                            }
                            type="button"
                            data-i18n="btn_detail"
                          >
                            {" "}
                            {t("viewDetails")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindJobPage;
