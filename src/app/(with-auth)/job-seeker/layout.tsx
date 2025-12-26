import { PropsWithChildren } from "react";
import Navbar from "../../components/NavbarAuth";

export default function JobSeekerLayout({ children }: PropsWithChildren) {
  return (
    <div className="vh-100 d-flex flex-column">
      <Navbar />
      {children}
    </div>
  );
}
