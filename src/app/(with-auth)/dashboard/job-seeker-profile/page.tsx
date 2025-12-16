"use client";
import { Col, Nav, Row, Tab, Container } from "react-bootstrap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EditJobSeeker from "../../../../components/jobSeekerProfile/ProfileJobSeeker";
import { BellIcon, FoldersIcon, UserCircle } from "lucide-react";
import Notifications from "../../../../components/Notifications";

const JobSeekerProfilePage = () => {
  return (
    <>
      <Navbar />
      <Container fluid className="p-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey="job-seeker-profile">
          <Row>
            <Col sm={3} className="px-3">
              <Container
                fluid
                className="p-3 border-0 shadow-sm bg-body-tertiary"
              >
                <Nav variant="pills" className="flex-column gap-2">
                  <Nav.Item>
                    <Nav.Link eventKey="job-seeker-profile">
                      <UserCircle /> Profile
                    </Nav.Link>
                  </Nav.Item>
                  <hr className="m-0" />
                  <Nav.Item>
                    <Nav.Link eventKey="applied-jobs">
                      <FoldersIcon /> Applied Jobs
                    </Nav.Link>
                  </Nav.Item>
                  <hr className="m-0" />
                  <Nav.Item>
                    <Nav.Link eventKey="notifications">
                      <BellIcon /> Notifications
                    </Nav.Link>
                  </Nav.Item>
                  <hr className="m-0" />
                  <Nav.Item>
                    <Nav.Link eventKey="saved-jobs">
                      <FoldersIcon /> Saved Jobs
                    </Nav.Link>
                  </Nav.Item>
                  <hr className="m-0" />
                  <Nav.Item>
                    <Nav.Link eventKey="messages">
                      <FoldersIcon /> Messages
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Container>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="job-seeker-profile">
                  <EditJobSeeker />
                </Tab.Pane>
                <Tab.Pane eventKey="notifications">
                  <Notifications />
                </Tab.Pane>
                <Tab.Pane eventKey="applied-jobs">applied-jobs</Tab.Pane>
                <Tab.Pane eventKey="saved-jobs">saved-jobs</Tab.Pane>
                <Tab.Pane eventKey="messages">messages</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      <Footer />
    </>
  );
};

export default JobSeekerProfilePage;
