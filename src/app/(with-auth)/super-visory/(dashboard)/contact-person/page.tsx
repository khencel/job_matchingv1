"use client";
import ContactPersonForm from "@/components/registration/supervisory/ContactPersonForm";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { Button, Card, CardBody, Container } from "react-bootstrap";
import ContactPersonDisplay from "./ContactPersonDisplay";

export default function ContactPage() {
  const data = useAppSelector(
    (s) => s.registerSuperVisory.registerSuperVisoryData.contactPersonInfo
  );
  const [editMode, setEditMode] = useState(false);
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
            <ContactPersonForm initialValues={data} onSubmit={() => {}} />
          ) : (
            <ContactPersonDisplay data={data} />
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
