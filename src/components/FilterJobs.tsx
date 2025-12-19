"use client";

import { Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { industries } from "./registration/employer/RegisterEmployerStep2";

const FilterJobs = () => {
  return (
    <Card className="p-2 h-100 my-5 overflow-auto">
      <Card.Header className="d-flex justify-content-between bg-body">
        <Card.Title className="p-0 my-auto">Job Filter</Card.Title>
        <Button variant="link" className="p-0 text-danger">
          Clear Filters
        </Button>
      </Card.Header>
      <Card.Body>
        {/* Filter for Job Types */}
        <Form.Group>
          <Form.Label className="primary-text">Job Type</Form.Label>
          {["Full-time", "Part-time", "Remote", "Internship"].map((type) => (
            <Form.Check key={type} label={type} id={type} />
          ))}
        </Form.Group>
        <hr />
        {/* Filter for Work Experience */}
        <Form.Group>
          <Form.Label className="primary-text">Work Experience</Form.Label>
          {[
            "Fresh Graduate",
            "1 to 2 years",
            "2 - 4 years",
            "5 years and above",
          ].map((xp) => (
            <Form.Check key={xp} label={xp} name={xp} id={xp} />
          ))}
        </Form.Group>
        <hr />
        {/* Filter for Industry */}
        <Form.Group>
          <Form.Label className="primary-text">Work Experience</Form.Label>
          {industries
            .filter((type) => type !== "Other")
            .map((type) => (
              <Form.Check key={type} label={type} name={type} id={type} />
            ))}
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Label className="primary-text">Salary</Form.Label>
          <div className="d-flex justify-content-between">
            <Form.Control type="number" placeholder="min"></Form.Control>
            <p className="text-center mx-auto w-25 fw-bold">-</p>
            <Form.Control type="number" placeholder="max"></Form.Control>
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterJobs;
