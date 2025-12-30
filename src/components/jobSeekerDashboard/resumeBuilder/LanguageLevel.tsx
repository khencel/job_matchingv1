"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { goNextResumeTab, updateLanguage } from "@/redux/slices/resumeSlice";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Badge, Button, Card, Container, Form } from "react-bootstrap";

const japaneseLevel = ["N5", "N4", "N3", "N2", "N1"];
const normalLevel = [
  "Novice",
  "Intermediate",
  "Advanced",
  "Superior",
  "Distinguished",
];

const LanguageLevel = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((s) => s.resumeBuilder.language);

  type FormErrors = {
    japaneseLevel?: string;
    readingLevel?: string;
    writingLevel?: string;
    speakingLevel?: string;
  };

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [languages, setLanguages] = useState<string[]>(
    language.otherLanguages ?? []
  );
  const [languageInput, setLanguageInput] = useState("");

  // Sync languages array to Redux whenever it changes
  useEffect(() => {
    dispatch(updateLanguage({ otherLanguages: languages }));
  }, [languages, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(updateLanguage({ [name]: value }));

    // Clear error for the edited field
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

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

    const nextErrors: FormErrors = {};

    // Validate Japanese Level
    if (!language.japaneseLevel || language.japaneseLevel === "") {
      nextErrors.japaneseLevel = "Japanese level is required.";
    }

    // Validate Reading Level
    if (!language.readingLevel || language.readingLevel === "") {
      nextErrors.readingLevel = "Reading level is required.";
    }

    // Validate Writing Level
    if (!language.writingLevel || language.writingLevel === "") {
      nextErrors.writingLevel = "Writing level is required.";
    }

    // Validate Speaking Level
    if (!language.speakingLevel || language.speakingLevel === "") {
      nextErrors.speakingLevel = "Speaking level is required.";
    }

    const hasErrors = Object.keys(nextErrors).length > 0;

    if (hasErrors) {
      setFormErrors(nextErrors);
      return;
    }

    // Proceed to next step
    console.log("Language data valid:", language);
    dispatch(goNextResumeTab("work-xp"));
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Language Skill</Card.Title>
        <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Japanese Level</Form.Label>
            <Form.Select
              aria-label="Select Japanese level"
              name="japaneseLevel"
              value={language.japaneseLevel}
              onChange={handleChange}
              isInvalid={!!formErrors.japaneseLevel}
            >
              <option value="">Select Level</option>
              {japaneseLevel.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formErrors.japaneseLevel}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Reading Level</Form.Label>
            <Form.Select
              aria-label="Select reading level"
              name="readingLevel"
              value={language.readingLevel}
              onChange={handleChange}
              isInvalid={!!formErrors.readingLevel}
            >
              <option value="">Select Level</option>
              {normalLevel.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formErrors.readingLevel}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Writing Level</Form.Label>
            <Form.Select
              aria-label="Select writing level"
              name="writingLevel"
              value={language.writingLevel}
              onChange={handleChange}
              isInvalid={!!formErrors.writingLevel}
            >
              <option value="">Select Level</option>
              {normalLevel.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formErrors.writingLevel}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Speaking Level</Form.Label>
            <Form.Select
              aria-label="Select speaking level"
              name="speakingLevel"
              value={language.speakingLevel}
              onChange={handleChange}
              isInvalid={!!formErrors.speakingLevel}
            >
              <option value="">Select Level</option>
              {normalLevel.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formErrors.speakingLevel}
            </Form.Control.Feedback>
          </Form.Group>
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
          <Button type="submit" className="btn-primary-custom">
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LanguageLevel;
