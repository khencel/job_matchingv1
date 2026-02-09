import { FileText, FileX, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import { useTranslations } from "next-intl";

interface ResumeViewerProps {
  existingResume: string | undefined | null;
  isPublic: boolean;
  resumeUrl: string;
}

const DisplayResume = ({
  existingResume,
  isPublic,
  resumeUrl,
}: ResumeViewerProps) => {
  const router = useRouter();
  const t = useTranslations("displayResume");
  return (
    <Card className="border-light-subtle rounded-4 shadow-sm">
      <Card.Header className="bg-transparent border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <FileText size={20} /> {t("title")}
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        {existingResume ? (
          // IF RESUME EXISTS: Show Standard Iframe
          <div
            className="w-100 rounded border bg-light"
            style={{ height: "600px" }}
          >
            <iframe
              src={resumeUrl}
              width="100%"
              height="100%"
              title={t("previewTitle")}
              style={{ border: "none" }}
            />
          </div>
        ) : isPublic ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center p-5 border border-2 border-secondary border-opacity-25 rounded bg-light"
            style={{ borderStyle: "dashed !important" }}
          >
            <div className="bg-white p-3 rounded-circle shadow-sm mb-3">
              <FileX size={32} className="text-primary" />
            </div>
            <h6 className="fw-bold mb-1">{t("emptyPublic")}</h6>
          </div>
        ) : (
          <div
            className="d-flex flex-column align-items-center justify-content-center p-5 border border-2 border-secondary border-opacity-25 rounded bg-light"
            style={{ borderStyle: "dashed !important" }}
          >
            <div className="bg-white p-3 rounded-circle shadow-sm mb-3">
              <UploadCloud size={32} className="text-primary" />
            </div>
            <h6 className="fw-bold mb-1">{t("emptyPrivateTitle")}</h6>
            <p
              className="text-muted small mb-3 text-center"
              style={{ maxWidth: "400px" }}
            >
              {t("emptyPrivateBody")}
            </p>
            <Button
              variant="primary"
              onClick={() => router.push("/job-seeker/resume-builder")}
            >
              {t("createResume")}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default DisplayResume;
