"use client";
import {
  Tab,
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import apiClient from "@/lib/axios";
import {
  CloudUploadIcon,
  FilesIcon,
  PlusCircleIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PreviewFile from "@/components/PreviewFile";
import { fetchCurrentUser } from "@/redux/features/auth/auth_thunk";
import DisplayDocuments from "../../../../../components/DisplayDocuments";
import { useTranslations } from "next-intl";

const DocumentsPage = () => {
  const t = useTranslations("jobSeekerDocuments");
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((s) => s.authState.user?.id);
  const documents = useAppSelector((s) => s.authState.user?.documents || []);

  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadedFiles) {
      // Combine existing files with newly selected files
      const combinedFiles = new DataTransfer();

      Array.from(uploadedFiles).forEach((file) =>
        combinedFiles.items.add(file),
      );

      if (e.target.files) {
        Array.from(e.target.files).forEach((file) =>
          combinedFiles.items.add(file),
        );
      }
      setUploadedFiles(combinedFiles.files);
      return;
    }
    setUploadedFiles(e.target.files);
  };

  const handleRemoveFile = (index: number) => {
    if (!uploadedFiles) return;

    // Convert FileList to array and remove the file at index
    const filesArray = Array.from(uploadedFiles);
    filesArray.splice(index, 1);

    // Create a new DataTransfer to simulate a FileList
    const dataTransfer = new DataTransfer();
    filesArray.forEach((file) => dataTransfer.items.add(file));

    setUploadedFiles(filesArray.length > 0 ? dataTransfer.files : null);
  };

  const handleClearAllFiles = () => {
    setUploadedFiles(null);
  };

  const fileName = (doc: string) => {
    const name = doc.split(`user_${user_id}/`).pop();
    return name?.split(".").shift();
  };

  // Placeholder handler for file upload
  const handleFileUpload = async () => {
    if (!uploadedFiles || uploadedFiles.length === 0) {
      Swal.fire({
        icon: "warning",
        title: t("alerts.noFilesTitle"),
        text: t("alerts.noFilesText"),
      });
      return;
    }

    const formData = new FormData();

    if (user_id) {
      formData.append("user", user_id.toString());
    }

    if (uploadedFiles) {
      Array.from(uploadedFiles).forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      const res = await apiClient.post("documents/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        icon: "success",
        title: t("alerts.uploadSuccessTitle"),
        text: t("alerts.uploadSuccessText"),
      });
      console.log("Uploaded Files", res);
      setUploadedFiles(null);
      dispatch(fetchCurrentUser());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("alerts.uploadFailedTitle"),
        text: t("alerts.uploadFailedText"),
      });
      console.log("Error uploading documents", error);
    }
    console.log("Files selected:", uploadedFiles);
  };
  if (!user_id) return;
  return (
    <Tab.Pane eventKey="documents">
      <PreviewFile
        filePath={previewFile}
        fileName={fileName(previewFile || "Document") || "Document"}
        onClose={() => setPreviewFile(null)}
      />
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm rounded-4 border-light-subtle">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="mb-1 fw-bold">{t("header.title")}</h4>
                    <p className="text-muted mb-0">{t("header.subtitle")}</p>
                  </div>
                  <Badge bg="primary" className="px-3 py-2">
                    {t("header.count", { count: documents.length })}
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm rounded-4 border-light-subtle">
              <Card.Body className="p-4">
                {uploadedFiles && uploadedFiles.length > 0 && (
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">{t("preview.title")}</h6>
                    <div className="border rounded p-3 bg-light">
                      {Array.from(uploadedFiles).map((file, index) => (
                        <div
                          key={index}
                          className={`d-flex justify-content-between align-items-center py-2 ${uploadedFiles.length - 1 !== index ? "border-bottom" : ""}`}
                        >
                          <div className="d-flex align-items-center">
                            <FilesIcon className="text-primary me-2 text-primary-emphasis" />
                            <div>
                              <div className="fw-semibold text-dark">
                                {file.name}
                              </div>
                              <div className="text-muted small">
                                {(file.size / 1024).toFixed(2)} KB
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Trash2Icon />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center py-5">
                  {!uploadedFiles || uploadedFiles.length === 0 ? (
                    <>
                      <div className="mb-4">
                        <CloudUploadIcon size={80} className="text-primary" />
                      </div>
                      <h5 className="mb-3">{t("upload.title")}</h5>
                      <p className="text-muted mb-4">
                        {t("upload.subtitle")}
                      </p>
                    </>
                  ) : null}
                  <Form.Group>
                    <Form.Label htmlFor="fileUpload" className="mb-0">
                      <Button
                        variant="outline-primary"
                        // @ts-expect-error md is valid
                        size="md"
                        className="px-3 mb-3"
                        as="span"
                      >
                        <PlusCircleIcon className="me-1" />
                        {uploadedFiles && uploadedFiles.length > 0
                          ? t("upload.chooseMore")
                          : t("upload.chooseFiles")}
                      </Button>
                      {uploadedFiles && uploadedFiles.length > 0 && (
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            variant="primary"
                            // @ts-expect-error md is valid
                            size="md"
                            className="px-3"
                            onClick={handleFileUpload}
                          >
                            <UploadIcon className="me-1" />
                            {t("upload.uploadFiles")}
                          </Button>
                          <Button
                            variant="outline-dark"
                            // @ts-expect-error md is valid
                            size="md"
                            className="px-3"
                            onClick={handleClearAllFiles}
                          >
                            {t("upload.clear")}
                          </Button>
                        </div>
                      )}
                    </Form.Label>
                    <Form.Control
                      id="fileUpload"
                      type="file"
                      multiple
                      className="d-none"
                      onChange={handleFileSelect}
                    />
                  </Form.Group>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <DisplayDocuments
              isPublic={false}
              documents={documents}
              user_id={user_id.toString()}
            />
          </Col>
        </Row>
      </Container>
    </Tab.Pane>
  );
};
export default DocumentsPage;
