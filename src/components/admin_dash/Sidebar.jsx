// components/Sidebar.jsx
import React from "react";
import {
  FaHome,
  FaTachometerAlt,
  FaUserTie,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/adminDash" },
    { icon: <FaUserTie />, label: "Deposit Requests" , path: "/sellerObjection"  },
    { icon: <FaHome />, label: "Home" , path: "/"},
  ];

  return (
    <aside
      className={`
        fixed sm:sticky top-0 left-0
        w-64 h-screen
        bg-[#D7D3BF]
        text-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
      `}
    >
      {/* Header / Logo */}
      <div className="p-4 sm:p-6 border-b border-[#D7D3BF] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-black rounded-lg">
            <FaHome className="text-[#A59D84] text-xl" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-black">RentalAdmin</h1>
        </div>
        <button
          className="text-black hover:text-[#A59D84] text-2xl sm:hidden focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 sm:px-3 py-4 sm:py-6 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link to ={item.path}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-black hover:bg-[#A59D84] transition-all duration-300 group"
              >
                <span className="text-lg text-[#A59D84] group-hover:text-black mr-3">
                  {item.icon}
                </span>
                <span className="text-sm sm:text-base font-medium group-hover:text-black">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-[#A59D84] text-center">
        <p className="text-xs sm:text-sm text-black">
          © 2025 Rental Inc.
        </p>
      </div>
    </aside>
  );
}