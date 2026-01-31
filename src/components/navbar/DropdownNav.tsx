import { logoutUser } from "@/redux/features/auth/auth_thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  FileUserIcon,
  FoldersIcon,
  LayersIcon,
  LogOutIcon,
  UserCircle2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, DropdownItem } from "react-bootstrap";

const DropdownNav = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const role = useAppSelector((s) => s.authState.user?.role);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      router.push("/");
    } catch (error) {
      console.log("Force logout due to error:", error);
      return;
    }
  };

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
        <DropdownItem as={Button} onClick={handleLogout} className="py-2">
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
