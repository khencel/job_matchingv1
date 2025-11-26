"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep3,
  openRegEmployerStep4,
  RegisterEmployerStep3Data,
} from "@/redux/slices/registerEmployerSlice";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function RegisterEmployerStep3() {
  const dispatch = useAppDispatch();
  const step3Data = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.step3
  );

  const [data, setData] = useState<RegisterEmployerStep3Data>({
    name: "",
    departmentName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  useEffect(() => {
    setData(step3Data);
  }, [step3Data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      data.name.trim() === "" ||
      data.departmentName.trim() === "" ||
      data.phoneNumber.trim() === "" ||
      data.emailAddress.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    dispatch(saveRegEmployerStep3(data));
    dispatch(openRegEmployerStep4());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mb-5 text-center">Contact Person</h4>
      {/* Contact Information */}
      <div className="mb-4">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter full name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="departmentName">
          <Form.Label>Department Name</Form.Label>
          <Form.Control
            type="text"
            name="departmentName"
            placeholder="Enter department name"
            value={data.departmentName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={data.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="emailAddress">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            placeholder="Enter email address"
            value={data.emailAddress}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <p className="fs-6 fw-light fst-italic text-center text-muted">
          This information will be used by the platform administrators to
          contact your company if needed. It will not be displayed on job
          listings.
        </p>
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          Next
        </Button>
      </div>
    </Form>
  );
}
