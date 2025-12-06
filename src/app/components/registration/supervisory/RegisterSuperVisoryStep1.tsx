import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  RegisterSuperVisoryStep1Props,
  saveRegSuperVisoryStep1,
  goNextStep,
} from "../../../../redux/slices/register/superVisorySlice";
import { useTranslations } from "next-intl";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";

const RegisterSuperVisoryStep1 = () => {
  const t = useTranslations("registerSuperVisoryStep1");
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(
    (s) => s.registerSuperVisory.registerSuperVisoryData.accountInfo
  );

  const [data, setData] = useState<RegisterSuperVisoryStep1Props>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<{ [name: string]: boolean }>({});

  useEffect(() => {
    setData(accountInfo);
  }, [accountInfo]);

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string): boolean => {
    return password.length >= 8;
  };

  const isPasswordMatch = (password: string, confirm: string): boolean => {
    return password === confirm && password.length > 0;
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target;
    // Clear error for the field on change
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));

    if (name === "rememberMe") {
      setRememberMe(checked);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setData({ ...data, [name]: value });
    }
  }

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

    // Validate email format
    if (!data.email || !isEmailValid(data.email)) {
      validationErrors.email = true;
      hasError = true;
    }

    // Validate password length
    if (!data.password || !isPasswordValid(data.password)) {
      validationErrors.password = true;
      hasError = true;
    }

    // Validate password match
    if (!isPasswordMatch(data.password, confirmPassword)) {
      validationErrors.confirmPassword = true;
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
    dispatch(saveRegSuperVisoryStep1(data));
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
      {/* Email Address */}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>{t("labels.email")}</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder={t("placeholders.enterEmail")}
          value={data.email}
          onChange={handleChange}
          autoFocus
          required
          isInvalid={
            error.email || (data.email.length > 0 && !isEmailValid(data.email))
          }
        />
        <Form.Control.Feedback type="invalid">
          {t("errors.invalidEmail")}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>{t("labels.password")}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={t("placeholders.enterPassword")}
            value={data.password}
            onChange={handleChange}
            required
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

      {/* Confirm Password */}
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>{t("labels.confirmPassword")}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder={t("placeholders.confirmYourPassword")}
            value={confirmPassword}
            onChange={handleChange}
            required
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
        />
      </Form.Group>

      {/* Submit Button */}
      <div className="d-grid">
        <Form.Text className="mb-3">
          {t("helpers.accountConfirmNote")}
        </Form.Text>
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          {t("buttons.next")}
        </Button>
      </div>
    </Form>
  );
};

export default RegisterSuperVisoryStep1;
