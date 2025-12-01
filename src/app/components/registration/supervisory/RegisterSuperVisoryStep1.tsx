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

  useEffect(() => {
    setData(accountInfo);
  }, [accountInfo]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target;

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
    // Password length validation
    if (data.password.length < 8) {
      alert(t("errors.passwordMinLength")); // sweetalert can be used here
      return;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert(t("errors.invalidEmail")); // sweetalert can be used here
      return;
    }
    // Password match validation
    if (data.password !== confirmPassword) {
      alert(t("errors.passwordMismatch")); // sweetalert can be used here
      return;
    }
    // Required fields validation
    if (
      data.email.trim() === "" ||
      data.password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert(t("errors.fillRequired")); // sweetalert can be used here
      return;
    }

    dispatch(saveRegSuperVisoryStep1(data)); // Save data to Redux store
    dispatch(goNextStep(2)); // Proceed to next step
  };
  return (
    <Form onSubmit={handleSubmit}>
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
        />
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>{t("labels.password")}</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={t("placeholders.enterPassword")}
            value={data.password}
            onChange={handleChange}
            required
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
        </InputGroup>
        <Form.Text className="text-muted">
          {t("helpers.passwordMinLength")}
        </Form.Text>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>{t("labels.confirmPassword")}</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder={t("placeholders.confirmYourPassword")}
            value={confirmPassword}
            onChange={handleChange}
            required
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
        <Form.Text className="fw-light fst-italic text-center text-muted mb-3">
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
