import React from "react";
import { Card, Container } from "react-bootstrap";

const SavedJobs = () => {
  return (
    <Container fluid>
      <h4 className="fw-semibold p-0 m-0 mb-3">Saved Jobs</h4>
      <Container fluid>
        <Card className="border-0 shadow-sm mb-2 bg-light">
          <Card.Body>
            <Card.Title>Jobs Title</Card.Title>
            <Card.Text className="text-truncate">
              {`Your application for the 'Sales Admin' role at Cecil grocery inc.
              didn’t meet the criteria."`}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default SavedJobs;
