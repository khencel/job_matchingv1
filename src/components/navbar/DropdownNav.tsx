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
import { useTranslations } from "next-intl";

const DropdownNav = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const role = useAppSelector((s) => s.authState.user?.role);
  const t = useTranslations("dropdownNav");

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      router.push("/");
    } catch (error) {
      console.log("Force logout due to error:", error);
      return;
    }
  };

  const getDropdownItems = () => {
    if (role === "job_seeker") {
      return [
        {
          label: t("jobSeeker.profile"),
          icon: <UserCircle2Icon />,
          href: "/job-seeker/profile",
        },
        {
          label: t("jobSeeker.appliedJobs"),
          icon: <FoldersIcon />,
          href: "/job-seeker/applied-jobs",
        },
        {
          label: t("jobSeeker.documents"),
          icon: <FileUserIcon />,
          href: "/job-seeker/documents",
        },
      ];
    } else if (role === "employer") {
      return [
        {
          label: t("employer.overview"),
          icon: <LayersIcon />,
          href: "/employer/overview",
        },
        {
          label: t("employer.jobListing"),
          icon: <FoldersIcon />,
          href: "/employer/job_listing",
        },
        {
          label: t("employer.postJob"),
          icon: <FileUserIcon />,
          href: "/employer/post_a_job",
        },
        {
          label: t("employer.applicants"),
          icon: <FileUserIcon />,
          href: "/employer/applicants",
        },
        {
          label: t("employer.perksBenefits"),
          icon: <FileUserIcon />,
          href: "/employer/perks_benefits",
        },
        {
          label: t("employer.profile"),
          icon: <UserCircle2Icon />,
          href: "/employer/profile",
        },
      ];
    } else if (role === "admin") {
      return [
        {
          label: t("admin.overview"),
          icon: <LayersIcon />,
          href: "/admin/overview",
        },
        {
          label: t("admin.users"),
          icon: <FileUserIcon />,
          href: "/admin/users",
        },
        {
          label: t("admin.applicants"),
          icon: <FileUserIcon />,
          href: "/admin/applicants",
        },
        {
          label: t("admin.settings"),
          icon: <UserCircle2Icon />,
          href: "/admin/settings",
        },
      ];
    } else {
      return [
        {
          label: t("supervisory.overview"),
          icon: <LayersIcon />,
          href: "/super-visory/overview",
        },
        {
          label: t("supervisory.applicants"),
          icon: <FileUserIcon />,
          href: "/super-visory/applicants",
        },
        {
          label: t("supervisory.profile"),
          icon: <UserCircle2Icon />,
          href: "/super-visory/profile",
        },
      ];
    }
  };

  const items = getDropdownItems();

  return (
    <div>
      <div className="d-flex flex-column">
        {items.map((item, idx) => (
          <div key={idx}>
            <DropdownItem className="py-2" as={Link} href={item.href}>
              {item.icon}
              <span className="ms-2">{item.label}</span>
            </DropdownItem>
            <hr style={{ width: "100%", margin: "0" }} />
          </div>
        ))}
        <DropdownItem as={Button} onClick={handleLogout} className="py-2">
          <LogOutIcon className="text-danger" />
          <span className="ms-2 text-danger">{t("logout")}</span>
        </DropdownItem>
      </div>
    </div>
  );
};

export default DropdownNav;
