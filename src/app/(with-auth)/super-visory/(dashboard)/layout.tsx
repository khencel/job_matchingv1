"use client";
import {
  FileUserIcon,
  LayersIcon,
  MenuIcon,
  UserCircle2Icon,
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
    if (pathname.includes("/overview")) return "overview";
    if (pathname.includes("/applicants")) return "applicants";
    if (pathname.includes("/profile")) return "profile";
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
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""} border-end`}>
          <div className="sidebar-header">
            <h3 className="sidebar-title">{!isCollapsed && "SUPER VISORY"}</h3>
            <Button onClick={handleCollapse} className="toggle-btn">
              <MenuIcon className="icon" />
            </Button>
          </div>
          <Nav className="flex-column">
            {SideBarNavItems.map((item, idx) => (
              <Nav.Item key={idx}>
                <Nav.Link
                  as={Link}
                  eventKey={item.eventKey}
                  className="sidebar-text"
                  href={item.href}
                >
                  {item.icon} {!isCollapsed && <span>{item.label}</span>}
                </Nav.Link>
              </Nav.Item>
            ))}
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

interface SideBarNavItem {
  eventKey: string;
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SideBarNavItems: SideBarNavItem[] = [
  // {
  //   eventKey: "overview",
  //   href: "/super-visory/overview",
  //   icon: <LayersIcon />,
  //   label: "Overview",
  // },
  {
    eventKey: "profile",
    href: "/super-visory/profile",
    icon: <UserCircle2Icon />,
    label: "Profile",
  },
  // {
  //   eventKey: "applicants",
  //   href: "/super-visory/applicants",
  //   icon: <FileUserIcon />,
  //   label: "Applicants",
  // },
  
];
