import Navbar from "@/components/navbar/Navbar";
import { PropsWithChildren } from "react";

export default function SuperVisoryLayout({ children }: PropsWithChildren) {
  return (
    <div className="vh-100 d-flex flex-column">
      <Navbar />
      {children}
    </div>
  );
}
