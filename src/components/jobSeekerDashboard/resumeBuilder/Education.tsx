"use client";
import { Card, Form, Stack } from "react-bootstrap";

const Education = () => {
  return (
    <Card className="border-0 ">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Education</Card.Title>
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>Primary Education</Form.Label>
            <Stack gap={2}>
              <Form.Control type="text" placeholder="Enter School Name" />
              <Form.Control type="number" placeholder="Enter Year Graduated" />
              <Form.Check
                type="checkbox"
                label="Check if you did'nt finish Primary Education"
                className="text-primary fst-italic mt-2"
              ></Form.Check>
            </Stack>
          </Form.Group>
          <Form.Group>
            <Form.Label>Secondary Education</Form.Label>
            <Stack gap={2}>
              <Form.Control type="text" placeholder="Enter School Name" />
              <Form.Control type="number" placeholder="Enter Year Graduated" />
              <Form.Check
                type="checkbox"
                label="Check if you did'nt finish Primary Education"
                className="text-primary fst-italic mt-2"
              ></Form.Check>
            </Stack>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tertiary Education</Form.Label>
            <Stack gap={2}>
              <Form.Control type="text" placeholder="Enter School Name" />
              <Form.Control type="number" placeholder="Enter Year Graduated" />
              <Form.Check
                type="checkbox"
                label="Check if you did'nt finish Primary Education"
                className="text-primary fst-italic mt-2"
              ></Form.Check>
            </Stack>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Education;
