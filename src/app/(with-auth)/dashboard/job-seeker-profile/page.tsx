import React from "react";
import Navbar from "@/components/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  EditIcon,
  LanguagesIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";

const JobSeekerProfile = () => {
  return (
    <div>
      <Navbar />
      <Container className="p-5">
        <Row>
          {/* Profile Side - Left Side */}
          <Col md={9}>
            {/* Profile */}
            <Card className="p-5 bg-body-tertiary border-0 shadow-sm mb-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-between gap-4">
                  <Image
                    width={100}
                    height={100}
                    src={"/globe.svg"}
                    alt="profile"
                    className="rounded-circle border border-primary p-1"
                  />
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <p className="fs-3 fw-semibold p-0 m-0 text-body">
                      Sample User
                    </p>
                    <div className="d-flex text-muted gap-2">
                      <MapPinIcon />
                      <p className="fs-6 p-0 m-0">Tokyo, Japan</p>
                    </div>
                  </div>
                </div>
                <Button className="btn-primary-custom">Edit Profile</Button>
              </div>
            </Card>

            {/* About Me - Editable */}
            <Card className="p-4 bg-body-tertiary border-0 shadow-sm mb-3">
              <div className="d-flex mb-4 align-items-center justify-content-between">
                <p className="fs-4 p-0 m-0 fw-bold text-primary">About Me</p>
                <Button variant="ghost">
                  <EditIcon className="text-muted" />
                </Button>
              </div>

              <p className="text-muted">
                I’m a dedicated and goal-oriented individual who’s passionate
                about continuous learning and growth. I take pride in delivering
                quality work, collaborating with others, and adapting to new
                challenges. I’m eager to apply my skills, gain experience, and
                contribute positively to any organization I join. <br /> <br />
                I’m a dedicated and goal-oriented individual who’s passionate
                about continuous learning and growth. I take pride in delivering
                quality work, collaborating with others, and adapting to new
                challenges. I’m eager to apply my skills, gain experience, and
                contribute positively to any organization I join.
              </p>
            </Card>

            {/* Experiences - Use .map function when adding new xp */}
            <Card className="p-4 bg-body-tertiary border-0 shadow-sm mb-3">
              <div className="d-flex mb-4 align-items-center justify-content-between">
                <p className="fs-4 p-0 m-0 fw-bold text-primary">Experiences</p>
                <Button variant="ghost">
                  <PlusIcon className="text-muted" />
                </Button>
              </div>
              {/* Sample Exp */}
              <div className="pe-5">
                <div className="d-flex align-items-center justify-content-between my-2">
                  <p className="fs-5 p-0 m-0 fw-bold text-muted">Jollibee</p>
                  <Button variant="ghost">
                    <EditIcon className="text-muted" />
                  </Button>
                </div>
                <p className="fs-6 p-0 mx-0 text-muted">
                  Full Time - June 19 - Present
                </p>
                <p className="fs-6 p-0 mx-0 text-muted">Tokyo, Japan</p>
                <p className="fs-6 p-0 mx-0 text-muted">
                  Assisted customers with orders and inquiries while maintaining
                  fast and accurate service in a high-volume environment at
                  Jollibee.
                </p>
              </div>
              <div className="pe-5">
                <div className="d-flex align-items-center justify-content-between my-2">
                  <p className="fs-5 p-0 m-0 fw-bold text-muted">Jollibee</p>
                  <Button variant="ghost">
                    <EditIcon className="text-muted" />
                  </Button>
                </div>
                <p className="fs-6 p-0 mx-0 text-muted">
                  Full Time - June 19 - Present
                </p>
                <p className="fs-6 p-0 mx-0 text-muted">Tokyo, Japan</p>
                <p className="fs-6 p-0 mx-0 text-muted">
                  Assisted customers with orders and inquiries while maintaining
                  fast and accurate service in a high-volume environment at
                  Jollibee.
                </p>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-4 bg-body-tertiary border-0 shadow-sm mb-3">
              <div className="d-flex mb-4 align-items-center justify-content-between">
                <p className="fs-4 p-0 m-0 fw-bold text-primary">Skills</p>
                <Button variant="ghost">
                  <PlusIcon className="text-muted" />
                </Button>
              </div>
              {/* Skills */}
              <div className="pe-5">
                <div className="d-flex align-items-center justify-content-between my-2">
                  <p className="fs-6 p-0 m-0 fw-semibold text-muted">
                    San Sebastian College Recoletos de Cavite
                  </p>
                  <Button variant="ghost">
                    <Trash2Icon className="text-muted" />
                  </Button>
                </div>
              </div>
              <div className="pe-5">
                <div className="d-flex align-items-center justify-content-between my-2">
                  <p className="fs-6 p-0 m-0 fw-semibold text-muted">
                    San Sebastian College Recoletos de Cavite
                  </p>
                  <Button variant="ghost">
                    <Trash2Icon className="text-muted" />
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          {/* Additional Details - Right Side */}
          <Col md={3}>
            <Card className="p-3 bg-body-tertiary border-0 shadow-sm">
              <div className="d-flex mb-3 align-items-center justify-content-between">
                <p className="fs-5 m-0 p-0 fw-semibold text-body">
                  Additional Details
                </p>
                <Button variant="ghost">
                  <EditIcon className="text-muted" size={20} />
                </Button>
              </div>
              <div className="d-flex gap-3">
                <MailIcon />
                <p className="fs-6">
                  Email <br />{" "}
                  <span className="text-muted">sampleEmail@gmail.com</span>
                </p>
              </div>
              <div className="d-flex gap-3">
                <PhoneIcon />
                <p className="fs-6">
                  Phone <br />{" "}
                  <span className="text-muted">+63 12121212121</span>
                </p>
              </div>
              <div className="d-flex gap-3">
                <LanguagesIcon />
                <p className="fs-6">
                  Languages <br />{" "}
                  <span className="text-muted">English, Japanese</span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        {/* Testimonials */}
        <Card className="w-100 border-0 shadow-sm p-5 mx-auto bg-body-tertiary">
          <p className="fs-4 p-0 mb-5 fw-bold text-primary">Testimonials</p>
          <div className="w-100 d-flex flex-wrap">
            <div className="d-flex gap-3 justify-content-center align-items-center w-50 p-2">
              <Image
                width={200}
                height={200}
                src={"/img/card/card1.jpg"}
                alt={"."}
                className="rounded-1 shadow-sm m-0"
              />
              <div className="pe-3">
                <p className="fs-5 fw-bold text-muted">Sample Testimonials</p>
                <p className="fs-6 p-0 mx-0 text-muted">
                  {`"Assisted customers with orders and inquiries while maintaining
                fast and accurate service in a high-volume environment at
                Jollibee."`}
                </p>
              </div>
            </div>
            <div className="d-flex gap-3 justify-content-center align-items-center w-50 p-2">
              <Image
                width={200}
                height={200}
                src={"/img/card/card1.jpg"}
                alt={"."}
                className="rounded-1 shadow-sm m-0"
              />
              <div className="pe-3">
                <p className="fs-5 fw-bold text-muted">Sample Testimonials</p>
                <p className="fs-6 p-0 mx-0 text-muted">
                  {`"Assisted customers with orders and inquiries while maintaining
                fast and accurate service in a high-volume environment at
                Jollibee."`}
                </p>
              </div>
            </div>
            <div className="d-flex gap-3 justify-content-center align-items-center w-50 p-2">
              <Image
                width={200}
                height={200}
                src={"/img/card/card1.jpg"}
                alt={"."}
                className="rounded-1 shadow-sm m-0"
              />
              <div className="pe-3">
                <p className="fs-5 fw-bold text-muted">Sample Testimonials</p>
                <p className="fs-6 p-0 mx-0 text-muted">
                  {`"Assisted customers with orders and inquiries while maintaining
                fast and accurate service in a high-volume environment at
                Jollibee."`}
                </p>
              </div>
            </div>
            <div className="d-flex gap-3 justify-content-center align-items-center w-50 p-2">
              <Image
                width={200}
                height={200}
                src={"/img/card/card1.jpg"}
                alt={"."}
                className="rounded-1 shadow-sm m-0"
              />
              <div className="pe-3">
                <p className="fs-5 fw-bold text-muted">Sample Testimonials</p>
                <p className="fs-6 p-0 mx-0 text-muted">
                  {`"Assisted customers with orders and inquiries while maintaining
                fast and accurate service in a high-volume environment at
                Jollibee."`}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default JobSeekerProfile;
