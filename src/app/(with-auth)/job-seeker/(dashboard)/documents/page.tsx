"use client";
import {
  Tab,
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
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
import { useAppSelector } from "@/redux/hooks";

const DocumentsPage = () => {
  const user_id = useAppSelector((s) => s.authState.user?.id);
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

  // Placeholder for uploaded documents list
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Resume.pdf",
      size: "245 KB",
      uploadDate: "2026-01-25",
      type: "PDF",
    },
    {
      id: 2,
      name: "Cover_Letter.docx",
      size: "128 KB",
      uploadDate: "2026-01-24",
      type: "DOCX",
    },
    {
      id: 3,
      name: "Certificates.pdf",
      size: "892 KB",
      uploadDate: "2026-01-20",
      type: "PDF",
    },
  ]);

  // Placeholder handler for file upload
  const handleFileUpload = async () => {
    if (!uploadedFiles || uploadedFiles.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Files Selected",
        text: "Please select files to upload.",
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
        title: "Upload Successful",
        text: "Your documents have been uploaded successfully.",
      });
      console.log("Uploaded Files", res);
      setUploadedFiles(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error uploading your documents. Please try again.",
      });
      console.log("Error uploading documents", error);
    }

    console.log("Files selected:", uploadedFiles);
  };

  return (
    <Tab.Pane eventKey="documents">
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="mb-1 fw-bold">My Documents</h4>
                    <p className="text-muted mb-0">
                      Upload and manage your documents
                    </p>
                  </div>
                  <Badge bg="primary" className="px-3 py-2">
                    {documents.length} Documents
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                {uploadedFiles && uploadedFiles.length > 0 && (
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Preview Files</h6>
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
                      <h5 className="mb-3">Upload Your Documents</h5>
                      <p className="text-muted mb-4">
                        Select multiple files to upload at once. Supported
                        formats: PDF, DOC, DOCX, JPG, PNG
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
                          ? "Choose More Files"
                          : "Choose Files"}
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
                            Upload Files
                          </Button>
                          <Button
                            variant="outline-dark"
                            // @ts-expect-error md is valid
                            size="md"
                            className="px-3"
                            onClick={handleClearAllFiles}
                          >
                            Clear
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
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0 fw-bold">Uploaded Documents</h5>
              </Card.Header>
              <Card.Body className="p-0">
                {documents.length === 0 ? (
                  <div className="text-center py-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      className="bi bi-inbox text-muted mb-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z" />
                    </svg>
                    <p className="text-muted mb-0">No documents uploaded yet</p>
                  </div>
                ) : (
                  <Table responsive hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 py-3">File Name</th>
                        <th className="border-0 py-3">Type</th>
                        <th className="border-0 py-3">Size</th>
                        <th className="border-0 py-3">Upload Date</th>
                        <th className="border-0 py-3 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.id}>
                          <td className="align-middle py-3">
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  className="bi bi-file-earmark-text text-primary"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                                </svg>
                              </div>
                              <div>
                                <div className="fw-semibold">{doc.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle py-3">
                            <Badge bg="info" className="px-2 py-1">
                              {doc.type}
                            </Badge>
                          </td>
                          <td className="align-middle py-3 text-muted">
                            {doc.size}
                          </td>
                          <td className="align-middle py-3 text-muted">
                            {doc.uploadDate}
                          </td>
                          <td className="align-middle py-3 text-end">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-download"
                                viewBox="0 0 16 16"
                              >
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                              </svg>
                            </Button>
                            <Button variant="outline-danger" size="sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Tab.Pane>
  );
};
export default DocumentsPage;
