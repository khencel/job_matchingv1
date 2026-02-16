"use client";

import { useState, FormEvent } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { RegisterJobSeekerStep4Data } from "@/types/job-seeker";
import { registerThunk } from "@/redux/slices/register/registerThunk";
import { RegisterUserArgs } from "@/types/user-register";
import { saveRegJobSeekerStep3 } from "@/redux/slices/register/job-seeker/jobseekerSlice";

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
    (s) => s.registerJobSeeker.registerJobSeekerData.termsAndConditions,
  );
  const jobSeekerData = useAppSelector(
    (s) => s.registerJobSeeker.registerJobSeekerData,
  );

  const [data, setData] = useState<RegisterJobSeekerStep4Data>(step3Data);
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
    dispatch(saveRegJobSeekerStep3(data));

    const fullName = `${jobSeekerData.jobSeekerData.firstName} ${jobSeekerData.jobSeekerData.lastName}`;

    const fullFormData: RegisterUserArgs = {
      email: jobSeekerData.accountInfo.email,
      password: jobSeekerData.accountInfo.password,
      user_type: "job_seeker",
      details: JSON.stringify(jobSeekerData),
      context: {
        header: t("context.header", { fullName }),
        description: t("context.description"),
        button: t("context.button"),
        subText: t("context.subText"),
      },
    };
    try {
      // Final submit thunk (simulated API)
      const res = await dispatch(registerThunk(fullFormData)).unwrap();
      Swal.fire({
        title: t("alerts.verifyEmailTitle"),
        text: t("alerts.verifyEmailText"),
        icon: "success",
        footer: t("alerts.verifyEmailFooter"),
      });
      console.log("Job Seeker Registered:", res.userDetails_job_seeker, fullFormData.context);
      closeModal();
    } catch (error) {
      const displayError =
        typeof error === "string" ? error : JSON.stringify(error);
      Swal.fire({
        icon: "error",
        title: displayError,
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Error on Job Seeker Registration:", error);
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
