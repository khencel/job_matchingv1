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
    <Container fluid className="d-flex flex-column gap-3 card p-5 border-0 shadow-sm bg-body-tertiary">
      <Row>
        <Col>
          <h5 className="p-0 m-0 mb-2 fw-semibold">Basic Information</h5>
          <p className="fs-6 p-0 m-0">
            This is your personal information that you can update anytime.
          </p>
        </Col>
      </Row>
      <hr />
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
      <hr />
      <Container className="p-0">
        <Container fluid className="p-0 m-0">
          <h6 className="p-0 m-0 mb-2 fw-semibold">Personal Details</h6>
        </Container>
        <Row className="mt-4">
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
        <Row className="mt-4">
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
      </Container>
      <hr />
      <Container fluid>
        <Container fluid className="d-flex gap-5 p-0 m-0 mb-3">
          <h6 className="p-0 m-0 mb-2 fw-semibold">Upload Resume</h6>
        </Container>
        <Container
          fluid
          className="d-flex justify-content-start align-items-center gap-3"
        >
          <Button className="rounded-pill">Upload Resume</Button>
          <Button variant="outline-primary" className="rounded-pill">
            Create Resume
          </Button>
        </Container>
      </Container>
      <hr />
      <Button className="btn-primary-custom w-25 ms-auto">Save Profile</Button>
    </Container>
  );
};

export default EditJobSeeker;
