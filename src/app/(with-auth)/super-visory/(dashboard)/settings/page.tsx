"use client";
import { useState } from "react";
import { Button, CardBody, Container, Card } from "react-bootstrap";

export default function AccountSettingsPage() {
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
              {editMode ? "Cancel" : "Change Password"}
            </Button>
          </div>

          {editMode ? <></> : <></>}
        </CardBody>
      </Card>
    </Container>
  );
}
