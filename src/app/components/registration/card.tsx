"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { clearRegisterEmployerData } from "@/redux/slices/register/employerSlice";
import { useTranslations } from "next-intl";

import { Button, Card } from "react-bootstrap";
import EmployerRegistrationModal from "./employer/EmployerRegistrationModal";

interface RegistrationCardProps {
  id: "employer" | "jobSeeker" | "superVisory"; // Registration type identifier
  imageUrl: string; // Card image source
  buttonTextKey: string; // Translation key for CTA button label
}

/**
 * Reusable registration card component for different user types
 * Displays an image, button, and corresponding registration modal
 */
export default function RegistrationCard({
  imageUrl,
  buttonTextKey,
  id,
}: RegistrationCardProps) {
  const dispatch = useAppDispatch();
  const t = useTranslations("registrationCard");
  const [showModal, setShowModal] = useState(false);

  // Open registration modal
  const handleOpenForm = () => {
    setShowModal(true);
  };

  // Close modal and reset form data
  const handleCloseForm = () => {
    dispatch(clearRegisterEmployerData());
    setShowModal(false);
  };

  // Render appropriate modal based on user type
  const handleModalRender = () => {
    switch (id) {
      case "employer":
        return (
          <EmployerRegistrationModal
            show={showModal}
            onHide={handleCloseForm}
          />
        );
      case "jobSeeker":
        return; // TODO: Implement job seeker modal
      case "superVisory":
        return; // TODO: Implement supervisory modal
    }
  };

  return (
    <Card className="shadow-sm border-0">
      {/* Fixed height image container - maintains aspect ratio with object-fit: cover */}
      <div
        style={{
          height: "250px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Img
          variant="top"
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures image fills container without distortion
          }}
        />
      </div>
      <Card.Body className="px-5">
        <Button className="w-100 py-4" onClick={handleOpenForm} id={id}>
          {t(buttonTextKey)}
        </Button>
      </Card.Body>
      {handleModalRender()}
    </Card>
  );
}
