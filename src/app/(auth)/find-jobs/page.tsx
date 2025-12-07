import FilterJobs from "@/components/FilterJobs";
import JobPost from "@/components/JobPost";
import JobSearchFiler from "@/components/JobSearchFilter";
import Navbar from "@/components/Navbar";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FindJobPage = () => {
  return (
    <div>
      <Navbar />
      <JobSearchFiler />
      <Container>
        <Row>
          <Col sm={3}>
            <FilterJobs />
          </Col>
          <Col>
            <JobPost />
            <JobPost />
            <JobPost />
            <JobPost />
            <JobPost />
            <JobPost />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindJobPage;
