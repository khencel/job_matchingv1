"use client";
import {
  BellIcon,
  File,
  FolderHeartIcon,
  FoldersIcon,
  MenuIcon,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button, Nav, Tab } from "react-bootstrap";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const pathname = usePathname();

  // Determine active key based on pathname
  const getActiveKey = () => {
    if (pathname.includes("/applied-jobs")) return "applied-jobs";
    if (pathname.includes("/notifications")) return "notifications";
    if (pathname.includes("/saved-jobs")) return "saved-jobs";
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
      <Tab.Container
        id={`sidebar ${isCollapsed && "justify-content-center"}`}
        activeKey={getActiveKey()}
      >
        {/* Sidebar */}
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <div className="sidebar-header">
            <h3 className="sidebar-title">{!isCollapsed && "JOB SEEKER"}</h3>
            <Button onClick={handleCollapse} className="toggle-btn">
              <MenuIcon className="icon" />
            </Button>
          </div>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="job-seeker-profile"
                className="sidebar-text"
                href="/job-seeker/profile"
              >
                <UserCircle /> {!isCollapsed && <span>Profile</span>}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="applied-jobs"
                className="sidebar-text"
                href="/job-seeker/applied-jobs"
              >
                <FoldersIcon /> {!isCollapsed && <span>Applied Jobs</span>}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="notifications"
                className="sidebar-text"
                href="/job-seeker/notifications"
              >
                <BellIcon /> {!isCollapsed && <span>Notifications</span>}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="saved-jobs"
                className="sidebar-text"
                href="/job-seeker/saved-jobs"
              >
                <FolderHeartIcon /> {!isCollapsed && <span>Saved Jobs</span>}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                className="sidebar-text"
                href="/job-seeker/resume-builder"
              >
                <File /> {!isCollapsed && <span>Create Resume</span>}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        {/* Content */}
        <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
          <Tab.Content>{children}</Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
}
