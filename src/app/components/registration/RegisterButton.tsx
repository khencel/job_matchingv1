"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { clearRegisterEmployerState } from "@/redux/slices/register/employerSlice";
import { useTranslations } from "next-intl";

import { Button } from "react-bootstrap";
import RegistrationModal from "./RegisterModal";
import { clearRegisterSuperVisoryState } from "@/redux/slices/register/superVisorySlice";
import { clearRegisterJobSeekerState } from "@/redux/slices/register/jobSeekerSlice";

interface RegisterButtonProps {
  id: "employer" | "jobSeeker" | "superVisory"; // Registration type identifier
  buttonTextKey: string; // Translation key for CTA button label
}

/**
 * Reusable registration button component for different user types
 */
export default function RegisterButton({
  buttonTextKey,
  id,
}: RegisterButtonProps) {
  const dispatch = useAppDispatch();
  const t = useTranslations("registerButton");
  const [showModal, setShowModal] = useState(false);

  // Open registration modal
  const handleOpenForm = () => {
    setShowModal(true);
  };

  // Close modal and reset form data
  const handleCloseForm = () => {
    dispatch(clearRegisterEmployerState());
    dispatch(clearRegisterSuperVisoryState());
    dispatch(clearRegisterJobSeekerState());
    setShowModal(false);
  };

  // Render appropriate modal based on user type
  const handleModalRender = () => {
    switch (id) {
      case "employer":
        return (
          <RegistrationModal
            show={showModal}
            onHide={handleCloseForm}
            formType="employer"
          />
        );
      case "jobSeeker":
        return (
          <RegistrationModal
            show={showModal}
            onHide={handleCloseForm}
            formType="jobSeeker"
          />
        );
      case "superVisory":
        return (
          <RegistrationModal
            show={showModal}
            onHide={handleCloseForm}
            formType="superVisory"
          />
        );
    }
  };

  return (
    <div>
      <Button className="w-75 py-4 fw-bold" onClick={handleOpenForm} id={id}>
        {t(buttonTextKey)}
      </Button>
      {handleModalRender()}
    </div>
  );
}
