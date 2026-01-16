"use client";

import CompanyForm from "@/components/registration/supervisory/CompanyForm";
import CompanyDisplay from "@/app/(with-auth)/super-visory/(dashboard)/company-profile/CompanyDisplay";
import { useAppSelector } from "@/redux/hooks";
import { Card, CardBody, Container, Button } from "react-bootstrap";
import { useState } from "react";

export default function SuperVisorySettingsPage() {
  const data = useAppSelector(
    (s) => s.registerSuperVisory.registerSuperVisoryData.companyInfo
  );
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (formData: typeof data) => {
    console.log("Form submitted with data:", formData);
    // TODO: dispatch update to backend/store
    setEditMode(false);
  };

  return (
    <Container fluid className="p-0">
      <Card className="border-0">
        <CardBody>
          <div className="d-flex justify-content-end mb-3">
            <Button
              className={`${editMode ? "btn-danger" : "btn-primary"}`}
              style={{ width: "100px" }}
              onClick={() => setEditMode((v) => !v)}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
          </div>

          {editMode ? (
            <CompanyForm
              initialValues={data}
              onSubmit={handleSubmit}
              submitLabel="Update"
            />
          ) : (
            <CompanyDisplay data={data} />
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
