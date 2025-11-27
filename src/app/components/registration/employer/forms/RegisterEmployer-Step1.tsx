import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep1,
  RegisterEmployerStep1Data,
  goNextStep,
} from "@/redux/slices/register/employerSlice";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslations } from "next-intl";

export default function RegisterEmployerStep1() {
  const dispatch = useAppDispatch();
  const t = useTranslations("registerEmployerStep1");
  const accountInfo = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.accountInfo
  );

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [data, setData] = useState<RegisterEmployerStep1Data>({
    email: "",
    password: "",
  });

  useEffect(() => {
    setData(accountInfo);
  }, [accountInfo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

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
    }

    dispatch(saveRegEmployerStep1({ ...data, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      data.email.trim() === "" ||
      data.password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert(t("errors.fillRequired"));
      return;
    }
    if (!emailRegex.test(data.email)) {
      alert(t("errors.invalidEmail"));
      return;
    }
    if (data.password.length < 8) {
      alert(t("errors.passwordTooShort"));
      return;
    }
    if (data.password !== confirmPassword) {
      alert(t("errors.passwordMismatch"));
      return;
    }
    if (rememberMe) {
      //Handle jwt token storage in cookies/local storage
    }
    dispatch(saveRegEmployerStep1(data));
    dispatch(goNextStep(2));
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
        <p className="fs-6 fw-light fst-italic text-center text-muted mb-5">
          {t("helpers.accountConfirmNote")}
        </p>
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          {t("buttons.next")}
        </Button>
      </div>
    </Form>
  );
}
