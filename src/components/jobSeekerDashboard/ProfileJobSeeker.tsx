import { ImageIcon } from "lucide-react";
// import { ChangeEvent, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const EditJobSeeker = () => {
  //   const [edit, setEdit] = useState<{ [name: string]: boolean }>({});

  //   function handleEditClick(
  //     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) {
  //     const { name } = e.target;

  //     setEdit((prev) => ({ ...prev, [name]: true }));
  //   }

  return (
    <Container
      fluid
      className="d-flex flex-column gap-3 p-5 border-0 align-items-center"
    >
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
              <Form.Control type="text" placeholder="John" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Middle Name</Form.Label>
              <Form.Control type="text" placeholder="Mid" />
            </Form.Group>
          </Col>
          <Col md={4}>
            {" "}
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Doe" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="0934343" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="johndoe@email.com" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Birthdate</Form.Label>
              <Form.Control type="date" placeholder="11/03/2003" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Experiences</Form.Label>
              <Form.Control type="textarea" placeholder="" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Education</Form.Label>
              <Form.Control type="textarea" placeholder="" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control type="textarea" placeholder="" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Label>Change Password</Form.Label>
          <Col md={4}>
            <Form.Label className="text-muted">Current Password</Form.Label>
            <Form.Control type="textarea" placeholder="" />
          </Col>
          <Col md={4}>
            <Form.Label className="text-muted">New Password</Form.Label>
            <Form.Control type="textarea" placeholder="" />
          </Col>
          <Col md={4} className="d-flex justify-content-start align-items-end">
            <Button className="rounded-pill" variant="outline-primary">
              Update Password
            </Button>
          </Col>
        </Row>
      </Container>
      <hr className="w-100" />
      <Row className="w-100">
        <Col md={2}>
          <h6 className="fw-semibold">Upload Resume</h6>
        </Col>
        <Col md={10}>
          <div className="d-flex gap-3 align-content-center justify-content-center flex-wrap w-100">
            <Button className="rounded-pill">Upload Resume</Button>
            <Button variant="outline-primary" className="rounded-pill">
              Create Resume
            </Button>
          </div>
        </Col>
      </Row>
      <hr className="w-100" />
      <Button className="btn-primary-custom">Save Profile</Button>
    </Container>
  );
};

export default EditJobSeeker;
