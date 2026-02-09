import { FileIcon, FileX2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Card, Table } from "react-bootstrap";
import PreviewFile from "./PreviewFile";
import { useTranslations } from "next-intl";

interface DisplayDocumentsProps {
  isPublic: boolean;
  documents: Array<{
    documents: string;
  }>;
  user_id: string;
}

const DisplayDocuments = ({
  isPublic,
  documents,
  user_id,
}: DisplayDocumentsProps) => {
  const t = useTranslations("displayDocuments");
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const handleFileClick = (file: string) => {
    setPreviewFile(file);
  };

  const fileName = (doc: string) => {
    const name = doc.split(`user_${user_id}/`).pop();
    return name?.split(".").shift();
  };

  const fileType = (doc: string) => {
    const parts = doc.split(`user_${user_id}/`).pop();
    return parts?.split(".").pop()?.toUpperCase();
  };
  return (
    <Card className="shadow-sm rounded-4 border-light-subtle">
      <PreviewFile
        filePath={previewFile}
        fileName={
          fileName(previewFile || t("documentFallback")) ||
          t("documentFallback")
        }
        onClose={() => setPreviewFile(null)}
      />
      <Card.Header className="py-4 ps-4 bg-transparent">
        <h5 className="mb-0 fw-bold">{t("title")}</h5>
      </Card.Header>
      <Card.Body>
        {documents.length === 0 ? (
          <div className="text-center py-5">
            <FileX2Icon size={50} className="text-muted mb-3" />
            <p className="text-muted mb-0">{t("empty")}</p>
          </div>
        ) : (
          <Table responsive hover>
            <thead className="bg-light">
              <tr>
                <th className="border-0 py-3">{t("fileName")}</th>
                <th className="border-0 py-3">{t("fileType")}</th>
                {!isPublic && (
                  <th className="border-0 py-3 text-end">{t("actions")}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, idx) => (
                <tr key={idx}>
                  <td
                    className="align-middle py-3"
                    onClick={() => handleFileClick(doc.documents)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <FileIcon className="text-primary" />
                      </div>
                      <div>
                        <div className="fw-semibold">
                          {fileName(doc.documents)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Badge bg="dark">{fileType(doc.documents)}</Badge>
                    </div>
                  </td>
                  {!isPublic && (
                    <td className="align-middle py-3 text-end">
                      <Button variant="outline-danger" size="sm">
                        <Trash2Icon />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default DisplayDocuments;
