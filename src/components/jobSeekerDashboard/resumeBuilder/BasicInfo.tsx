"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { goNextResumeTab, updateBasicInfo } from "@/redux/slices/resumeSlice";
import { FormEvent, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const BasicInfo = () => {
  const dispatch = useAppDispatch();
  const basicInfo = useAppSelector((s) => s.resumeBuilder.basicInfo);

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  type FormErrors = {
    firstName?: string;
    lastName?: string;
    birthday?: string;
    gender?: string;
    nationality?: string;
    status?: string;
    email?: string;
    number?: string;
    address?: string;
  };

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    
    // Handle radio buttons for liveInJapan
    if (name === "liveInJapan") {
      dispatch(updateBasicInfo({ liveInJapan: value === "yes" }));
    } else {
      dispatch(updateBasicInfo({ [name]: value }));
    }

    // Clear error for the edited field
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);

      // Convert selected image to data URL so the template can render it immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateBasicInfo({ photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};

    // Validate First Name
    if (!basicInfo.firstName || basicInfo.firstName.trim().length === 0) {
      nextErrors.firstName = "First name is required.";
    }

    // Validate Last Name
    if (!basicInfo.lastName || basicInfo.lastName.trim().length === 0) {
      nextErrors.lastName = "Last name is required.";
    }

    // Validate Birthday
    if (!basicInfo.birthday || basicInfo.birthday.trim().length === 0) {
      nextErrors.birthday = "Birth date is required.";
    } else {
      const birthDate = new Date(basicInfo.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;

      if (birthDate >= today) {
        nextErrors.birthday = "Birth date must be in the past.";
      } else if (actualAge < 18) {
        nextErrors.birthday = "You must be at least 18 years old.";
      } else if (actualAge > 100) {
        nextErrors.birthday = "Please enter a valid birth date.";
      }
    }

    // Validate Gender
    if (!basicInfo.gender || basicInfo.gender === "") {
      nextErrors.gender = "Gender is required.";
    }

    // Validate Nationality
    if (!basicInfo.nationality || basicInfo.nationality.trim().length === 0) {
      nextErrors.nationality = "Nationality is required.";
    }

    // Validate Status (Marital Status)
    if (!basicInfo.status || basicInfo.status === "") {
      nextErrors.status = "Marital status is required.";
    }

    // Validate Email
    if (!basicInfo.email || basicInfo.email.trim().length === 0) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicInfo.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    // Validate Phone Number
    if (!basicInfo.number || basicInfo.number.trim().length === 0) {
      nextErrors.number = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(basicInfo.number)) {
      nextErrors.number = "Enter a valid phone number (at least 10 digits).";
    }

    // Validate Address
    if (!basicInfo.address || basicInfo.address.trim().length === 0) {
      nextErrors.address = "Address is required.";
    }

    const hasErrors = Object.keys(nextErrors).length > 0;

    if (hasErrors) {
      setFormErrors(nextErrors);
      return;
    }

    // Proceed to next step
    console.log("Basic Info data valid:", basicInfo);
    console.log("Profile picture:", profilePicture);
    dispatch(goNextResumeTab("education"));
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold">Basic Information</Card.Title>
        <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={basicInfo.firstName}
              onChange={handleChange}
              isInvalid={!!formErrors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              name="midName"
              placeholder="Enter middle name"
              value={basicInfo.midName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={basicInfo.lastName}
              onChange={handleChange}
              isInvalid={!!formErrors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={basicInfo.birthday}
              onChange={handleChange}
              isInvalid={!!formErrors.birthday}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.birthday}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={basicInfo.gender}
              onChange={handleChange}
              isInvalid={!!formErrors.gender}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formErrors.gender}
            </Form.Control.Feedback>
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
                checked={basicInfo.liveInJapan === true}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="liveInJapan"
                value="no"
                id="liveInJapan-no"
                checked={basicInfo.liveInJapan === false}
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
              value={basicInfo.nationality}
              onChange={handleChange}
              isInvalid={!!formErrors.nationality}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.nationality}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={basicInfo.status}
              onChange={handleChange}
              isInvalid={!!formErrors.status}
            >
              <option value="">Select status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formErrors.status}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={basicInfo.email}
              onChange={handleChange}
              isInvalid={!!formErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="number"
              placeholder="Enter phone number"
              value={basicInfo.number}
              onChange={handleChange}
              isInvalid={!!formErrors.number}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.number}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              value={basicInfo.address}
              onChange={handleChange}
              isInvalid={!!formErrors.address}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Landmark</Form.Label>
            <Form.Control
              type="text"
              name="landmark"
              placeholder="Enter landmark"
              value={basicInfo.landmark}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            className="btn-primary-custom"
          >
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BasicInfo;
