"use client";
import { Nav, Tab } from "react-bootstrap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EditJobSeeker from "../../../../components/jobSeekerProfile/ProfileJobSeeker";
import {
  BellIcon,
  FoldersIcon,
  UserCircle,
  FolderHeartIcon,
  MessageSquareIcon,
} from "lucide-react";
import Notifications from "../../../../components/Notifications";
import SavedJobs from "../../../../components/jobSeekerProfile/SavedJobs";
import AppliedJobs from "../../../../components/jobSeekerProfile/AppliedJobs";

const JobSeekerProfilePage = () => {
  return (
    <div>
      <div className="vh-100 d-flex flex-column">
        {/* Navbar */}
        <Navbar />
        <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="job-seeker-profile"
          >
            {/* Sidebar */}
            <div className="bg-light border-end p-4 shadow-sm w-25">
              <h3 className="fw-bold fs-3 mb-5 text-primary">Job Seeker</h3>
              <Nav variant="pills" className="flex-column gap-4">
                <Nav.Item>
                  <Nav.Link
                    eventKey="job-seeker-profile"
                    className="d-flex gap-3"
                  >
                    <UserCircle /> Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="applied-jobs" className="d-flex gap-3">
                    <FoldersIcon /> Applied Jobs
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="notifications" className="d-flex gap-3">
                    <BellIcon /> Notifications
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="saved-jobs" className="d-flex gap-3">
                    <FolderHeartIcon /> Saved Jobs
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            {/* Content */}
            <div
              className="flex-grow-1 p-4"
              style={{ overflowY: "auto" }} // Allows main content to scroll independently
            >
              <Tab.Content>
                <Tab.Pane eventKey="job-seeker-profile">
                  <EditJobSeeker />
                </Tab.Pane>
                <Tab.Pane eventKey="notifications">
                  <Notifications />
                </Tab.Pane>
                <Tab.Pane eventKey="applied-jobs">
                  <AppliedJobs />
                </Tab.Pane>
                <Tab.Pane eventKey="saved-jobs">
                  <SavedJobs />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobSeekerProfilePage;
