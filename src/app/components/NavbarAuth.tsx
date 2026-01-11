"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserCircle2 } from "lucide-react";
import { Button } from "react-bootstrap";
import { logout } from "@/redux/slices/login/authSlice";

export default function NavbarAuth() {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const router = useRouter();

  const user = useAppSelector((s) => s.authState.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo on the left */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/logo.png"
            alt={t("logoAlt")}
            style={{ height: "80px", width: "auto", marginRight: "8px" }}
          />
        </a>

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

          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                {t("findJobs")}
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user ? (
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: getAvatarColor(user.email),
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {getInitials(user.email)}
                  </div>
                ) : (
                  <UserCircle2 />
                )}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Change Password
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {t("profile")}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Button className="dropdown-item" onClick={handleLogout}>
                    {t("logout")}
                  </Button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
