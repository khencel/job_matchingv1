"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep3,
  RegisterEmployerStep3Data,
  goNextStep,
} from "@/redux/slices/register/employerSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function RegisterEmployerStep3() {
  const dispatch = useAppDispatch();
  const t = useTranslations("registerEmployerStep3");
  const contactPerson = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.contactPerson
  );

  const [data, setData] = useState<RegisterEmployerStep3Data>(contactPerson);
  const [error, setError] = useState<{ [name: string]: boolean }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Clear error for the field on change
    setError((prevError) => ({ ...prevError, [name]: false }));

    // Update local state and Redux store
    setData((prev) => ({ ...prev, [name]: value }));
    dispatch(saveRegEmployerStep3({ ...data, [name]: value }));
  };

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const idPhoneNumberValid = (phoneNumber: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = (e: FormEvent) => {
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

    // Validate contact name
    if (!data.name || data.name.trim().length < 3 || data.name.trim().length > 100) {
      validationErrors.name = true;
      hasError = true;
    }

    // Validate department name
    if (!data.departmentName || data.departmentName.trim().length < 3 || data.departmentName.trim().length > 100) {
      validationErrors.departmentName = true;
      hasError = true;
    }

    // Validate phone number
    if (!data.phoneNumber || !idPhoneNumberValid(data.phoneNumber.trim())) {
      validationErrors.phoneNumber = true;
      hasError = true;
    }

    // Validate email
    if (!data.emailAddress || !isEmailValid(data.emailAddress.trim())) {
      validationErrors.emailAddress = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = form.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      if (errorElement) errorElement.focus();
      return;
    }

    // All validations passed - save data and show success message
    setError({});
    Swal.fire({
      icon: "success",
      title: "Company Information Submitted",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });

    dispatch(saveRegEmployerStep3(data));
    dispatch(goNextStep(4));
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h4 className="mb-5 text-center">{t("title")}</h4>
      {/* Contact Information */}
      <div className="mb-4">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>{t("labels.name")}</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder={t("placeholders.enterFullName")}
            value={data.name}
            onChange={handleChange}
            isInvalid={
              error.name ||
              (data.name.trim().length > 0 &&
                (data.name.trim().length < 3 || data.name.trim().length > 100))
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidName")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="departmentName">
          <Form.Label>{t("labels.departmentName")}</Form.Label>
          <Form.Control
            type="text"
            name="departmentName"
            placeholder={t("placeholders.enterDeptName")}
            value={data.departmentName}
            onChange={handleChange}
            required
            isInvalid={
              error.departmentName ||
              (data.departmentName.trim().length > 0 &&
                (data.departmentName.trim().length < 3 ||
                  data.departmentName.trim().length > 100))
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
              error.phoneNumber ||
              (data.phoneNumber.trim().length > 0 &&
                !idPhoneNumberValid(data.phoneNumber.trim()))
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidPhoneNumber")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="emailAddress">
          <Form.Label>{t("labels.emailAddress")}</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            placeholder={t("placeholders.enterEmailAddress")}
            value={data.emailAddress}
            onChange={handleChange}
            required
            isInvalid={
              error.emailAddress ||
              (data.emailAddress.trim().length > 0 &&
                !isEmailValid(data.emailAddress.trim()))
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("errors.invalidEmail")}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <Form.Text className="fw-light mb-4">
          {t("helpers.contactInfoNote")}
        </Form.Text>
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          {t("buttons.next")}
        </Button>
      </div>
    </Form>
  );
}
