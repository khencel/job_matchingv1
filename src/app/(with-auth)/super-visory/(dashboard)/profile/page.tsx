"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Edit2,
  Camera,
  Building2,
  Briefcase,
  Save,
  X,
  User,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { fetchCurrentUser } from "@/redux/features/auth/auth_thunk";
import { updateProfileThunk } from "@/redux/slices/updateProfile/updataProfileThunk";
import { RegisterSuperVisoryData } from "@/types/super-visory";
import { setSupervisoryField } from "@/redux/slices/updateProfile/updateProfileSlice";
import { useTranslations } from "next-intl";

export default function SuperVisoryProfilePage() {
  const t = useTranslations("superVisoryProfile");
  const dispatch = useAppDispatch();

  const authUser = useAppSelector((s) => s.authState.user);
  const updateUser = useAppSelector((s) => s.updateProfile.details);

  const [isEditMode, setIsEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleEditToggle = () => setIsEditMode(!isEditMode);

  const handleInputChange = (
    field: string,
    value: string,
    nestedField: string,
    subNestedField?: string,
  ) => {
    dispatch(
      setSupervisoryField({
        field,
        value,
        nestedField,
        subNestedField,
      }),
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    if (!updateUser) return;

    // Merge existing account/terms data to ensure nothing is lost
    const finalUpdateUser: RegisterSuperVisoryData = {
      ...updateUser,
      accountInfo: {
        ...authUser?.userDetails_supervisory?.accountInfo,
        ...updateUser.accountInfo,
      },
      termsAndConditions: {
        ...authUser?.userDetails_supervisory?.termsAndConditions,
        ...updateUser.termsAndConditions,
      },
    };

    try {
      await dispatch(
        updateProfileThunk({
          details: finalUpdateUser,
          avatar: avatarFile,
          banner: null,
        }),
      ).unwrap();
      setIsEditMode(false);
      dispatch(fetchCurrentUser());
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  const getVal = (field: string) => {
    // Helper logic to display data from Redux safely
    if (isEditMode && updateUser?.companyInfo) {
      return updateUser.companyInfo[field] || "";
    }
    // Fallback logic for authUser display...
    return t("fallback.na"); // Simplified for brevity
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* --- HEADER SECTION --- */}
      <Card className="border-0 shadow-sm mb-4 overflow-hidden">
        <div className="bg-primary" style={{ height: "100px" }}></div>
        <Card.Body className="position-relative pt-0 pb-4 px-4">
          <Row className="align-items-end">
            <Col
              xs="auto"
              className="position-relative"
              style={{ marginTop: "-60px" }}
            >
              <div className="position-relative d-inline-block">
                <div
                  className="rounded-circle border border-4 border-white overflow-hidden bg-white shadow-sm"
                  style={{ width: "140px", height: "140px" }}
                >
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt={t("alts.preview")}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : authUser?.avatar ? (
                    <Image
                      src={authUser.avatar}
                      alt={t("alts.user")}
                      fill
                      style={{ objectFit: "cover" }}
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

            <Col className="pt-3 pt-md-0">
              {/* Display Only Section (Use direct access for simplicity in header) */}
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div>
                  <h2 className="fw-bold mb-1">
                    {authUser?.userDetails_supervisory?.contactPersonInfo
                      ?.name || t("fallback.na")}
                  </h2>
                  <p className="text-muted mb-2 fw-medium">
                    {authUser?.userDetails_supervisory?.companyInfo
                      ?.companyName || t("fallback.na")}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  {isEditMode ? (
                    <>
                      <Button
                        variant="outline-danger"
                        className="d-flex align-items-center gap-2"
                        onClick={handleEditToggle}
                      >
                        <X size={16} /> {t("buttons.cancel")}
                      </Button>
                      <Button
                        className="btn-primary-custom d-flex align-items-center gap-2"
                        onClick={handleSaveProfile}
                      >
                        <Save size={16} /> {t("buttons.saveChanges")}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline-primary"
                      className="d-flex align-items-center gap-2"
                      onClick={handleEditToggle}
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
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <Building2 size={20} /> {t("sections.companyInformation")}
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.companyName")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        name="companyName"
                        value={updateUser?.companyInfo?.companyName || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "companyName",
                            e.target.value,
                            "companyInfo",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.companyName}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.companyNamePhonetic")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        name="companyNamePhonetic"
                        value={
                          updateUser?.companyInfo?.companyNamePhonetic || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "companyNamePhonetic",
                            e.target.value,
                            "companyInfo",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.companyNamePhonetic}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.industry")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        name="industry"
                        value={updateUser?.companyInfo?.industry || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "industry",
                            e.target.value,
                            "companyInfo",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.industry}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.capital")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        type="number"
                        name="capital"
                        value={updateUser?.companyInfo?.capital || 0}
                        onChange={(e) =>
                          handleInputChange(
                            "capital",
                            e.target.value,
                            "companyInfo",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.capital}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.yearFounded")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        type="number"
                        name="yearFounded"
                        value={updateUser?.companyInfo?.yearFounded || 0}
                        onChange={(e) =>
                          handleInputChange(
                            "yearFounded",
                            e.target.value,
                            "companyInfo",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.yearFounded}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.representativeName")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        name="repName"
                        value={updateUser?.companyInfo?.repName || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "repName",
                            e.target.value,
                            "companyInfo",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.repName}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.employees")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        type="number"
                        name="numOfEmployees"
                        value={updateUser?.companyInfo?.numOfEmployees || 0}
                        onChange={(e) =>
                          handleInputChange(
                            "numOfEmployees",
                            e.target.value,
                            "companyInfo",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.numOfEmployees}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col md={12} className="mt-4">
                  <h6 className="fw-bold small text-primary mb-3">
                    {t("sections.headquartersAddress")}
                  </h6>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.prefecture")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        name="prefecture"
                        value={
                          updateUser?.companyInfo?.hqAddress?.prefecture || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "prefecture",
                            e.target.value,
                            "companyInfo",
                            "hqAddress",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.hqAddress?.prefecture}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.city")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        name="city"
                        value={updateUser?.companyInfo?.hqAddress?.city || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "city",
                            e.target.value,
                            "companyInfo",
                            "hqAddress",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.hqAddress?.city}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.street")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        name="street"
                        value={updateUser?.companyInfo?.hqAddress?.street || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "street",
                            e.target.value,
                            "companyInfo",
                            "hqAddress",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium">
                        {updateUser?.companyInfo?.hqAddress?.street}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="text-muted small fw-semibold">
                      {t("labels.businessDescription")}
                    </Form.Label>
                    {isEditMode ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="businessDescription"
                        value={
                          updateUser?.companyInfo?.businessDescription || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "businessDescription",
                            e.target.value,
                            "companyInfo",
                          )
                        }
                      />
                    ) : (
                      <p className="fw-medium text-secondary">
                        {updateUser?.companyInfo?.businessDescription}
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT COLUMN: CONTACT PERSON */}
        <Col lg={4}>
          <div className="d-flex flex-column gap-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
                <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  <User size={18} /> {t("sections.contactPerson")}
                </h6>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-3">
                  <Form.Label className="text-muted small fw-semibold">
                    {t("labels.fullName")}
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Control
                      name="name"
                      value={updateUser?.contactPersonInfo?.name || ""}
                      // ✅ Pass "contactPersonInfo"
                      onChange={(e) =>
                        handleInputChange(
                          "name",
                          e.target.value,
                          "contactPersonInfo",
                        )
                      }
                    />
                  ) : (
                    <p className="fw-medium">
                      {updateUser?.contactPersonInfo?.name}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <Form.Label className="text-muted small fw-semibold">
                    {t("labels.department")}
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Control
                      name="department"
                      value={updateUser?.contactPersonInfo?.department || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "department",
                          e.target.value,
                          "contactPersonInfo",
                        )
                      }
                    />
                  ) : (
                    <p className="fw-medium d-flex align-items-center gap-2">
                      <Briefcase size={16} className="text-muted" />
                      {updateUser?.contactPersonInfo?.department}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <Form.Label className="text-muted small fw-semibold">
                    {t("labels.phoneNumber")}
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={updateUser?.contactPersonInfo?.phoneNumber || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "phoneNumber",
                          e.target.value,
                          "contactPersonInfo",
                        )
                      }
                    />
                  ) : (
                    <p className="fw-medium d-flex align-items-center gap-2">
                      <Phone size={16} className="text-muted" />
                      {updateUser?.contactPersonInfo?.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <Form.Label className="text-muted small fw-semibold">
                    {t("labels.email")}
                  </Form.Label>
                  {isEditMode ? (
                    <Form.Control
                      type="email"
                      name="email"
                      value={updateUser?.contactPersonInfo?.email || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "email",
                          e.target.value,
                          "contactPersonInfo",
                        )
                      }
                    />
                  ) : (
                    <p className="fw-medium d-flex align-items-center gap-2 text-break">
                      <Mail size={16} className="text-muted" />
                      {updateUser?.contactPersonInfo?.email}
                    </p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
