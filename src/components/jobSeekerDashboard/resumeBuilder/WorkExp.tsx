"use client";
import { Button, Card, Form } from "react-bootstrap";

const WorkExp = () => {
  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Construction",
    "Hospitality",
    "Transportation",
    "Other",
  ];

  const employmentTypes = [
    "Full-Time",
    "Part-Time",
    "Contract",
    "Freelance",
    "Temporary",
    "Internship",
  ];

  return (
    <Card className="border-0">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Work Experience</Card.Title>
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>Industry</Form.Label>
            <Form.Select aria-label="Select Industry">
              <option>Select Industry</option>
              {industries.map((industry) => (
                <option key={industry}>{industry}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Company Name" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" placeholder="Enter Position" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Employment Type</Form.Label>
            <Form.Select aria-label="Select Employment Type">
              <option>Select Employment Type</option>
              {employmentTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Date Started</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date Ended</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Button className="btn-primary-custom">Next</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default WorkExp;
