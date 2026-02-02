"use client";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("findJobs");
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
            <Row className="g-3 p-3">
              {jobsLists.map((job) => (
                <Col lg={3} md={4} sm={6} key={job.id} className="">
                  <JobCard
                    job={job}
                    onClick={() => router.push(`job-description/${job.id}`)}
                  />
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
