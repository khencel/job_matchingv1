import { useAppSelector } from "@/redux/hooks";
import {
  FileUserIcon,
  FolderHeartIcon,
  FoldersIcon,
  LayersIcon,
  LogOutIcon,
  UserCircle2Icon,
} from "lucide-react";
import Link from "next/link";
import { DropdownItem } from "react-bootstrap";

interface DropdownProps {
  handleLogout: () => void;
}

const DropdownNav = ({ handleLogout }: DropdownProps) => {
  const role = useAppSelector((s) => s.authState.user?.role);

  return (
    <div>
      <div className="d-flex flex-column">
        {role === "job_seeker" ? (
          <>
            {dropdownItems.jobSeeker.map((item, idx) => (
              <div key={idx}>
                <DropdownItem className="py-2" as={Link} href={item.href}>
                  {item.icon}
                  <span className="ms-2">{item.label}</span>
                </DropdownItem>
                <hr style={{ width: "100%", margin: "0" }} />
              </div>
            ))}
          </>
        ) : (
          <>
            {dropdownItems.superVisory.map((item, idx) => (
              <div key={idx}>
                <DropdownItem className="py-2" as={Link} href={item.href}>
                  {item.icon}
                  <span className="ms-2">{item.label}</span>
                </DropdownItem>
                <hr style={{ width: "100%" }} />
              </div>
            ))}
          </>
        )}
        <DropdownItem className="py-2" onClick={handleLogout} href="/">
          <LogOutIcon className="text-danger" />
          <span className="ms-2 text-danger">Logout</span>
        </DropdownItem>
      </div>
    </div>
  );
};

export default DropdownNav;

const dropdownItems = {
  jobSeeker: [
    {
      label: "Profile",
      icon: <UserCircle2Icon />,
      href: "/job-seeker/profile",
    },
    {
      label: "Application",
      icon: <FoldersIcon />,
      href: "/job-seeker/applied-jobs",
    },
    {
      label: "Saved Jobs",
      icon: <FolderHeartIcon />,
      href: "/job-seeker/saved-jobs",
    },
    {
      label: "Documents",
      icon: <FileUserIcon />,
      href: "/job-seeker/documents",
    },
  ],
  superVisory: [
    {
      label: "Overview",
      icon: <LayersIcon />,
      href: "/super-visory/overview",
    },
    {
      label: "Applicants",
      icon: <FileUserIcon />,
      href: "/super-visory/applicants",
    },
    {
      label: "Profile",
      icon: <UserCircle2Icon />,
      href: "/super-visory/profile",
    },
  ],
};
