"use client";
import { FormEvent, useRef } from "react"; // 1. Needed for printing
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Components
import BasicInfo from "@/components/jobSeekerDashboard/resumeBuilder/BasicInfo";
import Education from "@/components/jobSeekerDashboard/resumeBuilder/Education";
import Skills from "@/components/jobSeekerDashboard/resumeBuilder/Skills";
import WorkExp from "@/components/jobSeekerDashboard/resumeBuilder/WorkExp";
import { ResumeTemplate } from "@/components/jobSeekerDashboard/resumeBuilder/ResumeTemplate"; // Import your Template

// Redux & Icons
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  goNextResumeTab,
  saveResume,
  canSaveResume,
} from "@/redux/slices/resumeSlice";
import {
  BuildingIcon,
  MenuIcon,
  School2Icon,
  UserPenIcon,
  UserStar,
  DownloadIcon,
  SaveIcon,
} from "lucide-react";
import { ReactElement, useState } from "react";
import { Button, Nav, Tab, Spinner, Alert } from "react-bootstrap";
import { showSuccessToast } from "@/app/(util)/toaster";
import { ResumeBuilderData } from "@/types/resume-builder";

const ResumeBuilderPage = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const resumeTab = useAppSelector((s) => s.resumeBuilder.resumeTab);
  const isLoading = useAppSelector((s) => s.resumeBuilder.isLoading);
  const error = useAppSelector((s) => s.resumeBuilder.error);
  const user = useAppSelector((s) => s.authState.user);
  const resumeData = useAppSelector((s) => s.resumeBuilder);
  const isSaveDisabled = !useAppSelector((s) => canSaveResume(s.resumeBuilder));

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // SAVE RESUME HANDLER
  const handleSaveResume = async (e: FormEvent) => {
    e.preventDefault();
    if (!templateRef.current) return;

    try {
      // 1. Lower the scale. scale: 2 is overkill for a standard A4 resume.
      // Use 1.5 or 1 for much smaller file sizes.
      const canvas = await html2canvas(templateRef.current, { scale: 1 });

      // 2. Use JPEG instead of PNG. Resumes have lots of white space.
      // JPEG compression (e.g., 0.7) will slash your file size by 70-80%.
      const imgData = canvas.toDataURL("image/jpeg", 0.7);

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 3. Add compression to the PDF image
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST",
      );

      const blob = pdf.output("blob");

      // DEBUG: Check the size before sending
      console.log(`Blob size: ${(blob.size / 1024 / 1024).toFixed(2)} MB`);

      if (blob.size > 10 * 1024 * 1024) {
        alert("Resume file is too large. Reduce image resolution or content.");
        return;
      }

      const fileName = `${user?.first_name || "user"}-resume`;
      await dispatch(saveResume({ blob, fileName })).unwrap();

      showSuccessToast("Success", "Resume saved.");
    } catch (err) {
      console.error("Failed to generate or save PDF:", err);
    }
  };

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
          style={{ width: isCollapsed ? "80px" : "15%", transition: "0.3s" }}
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
          <Nav className="flex-column">
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

        {/* COLUMN 2: Input Fields (Middle Pane) */}
        {/* Added specific width or flex-basis so it doesn't get squished by the PDF */}
        <div
          className="flex-grow-1 p-4 bg-white border-end"
          style={{ overflowY: "auto", width: "25%" }}
        >
          <Tab.Content>
            {navItems.map((item) => (
              <Tab.Pane eventKey={item.key} key={item.key}>
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
          {/* Error Alerts */}
          {error && (
            <Alert
              variant="danger"
              dismissible
              className="w-100"
              style={{ maxWidth: "210mm" }}
            >
              {error}
            </Alert>
          )}

          {/* Toolbar / Action Buttons */}
          <div
            className="w-100 d-flex justify-content-end gap-2 mb-3"
            style={{ maxWidth: "210mm" }}
          >
            <Button
              variant="success"
              onClick={handleSaveResume}
              disabled={isLoading || isSaveDisabled}
              className="d-flex gap-2 align-items-center shadow-sm"
              title={
                isSaveDisabled
                  ? "Complete Basic Information and Language Level first"
                  : "Save Resume"
              }
            >
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" />
                  Saving...
                </>
              ) : (
                <>
                  <SaveIcon size={18} />
                  Save Resume
                </>
              )}
            </Button>
            <Button
              variant="primary"
              onClick={() => handlePrint()}
              disabled={isSaveDisabled}
              className="d-flex gap-2 align-items-center shadow-sm"
              title={
                isSaveDisabled
                  ? "Complete Basic Information and Language Level first"
                  : "Print Resume"
              }
            >
              <DownloadIcon size={18} />
              Print Resume
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
