"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

import EmployerRegistrationModal from "./component/register/employer/EmployerRegistrationModal";
import { clearRegisterEmployerData } from "@/redux/slices/registerEmployerSlice";
import { Button } from "react-bootstrap";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleOpenForm = () => {
    setShowModal(true);
  };

  const handleCloseForm = () => {
    dispatch(clearRegisterEmployerData());
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleOpenForm}>
        Register as Employer
      </Button>
      <EmployerRegistrationModal show={showModal} onHide={handleCloseForm} />
    </div>
  );
}
