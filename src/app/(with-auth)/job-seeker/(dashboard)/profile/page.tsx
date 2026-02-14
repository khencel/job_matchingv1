"use client";

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
  FileText,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
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
import { useRouter } from "next/navigation";
import DisplayResume from "@/components/DisplayResume";
import { useTranslations } from "next-intl";

const JobSeekerProfilePage = () => {
  const t = useTranslations("jobSeekerProfileExtended");
  const dispatch = useAppDispatch();
  const router = useRouter();
  // Read-only source
  const email = useAppSelector((s) => s.authState.user?.email);
  const AuthUser = useAppSelector(
    (s) => s.authState.user?.userDetails_job_seeker,
  );
  const avatar = useAppSelector((s) => s.authState.user?.avatar);

  // Get the resume path from Redux
  const existingResume = useAppSelector((s) => s.authState.user?.resume);
  const updateUser = useAppSelector((s) => s.updateProfile.details);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [dateNow, setDateNow] = useState<number>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const VISA_OPTIONS = [
    { value: "APPLIED", label: t("sections.professionalStatus.fields.visaStatus.options.APPLIED") },
    { value: "PENDING", label: t("sections.professionalStatus.fields.visaStatus.options.PENDING") },
    { value: "REVIEWING", label: t("sections.professionalStatus.fields.visaStatus.options.REVIEWING") },
    { value: "ISSUED", label: t("sections.professionalStatus.fields.visaStatus.options.ISSUED") },
    { value: "DENIED", label: t("sections.professionalStatus.fields.visaStatus.options.DENIED") },
  ];
  const JAPANESE_LEVEL_OPTIONS = [
    { value: "N5", label: t("sections.professionalStatus.fields.japaneseLevel.options.N5") },
    { value: "N4", label: t("sections.professionalStatus.fields.japaneseLevel.options.N4") },
    { value: "N3", label: t("sections.professionalStatus.fields.japaneseLevel.options.N3") },
    { value: "N2", label: t("sections.professionalStatus.fields.japaneseLevel.options.N2") },
    { value: "N1", label: t("sections.professionalStatus.fields.japaneseLevel.options.N1") },
  ];
  const EDUCATION_OPTIONS = [
    {
      value: "elementary",
      label: t("sections.professionalStatus.fields.highestEducation.options.elementary"),
    },
    {
      value: "jr-highschool",
      label: t("sections.professionalStatus.fields.highestEducation.options.jrHighschool"),
    },
    {
      value: "sr-highschool",
      label: t("sections.professionalStatus.fields.highestEducation.options.srHighschool"),
    },
    {
      value: "vocational",
      label: t("sections.professionalStatus.fields.highestEducation.options.vocational"),
    },
    {
      value: "bachelorDegree",
      label: t("sections.professionalStatus.fields.highestEducation.options.bachelorDegree"),
    },
    {
      value: "masterDegree",
      label: t("sections.professionalStatus.fields.highestEducation.options.masterDegree"),
    },
    {
      value: "doctoralDegree",
      label: t("sections.professionalStatus.fields.highestEducation.options.doctoralDegree"),
    },
  ];
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const resumeUrl = useMemo(() => {
    return `${baseUrl}media/${existingResume}?${dateNow}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingResume, dateNow]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        newErrors[field] = t("errors.required");
      }
    });

    if (
      updateUser.jobSeekerData?.contactNo &&
      !isPhoneNumberValid(updateUser.jobSeekerData.contactNo)
    ) {
      newErrors.contactNo = t("errors.invalidPhone");
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
      setDateNow(Date.now());
      setIsEditMode(false);
      dispatch(fetchCurrentUser());
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  // Safe Access Helpers
  const getRawValue = (field: string) => {
    if (isEditMode && updateUser?.jobSeekerData) {
      // @ts-expect-ignore
      return updateUser.jobSeekerData[field] || "";
    }
    // @ts-expect-ignore
    return AuthUser?.jobSeekerData?.[field] || "";
  };

  const getValue = (field: string) => {
    if (isEditMode && updateUser?.jobSeekerData) {
      // @ts-expect-ignore
      return updateUser.jobSeekerData[field] || "";
    }
    // @ts-expect-ignore
    return AuthUser?.jobSeekerData?.[field] || t("fallback.notAvailable");
  };

  const visaStatusLabels: Record<string, string> = {
    APPLIED: t("sections.professionalStatus.fields.visaStatus.options.APPLIED"),
    PENDING: t("sections.professionalStatus.fields.visaStatus.options.PENDING"),
    REVIEWING: t("sections.professionalStatus.fields.visaStatus.options.REVIEWING"),
    ISSUED: t("sections.professionalStatus.fields.visaStatus.options.ISSUED"),
    DENIED: t("sections.professionalStatus.fields.visaStatus.options.DENIED"),
  };

  const japaneseLevelLabels: Record<string, string> = {
    N5: t("sections.professionalStatus.fields.japaneseLevel.options.N5"),
    N4: t("sections.professionalStatus.fields.japaneseLevel.options.N4"),
    N3: t("sections.professionalStatus.fields.japaneseLevel.options.N3"),
    N2: t("sections.professionalStatus.fields.japaneseLevel.options.N2"),
    N1: t("sections.professionalStatus.fields.japaneseLevel.options.N1"),
  };

  const educationLabels: Record<string, string> = {
    elementary: t("sections.professionalStatus.fields.highestEducation.options.elementary"),
    "jr-highschool": t(
      "sections.professionalStatus.fields.highestEducation.options.jrHighschool",
    ),
    "sr-highschool": t(
      "sections.professionalStatus.fields.highestEducation.options.srHighschool",
    ),
    vocational: t("sections.professionalStatus.fields.highestEducation.options.vocational"),
    bachelorDegree: t(
      "sections.professionalStatus.fields.highestEducation.options.bachelorDegree",
    ),
    masterDegree: t(
      "sections.professionalStatus.fields.highestEducation.options.masterDegree",
    ),
    doctoralDegree: t(
      "sections.professionalStatus.fields.highestEducation.options.doctoralDegree",
    ),
  };

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
                      alt={t("previewAlt")}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : avatar ? (
                    <Image
                      src={`${baseUrl}${avatar}`}
                      alt={t("avatarAlt")}
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
                    {`${getValue("firstName")} ${getValue("lastName")}`}
                  </h2>
                  <div className="d-flex flex-wrap gap-3 text-muted">
                    <div className="d-flex align-items-center gap-1">
                      <Mail size={16} />
                      <span className="small">{email}</span>
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
                        {getRawValue("currentPlaceResidence")
                          ? getRawValue("currentPlaceResidence")
                          : t("fallback.noLocation")}
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
                        <Save size={16} /> {t("buttons.saveChanges")}
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={handleEditToggle}
                        size="sm"
                      >
                        <X size={16} /> {t("buttons.cancelEdit")}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      className="d-flex align-items-center gap-2"
                      onClick={handleEditToggle}
                      size="sm"
                    >
                        <Edit2 size={16} /> {t("buttons.editProfile")}
                    </Button>
                  )}
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
            {/* ... Existing Personal Info ... */}
            <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
              <h5 className="fw-bold mb-0">
                {t("sections.personalInformation.title")}
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("sections.personalInformation.fields.firstName")}
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
                      {t("sections.personalInformation.fields.middleName")}
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
                      {t("sections.personalInformation.fields.lastName")}
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
                      {t("sections.personalInformation.fields.birthdate")}
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
                      {t("sections.personalInformation.fields.gender.label")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Select
                        value={getValue("gender")}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        isInvalid={!!errors.gender}
                      >
                        <option value="">
                          {t("sections.personalInformation.fields.gender.placeholder")}
                        </option>
                        <option value="male">
                          {t("sections.personalInformation.fields.gender.options.male")}
                        </option>
                        <option value="female">
                          {t("sections.personalInformation.fields.gender.options.female")}
                        </option>
                        <option value="other">
                          {t("sections.personalInformation.fields.gender.options.other")}
                        </option>
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
                      {t("sections.personalInformation.fields.nationality")}
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
                      {t("sections.personalInformation.fields.currentResidence.label")}
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
                        placeholder={
                          t("sections.personalInformation.fields.currentResidence.placeholder")
                        }
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
                  <Briefcase size={18} />
                  {t("sections.professionalStatus.title")}
                </h6>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-3">
                  <Form.Label className="text-muted small fw-semibold">
                    {t("sections.professionalStatus.fields.visaStatus.label")}
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Select
                      value={getValue("visaStatus")}
                      onChange={(e) =>
                        handleInputChange("visaStatus", e.target.value)
                      }
                      isInvalid={!!errors.visaStatus}
                    >
                      <option value="">
                        {t("sections.professionalStatus.fields.visaStatus.placeholder")}
                      </option>
                      {VISA_OPTIONS.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <div>
                      <Badge
                        bg={getRawValue("visaStatus") === "DENIED" ? "danger" : "success"}
                      >
                        {visaStatusLabels[getRawValue("visaStatus")] ||
                          getValue("visaStatus")}
                      </Badge>
                    </div>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.visaStatus}
                  </Form.Control.Feedback>
                </div>

                <div className="mb-3">
                  <Form.Label className="text-muted small fw-semibold">
                    {t("sections.professionalStatus.fields.japaneseLevel.label")}
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Select
                      value={getValue("japaneseLevel")}
                      onChange={(e) =>
                        handleInputChange("japaneseLevel", e.target.value)
                      }
                      isInvalid={!!errors.japaneseLevel}
                    >
                      <option value="">
                        {t("sections.professionalStatus.fields.japaneseLevel.placeholder")}
                      </option>
                      {JAPANESE_LEVEL_OPTIONS.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="fw-medium">
                      {japaneseLevelLabels[getRawValue("japaneseLevel")] ||
                        getValue("japaneseLevel")}
                    </p>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.japaneseLevel}
                  </Form.Control.Feedback>
                </div>

                <div>
                  <Form.Label className="text-muted small fw-semibold">
                    {t("sections.professionalStatus.fields.highestEducation.label")}
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Select
                      value={getValue("highestEducation")}
                      onChange={(e) =>
                        handleInputChange("highestEducation", e.target.value)
                      }
                      isInvalid={!!errors.highestEducation}
                    >
                      <option value="">
                        {t("sections.professionalStatus.fields.highestEducation.placeholder")}
                      </option>
                      {EDUCATION_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="fw-medium d-flex align-items-center gap-2">
                      <GraduationCap size={16} className="text-muted" />
                      {educationLabels[getRawValue("highestEducation")] ||
                        getValue("highestEducation")}
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
                  <Globe size={18} /> {t("sections.socialLinks.title")}
                </h6>
              </Card.Header>
              <Card.Body className="p-4">
                <Form.Group>
                  <Form.Label className="text-muted small fw-semibold">
                    {t("sections.socialLinks.fields.facebook.label")}
                  </Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <FaFacebook size={18} className="text-primary" />
                    {isEditMode ? (
                      <Form.Control
                        value={getValue("facebook")}
                        onChange={(e) =>
                          handleInputChange("facebook", e.target.value)
                        }
                        placeholder={
                          t("sections.socialLinks.fields.facebook.placeholder")
                        }
                      />
                    ) : (
                      <a
                        href={getValue("facebook")}
                        className="text-decoration-none text-truncate d-block"
                        style={{ maxWidth: "200px" }}
                      >
                        {getRawValue("facebook")
                          ? getRawValue("facebook")
                          : t("fallback.notLinked")}
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
          <DisplayResume
            resumeUrl={resumeUrl}
            existingResume={existingResume}
            isPublic={false}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default JobSeekerProfilePage;
