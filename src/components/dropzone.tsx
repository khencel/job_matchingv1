"use client";

import React, { useRef, useState } from "react";

type ImageDropzoneProps = {
  label?: string;
  previewUrl: string | null;
  file: File | null;
  accept?: string;
  height?: number;
  objectFit?: "contain" | "cover";
  onChange: (file: File) => void;
  onClear?: () => void;
};

export default function ImageDropzone({
  label,
  previewUrl,
  file,
  accept = "image/*",
  height = 140,
  objectFit = "contain",
  onChange,
  onClear,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const openPicker = () => {
    if (inputRef.current) inputRef.current.value = ""; 
    inputRef.current?.click();
};

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed.");
      return;
    }

    onChange(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClear = () => {
    if (inputRef.current) inputRef.current.value = ""; // ✅ ito rin
    onClear?.();
    };

  return (
    <div className="bg-white border rounded-4 p-3">
      {label && (
        <div className="d-flex justify-content-between mb-2">
          <strong>{label}</strong>

          <div>
            {file && onClear && (
              <button
                className="btn btn-link text-danger p-0 me-2"
                onClick={handleClear}
                type="button"
              >
                Clear
              </button>
            )}

            <button
              className="btn btn-link p-0"
              type="button"
              onClick={openPicker}
            >
              Upload
            </button>
          </div>
        </div>
      )}

      <div
        className="border rounded-4 d-flex align-items-center justify-content-center"
        style={{
          height,
          borderStyle: "dashed",
          background: "#fafafa",
          cursor: "pointer",
          boxShadow: dragging
            ? "0 0 0 3px rgba(13,110,253,.15)"
            : undefined,
        }}
        onClick={openPicker}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit,
            }}
          />
        ) : (
          <div className="text-center text-muted">
            Drop image here<br />
            or click to upload
          </div>
        )}
      </div>

      <div className="text-muted small mt-2">
        {file
          ? `${file.name} • ${(file.size / 1024 / 1024).toFixed(1)} MB`
          : "No file selected"}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}