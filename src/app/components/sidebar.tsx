"use client";

import React, { useState } from "react";
import {
  FaUsers,
  FaEnvelope,
  FaClipboardList,
  FaBuilding,
  FaUser,
  FaCog,
  FaPlus,
  FaBars,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import{ PropsWithChildren} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFileMedical } from "react-icons/fa6";
import { useTranslations } from "next-intl";


const Sidebar = ({ children }: PropsWithChildren) => {
  const t = useTranslations("employerSidebar");
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const menuItems = [
    {label: t("items.overview"), icon:FiLayers, href: "/employer/overview"},
    { label: t("items.profile"), icon: FaUser, href: "/employer/profile" },
    { label: t("items.applicants"), icon: FaClipboardList, href: "/employer/applicants" },
    { label: t("items.postJob"), icon: FaPlus, href: "/employer/post_a_job/job-information" },
    { label: t("items.jobListings"), icon: FaBuilding, href: "/employer/job_listing" },
    // { label: "All Companies", icon: FaUsers, href: "/employer/companies" },
    // { label: "Messages", icon: FaEnvelope, href: "/employer/messages" },
    { label: t("items.perks"), icon: FaFileMedical , href: "/employer/perks_benefits" },
    // { label: "Settings", icon: FaCog, href: "/employer/settings" },
  ];


  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            {!collapsed && t("title")}
          </h3>

          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars />
          </button>
        </div>

        <ul>
          {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <li 
                  key={item.href}
                  className={`sidebar-text p-0 ${isActive ? "active" : ""}`}
                >
                   <Link href={item.href} className="sidebar-link sidebar-text">
                    <Icon className="icon" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              )
          })}
  
        </ul>
      </aside>

      <main className={`content ${collapsed ? "content-collapsed" : ""}`}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
