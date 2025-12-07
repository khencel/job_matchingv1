"use client";

import { useState, FormEvent } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep4,
  registerEmployerSubmit,
  RegisterEmployerStep4Data,
} from "@/redux/slices/register/employerSlice";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

interface RegisterEmployerStep4Props {
  closeModal: () => void;
}

export default function RegisterEmployerStep4({
  closeModal,
}: RegisterEmployerStep4Props) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.registerEmployer);
  const t = useTranslations("registerEmployerStep4");
  const tnc = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.termsAndConditions
  );

  const [data, setData] = useState<RegisterEmployerStep4Data>(tnc);
  const [error, setError] = useState<{ [name: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // Clear error for the field on change
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));

    // update data
    setData((prev) => ({ ...prev, [name]: checked }));
    dispatch(saveRegEmployerStep4({ ...data, [name]: checked }));
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

    // Validate terms and conditions acceptance
    if (!data.acceptTerms) {
      validationErrors.acceptTerms = true;
      hasError = true;
    }

    // Validate privacy policy acceptance
    if (!data.acceptPrivacyPolicy) {
      validationErrors.acceptPrivacyPolicy = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      return;
    }

    setError({});
    dispatch(saveRegEmployerStep4(data));
    try {
      // Final submit thunk (simulated API)
      await dispatch(registerEmployerSubmit());
      Swal.fire({
        icon: "success",
        title: "Employer Registration Success",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Employer Registration Failed",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Error Submitting the Register Employer:", error);
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
            isInvalid={error.acceptTerms}
            feedback={t("errors.acceptTerms")}
            feedbackType="invalid"
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
            isInvalid={error.acceptPrivacyPolicy}
            feedback={t("errors.acceptPrivacy")}
            feedbackType="invalid"
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
