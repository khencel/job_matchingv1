import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep1,
  openRegEmployerStep2,
  RegisterEmployerStep1Data,
} from "@/redux/slices/registerEmployerSlice";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function RegisterEmployerStep1() {
  const dispatch = useAppDispatch();
  const step1Data = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.step1
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
    setData(step1Data);
  }, [step1Data]);

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
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      data.email.trim() === "" ||
      data.password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (data.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (data.password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (rememberMe) {
      //Handle jwt token storage in cookies/local storage
    }
    dispatch(saveRegEmployerStep1(data));
    dispatch(openRegEmployerStep2());
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Email Address */}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={handleChange}
          autoFocus
          required
        />
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
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
          Must be at least 8 characters long.
        </Form.Text>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
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
          label="Remember me"
          checked={rememberMe}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Submit Button */}
      <div className="d-grid">
        <p className="fs-6 fw-light fst-italic text-center text-muted mb-5">
          A confirmation link will be sent to your email address to verify your
          account
        </p>
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          Next
        </Button>
      </div>
    </Form>
  );
}
