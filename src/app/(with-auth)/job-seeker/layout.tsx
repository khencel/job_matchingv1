import Navbar from "@/components/navbar/Navbar";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JobSeekerLayout({ children }: PropsWithChildren) {
  return (
    <div className="vh-100 d-flex flex-column">
      <Navbar />
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
