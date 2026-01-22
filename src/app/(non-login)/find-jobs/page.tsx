import FilterJobs from "@/components/FilterJobs";
import JobCard from "@/components/JobCard";
import JobSearchFiler from "@/components/JobSearchFilter";
import Navbar from "@/components/Navbar";
import { Col, Container, Row } from "react-bootstrap";

const FindJobPage = () => {
  // TODO: Fetch job postings and map them to JobCard components
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
            <div className="py-4 px-2"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindJobPage;
