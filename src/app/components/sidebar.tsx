// Sidebar.jsx
import React from "react";
import { FaUsers, FaEnvelope, FaClipboardList, FaBuilding, FaUser, FaCog, FaPlus } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">EMPLOYERS DASHBOARD</h3>
      <ul>
        <li className="active sidebar-text"><FiLayers className="icon"/> Overview</li>
        <li className="sidebar-text"><FaUser className="icon"/> Employers Profile</li>
        <li className="sidebar-text"><FaClipboardList className="icon"/> Applicants</li>
        <li className="sidebar-text"><FaPlus className="icon"/> Post Job</li>
        <li className="sidebar-text"><FaBuilding className="icon"/> Job Listings</li>
        <li className="sidebar-text"><FaUsers className="icon"/> All Companies</li>
        <li className="sidebar-text"><FaEnvelope className="icon"/> Messages</li>
        <li className="sidebar-text"><FaCog className="icon"/> Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
