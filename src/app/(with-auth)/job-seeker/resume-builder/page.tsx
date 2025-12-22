"use client";
import BasicInfo from "@/components/jobSeekerDashboard/resumeBuilder/BasicInfo";
import Education from "@/components/jobSeekerDashboard/resumeBuilder/Education";
import LanguageLevel from "@/components/jobSeekerDashboard/resumeBuilder/LanguageLevel";
import Skills from "@/components/jobSeekerDashboard/resumeBuilder/Skills";
import WorkExp from "@/components/jobSeekerDashboard/resumeBuilder/WorkExp";
import {
  BuildingIcon,
  LanguagesIcon,
  MenuIcon,
  School2Icon,
  UserPenIcon,
  UserStar,
} from "lucide-react";
import { ReactElement, useState } from "react";
import { Button, Nav, Tab } from "react-bootstrap";

const ResumeBuilderPage = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="d-flex flex-grow-1 overflow-hidden">
      <Tab.Container
        id={`sidebar ${isCollapsed && "justify-content-center"}`}
        defaultActiveKey={"basic-info"}
      >
        {/* Sidebar */}
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <div className="sidebar-header">
            <h3 className="sidebar-title">
              {!isCollapsed && "RESUME BUILDER"}
            </h3>
            <Button onClick={handleCollapse} className="toggle-btn">
              <MenuIcon className="icon" />
            </Button>
          </div>
          <Nav variant="pills" className="flex-column gap-4">
            {navItems.map((items) => (
              <Nav.Item key={items.key}>
                <Nav.Link eventKey={items.key} className="sidebar-text">
                  {items.icon}
                  {!isCollapsed && <span>{items.label}</span>}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        {/* Content */}
        <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
          <Tab.Content>
            {navItems.map((item) => (
              <Tab.Pane eventKey={item.key} key={item.key}>
                {item.component}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default ResumeBuilderPage;

interface NavItems {
  key: string;
  label: string;
  icon: ReactElement;
  component: ReactElement;
}

const navItems: NavItems[] = [
  {
    key: "basic-info",
    label: "Basic Information",
    icon: <UserPenIcon />,
    component: <BasicInfo />,
  },
  {
    key: "education",
    label: "Education",
    icon: <School2Icon />,
    component: <Education />,
  },
  {
    key: "lang-level",
    label: "Language Level",
    icon: <LanguagesIcon />,
    component: <LanguageLevel />,
  },
  {
    key: "skills",
    label: "Skills",
    icon: <UserStar />,
    component: <Skills />,
  },
  {
    key: "work-xp",
    label: "Work Experience",
    icon: <BuildingIcon />,
    component: <WorkExp />,
  },
];
