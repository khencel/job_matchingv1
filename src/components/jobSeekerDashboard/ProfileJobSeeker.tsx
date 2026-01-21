import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ImageIcon, Edit2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { uploadProfilePhoto } from "@/app/mock-api/mockProfileApi"; // added import
import { fetchCurrentUser } from "@/redux/features/auth/auth_thunk";

const EditJobSeeker = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((s) => s.authState.user?.userDetails_job_seeker);
  const [isEditMode, setIsEditMode] = useState(false);

  // Added states & ref for photo upload
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  // open file picker
  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  // handle file selection + mock upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploadedUrl = await uploadProfilePhoto(file);
      // For now we only keep preview locally; in real app we'd dispatch update to backend/store
      setPhotoPreview(uploadedUrl);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
      // reset input so same file can be picked again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column gap-3 p-5 border-0 align-items-center"
    >
      <Row className="w-100 mb-3">
        <Col className="d-flex justify-content-end">
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
      <Row>
        <Col md={6}>
          <h6 className="p-0 m-0 mb-2 fw-semibold">Profile Photo</h6>
          <p className="fs-6 p-0 m-0">
            This image will be shown publicly as your profile picture, it will
            help recruiters recognize you!
          </p>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center flex-wrap gap-3"
        >
          <div className="border-1 rounded">
            {photoPreview ? (
              // show preview from mock upload
              <Image
                src={photoPreview}
                alt="Profile Preview"
                width={100}
                height={100}
                className="rounded-circle"
                style={{ objectFit: "cover" }}
              />
            ) : user?.idURL ? (
              // existing user photo
              <Image
                src={user.idURL}
                alt="Profile Photo"
                width={100}
                height={100}
                className="rounded-circle"
              />
            ) : (
              <ImageIcon size={100} />
            )}
          </div>

          {/* hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <Button
            className="rounded-pill"
            size="sm"
            onClick={handleUploadPhoto}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Spinner animation="border" size="sm" /> Uploading...
              </>
            ) : (
              "Upload Photo"
            )}
          </Button>
        </Col>
      </Row>
      <hr className="w-100" />
      <Container className="p-0 d-flex flex-column gap-4">
        <h6 className="p-0 m-0 mb-2 fw-semibold">Personal Details</h6>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              {isEditMode ? (
                <Form.Control
                  type="text"
                  defaultValue={user?.jobSeekerData.firstName}
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
                  defaultValue={user?.jobSeekerData.midName}
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
                  defaultValue={user?.jobSeekerData.lastName}
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
                  placeholder={user?.jobSeekerData.contactNo}
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
              <Form.Label>Email</Form.Label>
              {isEditMode ? (
                <Form.Control type="email" placeholder="johndoe@email.com" />
              ) : (
                <p className="form-control-plaintext">
                  {user?.accountInfo.email || "N/A"}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Birthdate</Form.Label>
              {isEditMode ? (
                <Form.Control type="date" placeholder="11/03/2003" />
              ) : (
                <p className="form-control-plaintext">
                  {user?.jobSeekerData.birthdate || "N/A"}
                </p>
              )}
            </Form.Group>
          </Col>
        </Row>
        {isEditMode && (
          <Row>
            <Form.Label>Change Password</Form.Label>
            <Col md={4}>
              <Form.Label className="text-muted">Current Password</Form.Label>
              <Form.Control type="password" placeholder="••••••••" />
            </Col>
            <Col md={4}>
              <Form.Label className="text-muted">New Password</Form.Label>
              <Form.Control type="password" placeholder="••••••••" />
            </Col>
            <Col
              md={4}
              className="d-flex justify-content-start align-items-end"
            >
              <Button className="rounded-pill" variant="outline-primary">
                Update Password
              </Button>
            </Col>
          </Row>
        )}
      </Container>
      <hr className="w-100" />
      <Row className="w-100">
        <Col md={2}>
          <h6 className="fw-semibold">Upload Resume</h6>
        </Col>
        <Col md={10}>
          <div className="d-flex gap-3 align-content-center justify-content-center flex-wrap w-100">
            <Button className="rounded-pill">Upload Resume</Button>
            <Button
              variant="outline-primary"
              className="rounded-pill"
              onClick={() => router.push("/job-seeker/resume-builder")}
            >
              Create Resume
            </Button>
          </div>
        </Col>
      </Row>
      {isEditMode && (
        <>
          <hr className="w-100" />
          <Button className="btn-primary-custom">Save Profile</Button>
        </>
      )}
    </Container>
  );
};

export default EditJobSeeker;
