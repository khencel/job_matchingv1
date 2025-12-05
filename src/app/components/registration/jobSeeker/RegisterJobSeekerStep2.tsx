"use client";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import {
  goNextStep,
  saveRegJobSeekerStep2,
} from "@/redux/slices/register/jobSeekerSlice";

const RegisterJobSeekerStep2 = () => {
  const t = useTranslations("registerJobSeekerStep2");
  const dispatch = useAppDispatch();

  const savedIdURL = useAppSelector(
    (state) => state.registerJobSeeker?.registerJobSeekerData?.idURL
  );

  const [idURL, setIdURL] = useState<string>(savedIdURL || "");
  const [previewURL, setPreviewURL] = useState<string>(savedIdURL || "");
  const [fileName, setFileName] = useState<string>(savedIdURL || "");
  const [error, setError] = useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");
    // No file selected
    if (!file) {
      return;
    }
    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError(t("errors.invalidFileType"));
      return;
    }
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(t("errors.fileTooLarge"));
      return;
    }
    // Set file name
    setFileName(file.name);
    // Create preview URL for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewURL(result);
        setIdURL(result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Remove uploaded file
  const handleRemove = () => {
    setIdURL("");
    setPreviewURL("");
    setFileName("");
    setError("");
    // Reset file input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    dispatch(saveRegJobSeekerStep2(""));
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure a file has been uploaded
    if (!idURL) {
      setError(t("errors.idRequired"));
      Swal.fire({
        icon: "error",
        title: "No File Uploaded",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "ID Document Uploaded",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
    });
    // Save to Redux store and go to next step
    dispatch(saveRegJobSeekerStep2(idURL));
    dispatch(goNextStep(3));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center">{t("title")}</h4>
      <Form.Group className="mb-3">
        <Form.Label>{t("labels.idDocument")}</Form.Label>
        <Form.Control
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileChange}
        />
        <Form.Text className="text-muted">
          {t("helpers.fileTypeInfo")}
        </Form.Text>
      </Form.Group>
      {/* Display Error Message */}
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      {/* Display File Name and remove Button */}
      {fileName && (
        <Alert
          variant="info"
          className="mb-3 d-flex justify-content-between align-items-center gap-2"
        >
          <div className="w-75 text-truncate">
            <strong>{t("labels.uploadedFile")}:</strong> {fileName}
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleRemove}
            className="w-25"
          >
            {t("buttons.remove")}
          </Button>
        </Alert>
      )}
      {/* Preview Section */}
      {previewURL && (
        <div className="mb-3">
          <Form.Label>{t("labels.preview")}</Form.Label>
          <div className="border rounded p-2 text-center">
            <div
              style={{
                position: "relative",
                width: "100%",
                minHeight: "400px",
              }}
            >
              <Image
                src={previewURL}
                alt="ID Preview"
                width={800}
                height={400}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <Button
        variant="primary"
        type="submit"
        className="w-100 my-3 fw-bold p-2"
      >
        {t("buttons.next")}
      </Button>
    </Form>
  );
};

export default RegisterJobSeekerStep2;
