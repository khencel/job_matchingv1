"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { isEmailValid, isPhoneNumberValid } from "@/helper/validations";
import { RegisterSuperVisoryStep3Data } from "@/redux/slices/register/super-visory/superVisorySlice";

interface ContactPersonFormProps {
  initialValues: RegisterSuperVisoryStep3Data;
  onSubmit: (data: RegisterSuperVisoryStep3Data) => void;
  submitLabel?: string;
}

export default function ContactPersonForm({
  initialValues,
  onSubmit,
  submitLabel,
}: ContactPersonFormProps) {
  const t = useTranslations("registerSupervisoryStep3");

  const [data, setData] = useState<RegisterSuperVisoryStep3Data>(
    initialValues || { name: "", department: "", phoneNumber: "", email: "" }
  );

  const [error, setError] = useState<{ [name: string]: boolean }>({});

  useEffect(() => {
    setData(initialValues);
  }, [initialValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      e.stopPropagation();

      const invalidFields = form.querySelectorAll(":invalid");
      const newErrors: Record<string, boolean> = {};

      invalidFields.forEach((field) => {
        const input = field as HTMLInputElement;
        if (input.name) {
          newErrors[input.name] = true;
        }
      });
      setError(newErrors);

      const firstInvalidField = form.querySelector(":invalid") as HTMLElement;
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    // custom validation
    let hasError = false;
    const validationErrors: Record<string, boolean> = {};

    if (
      !data.name ||
      data.name.trim().length < 2 ||
      data.name.trim().length > 100
    ) {
      validationErrors.name = true;
      hasError = true;
    }

    if (
      !data.department ||
      data.department.trim().length < 2 ||
      data.department.trim().length > 100
    ) {
      validationErrors.department = true;
      hasError = true;
    }

    if (!data.phoneNumber || !isPhoneNumberValid(data.phoneNumber)) {
      validationErrors.phoneNumber = true;
      hasError = true;
    }

    if (!data.email || !isEmailValid(data.email)) {
      validationErrors.email = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = form.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement;
      if (errorElement) errorElement.focus();
      return;
    }

    setError({});
    onSubmit(data);
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center">{t("title")}</h4>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>{t("labels.name")}</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder={t("placeholders.enterName")}
          value={data.name}
          onChange={handleChange}
          autoFocus
          required
          minLength={2}
          maxLength={100}
          isInvalid={
            !!error.name ||
            (data.name.length > 0 &&
              (data.name.length < 2 || data.name.length > 100))
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.invalidName")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="department">
        <Form.Label>{t("labels.department")}</Form.Label>
        <Form.Control
          type="text"
          name="department"
          placeholder={t("placeholders.enterDepartment")}
          value={data.department}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={100}
          isInvalid={
            !!error.department ||
            (data.department.length > 0 &&
              (data.department.length < 2 || data.department.length > 100))
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.invalidDepartmentName")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>{t("labels.phoneNumber")}</Form.Label>
        <Form.Control
          type="tel"
          name="phoneNumber"
          placeholder={t("placeholders.enterPhoneNumber")}
          value={data.phoneNumber}
          onChange={handleChange}
          required
          isInvalid={
            !!error.phoneNumber ||
            (data.phoneNumber.length > 0 &&
              !isPhoneNumberValid(data.phoneNumber))
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.invalidPhoneNumber")}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>{t("labels.email")}</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder={t("placeholders.enterEmail")}
          value={data.email}
          onChange={handleChange}
          required
          isInvalid={
            !!error.email ||
            (data.email.length > 0 && !isEmailValid(data.email))
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.invalidEmail")}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid">
        <Form.Text className="fw-light fst-italic text-center text-muted mb-3">
          {t("helpers.contactInfoNote")}
        </Form.Text>
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          {submitLabel || t("buttons.next")}
        </Button>
      </div>
    </Form>
  );
}
