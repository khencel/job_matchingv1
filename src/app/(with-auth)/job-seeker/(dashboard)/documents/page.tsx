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

const DocumentsPage = () => {
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
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Logic will be handled by the user
    const files = event.target.files;
    console.log("Files selected:", files);
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
                <div className="text-center py-5">
                  <div className="mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      fill="currentColor"
                      className="bi bi-cloud-arrow-up text-primary mb-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                      />
                      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                    </svg>
                  </div>
                  <h5 className="mb-3">Upload Your Documents</h5>
                  <p className="text-muted mb-4">
                    Select multiple files to upload at once. Supported formats:
                    PDF, DOC, DOCX, JPG, PNG
                  </p>
                  <Form.Group>
                    <Form.Label htmlFor="fileUpload" className="mb-0">
                      <Button
                        variant="primary"
                        size="lg"
                        className="px-5"
                        as="span"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-plus-circle me-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Choose Files to Upload
                      </Button>
                    </Form.Label>
                    <Form.Control
                      id="fileUpload"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="d-none"
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
