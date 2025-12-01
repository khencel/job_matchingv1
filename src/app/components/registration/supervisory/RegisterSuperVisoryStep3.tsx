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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic name validations
    if (data.name.length < 2 || data.name.length > 100) {
      alert(t("errors.name"));
      return;
    }
    // Department name length validation
    if (data.department.length < 2 || data.department.length > 100) {
      alert(t("errors.department"));
      return;
    }
    // Phone number validation
    if (
      data.phoneNumber.length < 7 ||
      data.phoneNumber.length > 15 ||
      isNaN(Number(data.phoneNumber))
    ) {
      alert(t("errors.phoneNumber"));
      return;
    }
    // Check for empty required fields
    if (
      data.name.trim() === "" ||
      data.department.trim() === "" ||
      data.phoneNumber.trim() === "" ||
      data.email.trim() === ""
    ) {
      alert(t("errors.fillRequired"));
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert(t("errors.invalidEmail"));
      return;
    }

    dispatch(saveRegSuperVisoryStep3(data));
    dispatch(goNextStep(4));
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        />
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
        />
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
        />
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
        />
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
