"use client";
import { useTranslations } from "next-intl";
import {
  File,
  FileUserIcon,
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
  const t = useTranslations("jobSeekerDashboard");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const pathname = usePathname();

  // Determine active key based on pathname
  const getActiveKey = () => {
    if (pathname.includes("/job-seeker/profile")) return "job-seeker-profile";
    if (pathname.includes("/applied-jobs")) return "applied-jobs";
    if (pathname.includes("/documents")) return "documents";
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
            <h3 className="sidebar-title">{!isCollapsed && t("sidebarTitle")}</h3>
            <Button onClick={handleCollapse} className="toggle-btn">
              <MenuIcon className="icon" />
            </Button>
          </div>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="job-seeker-profile"
                className="sidebar-text"
                href="/job-seeker/profile"
              >
                <UserCircle /> {!isCollapsed && <span>{t("sidebarProfile")}</span>}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="applied-jobs"
                className="sidebar-text"
                href="/job-seeker/applied-jobs"
              >
                <FoldersIcon /> {!isCollapsed && <span>{t("sidebarAppliedJobs")}</span>}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="documents"
                className="sidebar-text"
                href="/job-seeker/documents"
              >
                <FileUserIcon /> {!isCollapsed && <span>{t("sidebarDocuments")}</span>}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                className="sidebar-text"
                href="/job-seeker/resume-builder"
              >
                <File /> {!isCollapsed && <span>{t("sidebarCreateResume")}</span>}
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
