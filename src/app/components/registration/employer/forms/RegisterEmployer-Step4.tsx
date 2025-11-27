"use client";

import { useState, FormEvent } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep4,
  registerEmployerFinalSubmit,
  RegisterEmployerStep4Data,
} from "@/redux/slices/registerEmployerSlice";
import { useTranslations } from "next-intl";

interface RegisterEmployerStep4Props {
  closeModal: () => void;
}

export default function RegisterEmployerStep4({
  closeModal,
}: RegisterEmployerStep4Props) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.registerEmployer);
  const t = useTranslations("registerEmployerStep4");

  const [data, setData] = useState<RegisterEmployerStep4Data>({
    acceptTerms: false,
    acceptPrivacyPolicy: false,
    acceptReceiveEmails: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Basic required validation for mandatory consents
    if (!data.acceptTerms || !data.acceptPrivacyPolicy) {
      alert(t("errors.acceptTermsPrivacy"));
      return;
    }
    dispatch(saveRegEmployerStep4(data));
    try {
      // Final submit thunk (simulated API)
      await dispatch(registerEmployerFinalSubmit());
      closeModal();
    } catch (error) {
      console.log("Error Submitting the Register Employer:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h5 className="mb-5 fs-5 text-center">
          {t("steps.confirm")}
        </h5>

        <Form.Group className="mb-4" controlId="acceptTerms">
          <Form.Check
            className="px-5"
            type="checkbox"
            name="acceptTerms"
            label={t("labels.acceptTerms")}
            checked={data.acceptTerms}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="acceptPrivacyPolicy">
          <Form.Check
            className="px-5"
            type="checkbox"
            name="acceptPrivacyPolicy"
            label={t("labels.acceptPrivacyPolicy")}
            checked={data.acceptPrivacyPolicy}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-5" controlId="acceptReceiveEmails">
          <Form.Check
            className="px-5"
            type="checkbox"
            name="acceptReceiveEmails"
            label={t("labels.acceptReceiveEmails")}
            checked={data.acceptReceiveEmails}
            onChange={handleChange}
          />
        </Form.Group>
      </div>

      <div className="d-grid">
        <Button
          type="submit"
          variant="primary"
          className="fw-bold p-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              {t("helpers.submitting")}
            </>
          ) : (
            t("buttons.submit")
          )}
        </Button>
      </div>
    </Form>
  );
}
