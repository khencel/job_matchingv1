"use client";

import { useState, FormEvent } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegJobSeekerStep3,
  registerJobSeekerSubmit,
  RegisterJobSeekerStep3Data,
} from "@/redux/slices/register/jobSeekerSlice";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

interface RegisterJobSeekerStep3Props {
  closeModal: () => void;
}

export default function RegisterJobSeekerStep3({
  closeModal,
}: RegisterJobSeekerStep3Props) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.registerJobSeeker);
  const t = useTranslations("registerJobSeekerStep3");
  const step3Data = useAppSelector(
    (s) => s.registerJobSeeker.registerJobSeekerData.termsAndConditions
  );

  const [data, setData] = useState<RegisterJobSeekerStep3Data>(
    step3Data || {
      acceptTerms: false,
      acceptPrivacyPolicy: false,
      acceptReceiveEmails: false,
    }
  );
  const [error, setError] = useState<{ [name: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // Clear error for the field on change
    setError((prevErrors) => ({ ...prevErrors, [name]: false }));

    // update data
    setData((prev) => ({ ...prev, [name]: checked }));
    dispatch(saveRegJobSeekerStep3({ ...data, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    // Check if form is valid
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
    dispatch(saveRegJobSeekerStep3(data));
    try {
      // Final submit thunk (simulated API)
      await dispatch(registerJobSeekerSubmit());
      Swal.fire({
        icon: "success",
        title: t("helpers.successSubmit"),
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("helpers.errorSubmit"),
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Error Submitting Job Seeker Registration:", error);
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
            feedback={t("errors.acceptT&C")}
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
            isInvalid={!!error.acceptPrivacyPolicy}
            feedback={t("errors.acceptPrivacyPolicy")}
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
