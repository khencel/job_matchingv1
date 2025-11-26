"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  saveRegEmployerStep2,
  RegisterEmployerStep2Data,
  openRegEmployerStep3,
} from "@/redux/slices/registerEmployerSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function RegisterEmployerStep2() {
  const dispatch = useAppDispatch();
  const step2data = useAppSelector(
    (s) => s.registerEmployer.registerEmployerData.step2
  );

  const [currentBranch, setCurrentBranch] = useState<string>("");
  const [data, setData] = useState<RegisterEmployerStep2Data>({
    companyName: "",
    companyAddress: "",
    phoneNumber: "",
    industry: "",
    regions: "",
    numberOfEmployees: "",
    branchOffices: [],
    appealPoints: "",
    fee: "",
  });

  useEffect(() => {
    setData(step2data);
  }, [step2data]);

  // Industry options
  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Hospitality",
    "Construction",
    "Transportation",
    "Real Estate",
    "Agriculture",
    "Entertainment",
    "Telecommunications",
    "Energy",
    "Other",
  ];

  // Japan regions
  const japanRegions = [
    "Hokkaido",
    "Tohoku",
    "Kanto",
    "Chubu",
    "Kansai",
    "Chugoku",
    "Shikoku",
    "Kyushu",
    "Okinawa",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBranch = () => {
    if (currentBranch.trim() !== "") {
      setData({
        ...data,
        branchOffices: [...data.branchOffices, currentBranch],
      });
      setCurrentBranch("");
    }
  };

  const handleRemoveBranch = (index: number) => {
    setData({
      ...data,
      branchOffices: data.branchOffices.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.branchOffices.length === 0) {
      alert("Please add at least one branch office.");
      return;
    }
    if (
      data.companyName.trim() === "" ||
      data.companyAddress.trim() === "" ||
      data.phoneNumber.trim() === "" ||
      data.industry.trim() === "" ||
      data.regions.trim() === "" ||
      data.numberOfEmployees.trim() === "" ||
      data.appealPoints.trim() === "" ||
      data.fee.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    // Save branches as comma-separated string
    dispatch(saveRegEmployerStep2(data));
    dispatch(openRegEmployerStep3());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mb-5 text-center">Management Organization Information</h4>
      {/* Basic Information */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">Basic Information</h6>
        <Form.Group className="mb-3" controlId="companyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            placeholder="Enter company name"
            value={data.companyName}
            onChange={handleChange}
            autoFocus
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="companyAddress">
          <Form.Label>Company Address</Form.Label>
          <Form.Control
            type="text"
            name="companyAddress"
            placeholder="Enter company address"
            value={data.companyAddress}
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
      </div>

      {/* Company Industry */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">Company Industry</h6>
        <Form.Group controlId="industry">
          <Form.Label>Industry</Form.Label>
          <Form.Select
            name="industry"
            value={data.industry}
            onChange={handleChange}
            required
          >
            <option value="">Select Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      {/* Regions */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">Regions</h6>
        <Form.Group controlId="regions">
          <Form.Label>Region</Form.Label>
          <Form.Select
            name="regions"
            value={data.regions}
            onChange={handleChange}
            required
          >
            <option value="">Select Region</option>
            {japanRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      {/* Organizational Information */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">Organizational Information</h6>
        <Form.Group className="mb-3" controlId="numberOfEmployees">
          <Form.Label>Number of Employees</Form.Label>
          <Form.Control
            type="number"
            name="numberOfEmployees"
            placeholder="Enter number of employees"
            value={data.numberOfEmployees}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="branchOffices">
          <Form.Label>Branch Offices</Form.Label>
          <Row>
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder="Enter branch office location"
                value={currentBranch}
                onChange={(e) => setCurrentBranch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBranch();
                  }
                }}
              />
            </Col>
            <Col xs={3}>
              <Button
                variant="secondary"
                type="button"
                onClick={handleAddBranch}
                className="w-100"
              >
                Add
              </Button>
            </Col>
          </Row>

          {/* Collection of Branch Offices */}
          {data.branchOffices.length > 0 && (
            <div className="mt-3">
              <p className="text-muted small mb-2">Branch Offices:</p>
              {data.branchOffices.map((branch, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
                >
                  <span>{branch}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    type="button"
                    onClick={() => handleRemoveBranch(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Form.Group>
      </div>

      {/* PR Information */}
      <div className="mb-4">
        <h6 className="mb-3 fw-bold">PR Information</h6>
        <Form.Group className="mb-3" controlId="appealPoints">
          <Form.Label>Appeal Points</Form.Label>
          <Form.Control
            type="number"
            name="appealPoints"
            placeholder="Enter appeal points"
            value={data.appealPoints}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fee">
          <Form.Label>Fee</Form.Label>
          <Form.Control
            type="number"
            name="fee"
            placeholder="Enter fee amount"
            value={data.fee}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <Button type="submit" variant="primary" className="mb-3 fw-bold p-2">
          Next
        </Button>
      </div>
    </Form>
  );
}
