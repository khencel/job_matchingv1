"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Dropdown } from "react-bootstrap";
import {
  BellIcon,
  FolderHeartIcon,
  FoldersIcon,
  LogOutIcon,
  MessagesSquareIcon,
  UserCircleIcon,
} from "lucide-react";
import { logout } from "@/redux/slices/login/authSlice";
import { showSuccessToast } from "@/app/(util)/toaster";

// Function to generate a color based on name
const getAvatarColor = (name: string) => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
    "#F8B739",
    "#52B788",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Function to get initials from name
const getInitials = (name: string) => {
  const nameParts = name.trim().split(" ");
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${
      nameParts[nameParts.length - 1][0]
    }`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.authState.isAuthenticated);
  const user = useAppSelector((s) => s.authState.user);

  const setLocale = useCallback(
    (nextLocale: "en" | "ja") => {
      const expiry = new Date(); // 1 year expiry
      expiry.setFullYear(expiry.getFullYear() + 1);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; expires=${expiry.toUTCString()}`;
      router.refresh();
    },
    [router]
  );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as "en" | "ja");
  };

  const handleLogout = () => {
    dispatch(logout());
    showSuccessToast("Logout Successfully", "");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo on the left */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image src="/logo.png" width="300" height="80" alt={t("logoAlt")} />
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation + language selector */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                {t("home")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {t("ourService")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {t("FAQ")}
              </a>
            </li>
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-profile"
                  className="p-0 bg-transparent border-0 dropdown-toggle-no-caret"
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: getAvatarColor(user?.email || "User"),
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {/* change to first name and last name*/}
                    {getInitials(`${user?.email}`)}{" "}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="p-2 d-flex flex-column gap-3">
                    <Dropdown.Item as={Link} href="/job-seeker/profile">
                      <UserCircleIcon />
                      <span className="ms-2">Profile</span>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} href="/job-seeker/applied-jobs">
                      <FoldersIcon />
                      <span className="ms-2">Application</span>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} href="/job-seeker/notifications">
                      <BellIcon />
                      <span className="ms-2">Notifications</span>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} href="/job-seeker/saved-jobs">
                      <FolderHeartIcon />
                      <span className="ms-2">Saved Jobs</span>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} href="/job-seeker/messages">
                      <MessagesSquareIcon />
                      <span className="ms-2">Messages</span>
                    </Dropdown.Item>
                    <hr className="my-0 mx-auto" style={{ width: "90%" }} />
                    <Dropdown.Item onClick={handleLogout} href="/">
                      <LogOutIcon />
                      <span className="ms-2">Logout</span>
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" href="/login">
                  {t("signIn")}
                </Link>
              </li>
            )}
          </ul>

          {/* Language selector */}
          <div className="ms-3 d-flex align-items-center">
            <select
              id="language-selector"
              className="form-select form-select-sm"
              value={locale}
              onChange={handleLanguageChange}
              aria-label="Language selector"
              style={{ width: "auto", minWidth: "140px" }}
            >
              <option value="en">🇺🇸 English</option>
              <option value="ja">🇯🇵 日本語</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
