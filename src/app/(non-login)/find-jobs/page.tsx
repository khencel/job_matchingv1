"use client";
import FilterJobs from "@/components/FilterJobs";
import JobCard from "@/components/JobCard";
import JobSearchFiler from "@/components/JobSearchFilter";
import Navbar from "@/components/navbar/Navbar";
import { getJobPostings } from "@/redux/slices/jobs/jobServices";
import { JobPosting } from "@/types/applyJob";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const FindJobPage = () => {
  const router = useRouter();
  const [jobsLists, setJobsLists] = useState<JobPosting[]>([]);

  useEffect(() => {
    async function fetchJobDetails() {
      const res = await getJobPostings();
      setJobsLists(res.data);
    }
    fetchJobDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <JobSearchFiler />
      <Container
        fluid
        className="p-0"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Row className="h-100 g-0">
          <Col
            sm={3}
            className="bg-light border-end"
            style={{ height: "100%", overflowY: "auto" }}
          >
            <div className="px-2">
              <FilterJobs />
            </div>
          </Col>
          <Col style={{ height: "100%", overflowY: "auto" }}>
            <Row className="g-3 m-0 p-3">
              {jobsLists.map((job) => (
                <Col lg={3} md={4} sm={6} key={job.id} className="">
                    <article className="job-card" style={{height:"380px"}} key={job.id}>
                      <div className="job-img">
                        <img 
                              src={
                                job?.employer?.[0]?.avatar
                                  ? `http://127.0.0.1:8000/media/${job.employer[0].avatar}`
                                  : "http://127.0.0.1:8000/media/placeholder.jpg"
                              }
                              alt="企業イメージ" 
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
                          <span className="meta-pill" data-i18n="job1_meta1">📍 Tokyo</span>
                          {job.type_of_emp?.map((type, index) => (
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
