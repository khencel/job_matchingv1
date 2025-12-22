"use client";
import { Button, Card, Form, Stack } from "react-bootstrap";

const Education = () => {
  return (
    <Card className="border-0 ">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Education</Card.Title>
        <Form className="d-flex flex-column gap-3">
          {educationLevel.map((item) => (
            <Form.Group key={item.label}>
              <Form.Label>{item.label}</Form.Label>
              <Stack gap={2}>
                <Form.Control type="text" placeholder="Enter School Name" />
                <Form.Control
                  type="number"
                  placeholder="Enter Year Graduated"
                />
                <small>
                  <Form.Check
                    type="checkbox"
                    label={`Check if you didn't finish ${item.label}`}
                    className="text-primary fst-italic mt-2"
                  />
                </small>
              </Stack>
            </Form.Group>
          ))}
          <Button className="btn-primary-custom">Next</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Education;

const educationLevel = [
  {
    label: "Primary Education",
  },
  {
    label: "Secondary Education",
  },
  {
    label: "Tertiary Education",
  },
];
