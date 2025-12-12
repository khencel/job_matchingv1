import FilterJobs from "@/components/FilterJobs";
import JobPost from "@/components/JobPost";
import JobSearchFiler from "@/components/JobSearchFilter";
import Navbar from "@/components/Navbar";
import { Col, Container, Row } from "react-bootstrap";

const FindJobPage = () => {
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
            <div className="p-4">
              <FilterJobs />
            </div>
          </Col>
          <Col style={{ height: "100%", overflowY: "auto" }}>
            <div>
              <JobPost />
              <JobPost />
              <JobPost />
              <JobPost />
              <JobPost />
              <JobPost />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindJobPage;
