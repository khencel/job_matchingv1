"use client";
import { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";

const Skills = () => {
  const [skills, setSkills] = useState("");
  const maxLength = 200;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setSkills(value);
    }
  };

  return (
    <Card className="border-0">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Skills</Card.Title>
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>Describe Your Skills</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your skills..."
              value={skills}
              onChange={handleChange}
              maxLength={maxLength}
            />
            <small className="text-muted d-block mt-2">
              {skills.length}/{maxLength} characters
            </small>
          </Form.Group>

          <Button className="btn-primary-custom">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Skills;
