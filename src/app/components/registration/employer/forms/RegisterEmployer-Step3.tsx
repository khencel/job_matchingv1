"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep3,
  RegisterEmployerStep3Data,
  goNextStep,
} from "@/redux/slices/register/employerSlice";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Form } from "react-bootstrap";

export default function RegisterEmployerStep3() {
  const dispatch = useAppDispatch();
  const t = useTranslations("registerEmployerStep3");
  const contactPerson = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.contactPerson
  );

  const [data, setData] = useState<RegisterEmployerStep3Data>({
    name: "",
    departmentName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  useEffect(() => {
    setData(contactPerson);
  }, [contactPerson]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    dispatch(saveRegEmployerStep3({ ...data, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      data.name.trim() === "" ||
      data.departmentName.trim() === "" ||
      data.phoneNumber.trim() === "" ||
      data.emailAddress.trim() === ""
    ) {
      alert(t("errors.fillRequired"));
      return;
    }
    dispatch(saveRegEmployerStep3(data));
    dispatch(goNextStep(4));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mb-5 text-center">{t("title")}</h4>
      {/* Contact Information */}
      <div className="mb-4">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>{t("labels.name")}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder={t("placeholders.enterFullName")}
            value={data.name}
            onChange={handleChange}
            required
          />
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

        <Form.Group className="mb-3" controlId="emailAddress">
          <Form.Label>{t("labels.emailAddress")}</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            placeholder={t("placeholders.enterEmailAddress")}
            value={data.emailAddress}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <p className="fs-6 fw-light fst-italic text-center text-muted">
          {t("helpers.contactInfoNote")}
        </p>
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          {t("buttons.next")}
        </Button>
      </div>
    </Form>
  );
}
