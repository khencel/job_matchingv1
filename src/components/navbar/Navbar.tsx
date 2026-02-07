"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { Dropdown } from "react-bootstrap";
import DropdownNav from "@/components/navbar/DropdownNav";

// Avatar functions
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
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2)
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const router = useRouter();
  const user = useAppSelector((s) => s.authState.user);

  const setLocale = useCallback(
    (nextLocale: "en" | "ja") => {
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; expires=${expiry.toUTCString()}`;
      router.refresh();
    },
    [router],
  );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as "en" | "ja");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top`}
    >
      <div className="container d-flex align-items-center">
        {/* LOGO */}
        <Link className="navbar-brand" href="/">
          <img src="/img/logo.png" style={{ maxWidth: "200px" }} alt="Logo" />
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ITEMS */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-column flex-lg-row gap-2 gap-lg-3 text-center">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                {t("home")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/#job_support_features">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/#about_us">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/#q_and_a">
                Q&A
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/#contact_us">
                Contacts
              </Link>
            </li>
            <li className="nav-item">
              {user ? (
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
                        backgroundColor: getAvatarColor(user?.email),
                        color: "white",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      {getInitials(user.email)}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <DropdownNav />
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link className="nav-link" href="/login">
                  {t("signIn")}
                </Link>
              )}
            </li>
          </ul>

          {/* RIGHT SIDE: USER + LANGUAGE */}
          <div className="d-flex align-items-center gap-2 ms-lg-3 mt-2 mt-lg-0">
            <select
              className="form-select form-select-sm"
              value={locale}
              onChange={handleLanguageChange}
              style={{ minWidth: "120px" }}
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
