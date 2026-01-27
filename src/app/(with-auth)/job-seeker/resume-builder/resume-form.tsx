"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Plus, Trash2, X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateResumeData } from "@/redux/slices/resumeSlice";
import { ResumeData } from "@/types/resume-builder";

type EducationKey = "year" | "month" | "description";
type WorkKey = "year" | "month" | "description";
type LicenseKey = "year" | "month" | "qualification";

const emptyEducation = { year: "", month: "", description: "" };
const emptyWork = { year: "", month: "", description: "" };
const emptyLicense = { year: "", month: "", qualification: "" };

const ResumeForm = () => {
  const dispatch = useAppDispatch();
  const resumeData = useAppSelector((state) => state.resumeBuilder.data);

  const [preferenceInput, setPreferenceInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const otherContact = useMemo(
    () =>
      resumeData.otherContact || {
        phonetic: "",
        address: "",
        phone: "",
        email: "",
      },
    [resumeData.otherContact],
  );

  const educationEntries = useMemo(
    () =>
      resumeData.education.length
        ? resumeData.education
        : [{ ...emptyEducation }],
    [resumeData.education],
  );

  const workEntries = useMemo(
    () => (resumeData.work.length ? resumeData.work : [{ ...emptyWork }]),
    [resumeData.work],
  );

  const licenseEntries = useMemo(
    () =>
      resumeData.licenses?.length ? resumeData.licenses : [{ ...emptyLicense }],
    [resumeData.licenses],
  );

  const validationRules: Record<string, (value: string) => string | null> = {
    fullName: (value) => (value.trim() ? null : "Full name is required."),
    email: (value) =>
      /\S+@\S+\.\S+/.test(value) ? null : "Please provide a valid email.",
    phone: (value) =>
      value.trim().length >= 7 ? null : "Phone number is too short.",
    address: (value) => (value.trim() ? null : "Address is required."),
    birthdate: (value) => (value ? null : "Birthdate is required."),
  };

  const runValidation = (name: string, value: string) => {
    if (!validationRules[name]) return;
    const message = validationRules[name](value);
    setErrors((prev) => ({ ...prev, [name]: message || "" }));
  };

  const dispatchUpdate = (payload: Partial<ResumeData>) => {
    dispatch(updateResumeData(payload));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    runValidation(name, value);

    const field = name as keyof ResumeData;
    const parsedValue = field === "age" ? Number(value) || 0 : value;

    dispatchUpdate({ [field]: parsedValue } as Partial<ResumeData>);
  };

  const handleOtherContactChange = (
    key: keyof NonNullable<ResumeData["otherContact"]>,
    value: string,
  ) => {
    dispatchUpdate({
      otherContact: {
        ...otherContact,
        [key]: value,
      },
    });
  };

  const handleEducationChange = (
    index: number,
    key: EducationKey,
    value: string,
  ) => {
    const updated = educationEntries.map((entry, idx) =>
      idx === index ? { ...entry, [key]: value } : entry,
    );
    dispatchUpdate({ education: updated });
  };

  const handleWorkChange = (index: number, key: WorkKey, value: string) => {
    const updated = workEntries.map((entry, idx) =>
      idx === index ? { ...entry, [key]: value } : entry,
    );
    dispatchUpdate({ work: updated });
  };

  const handleLicenseChange = (
    index: number,
    key: LicenseKey,
    value: string,
  ) => {
    const updated = licenseEntries.map((entry, idx) =>
      idx === index ? { ...entry, [key]: value } : entry,
    );
    dispatchUpdate({ licenses: updated });
  };

  const addEducationRow = () => {
    dispatchUpdate({ education: [...educationEntries, { ...emptyEducation }] });
  };

  const removeEducationRow = (index: number) => {
    if (educationEntries.length === 1) return;
    dispatchUpdate({
      education: educationEntries.filter((_, idx) => idx !== index),
    });
  };

  const addWorkRow = () => {
    dispatchUpdate({ work: [...workEntries, { ...emptyWork }] });
  };

  const removeWorkRow = (index: number) => {
    if (workEntries.length === 1) return;
    dispatchUpdate({ work: workEntries.filter((_, idx) => idx !== index) });
  };

  const addLicenseRow = () => {
    dispatchUpdate({ licenses: [...licenseEntries, { ...emptyLicense }] });
  };

  const removeLicenseRow = (index: number) => {
    if (licenseEntries.length === 1) return;
    dispatchUpdate({
      licenses: licenseEntries.filter((_, idx) => idx !== index),
    });
  };

  const handleAddPreference = () => {
    const trimmed = preferenceInput.trim();
    if (!trimmed) return;
    const next = Array.from(
      new Set([...(resumeData.preferences || []), trimmed]),
    );
    dispatchUpdate({ preferences: next });
    setPreferenceInput("");
  };

  const handleRemovePreference = (value: string) => {
    dispatchUpdate({
      preferences: (resumeData.preferences || []).filter(
        (pref) => pref !== value,
      ),
    });
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file.");
      e.target.value = "";
      return;
    }
    const maxSizeMb = 2;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setUploadError(`Image must be under ${maxSizeMb}MB.`);
      e.target.value = "";
      return;
    }
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      dispatchUpdate({ photoUrl: result });
    };
    reader.readAsDataURL(file);
  };

  const triggerPhotoUpload = () => {
    photoInputRef.current?.click();
  };

  const clearPhoto = () => {
    dispatchUpdate({ photoUrl: "" });
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Header className="bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <Card.Title className="mb-0">Resume Details</Card.Title>
            <Card.Subtitle className="text-muted">
              Update fields to see the preview refresh instantly.
            </Card.Subtitle>
          </div>
        </div>
      </Card.Header>
      <Card.Body
        className="overflow-auto"
        style={{ maxHeight: "calc(100vh - 140px)" }}
      >
        <Form noValidate>
          <section className="mb-4">
            <h5 className="mb-3">Basic Information</h5>
            <Form.Group className="mb-3" controlId="resume-fullName">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                name="fullName"
                value={resumeData.fullName}
                onChange={handleInputChange}
                isInvalid={Boolean(errors.fullName)}
                placeholder="e.g. Jane Doe"
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resume-namePhonetic">
              <Form.Label>Name Phonetic</Form.Label>
              <Form.Control
                name="namePhonetic"
                value={resumeData.namePhonetic}
                onChange={handleInputChange}
                placeholder="e.g. ジェーンドウ"
              />
            </Form.Group>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="resume-birthdate">
                  <Form.Label>Birthdate *</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthdate"
                    value={resumeData.birthdate}
                    onChange={handleInputChange}
                    isInvalid={Boolean(errors.birthdate)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.birthdate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="resume-age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    min={0}
                    value={resumeData.age || 0}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-1">
              <Col md={6}>
                <Form.Group controlId="resume-gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={resumeData.gender}
                    onChange={() => handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="resume-photo">
                  <Form.Label>Profile Photo</Form.Label>
                  <div className="d-flex flex-column gap-2">
                    <div className="border rounded p-2 d-flex align-items-center gap-3">
                      <div
                        className="rounded overflow-hidden bg-light"
                        style={{ width: 64, height: 64 }}
                      >
                        {resumeData.photoUrl ? (
                          <img
                            src={resumeData.photoUrl}
                            alt="Resume avatar"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "fill",
                            }}
                          />
                        ) : (
                          <div className="h-100 w-100 d-flex align-items-center justify-content-center text-muted">
                            No photo
                          </div>
                        )}
                      </div>
                      <div className="d-flex flex-column gap-2 flex-grow-1">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={triggerPhotoUpload}
                        >
                          Upload Image
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={clearPhoto}
                          disabled={!resumeData.photoUrl}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <Form.Text muted>PNG or JPG, up to 2MB.</Form.Text>
                    {uploadError && (
                      <div className="text-danger small">{uploadError}</div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="d-none"
                      ref={photoInputRef}
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </section>

          <section className="mb-4">
            <h5 className="mb-3">Contact & Address</h5>
            <Form.Group className="mb-3" controlId="resume-email">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={resumeData.email}
                onChange={handleInputChange}
                isInvalid={Boolean(errors.email)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resume-phone">
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                name="phone"
                value={resumeData.phone}
                onChange={handleInputChange}
                isInvalid={Boolean(errors.phone)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resume-address">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={resumeData.address}
                onChange={handleInputChange}
                isInvalid={Boolean(errors.address)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resume-addressPhonetic">
              <Form.Label>Address Phonetic</Form.Label>
              <Form.Control
                name="addressPhonetic"
                value={resumeData.addressPhonetic}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="resume-postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    name="postalCode"
                    value={resumeData.postalCode}
                    onChange={handleInputChange}
                    placeholder="123-4567"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="resume-other-phone">
                  <Form.Label>Alt. Phone</Form.Label>
                  <Form.Control
                    value={otherContact.phone || ""}
                    onChange={(e) =>
                      handleOtherContactChange("phone", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-1">
              <Col md={6}>
                <Form.Group controlId="resume-other-email">
                  <Form.Label>Alt. Email</Form.Label>
                  <Form.Control
                    value={otherContact.email || ""}
                    onChange={(e) =>
                      handleOtherContactChange("email", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="resume-other-phonetic">
                  <Form.Label>Alt. Phonetic</Form.Label>
                  <Form.Control
                    value={otherContact.phonetic || ""}
                    onChange={(e) =>
                      handleOtherContactChange("phonetic", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mt-3" controlId="resume-other-address">
              <Form.Label>Alt. Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={otherContact.address || ""}
                onChange={(e) =>
                  handleOtherContactChange("address", e.target.value)
                }
              />
            </Form.Group>
          </section>

          <section className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Education</h5>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={addEducationRow}
              >
                <Plus size={14} className="me-1" /> Add
              </Button>
            </div>
            {educationEntries.map((entry, index) => (
              <Card
                key={`education-${index}`}
                className="mb-3 border-0 bg-light"
              >
                <Card.Body>
                  <Row className="g-2">
                    <Col xs={4}>
                      <Form.Group controlId={`edu-year-${index}`}>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          value={entry.year}
                          onChange={(e) =>
                            handleEducationChange(index, "year", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={4}>
                      <Form.Group controlId={`edu-month-${index}`}>
                        <Form.Label>Month</Form.Label>
                        <Form.Control
                          value={entry.month}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "month",
                              e.target.value,
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      xs={4}
                      className="d-flex align-items-start justify-content-end"
                    >
                      {educationEntries.length > 1 && (
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => removeEducationRow(index)}
                          title="Remove entry"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <Form.Group className="mt-2" controlId={`edu-desc-${index}`}>
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={entry.description}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            ))}
          </section>

          <section className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Work History</h5>
              <Button variant="outline-primary" size="sm" onClick={addWorkRow}>
                <Plus size={14} className="me-1" /> Add
              </Button>
            </div>
            {workEntries.map((entry, index) => (
              <Card key={`work-${index}`} className="mb-3 border-0 bg-light">
                <Card.Body>
                  <Row className="g-2">
                    <Col xs={4}>
                      <Form.Group controlId={`work-year-${index}`}>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          value={entry.year}
                          onChange={(e) =>
                            handleWorkChange(index, "year", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={4}>
                      <Form.Group controlId={`work-month-${index}`}>
                        <Form.Label>Month</Form.Label>
                        <Form.Control
                          value={entry.month}
                          onChange={(e) =>
                            handleWorkChange(index, "month", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      xs={4}
                      className="d-flex align-items-start justify-content-end"
                    >
                      {workEntries.length > 1 && (
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => removeWorkRow(index)}
                          title="Remove entry"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <Form.Group className="mt-2" controlId={`work-desc-${index}`}>
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={entry.description}
                      onChange={(e) =>
                        handleWorkChange(index, "description", e.target.value)
                      }
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            ))}
          </section>

          <section className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Licenses / Qualifications</h5>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={addLicenseRow}
              >
                <Plus size={14} className="me-1" /> Add
              </Button>
            </div>
            {licenseEntries.map((entry, index) => (
              <Card key={`license-${index}`} className="mb-3 border-0 bg-light">
                <Card.Body>
                  <Row className="g-2">
                    <Col xs={4}>
                      <Form.Group controlId={`license-year-${index}`}>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          value={entry.year}
                          onChange={(e) =>
                            handleLicenseChange(index, "year", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={4}>
                      <Form.Group controlId={`license-month-${index}`}>
                        <Form.Label>Month</Form.Label>
                        <Form.Control
                          value={entry.month}
                          onChange={(e) =>
                            handleLicenseChange(index, "month", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      xs={4}
                      className="d-flex align-items-start justify-content-end"
                    >
                      {licenseEntries.length > 1 && (
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => removeLicenseRow(index)}
                          title="Remove entry"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <Form.Group
                    className="mt-2"
                    controlId={`license-qualification-${index}`}
                  >
                    <Form.Label>Qualification</Form.Label>
                    <Form.Control
                      value={entry.qualification}
                      onChange={(e) =>
                        handleLicenseChange(
                          index,
                          "qualification",
                          e.target.value,
                        )
                      }
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            ))}
          </section>

          <section className="mb-4">
            <h5 className="mb-3">Preferences</h5>
            <InputGroup className="mb-2">
              <Form.Control
                placeholder="Add preference"
                value={preferenceInput}
                onChange={(e) => setPreferenceInput(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={handleAddPreference}>
                Add
              </Button>
            </InputGroup>
            <div className="d-flex flex-wrap gap-2">
              {(resumeData.preferences || []).map((pref) => (
                <span
                  key={pref}
                  className="badge text-bg-light d-inline-flex align-items-center gap-1"
                >
                  {pref}
                  <button
                    type="button"
                    className="btn btn-sm btn-link p-0 text-danger"
                    onClick={() => handleRemovePreference(pref)}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </section>

          <section>
            <h5 className="mb-3">Motivation / Reasons</h5>
            <Form.Group controlId="resume-reasons">
              <Form.Control
                as="textarea"
                rows={3}
                name="reasons"
                value={resumeData.reasons}
                onChange={handleInputChange}
                placeholder="Share your motivation or key points"
              />
            </Form.Group>
          </section>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ResumeForm;
