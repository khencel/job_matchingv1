"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegSuperVisoryStep3,
  RegisterSuperVisoryStep3Data,
  goNextStep,
} from "@/redux/slices/register/superVisorySlice";
import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

export default function RegisterSuperVisoryStep3() {
  const dispatch = useAppDispatch();
  const t = useTranslations("registerSupervisoryStep3");
  const contactPersonInfo = useAppSelector(
    (s) => s.registerSuperVisory.registerSuperVisoryData.contactPersonInfo
  );

  const [data, setData] = useState<RegisterSuperVisoryStep3Data>(
    contactPersonInfo || {
      name: "",
      department: "",
      phoneNumber: "",
      email: "",
    }
  );

  const [error, setError] = useState<{ [name: string]: boolean }>({});

  const isEmailValid = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPhoneNumberValid = (phoneNumber: string): boolean => {
    return (
      phoneNumber.length >= 7 &&
      phoneNumber.length <= 15 &&
      !isNaN(Number(phoneNumber))
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    // First validation: Check HTML5 form validity
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

      // Find and focus on first invalid field
      const firstInvalidField = form.querySelector(":invalid") as HTMLElement;
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Second validation: Check custom business logic
    let hasError = false;
    const validationErrors: Record<string, boolean> = {};

    // Validate name
    if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100) {
      validationErrors.name = true;
      hasError = true;
    }

    // Validate department
    if (!data.department || data.department.trim().length < 2 || data.department.trim().length > 100) {
      validationErrors.department = true;
      hasError = true;
    }

    // Validate phone number
    if (!data.phoneNumber || !isPhoneNumberValid(data.phoneNumber)) {
      validationErrors.phoneNumber = true;
      hasError = true;
    }

    // Validate email
    if (!data.email || !isEmailValid(data.email)) {
      validationErrors.email = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      // Focus on first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = form.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement;
      if (errorElement) errorElement.focus();
      return;
    }

    // All validations passed - save data and show success message
    setError({});
    dispatch(saveRegSuperVisoryStep3(data));
    Swal.fire({
      icon: "success",
      title: t("messages.success"),
      text: t("messages.contactPersonSaved"),
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(goNextStep(4));
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
            (data.phoneNumber.length > 0 && !isPhoneNumberValid(data.phoneNumber))
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
            !!error.email || (data.email.length > 0 && !isEmailValid(data.email))
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
          {t("buttons.next")}
        </Button>
      </div>
    </Form>
  );
}
