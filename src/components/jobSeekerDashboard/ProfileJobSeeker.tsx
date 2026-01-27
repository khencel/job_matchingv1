import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Edit2,
  Camera,
  MapPin,
  GraduationCap,
  Briefcase,
  Globe,
  Save,
  X,
  User,
  Mail,
  Phone,
  FileDownIcon,
  FileText,
  UploadCloud,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Badge,
} from "react-bootstrap";
import { fetchCurrentUser } from "@/redux/features/auth/auth_thunk";
import { updateProfileThunk } from "@/redux/slices/updateProfile/updataProfileThunk";
import { setJobSeekerField } from "@/redux/slices/updateProfile/updateProfileSlice";
import { FaFacebook } from "react-icons/fa";
import { isPhoneNumberValid } from "@/helper/validations";
import { RegisterJobSeekerData } from "@/types/job-seeker";

const EditJobSeeker = () => {
  const dispatch = useAppDispatch();
  // Read-only source
  const AuthUser = useAppSelector(
    (s) => s.authState.user?.userDetails_job_seeker,
  );
  const avatar = useAppSelector((s) => s.authState.user?.avatar);

  // Get the resume path from Redux
  const existingResume = useAppSelector((s) => s.authState.user?.resume);
  // Editable source
  const updateUser = useAppSelector((s) => s.updateProfile.details);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileResumeRef = useRef<HTMLInputElement | null>(null);

  const VISA_OPTIONS = ["APPLIED", "PENDING", "REVIEWING", "ISSUED", "DENIED"];
  const JAPANESE_LEVEL_OPTIONS = ["N5", "N4", "N3", "N2", "N1"];
  const EDUCATION_OPTIONS = [
    { value: "elementary", label: "Elementary" },
    { value: "jr-highschool", label: "Junior Highschool" },
    { value: "sr-highschool", label: "Senior Highschool" },
    { value: "vocational", label: "Vocational" },
    { value: "bachelorDegree", label: "Bachelor's Degree" },
    { value: "masterDegree", label: "Master's Degree" },
    { value: "doctoralDegree", label: "Doctoral Degree" },
  ];

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleEditToggle = () => setIsEditMode(!isEditMode);

  const handleInputChange = (field: string, value: string) => {
    dispatch(setJobSeekerField({ field, value, nestedField: "jobSeekerData" }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleCancelResumeUpload = () => {
    setResumeFile(null);
    setResumePreview(null);
    if (fileResumeRef.current) {
      fileResumeRef.current.value = "";
    }
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
    setResumePreview(URL.createObjectURL(file));
  };

  const handleUpdateResume = async () => {
    if (!resumeFile || resumePreview) return;

    try {
      await dispatch(
        updateProfileThunk({
          resume: resumeFile,
        }),
      ).unwrap();
      setIsEditMode(false);
      dispatch(fetchCurrentUser());
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  const handleSaveProfile = async () => {
    if (!updateUser) return;
    const newErrors: Record<string, string> = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "birthdate",
      "gender",
      "nationality",
      "currentPlaceResidence",
      "contactNo",
      "visaStatus",
      "japaneseLevel",
      "highestEducation",
    ];

    requiredFields.forEach((field) => {
      const value =
        updateUser.jobSeekerData?.[
          field as keyof typeof updateUser.jobSeekerData
        ];
      if (!value) {
        newErrors[field] = "This field is required.";
      }
    });

    if (
      updateUser.jobSeekerData?.contactNo &&
      !isPhoneNumberValid(updateUser.jobSeekerData.contactNo)
    ) {
      newErrors.contactNo = "Enter a valid phone number.";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const finalUpdatedUser: RegisterJobSeekerData = {
      accountInfo: {
        ...AuthUser.accountInfo,
      },
      termsAndConditions: {
        ...AuthUser.termsAndConditions,
      },
      ...updateUser,
    };

    try {
      await dispatch(
        updateProfileThunk({
          details: finalUpdatedUser,
          avatar: avatarFile,
        }),
      ).unwrap();
      setIsEditMode(false);
      dispatch(fetchCurrentUser());
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  // Safe Access Helper
  const getValue = (field: string) => {
    if (isEditMode && updateUser?.jobSeekerData) {
      // @ts-expect-ignore
      return updateUser.jobSeekerData[field] || "";
    }
    // @ts-expect-ignore
    return AuthUser?.jobSeekerData?.[field] || "N/A";
  };

  // LOGIC: Determine which resume to show (Local Preview > Backend URL)
  const displayResumeUrl = resumePreview
    ? resumePreview
    : existingResume
      ? `http://localhost:8000${existingResume}`
      : null;

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* --- HEADER SECTION --- */}
      <Card className="border-0 shadow-sm mb-4 overflow-hidden">
        <div className="bg-primary" style={{ height: "100px" }}></div>
        <Card.Body className="position-relative pt-0 pb-4 px-4">
          <Row className="align-items-end">
            {/* Profile Image */}
            <Col
              xs="auto"
              className="position-relative"
              style={{ marginTop: "-60px" }}
            >
              <div className="position-relative d-inline-block">
                <div
                  className="position-relative rounded-circle border border-4 border-white overflow-hidden bg-white shadow-sm"
                  style={{ width: "140px", height: "140px" }}
                >
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Preview"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : avatar ? (
                    <Image
                      src={`http://localhost:8000${avatar}`}
                      alt="User Avatar"
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light text-secondary">
                      <User size={64} />
                    </div>
                  )}
                </div>
                {isEditMode && (
                  <Button
                    variant="light"
                    size="sm"
                    className="position-absolute bottom-0 end-0 rounded-circle shadow border"
                    style={{ width: "36px", height: "36px" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera size={16} className="text-primary" />
                  </Button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                  accept="image/*"
                />
              </div>
            </Col>

            {/* Name & Basic Contact */}
            <Col className="pt-3 pt-md-0">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div>
                  <h2 className="fw-bold mb-1">
                    {getValue("firstName")} {getValue("lastName")}
                  </h2>
                  <div className="d-flex flex-wrap gap-3 text-muted">
                    <div className="d-flex align-items-center gap-1">
                      <Mail size={16} />
                      <span className="small">
                        {AuthUser?.accountInfo?.email || "No Email"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <Phone size={16} />
                      <span className="small">{getValue("contactNo")}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <MapPin size={16} />
                      <span
                        className="small text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {getValue("currentPlaceResidence") || "No Location"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column gap-2">
                  {isEditMode ? (
                    <>
                      <Button
                        className="d-flex align-items-center gap-2"
                        onClick={handleSaveProfile}
                        size="sm"
                      >
                        <Save size={16} /> Save Changes
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={handleEditToggle}
                        size="sm"
                      >
                        <X size={16} /> Cancel Edit
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        className="d-flex align-items-center gap-2"
                        onClick={handleEditToggle}
                        size="sm"
                      >
                        <Edit2 size={16} /> Edit Profile
                      </Button>
                      {!displayResumeUrl && (
                        <Button
                          variant="secondary"
                          className="d-flex align-items-center gap-2"
                          onClick={() => fileResumeRef.current?.click()}
                          size="sm"
                        >
                          <FileDownIcon size={16} /> Upload Resume
                        </Button>
                      )}
                    </>
                  )}
                  {/* Hidden Input for Resume */}
                  <input
                    type="file"
                    ref={fileResumeRef}
                    hidden
                    accept=".pdf, image/*"
                    onChange={handleResumeFileChange}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* --- DETAILS GRID --- */}
      <Row className="g-4">
        {/* LEFT COLUMN: Personal Identity */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            {/* ... Existing Personal Info Code ... */}
            <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
              <h5 className="fw-bold mb-0">Personal Information</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      First Name
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        value={getValue("firstName")}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        isInvalid={!!errors.firstName}
                      />
                    ) : (
                      <p className="fw-medium">{getValue("firstName")}</p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      Middle Name
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        value={getValue("midName")}
                        onChange={(e) =>
                          handleInputChange("midName", e.target.value)
                        }
                      />
                    ) : (
                      <p className="fw-medium">{getValue("midName")}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      Last Name
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        value={getValue("lastName")}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        isInvalid={!!errors.lastName}
                      />
                    ) : (
                      <p className="fw-medium">{getValue("lastName")}</p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      Birthdate
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        type="date"
                        value={getValue("birthdate")}
                        onChange={(e) =>
                          handleInputChange("birthdate", e.target.value)
                        }
                        isInvalid={!!errors.birthdate}
                      />
                    ) : (
                      <p className="fw-medium">{getValue("birthdate")}</p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {errors.birthdate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      Gender
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Select
                        value={getValue("gender")}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        isInvalid={!!errors.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    ) : (
                      <p className="fw-medium text-capitalize">
                        {getValue("gender")}
                      </p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      Nationality
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        value={getValue("nationality")}
                        onChange={(e) =>
                          handleInputChange("nationality", e.target.value)
                        }
                        isInvalid={!!errors.nationality}
                      />
                    ) : (
                      <p className="fw-medium text-capitalize">
                        {getValue("nationality")}
                      </p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {errors.nationality}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      Current Residence
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        value={getValue("currentPlaceResidence")}
                        onChange={(e) =>
                          handleInputChange(
                            "currentPlaceResidence",
                            e.target.value,
                          )
                        }
                        placeholder="City, Country"
                        isInvalid={!!errors.currentPlaceResidence}
                      />
                    ) : (
                      <p className="fw-medium">
                        {getValue("currentPlaceResidence")}
                      </p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {errors.currentPlaceResidence}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT COLUMN: Professional & Status */}
        <Col lg={4}>
          <div className="d-flex flex-column gap-4">
            {/* Status Card */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
                <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  <Briefcase size={18} /> Professional Status
                </h6>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-3">
                  <Form.Label className="text-muted small fw-semibold">
                    Visa Status
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Select
                      value={getValue("visaStatus")}
                      onChange={(e) =>
                        handleInputChange("visaStatus", e.target.value)
                      }
                      isInvalid={!!errors.visaStatus}
                    >
                      <option value="">Select status</option>
                      {VISA_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <div>
                      <Badge
                        bg={
                          getValue("visaStatus") === "DENIED"
                            ? "danger"
                            : "success"
                        }
                      >
                        {getValue("visaStatus")}
                      </Badge>
                    </div>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.visaStatus}
                  </Form.Control.Feedback>
                </div>

                <div className="mb-3">
                  <Form.Label className="text-muted small fw-semibold">
                    Japanese Level
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Select
                      value={getValue("japaneseLevel")}
                      onChange={(e) =>
                        handleInputChange("japaneseLevel", e.target.value)
                      }
                      isInvalid={!!errors.japaneseLevel}
                    >
                      <option value="">Select level</option>
                      {JAPANESE_LEVEL_OPTIONS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="fw-medium">{getValue("japaneseLevel")}</p>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.japaneseLevel}
                  </Form.Control.Feedback>
                </div>

                <div>
                  <Form.Label className="text-muted small fw-semibold">
                    Highest Education
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Select
                      value={getValue("highestEducation")}
                      onChange={(e) =>
                        handleInputChange("highestEducation", e.target.value)
                      }
                      isInvalid={!!errors.highestEducation}
                    >
                      <option value="">Select education</option>
                      {EDUCATION_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="fw-medium d-flex align-items-center gap-2">
                      <GraduationCap size={16} className="text-muted" />
                      {getValue("highestEducation")}
                    </p>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.highestEducation}
                  </Form.Control.Feedback>
                </div>
              </Card.Body>
            </Card>

            {/* Social Card */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
                <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  <Globe size={18} /> Social Links
                </h6>
              </Card.Header>
              <Card.Body className="p-4">
                <Form.Group>
                  <Form.Label className="text-muted small fw-semibold">
                    Facebook
                  </Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <FaFacebook size={18} className="text-primary" />
                    {isEditMode ? (
                      <Form.Control
                        value={getValue("facebook")}
                        onChange={(e) =>
                          handleInputChange("facebook", e.target.value)
                        }
                        placeholder="Profile URL or Username"
                      />
                    ) : (
                      <a
                        href={getValue("facebook")}
                        className="text-decoration-none text-truncate d-block"
                        style={{ maxWidth: "200px" }}
                      >
                        {getValue("facebook") || "Not linked"}
                      </a>
                    )}
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* --- RESUME SECTION (MODIFIED) --- */}
      <Row className="mt-4">
        <Col md={12}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <FileText size={20} /> Resume
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              {displayResumeUrl ? (
                // IF RESUME EXISTS: Show Standard Iframe
                <div
                  className="w-100 rounded border bg-light"
                  style={{ height: "600px", overflow: "hidden" }}
                >
                  <iframe
                    src={displayResumeUrl}
                    width="100%"
                    height="100%"
                    title="Resume Preview"
                    style={{ border: "none" }}
                  />
                </div>
              ) : (
                // IF NO RESUME: Show Upload Prompt
                <div
                  className="d-flex flex-column align-items-center justify-content-center p-5 border border-2 border-secondary border-opacity-25 rounded bg-light"
                  style={{ borderStyle: "dashed !important" }}
                >
                  <div className="bg-white p-3 rounded-circle shadow-sm mb-3">
                    <UploadCloud size={32} className="text-primary" />
                  </div>
                  <h6 className="fw-bold mb-1">No resume uploaded yet</h6>
                  <p
                    className="text-muted small mb-3 text-center"
                    style={{ maxWidth: "400px" }}
                  >
                    Upload your resume to increase your chances of getting
                    hired. Employers are more likely to view profiles with
                    resumes.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => fileResumeRef.current?.click()}
                  >
                    Upload Resume
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditJobSeeker;
