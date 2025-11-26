"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

import EmployerRegistrationModal from "./components/registration/employer/EmployerRegistrationModal";
import { clearRegisterEmployerData } from "@/redux/slices/registerEmployerSlice";
import { Button } from "react-bootstrap";

import Banner from './components/Banner';
import JobSearchFiler from './components/JobSearchFilter';
import Registration from './components/Registration';

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

      <JobSearchFiler />
      <Banner />
      <hr className="mt-5 w-75 mx-auto" />
      <Registration />
      <hr className="mt-5 w-75 mx-auto" />
    </div>
  );
}
