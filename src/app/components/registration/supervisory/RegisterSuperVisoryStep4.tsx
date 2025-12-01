"use client";

import { useState, FormEvent } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegSuperVisoryStep4,
  registerSuperVisorySubmit,
  RegisterSuperVisoryStep4Data,
} from "@/redux/slices/register/superVisorySlice";
import { useTranslations } from "next-intl";

interface RegisterSuperVisoryStep4Props {
  closeModal: () => void;
}

export default function RegisterSuperVisoryStep4({
  closeModal,
}: RegisterSuperVisoryStep4Props) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.registerSuperVisory);
  const t = useTranslations("registerSupervisoryStep4");

  const termsAndConditions = useAppSelector(
    (s) => s.registerSuperVisory.registerSuperVisoryData.termsAndConditions
  );

  const [data, setData] = useState<RegisterSuperVisoryStep4Data>(
    termsAndConditions || {
      acceptTerms: false,
      acceptPrivacyPolicy: false,
      acceptReceiveEmails: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setData((prev) => ({ ...prev, [name]: checked }));
    dispatch(saveRegSuperVisoryStep4({ ...data, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic required validation for mandatory consents
    if (!data.acceptTerms || !data.acceptPrivacyPolicy) {
      alert(t("errors.acceptTermsPrivacy"));
      return;
    }

    dispatch(saveRegSuperVisoryStep4(data));
    
    try {
      // Final submit thunk (simulated API)
      await dispatch(registerSuperVisorySubmit()).unwrap();
      closeModal();
    } catch (error) {
      console.log("Error Submitting the Register Supervisory:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h4 className="mb-5 text-center">{t("title")}</h4>

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

      <Button
        type="submit"
        variant="primary"
        className="fw-bold p-2 w-100"
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
    </Form>
  );
}
