"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserCircle2 } from "lucide-react";
import { Button } from "react-bootstrap";
import { logoutUser } from "@/redux/features/auth/auth_thunk";
import { showSuccessToast } from "../(util)/toaster";
import { useState } from "react";
import ChangePassword from "./changePasswordModal";

export default function NavbarAuth() {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const router = useRouter();

  const access = useAppSelector((s) => s.authState.access);
  const user = useAppSelector((s) => s.authState.user);
  const [changePassOpenModal, setChangePassOpenModal] = useState(false)
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
    } catch (error) {
      console.log("Force logout due to error:", error);
      return;
    } finally {
      router.push("/");
      showSuccessToast(t("logoutSuccess.title"), t("logoutSuccess.message"));
    }
  };

  const setLocale = useCallback(
    (nextLocale: "en" | "ja") => {
      const expiry = new Date(); // 1 year expiry
      expiry.setFullYear(expiry.getFullYear() + 1);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; expires=${expiry.toUTCString()}`;
      router.refresh();
    },
    [router],
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


  const handleChangePassword = () => {
      setChangePassOpenModal(true)
  }
  const handleClose = () => setChangePassOpenModal(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex align-items-center">
          {/* Logo on the left */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src="/img/logo.png"
              alt={t("logoAlt")}
              style={{ height: "70px", width: "auto", objectFit: "contain"}}
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
                aria-label={t("language.selectorAria")}
                style={{ width: "auto", minWidth: "140px" }}
              >
                <option value="en">{t("language.english")}</option>
                <option value="ja">{t("language.japanese")}</option>
              </select>
            </div>

            <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  {t("findJobs")}
                </a>
              </li> */}

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
                        backgroundColor: getAvatarColor(user?.email),
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      {getInitials(user?.email)}
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
                    <button className="dropdown-item" onClick={()=> handleChangePassword()}>
                      {t("changePassword")}
                    </button>
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
      <ChangePassword handleShow={changePassOpenModal} handleClose={handleClose} />
    </>
    
  );
}
