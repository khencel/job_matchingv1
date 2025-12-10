import { toast, ToastOptions } from "react-toastify";
import React from "react";

const defaultOptions: ToastOptions = {
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const ToastBody = ({ title, description }: { title: string; description: string }) => (
  <div className="w-100">
    <strong>{title}</strong>
    <p className="m-0" style={{ fontSize: "14px" }}>{description}</p>
  </div>
);

export const showSuccessToast = (title: string, description: string) => {
  toast.success(<ToastBody title={title} description={description} />, defaultOptions);
};

export const showErrorToast = (title: string, description: string) => {
  toast.error(<ToastBody title={title} description={description} />, defaultOptions);
};


