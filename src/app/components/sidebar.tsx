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

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

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
          <li className="active sidebar-text">
            <FiLayers className="icon" />
            {!collapsed && <span>Overview</span>}
          </li>
          <li className="sidebar-text">
            <FaUser className="icon" />
            {!collapsed && <span>Employers Profile</span>}
          </li>
          <li className="sidebar-text">
            <FaClipboardList className="icon" />
            {!collapsed && <span>Applicants</span>}
          </li>
          <li className="sidebar-text">
            <FaPlus className="icon" />
            {!collapsed && <span>Post Job</span>}
          </li>
          <li className="sidebar-text">
            <FaBuilding className="icon" />
            {!collapsed && <span>Job Listings</span>}
          </li>
          <li className="sidebar-text">
            <FaUsers className="icon" />
            {!collapsed && <span>All Companies</span>}
          </li>
          <li className="sidebar-text">
            <FaEnvelope className="icon" />
            {!collapsed && <span>Messages</span>}
          </li>
          <li className="sidebar-text">
            <FaCog className="icon" />
            {!collapsed && <span>Settings</span>}
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className={`content ${collapsed ? "content-collapsed" : ""}`}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
