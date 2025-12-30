import { useAppSelector } from "@/redux/hooks";
import { ImageIcon, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const EditJobSeeker = () => {
  const router = useRouter();
  const user = useAppSelector((s) => s.authState.user);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
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
          <ImageIcon size={124} className="border p-3 rounded-circle" />
          <Button className="rounded-pill" size="sm">
            Change Photo
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
                <Form.Control type="text" defaultValue={user?.first_name} />
              ) : (
                <p className="form-control-plaintext">
                  {user?.first_name || "N/A"}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Middle Name</Form.Label>
              {isEditMode ? (
                <Form.Control type="text" placeholder="Mid" />
              ) : (
                <p className="form-control-plaintext">N/A</p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              {isEditMode ? (
                <Form.Control type="text" defaultValue={user?.last_name} />
              ) : (
                <p className="form-control-plaintext">
                  {user?.last_name || "N/A"}
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
                <Form.Control type="tel" placeholder="0934343" />
              ) : (
                <p className="form-control-plaintext">N/A</p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              {isEditMode ? (
                <Form.Control type="email" placeholder="johndoe@email.com" />
              ) : (
                <p className="form-control-plaintext">{user?.email || "N/A"}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Birthdate</Form.Label>
              {isEditMode ? (
                <Form.Control type="date" placeholder="11/03/2003" />
              ) : (
                <p className="form-control-plaintext">N/A</p>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Experiences</Form.Label>
              {isEditMode ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your work experience"
                />
              ) : (
                <p className="form-control-plaintext">N/A</p>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Education</Form.Label>
              {isEditMode ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your education"
                />
              ) : (
                <p className="form-control-plaintext">N/A</p>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              {isEditMode ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your skills"
                />
              ) : (
                <p className="form-control-plaintext">N/A</p>
              )}
            </Form.Group>
          </Col>
        </Row>
        {isEditMode && (
          <Row>
            <Form.Label>Change Password</Form.Label>
            <Col md={4}>
              <Form.Label className="text-muted">Current Password</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Col>
            <Col md={4}>
              <Form.Label className="text-muted">New Password</Form.Label>
              <Form.Control type="password" placeholder="" />
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
