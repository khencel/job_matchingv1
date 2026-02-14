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
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2">
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
          <img src="/img/logo.png" style={{ maxWidth: "180px", height: "auto" }} alt="Logo" />
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler ms-auto border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderRadius: 12 }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ITEMS */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-3 mb-lg-0 d-flex flex-column flex-lg-row align-items-center gap-1 gap-lg-3 text-center">
            <li className="nav-item">
              <Link className="nav-link nav-link-modern px-3 py-2 rounded-pill" href="/">
                {t("home")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-modern px-3 py-2 rounded-pill" href="/#job_support_features">
                {t('features')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-modern px-3 py-2 rounded-pill" href="/#about_us">
                {t('aboutUs')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-modern px-3 py-2 rounded-pill" href="/#q_and_a">
                {t('qa')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-modern px-3 py-2 rounded-pill" href="/#contact_us">
                {t('contact')}
              </Link>
            </li>

            {/* AUTH / PROFILE */}
            <li className="nav-item">
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-profile"
                    className="p-0 bg-transparent border-0 dropdown-toggle-no-caret"
                    style={{ boxShadow: "none" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 999,
                        backgroundColor: getAvatarColor(user?.email),
                        color: "white",
                        fontWeight: 700,
                        fontSize: 13,
                        border: "2px solid rgba(0,0,0,.08)",
                      }}
                      title={user.email}
                    >
                      {getInitials(user.email)}
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow-sm border-0 rounded-4 p-2" style={{ minWidth: 220 }}>
                    <DropdownNav />
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link className="nav-link nav-link-modern px-3 py-2 rounded-pill" href="/login">
                  {t("signIn")}
                </Link>
              )}
            </li>
          </ul>

          {/* RIGHT SIDE: LANGUAGE */}
          <div className="d-flex align-items-center justify-content-center justify-content-lg-end gap-2 ms-lg-3 pb-2 pb-lg-0">
            <div className="d-flex align-items-center gap-2 px-2 py-1 border rounded-pill bg-light">
              <span className="small text-muted" style={{ lineHeight: 1 }}>
                Lang
              </span>
              <select
                className="form-select form-select-sm border-0 bg-transparent shadow-none"
                value={locale}
                onChange={handleLanguageChange}
                style={{ minWidth: 130, cursor: "pointer" }}
              >
                <option value="en">🇺🇸 English</option>
                <option value="ja">🇯🇵 日本語</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Optional small CSS helpers */}
      <style jsx global>{`
        .nav-link-modern {
          color: #0f172a !important;
          font-weight: 600;
          transition: background 0.15s ease, transform 0.15s ease;
        }
          
        .nav-link-modern:hover {
          background: rgba(15, 23, 42, 0.06);
          transform: translateY(-1px);
        }
        .dropdown-toggle-no-caret::after {
          display: none !important;
        }
      `}</style>
    </nav>
  );
}
