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
import Swal from "sweetalert2";

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

  const [error, setError] = useState<{ [name: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setData((prev) => ({ ...prev, [name]: checked }));
    dispatch(saveRegSuperVisoryStep4({ ...data, [name]: checked }));
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = async (e: FormEvent) => {
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
      return;
    }

    // Second validation: Check custom business logic
    let hasError = false;
    const validationErrors: Record<string, boolean> = {};

    // Validate acceptTerms checkbox
    if (!data.acceptTerms) {
      validationErrors.acceptTerms = true;
      hasError = true;
    }

    // Validate acceptPrivacyPolicy checkbox
    if (!data.acceptPrivacyPolicy) {
      validationErrors.acceptPrivacyPolicy = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      return;
    }

    // All validations passed - save data and submit
    setError({});
    dispatch(saveRegSuperVisoryStep4(data));

    try {
      // Final submit thunk (simulated API)
      await dispatch(registerSuperVisorySubmit()).unwrap();
      Swal.fire({
        icon: "success",
        title: t("messages.success"),
        text: t("messages.registrationComplete"),
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
      });
      closeModal();
    } catch (error) {
      console.log("Error Submitting the Register Supervisory:", error);
      Swal.fire({
        icon: "error",
        title: t("messages.error"),
        text: t("messages.registrationFailed"),
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
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
            isInvalid={!!error.acceptTerms}
          />
          {error.acceptTerms && (
            <Form.Control.Feedback type="invalid" className="px-5 d-block">
              {t("errors.acceptTerms")}
            </Form.Control.Feedback>
          )}
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
            isInvalid={!!error.acceptPrivacyPolicy}
          />
          {error.acceptPrivacyPolicy && (
            <Form.Control.Feedback type="invalid" className="px-5 d-block">
              {t("errors.acceptPrivacy")}
            </Form.Control.Feedback>
          )}
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
