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


const Sidebar = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const menuItems = [
    {label: "Overview", icon:FiLayers, href: "/employer/overview"},
    { label: "Employers Profile", icon: FaUser, href: "/employer/profile" },
    { label: "Applicants", icon: FaClipboardList, href: "/employer/applicants" },
    { label: "Post Job", icon: FaPlus, href: "/employer/post_a_job/job-information" },
    { label: "Job Listings", icon: FaBuilding, href: "/employer/job_listing" },
    // { label: "All Companies", icon: FaUsers, href: "/employer/companies" },
    // { label: "Messages", icon: FaEnvelope, href: "/employer/messages" },
    { label: "Perks & Benefits", icon: FaFileMedical , href: "/employer/perks_benefits" },
    { label: "Settings", icon: FaCog, href: "/employer/settings" },
  ];


  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            {!collapsed && "EMPLOYERS DASHBOARD"}
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
