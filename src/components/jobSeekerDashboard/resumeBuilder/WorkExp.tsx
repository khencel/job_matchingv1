"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addWorkExperience,
  goNextResumeTab,
  removeWorkExperience,
  updateWorkExperience,
} from "@/redux/slices/resumeSlice";
import { Trash2Icon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";

const WorkExp = () => {
  const dispatch = useAppDispatch();
  const workExperience = useAppSelector((s) => s.resumeBuilder.workExperience);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  type FormErrors = {
    industry?: string;
    companyName?: string;
    position?: string;
    employmentType?: string;
    dateStarted?: string;
    dateEnded?: string;
  };

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleAddWorkExperience = () => {
    dispatch(addWorkExperience());
    setSelectedIndex(workExperience.length);
  };

  const handleRemoveWorkExperience = (index: number) => {
    dispatch(removeWorkExperience(index));
    if (selectedIndex === index && workExperience.length > 1) {
      setSelectedIndex(0);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => { 
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    dispatch(updateWorkExperience({ index, field: name, value }));

    // Clear error for the edited field
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    const currentYear = new Date().getFullYear();

    // Validate all work experience entries
    if (workExperience.length === 0) {
      nextErrors.industry = "Please add at least one work experience.";
      setFormErrors(nextErrors);
      return;
    }

    for (let i = 0; i < workExperience.length; i++) {
      const exp = workExperience[i];

      if (!exp.industry || exp.industry.trim().length === 0) {
        nextErrors.industry = "Industry is required.";
        setSelectedIndex(i);
        break;
      }

      if (!exp.companyName || exp.companyName.trim().length === 0) {
        nextErrors.companyName = "Company name is required.";
        setSelectedIndex(i);
        break;
      }

      if (!exp.position || exp.position.trim().length === 0) {
        nextErrors.position = "Position is required.";
        setSelectedIndex(i);
        break;
      }

      if (!exp.employmentType || exp.employmentType.trim().length === 0) {
        nextErrors.employmentType = "Employment type is required.";
        setSelectedIndex(i);
        break;
      }

      if (!exp.dateStarted || exp.dateStarted.trim().length === 0) {
        nextErrors.dateStarted = "Start date is required.";
        setSelectedIndex(i);
        break;
      } else {
        const startYear = new Date(exp.dateStarted).getFullYear();
        if (Number.isNaN(startYear)) {
          nextErrors.dateStarted = "Start date is invalid.";
          setSelectedIndex(i);
          break;
        }
        if (startYear > currentYear) {
          nextErrors.dateStarted = `Start year cannot be greater than ${currentYear}.`;
          setSelectedIndex(i);
          break;
        }
      }

      if (!exp.dateEnded || exp.dateEnded.trim().length === 0) {
        nextErrors.dateEnded = "End date is required.";
        setSelectedIndex(i);
        break;
      } else {
        const endYear = new Date(exp.dateEnded).getFullYear();
        if (Number.isNaN(endYear)) {
          nextErrors.dateEnded = "End date is invalid.";
          setSelectedIndex(i);
          break;
        }
        if (endYear > currentYear) {
          nextErrors.dateEnded = `End year cannot be greater than ${currentYear}.`;
          setSelectedIndex(i);
          break;
        }
      }

      if (exp.dateStarted && exp.dateEnded < exp.dateStarted) {
        nextErrors.dateEnded = "End date must be after or equal to start date.";
        setSelectedIndex(i);
        break;
      }
    }

    const hasErrors = Object.keys(nextErrors).length > 0;

    if (hasErrors) {
      setFormErrors(nextErrors);
      return;
    }

    // Proceed to next step
    console.log("Work Experience Resume Data:", workExperience);
    dispatch(goNextResumeTab("skills"));
  };

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

        {/* Work Experience List */}
        {workExperience.length > 0 && (
          <div className="mb-4">
            <h6 className="fw-bold mb-2">Added Work Experiences</h6>
            <ListGroup variant="flush">
              {workExperience.map((exp, index) => (
                <ListGroup.Item
                  key={index}
                  className={`d-flex justify-content-between align-items-center cursor-pointer ${
                    selectedIndex === index ? "bg-light border-primary" : ""
                  }`}
                  onClick={() => setSelectedIndex(index)}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <div className="fw-bold">
                      {exp.companyName || "Unnamed"}
                    </div>
                    <small className="text-muted">
                      {exp.position || "No position"} •{" "}
                      {exp.industry || "No industry"}
                    </small>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveWorkExperience(index);
                    }}
                  >
                    <Trash2Icon size={16} />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}

        {/* Form for editing selected work experience */}
        <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          {workExperience.length === 0 ? (
            <div className="alert alert-info">
              No work experience added yet. Click &quot;Add Work
              Experience&quot; to add one.
            </div>
          ) : (
            <>
              <h6 className="fw-bold mt-3">
                Edit Work Experience #{selectedIndex + 1}
              </h6>

              <Form.Group>
                <Form.Label>Industry</Form.Label>
                <Form.Select
                  aria-label="Select Industry"
                  name="industry"
                  value={workExperience[selectedIndex]?.industry || ""}
                  onChange={(e) => handleChange(e, selectedIndex)}
                  isInvalid={!!formErrors.industry}
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formErrors.industry}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Name"
                  name="companyName"
                  value={workExperience[selectedIndex]?.companyName || ""}
                  onChange={(e) => handleChange(e, selectedIndex)}
                  isInvalid={!!formErrors.companyName}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.companyName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Position"
                  name="position"
                  value={workExperience[selectedIndex]?.position || ""}
                  onChange={(e) => handleChange(e, selectedIndex)}
                  isInvalid={!!formErrors.position}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.position}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Employment Type</Form.Label>
                <Form.Select
                  aria-label="Select Employment Type"
                  name="employmentType"
                  value={workExperience[selectedIndex]?.employmentType || ""}
                  onChange={(e) => handleChange(e, selectedIndex)}
                  isInvalid={!!formErrors.employmentType}
                >
                  <option value="">Select Employment Type</option>
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formErrors.employmentType}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Date Started</Form.Label>
                <Form.Control
                  type="date"
                  name="dateStarted"
                  value={workExperience[selectedIndex]?.dateStarted || ""}
                  onChange={(e) => handleChange(e, selectedIndex)}
                  isInvalid={!!formErrors.dateStarted}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.dateStarted}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Date Ended</Form.Label>
                <Form.Control
                  type="date"
                  name="dateEnded"
                  value={workExperience[selectedIndex]?.dateEnded || ""}
                  onChange={(e) => handleChange(e, selectedIndex)}
                  isInvalid={!!formErrors.dateEnded}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.dateEnded}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          <div className="d-flex gap-2">
            <Button
              type="button"
              variant="outline-primary"
              onClick={handleAddWorkExperience}
            >
              + Add Work Experience
            </Button>
            <Button
              type="submit"
              className="btn-primary-custom"
              disabled={workExperience.length === 0}
            >
              Next
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default WorkExp;
