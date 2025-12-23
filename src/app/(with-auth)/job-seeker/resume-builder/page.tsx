"use client";
import { useRef } from "react"; // 1. Needed for printing
import { useReactToPrint } from "react-to-print"; // 2. The print hook

// Components
import BasicInfo from "@/components/jobSeekerDashboard/resumeBuilder/BasicInfo";
import Education from "@/components/jobSeekerDashboard/resumeBuilder/Education";
import LanguageLevel from "@/components/jobSeekerDashboard/resumeBuilder/LanguageLevel";
import Skills from "@/components/jobSeekerDashboard/resumeBuilder/Skills";
import WorkExp from "@/components/jobSeekerDashboard/resumeBuilder/WorkExp";
import { ResumeTemplate } from "@/components/jobSeekerDashboard/resumeBuilder/ResumeTemplate"; // Import your Template

// Redux & Icons
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { goNextResumeTab, ResumeBuilderData } from "@/redux/slices/resumeSlice";
import {
  BuildingIcon,
  LanguagesIcon,
  MenuIcon,
  School2Icon,
  UserPenIcon,
  UserStar,
  DownloadIcon, // Added icon for download button
} from "lucide-react";
import { ReactElement, useState } from "react";
import { Button, Nav, Tab } from "react-bootstrap";

const ResumeBuilderPage = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const resumeTab = useAppSelector((s) => s.resumeBuilder.resumeTab);

  // ⚠️ CHECK THIS: Make sure this selector matches where your actual resume data lives in Redux
  const resumeData = useAppSelector((s) => s.resumeBuilder);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // PRINT LOGIC
  const templateRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: templateRef,
    documentTitle: `Resume-${resumeData?.basicInfo?.firstName} ${
      resumeData?.basicInfo?.lastName || "Draft"
    }`,
  });

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className="d-flex flex-grow-1 overflow-hidden"
      style={{ height: "100vh" }}
    >
      <Tab.Container
        id={`sidebar ${isCollapsed && "justify-content-center"}`}
        activeKey={resumeTab}
        onSelect={(key) => {
          if (key) {
            dispatch(goNextResumeTab(key as ResumeBuilderData["resumeTab"]));
          }
        }}
      >
        {/* COLUMN 1: Sidebar */}
        <div
          className={`sidebar ${isCollapsed ? "collapsed" : ""} border-end`}
          style={{ width: isCollapsed ? "80px" : "250px", transition: "0.3s" }}
        >
          <div className="sidebar-header p-3 d-flex justify-content-between align-items-center">
            <h5 className="sidebar-title m-0 text-truncate">
              {!isCollapsed && "RESUME BUILDER"}
            </h5>
            <Button
              variant="link"
              onClick={handleCollapse}
              className="p-0 text-dark"
            >
              <MenuIcon />
            </Button>
          </div>
          <Nav variant="pills" className="flex-column gap-2 p-2">
            {navItems.map((items) => (
              <Nav.Item key={items.key}>
                <Nav.Link
                  eventKey={items.key}
                  className="d-flex align-items-center gap-2"
                >
                  {items.icon}
                  {!isCollapsed && <span>{items.label}</span>}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        {/* COLUMN 2: Input Fields (Middle Pane) */}
        {/* Added specific width or flex-basis so it doesn't get squished by the PDF */}
        <div
          className="flex-grow-1 p-4 bg-white border-end"
          style={{ overflowY: "auto", maxWidth: "40%" }}
        >
          <Tab.Content>
            {navItems.map((item) => (
              <Tab.Pane eventKey={item.key} key={item.key}>
                <h4 className="mb-4">{item.label}</h4>
                {item.component}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </div>

        {/* COLUMN 3: Resume Preview (Right Pane) */}
        {/* This must be distinct from Tab.Content because it shows the WHOLE document */}
        <div
          className="flex-grow-1 p-4 bg-secondary bg-opacity-10 d-flex flex-column align-items-center"
          style={{ overflowY: "auto" }}
        >
          {/* Toolbar / Download Button */}
          <div
            className="w-100 d-flex justify-content-end mb-3"
            style={{ maxWidth: "210mm" }}
          >
            <Button
              variant="primary"
              onClick={() => handlePrint()}
              className="d-flex gap-2 align-items-center shadow-sm"
            >
              <DownloadIcon size={18} />
              Download PDF
            </Button>
          </div>

          {/* The Actual Resume Template */}
          <div className="shadow-lg bg-white">
            <ResumeTemplate ref={templateRef} data={resumeData} />
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};

export default ResumeBuilderPage;

// ... (NavItems Interface and Array remain the same)
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
    icon: <UserPenIcon size={20} />,
    component: <BasicInfo />,
  },
  {
    key: "education",
    label: "Education",
    icon: <School2Icon size={20} />,
    component: <Education />,
  },
  {
    key: "lang-level",
    label: "Language Level",
    icon: <LanguagesIcon size={20} />,
    component: <LanguageLevel />,
  },
  {
    key: "work-xp",
    label: "Work Experience",
    icon: <BuildingIcon size={20} />,
    component: <WorkExp />,
  },
  {
    key: "skills",
    label: "Skills",
    icon: <UserStar size={20} />,
    component: <Skills />,
  },
];
