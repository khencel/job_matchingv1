"use client";
import { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { InfoIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface PreviewFileProps {
  filePath: string | null;
  fileName?: string;
  onClose: () => void;
}

const PreviewFile = ({
  filePath,
  fileName,
  onClose,
}: PreviewFileProps) => {
  const t = useTranslations("previewFile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");

  useEffect(() => {
    if (!filePath) return;

    const loadFile = async () => {
      if (filePath) {
        setLoading(true);
        setError(null);
        // Extract file type from filePath
        const extension = filePath.split(".").pop()?.toLowerCase() || "";
        setFileType(extension);
        setLoading(false);
      }
    };
    loadFile();
  }, [filePath]);

  if (!filePath) return null;
  const resolvedFileName = fileName || t("defaultTitle");

  const getFileType = (path: string) => {
    const ext = path.split(".").pop()?.toLowerCase() || "";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (ext === "pdf") return "pdf";
    if (["doc", "docx", "txt", "rtf"].includes(ext)) return "document";
    if (["mp4", "webm", "mov"].includes(ext)) return "video";
    return "unknown";
  };

  const renderPreview = () => {
    const type = getFileType(filePath);
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
    const fullFilePath = `${BASEURL}/media/${filePath}`;

    if (error) {
      return (
        <div className="d-flex align-items-center justify-content-center h-100 flex-column gap-3">
          <InfoIcon size={64} className="text-danger" />
          <p className="text-danger">{error}</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="d-flex align-items-center justify-content-center h-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">{t("loading")}</span>
          </Spinner>
        </div>
      );
    }

    switch (type) {
      case "image":
        return (
          <div className="d-flex align-items-center justify-content-center h-100">
            <img
              src={fullFilePath}
              alt={resolvedFileName}
              className="mw-100 mh-100"
              style={{ maxHeight: "80vh", objectFit: "contain" }}
              onError={() => setError(t("errorImage"))}
            />
          </div>
        );

      case "pdf":
        return (
          <div className="h-100">
            <iframe
              src={fullFilePath}
              className="w-100 h-100"
              style={{ border: "none", minHeight: "600px" }}
              onError={() => setError(t("errorPdf"))}
            />
          </div>
        );

      case "video":
        return (
          <div className="d-flex align-items-center justify-content-center h-100">
            <video
              src={fullFilePath}
              controls
              className="mw-100 mh-100"
              style={{ maxHeight: "80vh" }}
              onError={() => setError(t("errorVideo"))}
            />
          </div>
        );

      case "document":
        return (
          <div className="p-4 h-100 bg-light overflow-auto">
            <div className="alert alert-info mb-4">
              <p className="mb-0">
                {t("documentPreviewUnavailable")}
              </p>
            </div>
            <div className="text-center py-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                className="bi bi-file-text text-muted mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0 2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
                <path d="M4 0a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V0zm5.5 0v1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-3.5V0z" />
              </svg>
              <p className="text-muted">
                {t("documentLabel", { type: fileType.toUpperCase() })}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 h-100 bg-light text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="currentColor"
              className="bi bi-file text-muted mb-3"
              viewBox="0 0 16 16"
            >
              <path d="M4 0a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V0zm5.5 0v1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-3.5V0z" />
            </svg>
            <p className="text-muted mt-3">
              {t("unsupported")}
            </p>
          </div>
        );
    }
  };

  return (
    <Modal
      show={!!filePath}
      onHide={onClose}
      size="lg"
      centered
      backdrop="static"
      className="preview-modal"
    >
      <Modal.Header className="bg-light border-bottom d-flex justify-content-between align-items-center">
        <Modal.Title className="text-truncate fw-bold">
          {resolvedFileName}
        </Modal.Title>
        <div className="d-flex gap-2">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={onClose}
            title={t("closeTitle")}
          >
            <X size={18} />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className="p-0" style={{ minHeight: "500px" }}>
        {renderPreview()}
      </Modal.Body>
    </Modal>
  );
};

export default PreviewFile;
