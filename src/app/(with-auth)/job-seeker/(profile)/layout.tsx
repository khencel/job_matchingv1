"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  BellIcon,
  FolderHeartIcon,
  FoldersIcon,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Nav, Tab } from "react-bootstrap";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                    as={Link}
                    eventKey="job-seeker-profile"
                    className="d-flex gap-3"
                    href="/job-seeker/profile"
                  >
                    <UserCircle /> Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="applied-jobs"
                    className="d-flex gap-3"
                    href="/job-seeker/applied-jobs"
                  >
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
            <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
              {children}
            </div>
          </Tab.Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}
