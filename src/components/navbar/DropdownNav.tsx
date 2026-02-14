"use client";
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
  const t = useTranslations("navbar");
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
            {getDropdownItems(t).jobSeeker.map((item, idx) => (
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
            {getDropdownItems(t).superVisory.map((item, idx) => (
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
          <span className="ms-2 text-danger">{t('logout')}</span>
        </DropdownItem>
      </div>
    </div>
  );
};

export default DropdownNav;

const getDropdownItems = (t: any) => ({
  jobSeeker: [
    {
      label: t('profile'),
      icon: <UserCircle2Icon />,
      href: "/job-seeker/profile",
    },
    {
      label: t('application'),
      icon: <FoldersIcon />,
      href: "/job-seeker/applied-jobs",
    },
    {
      label: t('documents'),
      icon: <FileUserIcon />,
      href: "/job-seeker/documents",
    },
  ],
  superVisory: [
    {
      label: t('overview'),
      icon: <LayersIcon />,
      href: "/super-visory/overview",
    },
    {
      label: t('applicants'),
      icon: <FileUserIcon />,
      href: "/super-visory/applicants",
    },
    {
      label: t('profile'),
      icon: <UserCircle2Icon />,
      href: "/super-visory/profile",
    },
  ],
});
