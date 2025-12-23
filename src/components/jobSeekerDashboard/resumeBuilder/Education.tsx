"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { goNextResumeTab, updateEducation } from "@/redux/slices/resumeSlice";
import React, { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";

const Education = () => {
  const dispatch = useAppDispatch();
  const education = useAppSelector((s) => s.resumeBuilder.education);

  type LevelKey = keyof typeof education; // 'primary' | 'secondary' | 'tertiary'
  type FieldError = { schoolName?: string; yearGraduated?: string };
  type FormErrors = Record<LevelKey, FieldError>;

  const [formErrors, setFormErrors] = useState<FormErrors>({
    primary: {},
    secondary: {},
    tertiary: {},
  });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const name = e.currentTarget.name; // e.g., "primary.schoolName"
    const [lvl, fld] = name.split(".");

    if (!lvl || !fld) return;

    type EducationLevelKey = keyof typeof education; // 'primary' | 'secondary' | 'tertiary'
    type EducationFieldKey = keyof typeof education.primary; // 'schoolName' | 'yearGraduated' | 'isFinished' | 'isNotFinished'

    const levelKey = lvl as EducationLevelKey;
    const fieldKey = fld as EducationFieldKey;

    const isCheckbox = e.currentTarget.type === "checkbox";
    const rawValue = isCheckbox
      ? (e.currentTarget as HTMLInputElement).checked
      : e.currentTarget.value;

    const coercedValue =
      fieldKey === "isNotFinished" ? Boolean(rawValue) : String(rawValue);

    const updatedLevel = {
      ...education[levelKey],
      [fieldKey]: coercedValue,
    } as (typeof education)[EducationLevelKey];

    dispatch(
      updateEducation({
        [levelKey]: updatedLevel,
      })
    );

    // Clear error for the edited field
    if (fieldKey === "schoolName" || fieldKey === "yearGraduated") {
      setFormErrors((prev) => ({
        ...prev,
        [levelKey]: { ...prev[levelKey], [fieldKey]: undefined },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const nextErrors: FormErrors = { primary: {}, secondary: {}, tertiary: {} };

    // Check if all levels are marked as not finished
    const allNotFinished = (Object.keys(education) as LevelKey[]).every(
      (level) => education[level].isNotFinished
    );

    // If all are not finished, clear errors and allow submission
    if (allNotFinished) {
      setFormErrors({ primary: {}, secondary: {}, tertiary: {} });
      console.log("Education Resume valid:", education);
      dispatch(goNextResumeTab("lang-level"));
      return;
    }

    (Object.keys(education) as LevelKey[]).forEach((level) => {
      const lvl = education[level];
      const isNotFinished = lvl.isNotFinished;
      const yearStr = (lvl.yearGraduated ?? "").toString().trim();
      const schoolNameStr = (lvl.schoolName ?? "").trim();

      // Validate School Name
      if (!isNotFinished) {
        // Required when not finished
        if (schoolNameStr.length === 0) {
          nextErrors[level].schoolName = "School name is required.";
        }
      }
      // If isNotFinished is checked, school name is optional (no validation)

      // Validate Year Graduated
      if (!isNotFinished) {
        // Required when not finished, must be valid 4-digit year
        if (yearStr.length === 0) {
          nextErrors[level].yearGraduated = "Year is required.";
        } else if (!/^\d{4}$/.test(yearStr)) {
          nextErrors[level].yearGraduated = "Enter a valid 4-digit year.";
        } else {
          const yearNum = Number(yearStr);
          if (yearNum < 1900) {
            nextErrors[level].yearGraduated = "Year must be 1900 or later.";
          } else if (yearNum > currentYear) {
            nextErrors[
              level
            ].yearGraduated = `Year cannot be greater than ${currentYear}.`;
          }
        }
      } else if (yearStr.length > 0) {
        // If isNotFinished is checked but year is provided, validate format and range
        if (!/^\d{4}$/.test(yearStr)) {
          nextErrors[level].yearGraduated = "Enter a valid 4-digit year.";
        } else {
          const yearNum = Number(yearStr);
          if (yearNum < 1900) {
            nextErrors[level].yearGraduated = "Year must be 1900 or later.";
          } else if (yearNum > currentYear) {
            nextErrors[
              level
            ].yearGraduated = `Year cannot be greater than ${currentYear}.`;
          }
        }
      }
      // If isNotFinished is checked and year is empty, no validation needed
    });

    const hasErrors = Object.values(nextErrors).some(
      (lvl) => Object.keys(lvl).length > 0
    );

    if (hasErrors) {
      setFormErrors(nextErrors);
      return;
    }

    // Proceed to next step or save data
    console.log("Education Resume valid:", education);
    dispatch(goNextResumeTab("lang-level"));
  };

  const educationLevel = [
    {
      id: "primary",
      label: "Primary Education",
      schoolName: education.primary.schoolName,
      yearGraduated: education.primary.yearGraduated,
      isNotFinished: education.primary.isNotFinished,
    },
    {
      id: "secondary",
      label: "Secondary Education",
      schoolName: education.secondary.schoolName,
      yearGraduated: education.secondary.yearGraduated,
      isNotFinished: education.secondary.isNotFinished,
    },
    {
      id: "tertiary",
      label: "Tertiary Education",
      schoolName: education.tertiary.schoolName,
      yearGraduated: education.tertiary.yearGraduated,
      isNotFinished: education.tertiary.isNotFinished,
    },
  ];

  return (
    <Card className="border-0 ">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Education</Card.Title>
        <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          {educationLevel.map((item) => (
            <Form.Group key={item.id} controlId={item.id}>
              <Form.Label>{item.label}</Form.Label>
              <Stack gap={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter School Name"
                  name={`${item.id}.schoolName`}
                  value={item.schoolName}
                  onChange={handleChange}
                  isInvalid={!!formErrors[item.id as LevelKey]?.schoolName}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors[item.id as LevelKey]?.schoolName}
                </Form.Control.Feedback>
                <Form.Control
                  type="number"
                  placeholder={`Enter Year ${
                    item.isNotFinished ? "Stopped" : "Graduated"
                  } (4 digits)`}
                  name={`${item.id}.yearGraduated`}
                  value={item.yearGraduated}
                  onChange={handleChange}
                  isInvalid={!!formErrors[item.id as LevelKey]?.yearGraduated}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors[item.id as LevelKey]?.yearGraduated}
                </Form.Control.Feedback>
                <small>
                  <Form.Check
                    type="checkbox"
                    label={`Check if you didn't finish ${item.label}`}
                    className="text-primary fst-italic mt-2"
                    name={`${item.id}.isNotFinished`}
                    checked={item.isNotFinished}
                    onChange={handleChange}
                  />
                </small>
              </Stack>
            </Form.Group>
          ))}
          <Button className="btn-primary-custom" type="submit">
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Education;
