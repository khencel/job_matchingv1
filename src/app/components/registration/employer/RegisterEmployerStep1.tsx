"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep1,
  RegisterEmployerStep1Data,
  goNextStep,
} from "@/redux/slices/register/employerSlice";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

export default function RegisterEmployerStep1() {
  const t = useTranslations("registerEmployerStep1");
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.accountInfo
  );

  // State management for password visibility and form data
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<{ [name: string]: boolean }>({});
  const [data, setData] = useState<RegisterEmployerStep1Data>(accountInfo);

  // Handle input changes and update Redux store
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    // Reset error for specific field when the input changes
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "rememberMe") {
      setRememberMe(checked);
    } else {
      // Update email or password in data
      setData({
        ...data,
        [name]: value,
      });
      dispatch(saveRegEmployerStep1({ ...data, [name]: value }));
    }
  };

  // Validate email format using regex
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password requirements (minimum 8 characters)
  const isPasswordValid = (password: string): boolean => {
    return password.length >= 8;
  };

  // Validate password match
  const isPasswordMatch = (password: string, confirm: string): boolean => {
    return password === confirm && password.length > 0;
  };

  // Handle form submission with validation
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    // Check if form is valid
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
    // Additional validation checks
    if (!isEmailValid(data.email)) {
      setError({ email: true });
      const emailField = form.querySelector("[name='email']") as HTMLElement;
      if (emailField) emailField.focus();
      return;
    }

    if (!isPasswordValid(data.password)) {
      setError({ password: true });
      const passwordField = form.querySelector(
        "[name='password']"
      ) as HTMLElement;
      if (passwordField) passwordField.focus();
      return;
    }

    if (!isPasswordMatch(data.password, confirmPassword)) {
      setError({ confirmPassword: true });
      const confirmField = form.querySelector(
        "[name='confirmPassword']"
      ) as HTMLElement;
      if (confirmField) confirmField.focus();
      return;
    }
    // All validations passed - save data and show success message
    setError({});
    dispatch(saveRegEmployerStep1(data));
    // Show success toast notification
    Swal.fire({
      icon: "success",
      title: "Account Information Submitted",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(goNextStep(2));
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center">{t("title")}</h4>

      {/* Email Address Field */}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>{t("labels.email")}</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          placeholder={t("placeholders.enterEmail")}
          value={data.email}
          onChange={handleChange}
          autoFocus
          isInvalid={
            error.email || (data.email.length > 0 && !isEmailValid(data.email))
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.invalidEmail")}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Password Field */}
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>{t("labels.password")}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={t("placeholders.enterPassword")}
            value={data.password}
            onChange={handleChange}
            isInvalid={
              error.password ||
              (data.password.length > 0 && !isPasswordValid(data.password))
            }
          />
          <Button
            variant="outline-secondary"
            size="sm"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeIcon size="16" /> : <EyeOffIcon size="16" />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {t("errors.passwordTooShort")}
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Text className="text-muted">
          {t("helpers.passwordMinLength")}
        </Form.Text>
      </Form.Group>

      {/* Confirm Password Field */}
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>{t("labels.confirmPassword")}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder={t("placeholders.confirmYourPassword")}
            value={confirmPassword}
            onChange={handleChange}
            isInvalid={
              error.confirmPassword ||
              (confirmPassword.length > 0 &&
                !isPasswordMatch(data.password, confirmPassword))
            }
          />
          <Button
            variant="outline-secondary"
            size="sm"
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <EyeIcon size="16" />
            ) : (
              <EyeOffIcon size="16" />
            )}
          </Button>
          <Form.Control.Feedback type="invalid">
            {t("errors.passwordMismatch")}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* Remember Me Checkbox */}
      <Form.Group className="mb-3" controlId="formRememberMe">
        <Form.Check
          type="checkbox"
          name="rememberMe"
          label={t("labels.rememberMe")}
          checked={rememberMe}
          onChange={handleChange}
          isValid={false}
        />
      </Form.Group>

      {/* Submit Button and Account Confirmation Note */}
      <div className="d-grid">
        <Form.Text className="fw-light mb-3">
          {t("helpers.accountConfirmNote")}
        </Form.Text>
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          {t("buttons.next")}
        </Button>
      </div>
    </Form>
  );
}
