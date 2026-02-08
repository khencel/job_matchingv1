"use client";

import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { listCategory, regionList} from "@/components/listGroupData";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { setFilterField, setFieldClear } from "@/redux/slices/filterJobPost/filterJobPostSlice";

import { useAppDispatch } from "@/redux/hooks";
import { filterJobPostV1 } from "@/redux/slices/filterJobPost/filterJobPostThunk";


const FindJobPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { items, status, error, category, type_of_emp, salary_start, salary_end, region } = useSelector((state: RootState) => state.jobSearchFilterSlice);


  const handleApplyFilter = () => {
  
  };



  useEffect(() => {
    const payload = {
      category,
      type_of_emp: JSON.stringify(type_of_emp ?? []),
      salary_start,
      salary_end,
      region,
    };
    dispatch(filterJobPostV1(payload));
  
  }, 
      [
        dispatch,
        category,
        region,
        salary_start,
        salary_end,
        type_of_emp
      ]
  );

  return (
    <div>
      <Navbar />
      {/* <JobSearchFiler /> */}
      <Container
        fluid
        className="p-0"
        style={{overflow: "hidden" }}
      >
        <Row className="h-100 g-0">
          <Col xs={12} sm={3} className="bg-light border-end" style={{ height: "100%", overflowY: "auto" }}>
            <div className="px-2">
              {/* <FilterJobs /> */}
              <Card className="p-2 h-100 my-5 overflow-auto">
                  <Card.Header className="d-flex justify-content-between bg-body">
                    <Card.Title className="p-0 my-auto">Job Filter</Card.Title>
                    <Button variant="link" onClick={()=>dispatch(setFieldClear())} className="p-0 text-danger">
                      Clear Filters
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group>
                      <Form.Label className="primary-text">Prefecture</Form.Label>
                      <select name="" id="" value={region} 
                        onChange={(e) => dispatch(setFilterField({ region: e.target.value }))}
                        className="form-control">
                        <option value="" disabled hidden>
                          Select prefecture
                        </option>
                        <option value="">None</option>
                        {
                          regionList.map((item:any, index:number)=>{
                            return (
                              <option key={index} value={item.value}>{item.label}</option>
                            )
                          })
                        }
                      </select>
                  
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="primary-text">Category</Form.Label>
                      <select name="" value={category} onChange={(e) => dispatch(setFilterField({ category: e.target.value}))} id="" className="form-control">
                        <option value="" disabled hidden>
                          Select Category
                        </option>
                        <option value="">None</option>
                        {
                          listCategory.map((item:any, index:number)=>{
                            return (
                              <option key={index} value={item.value}>{item.label}</option>
                            )
                          })
                        }
                      </select>
                  
                    </Form.Group>
                  
                    <Form.Group>
                      <Form.Label className="primary-text">Job Type</Form.Label>
                      {["Full-Time", "Part-Time", "Remote", "Internship"].map((type) => (
                        <Form.Check
                          type="checkbox"
                          key={type}
                          label={type}
                          value={type}
                          id={type}
                          onChange={(e) => {
                            const { checked, value } = e.target;
                            if (checked) {
                              dispatch(setFilterField({ type_of_emp: [...type_of_emp, value] }));
                            } else {
                              dispatch(setFilterField({ type_of_emp: type_of_emp.filter((item) => item !== value) }));
                            }
                          }}
                          checked={type_of_emp.includes(type)}
                        />
                      ))}
                    </Form.Group>


                    
                    <hr />
                    <Form.Group>
                      <Form.Label className="primary-text">Salary</Form.Label>
                      <div className="d-flex justify-content-between">
                        <Form.Control type="number" value={salary_start} onChange={(e) => dispatch(setFilterField({ salary_start: Number(e.target.value) }))} placeholder="min"></Form.Control>
                        <p className="text-center mx-auto w-25 fw-bold">-</p>
                        <Form.Control type="number" value={salary_end} onChange={(e) => dispatch(setFilterField({ salary_end: Number(e.target.value) }))} placeholder="max"></Form.Control>
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
                    <article className="job-card" style={{height:"380px"}} key={job.id}>
                      <div className="job-img">
                        <img
                          src={
                            job?.employer?.[0]?.avatar
                              ? `http://127.0.0.1:8000/media/${job.employer[0].avatar}`
                              : "http://127.0.0.1:8000/media/placeholder.jpg"
                          }
                          className="img-fluid"
                          alt="Company Avatar"
                        />
                        <span className="job-badge">NEW</span>
                      </div>
                      <div className="job-body">
                        <div className="job-top">
                          <div className="job-company" data-i18n="job1_company">{job?.employer?.[0]?.userDetails_emp?.company_information?.name}</div>
                          <div className="job-date" data-i18n="job1_date">Updated: 2/2</div>
                        </div>
                        <div className="job-title" data-i18n="job1_title">{job.title}</div>
                        <div className="job-meta">
                          <span className="meta-pill text-capitalize" data-i18n="job1_meta1">📍 {job.region}</span>
                          {job.type_of_emp?.map((type:any, index:number) => (
                            <span key={index} className="meta-pill">
                              💼 {type}
                            </span>
                          ))}
          
                          <span className="meta-pill" data-i18n="job1_meta3">💰 {job.salary}</span>
                        </div>
                        <div className="job-cta">
                          <button className="job-btn" onClick={() => router.push(`job-description/${job.id}`)} type="button" data-i18n="btn_detail">View details</button>
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
