"use client";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addSkill, removeSkill } from "@/redux/slices/resumeSlice";
import { Card, Form, Button, Badge, ListGroup } from "react-bootstrap";

const Skills = () => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.resumeBuilder.skills);
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addSkill(inputValue));
      setInputValue("");
    }
  };

  const handleDeleteSkill = (index: number) => {
    dispatch(removeSkill(index));
  };

  return (
    <Card className="border-0">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Skills</Card.Title>
        <Form onSubmit={handleAddSkill} className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>Add Your Skills</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Enter a skill..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button type="submit" variant="primary">
                Add
              </Button>
            </div>
          </Form.Group>

          {skills.length > 0 && (
            <div>
              <h6 className="mb-2">Your Skills:</h6>
              <ListGroup>
                {skills.map((skill, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{skill}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteSkill(index)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Skills;
