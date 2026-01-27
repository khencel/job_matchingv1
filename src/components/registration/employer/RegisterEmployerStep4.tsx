"use client";

import { useState, FormEvent } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { RegisterUserArgs } from "@/types/user-register";
import { saveRegEmployerStep4 } from "@/redux/slices/register/employer/employerSlice";
import { registerThunk } from "@/redux/slices/register/registerThunk";

interface RegisterEmployerStep4Props {
  closeModal: () => void;
}

export default function RegisterEmployerStep4({
  closeModal,
}: RegisterEmployerStep4Props) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.registerEmployer);
  const t = useTranslations("registerEmployerStep4");
  const tnc = useAppSelector((s) => s.registerEmployer.registerEmployerData);
  const employerData = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData,
  );

  const [data, setData] = useState({
    accept_terms: tnc.accept_terms,
    accept_privacy: tnc.accept_privacy,
    receive_email: tnc.receive_email,
  });
  const [error, setError] = useState<{ [name: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // Clear error for the field on change
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));

    // update data
    setData((prev) => ({ ...prev, [name]: checked }));
    dispatch(
      saveRegEmployerStep4({
        accept_terms: name === "accept_terms" ? checked : data.accept_terms,
        accept_privacy:
          name === "accept_privacy" ? checked : data.accept_privacy,
        receive_email: name === "receive_email" ? checked : data.receive_email,
      }),
    );
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
    if (!data.accept_terms) {
      validationErrors.accept_terms = true;
      hasError = true;
    }

    // Validate privacy policy acceptance
    if (!data.accept_privacy) {
      validationErrors.accept_privacy = true;
      hasError = true;
    }

    if (hasError) {
      setError(validationErrors);
      return;
    }

    setError({});
    dispatch(saveRegEmployerStep4(data));

    const { accountInfo, ...finalSubmissionDetails } = employerData;

    const fullFormData: RegisterUserArgs = {
      email: employerData.accountInfo.email,
      password: employerData.accountInfo.password,
      user_type: "employer",
      details: JSON.stringify(finalSubmissionDetails),
    };

    try {
      const res = await dispatch(registerThunk(fullFormData)).unwrap();
      Swal.fire({
        title: "Verify Your Email",
        text: `We've sent a verification email to your registered email
                  address. Click the verification link to activate
                  your account.`,
        icon: "success",
        footer: `If you don't see the email, please check your spam or junk
                  folder.`,
      });
      closeModal();
      console.log("Employer Registered:", res.userDetails_emp);
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
    } finally {
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
            name="accept_terms"
            label={t("labels.acceptTerms")}
            checked={data.accept_terms}
            onChange={handleChange}
            required
            isInvalid={error.accept_terms}
            feedback={t("errors.acceptTerms")}
            feedbackType="invalid"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="acceptPrivacyPolicy">
          <Form.Check
            className="px-5"
            type="checkbox"
            name="accept_privacy"
            label={t("labels.acceptPrivacyPolicy")}
            checked={data.accept_privacy}
            onChange={handleChange}
            required
            isInvalid={error.accept_privacy}
            feedback={t("errors.acceptPrivacy")}
            feedbackType="invalid"
          />
        </Form.Group>

        <Form.Group className="mb-5" controlId="acceptReceiveEmails">
          <Form.Check
            className="px-5"
            type="checkbox"
            name="receive_email"
            label={t("labels.acceptReceiveEmails")}
            checked={data.receive_email}
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
