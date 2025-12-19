"use client";
import { FormEvent, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const BasicInfo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    midName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    liveInJapan: "",
    nationality: "",
    status: "",
    email: "",
    phoneNumber: "",
    address: "",
    landmark: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Basic Information</Card.Title>
        <Form className="d-flex flex-column gap-3">
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              name="midName"
              placeholder="Enter middle name"
              value={formData.midName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Do you live in Japan?</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="liveInJapan"
                value="yes"
                id="liveInJapan-yes"
                checked={formData.liveInJapan === "yes"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="liveInJapan"
                value="no"
                id="liveInJapan-no"
                checked={formData.liveInJapan === "no"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              placeholder="Enter nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Landmark</Form.Label>
            <Form.Control
              type="text"
              name="landmark"
              placeholder="Enter landmark"
              value={formData.landmark}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            className="btn-primary-custom"
            onClick={handleSubmit}
          >
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BasicInfo;
