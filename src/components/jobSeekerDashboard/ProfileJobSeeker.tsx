import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ImageIcon, Edit2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { fetchCurrentUser } from "@/redux/features/auth/auth_thunk";
import { updateProfileThunk } from "@/redux/slices/updateProfile/updataProfileThunk";
import { setJobSeekerField } from "@/redux/slices/updateProfile/updateProfileSlice"; // Import the new action

const EditJobSeeker = () => {
  const dispatch = useAppDispatch();
  // 1. The original user data (Source of Truth for read-only mode)
  const user = useAppSelector((s) => s.authState.user?.userDetails_job_seeker);
  // 2. The editable form data (Source of Truth for edit mode)
  const updateUser = useAppSelector((s) => s.updateProfile.details);
  const [isEditMode, setIsEditMode] = useState(false);

  // LOCAL STATE FOR FILES (Do not put Files in Redux)
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch user on mount to populate Redux
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  // TEXT INPUT HANDLER
  const handleInputChange = (
    field: string,
    value: string,
    nestedField: string = "jobSeekerData",
  ) => {
    dispatch(setJobSeekerField({ field, value, nestedField }));
  };

  // FILE INPUT HANDLER
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Store file locally to send to API later
    setAvatarFile(file);
    // Create a local preview URL immediately
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // SAVE HANDLER
  const handleSaveProfile = async () => {
    if (!updateUser) return;

    try {
      // Dispatch the thunk with Redux data (text) + Local state (file)
      await dispatch(
        updateProfileThunk({
          details: updateUser,
          avatar: avatarFile,
          banner: null,
        }),
      ).unwrap();

      setIsEditMode(false);
      // Refetch user to show new data in read-only mode
      dispatch(fetchCurrentUser());
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };

  // Helper to get value securely
  const getDisplayValue = (field: string) => {
    if (isEditMode && updateUser?.jobSeekerData) {
      // @ts-expect-ignore - dynamic access
      return updateUser.jobSeekerData[field] || "";
    }
    // @ts-expect-ignore
    return user?.jobSeekerData?.[field] || "N/A";
  };

  return (
    <Container
      fluid
      className="d-flex flex-column gap-3 p-5 border-0 align-items-center"
    >
      <Row className="w-100 mb-3">
        <Col className="d-flex justify-content-end gap-3">
          {isEditMode && (
            <Button className="btn-primary-custom" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          )}
          <Button
            variant={isEditMode ? "outline-secondary" : "outline-primary"}
            className="rounded-pill d-flex align-items-center gap-2"
            onClick={handleEditToggle}
          >
            <Edit2 size={16} />
            {isEditMode ? "Cancel" : "Edit Profile"}
          </Button>
        </Col>
      </Row>

      {/* --- PHOTO SECTION --- */}
      <Row>
        <Col md={6}>
          <h6 className="p-0 m-0 mb-2 fw-semibold">Profile Photo</h6>
          <p className="fs-6 p-0 m-0">This image will be shown publicly.</p>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center flex-wrap gap-3"
        >
          <div className="border-1 rounded">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="Preview"
                width={100}
                height={100}
                className="rounded-circle"
                style={{ objectFit: "cover" }}
              />
            ) : user?.idURL ? (
              <Image
                src={user.idURL}
                alt="Current"
                width={100}
                height={100}
                className="rounded-circle"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <ImageIcon size={100} />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {isEditMode && (
            <Button
              className="rounded-pill"
              size="sm"
              onClick={handleUploadClick}
            >
              Change Photo
            </Button>
          )}
        </Col>
      </Row>

      <hr className="w-100" />

      {/* --- PERSONAL DETAILS SECTION --- */}
      <Container className="p-0 d-flex flex-column gap-4">
        <h6 className="p-0 m-0 mb-2 fw-semibold">Personal Details</h6>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              {isEditMode ? (
                <Form.Control
                  type="text"
                  value={updateUser?.jobSeekerData?.firstName || ""}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              ) : (
                <p className="form-control-plaintext">
                  {user?.jobSeekerData.firstName || "N/A"}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Middle Name</Form.Label>
              {isEditMode ? (
                <Form.Control
                  type="text"
                  value={updateUser?.jobSeekerData?.midName || ""}
                  onChange={(e) => handleInputChange("midName", e.target.value)}
                />
              ) : (
                <p className="form-control-plaintext">
                  {user?.jobSeekerData.midName || "N/A"}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              {isEditMode ? (
                <Form.Control
                  type="text"
                  value={updateUser?.jobSeekerData?.lastName || ""}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              ) : (
                <p className="form-control-plaintext">
                  {user?.jobSeekerData.lastName || "N/A"}
                </p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              {isEditMode ? (
                <Form.Control
                  type="tel"
                  value={updateUser?.jobSeekerData?.contactNo || ""}
                  onChange={(e) =>
                    handleInputChange("contactNo", e.target.value)
                  }
                />
              ) : (
                <p className="form-control-plaintext">
                  {user?.jobSeekerData.contactNo}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Birthdate</Form.Label>
              {isEditMode ? (
                <Form.Control
                  type="date"
                  value={updateUser?.jobSeekerData?.birthdate || ""}
                  onChange={(e) =>
                    handleInputChange("birthdate", e.target.value)
                  }
                />
              ) : (
                <p className="form-control-plaintext">
                  {user?.jobSeekerData.birthdate || "N/A"}
                </p>
              )}
            </Form.Group>
          </Col>
          {/* Email is usually read-only unless you have a specific update-email flow */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <p className="form-control-plaintext">
                {user?.accountInfo.email || "N/A"}
              </p>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EditJobSeeker;
