"use client";
import { PlusIcon, XCircleIcon, XIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Badge, Button, Card, Container, Form } from "react-bootstrap";

interface Level {
  id: string;
  label: string;
  levels: string[];
}

const japaneseLevel = ["N5", "N4", "N3", "N2", "N1"];
const normalLevel = [
  "Novice",
  "Intermediate",
  "Advanced",
  "Superior",
  "Distinguished",
];

const level: Level[] = [
  {
    id: "japanese-level",
    label: "Japanese Level",
    levels: japaneseLevel,
  },
  {
    id: "reading-level",
    label: "Reading Level",
    levels: normalLevel,
  },
  {
    id: "writing-level",
    label: "Writing Level",
    levels: normalLevel,
  },
  {
    id: "speaking-level",
    label: "Speaking Level",
    levels: normalLevel,
  },
];

const LanguageLevel = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");

  const handleAddLanguage = () => {
    const value = languageInput.trim();
    if (!value) return;

    setLanguages((prev) => [...prev, value]);
    setLanguageInput("");
  };

  const handleRemoveLanguage = (value: string) => {
    setLanguages((prev) => prev.filter((item) => item !== value));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Language Skill</Card.Title>
        <Form className="d-flex flex-column gap-3">
          {level.map((item) => (
            <Form.Group key={item.id} className="mb-2">
              <Form.Label>{item.label}</Form.Label>
              <Form.Select aria-label="Select a level">
                <option>Select Level</option>
                {item.levels.map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </Form.Select>
            </Form.Group>
          ))}
          <Form.Group>
            <Form.Label>Other Languages</Form.Label>
            <div className="d-flex flex-column gap-2 flex-grow-1">
              {languages.length <= 0 ? (
                ""
              ) : (
                <Container className="d-flex gap-2 border rounded-3 p-2">
                  {languages.map((item, index) => (
                    <Badge
                      bg="light"
                      text="dark"
                      className="border shadow-sm d-flex align-items-center gap-1"
                      key={index}
                    >
                      {item}
                      <Button
                        size="sm"
                        variant="link"
                        className="p-0 d-flex align-items-center"
                        aria-label={`Remove ${item}`}
                        onClick={() => handleRemoveLanguage(item)}
                      >
                        <XCircleIcon
                          size={16}
                          className="border-0 bg-transparent text-danger"
                        />
                      </Button>
                    </Badge>
                  ))}
                </Container>
              )}
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Add Language"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                />
                <Button size="sm" onClick={handleAddLanguage}>
                  <PlusIcon />
                </Button>
              </div>
            </div>
          </Form.Group>
          <Button
            type="submit"
            className="btn-primary-custom"
            onClick={handleSubmit}
          >
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LanguageLevel;
