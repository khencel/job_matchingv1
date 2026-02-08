"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { isEmailValid, isPhoneNumberValid } from "@/helper/validations";
import { RegisterEmployerStep3Data } from "@/types/employer";
import {
  goNextStep,
  saveRegEmployerStep3,
} from "@/redux/slices/register/employer/employerSlice";

export default function RegisterEmployerStep3() {
  const dispatch = useAppDispatch();
  const t = useTranslations("registerEmployerStep3");
  const contactPerson = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.contact_person,
  );

  const [data, setData] = useState<RegisterEmployerStep3Data>(contactPerson);
  const [error, setError] = useState<{ [name: string]: boolean }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // Clear error for the field on change
    setError((prevError) => ({ ...prevError, [name]: false }));

    // Update local state and Redux store
    setData((prev) => ({ ...prev, [name]: value }));
    dispatch(saveRegEmployerStep3({ ...data, [name]: value }));
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
    if (
      !data.name ||
      data.name.trim().length < 3 ||
      data.name.trim().length > 100
    ) {
      validationErrors.name = true;
      hasError = true;
    }

    // Validate department name
    if (
      !data.department_name ||
      data.department_name.trim().length < 3 ||
      data.department_name.trim().length > 100
    ) {
      validationErrors.department_name = true;
      hasError = true;
    }

    // Validate phone number
    if (!data.phone || !isPhoneNumberValid(data.phone.trim())) {
      validationErrors.phone = true;
      hasError = true;
    }

    // Validate email
    if (!data.email || !isEmailValid(data.email.trim())) {
      validationErrors.email = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = form.querySelector(
        `[name="${firstErrorField}"]`,
      ) as HTMLElement;
      if (errorElement) errorElement.focus();
      return;
    }

    // All validations passed - save data and show success message
    setError({});
    Swal.fire({
      icon: "success",
      title: t("toast.successTitle"),
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
            name="department_name"
            placeholder={t("placeholders.enterDeptName")}
            value={data.department_name}
            onChange={handleChange}
            required
            isInvalid={
              error.department_name ||
              (data.department_name.trim().length > 0 &&
                (data.department_name.trim().length < 3 ||
                  data.department_name.trim().length > 100))
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
            name="phone"
            placeholder={t("placeholders.enterPhoneNumber")}
            value={data.phone}
            onChange={handleChange}
            required
            isInvalid={
              error.phone ||
              (data.phone.trim().length > 0 &&
                !isPhoneNumberValid(data.phone.trim()))
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
            name="email"
            placeholder={t("placeholders.enterEmailAddress")}
            value={data.email}
            onChange={handleChange}
            required
            isInvalid={
              error.email ||
              (data.email.trim().length > 0 && !isEmailValid(data.email.trim()))
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
