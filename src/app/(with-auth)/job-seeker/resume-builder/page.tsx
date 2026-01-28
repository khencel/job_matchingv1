"use client";
import { FormEvent, useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Components
import { ResumeTemplate } from "@/app/(with-auth)/job-seeker/resume-builder/ResumeTemplate";
import ResumeForm from "./resume-form";

// Redux & Icons
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { saveResume } from "@/redux/slices/resumeSlice";
import { DownloadIcon, SaveIcon } from "lucide-react";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { showSuccessToast } from "@/app/(util)/toaster";

const ResumeBuilderPage = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const { data: resumeData, isLoading } = useAppSelector(
    (state) => state.resumeBuilder,
  );
  const user = useAppSelector((state) => state.authState.user);

  const isResumeValid = useMemo(() => {
    const hasRequiredText = (value?: string) => Boolean(value?.trim());
    const hasValidEmail = (value?: string) =>
      Boolean(value && /\S+@\S+\.\S+/.test(value));
    const hasValidPhone = (value?: string) =>
      Boolean(value && value.trim().length >= 7);
    const hasValidAge =
      typeof resumeData.age === "number" && resumeData.age > 0;

    return (
      hasRequiredText(resumeData.fullName) &&
      hasRequiredText(resumeData.birthdate) &&
      hasValidAge &&
      hasRequiredText(resumeData.gender) &&
      hasRequiredText(resumeData.photoUrl) &&
      hasValidEmail(resumeData.email) &&
      hasValidPhone(resumeData.phone) &&
      hasRequiredText(resumeData.address) &&
      hasRequiredText(resumeData.postalCode) &&
      hasRequiredText(resumeData.reasons)
    );
  }, [resumeData]);

  // SAVE RESUME HANDLER
  const handleSaveResume = async (e: FormEvent) => {
    e.preventDefault();
    if (!templateRef.current) return;

    try {
      // Generate canvas from the resume template
      const canvas = await html2canvas(templateRef.current, { scale: 1 });
      // Convert canvas to JPEG image data with compression
      const imgData = canvas.toDataURL("image/jpeg", 0.7);
      // Create a new PDF document
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF with compression
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
      // Convert the PDF to a Blob object
      const blob = pdf.output("blob");
      // DEBUG: Check the size before sending
      console.log(`Blob size: ${(blob.size / 1024 / 1024).toFixed(2)} MB`);

      if (!user) return;

      await dispatch(
        saveResume({
          user: user.id,
          resume_info: JSON.stringify(resumeData),
          resume: new File([blob], "resume.pdf", { type: "application/pdf" }),
        }),
      ).unwrap();

      showSuccessToast("Success", "Resume saved.");
    } catch (err) {
      console.error("Failed to generate or save PDF:", err);
    }
  };

  // PRINT LOGIC
  const templateRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: templateRef,
    documentTitle: `Resume-Drafts`,
  });

  return (
    <div
      className="d-flex flex-grow-1 overflow-hidden"
      style={{ height: "100vh" }}
    >
      <Row className="g-4 flex-grow-1 w-100" style={{ height: "100%" }}>
        <Col md={4} className="h-100">
          <ResumeForm />
        </Col>

        <Col lg={8} className="d-flex flex-column align-items-center h-100">
          {/* Toolbar / Action Buttons */}
          <div
            className="w-100 d-flex justify-content-end gap-2 mb-3"
            style={{ maxWidth: "210mm" }}
          >
            <Button
              variant="success"
              onClick={handleSaveResume}
              className="d-flex gap-2 align-items-center shadow-sm"
              title="Save Resume"
              disabled={!isResumeValid || isLoading}
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
              className="d-flex gap-2 align-items-center shadow-sm"
              title="Print Resume"
            >
              <DownloadIcon size={18} />
              Print Resume
            </Button>
          </div>
          {/* The Actual Resume Template */}
          <div
            className="shadow-lg bg-white w-100 flex-grow-1"
            style={{
              maxWidth: "210mm",
              width: "100%",
              maxHeight: "calc(100vh - 180px)",
              overflowY: "auto",
            }}
          >
            <div className="p-3">
              <ResumeTemplate ref={templateRef} data={resumeData} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResumeBuilderPage;
