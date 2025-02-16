// components/Header.jsx
import React from "react";
import { FaBars, FaSearch, FaBell } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center w-full max-w-xl">
        {/* Hamburger (mobile only) */}
        <button
          className="sm:hidden mr-2 text-indigo-600"
          onClick={toggleSidebar}
        >
          <FaBars className="w-5 h-5" />
        </button>
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm sm:text-base"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-3 sm:space-x-5 ml-2">
        <button className="relative text-gray-500 hover:text-indigo-600">
          <FaBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-indigo-500/30 hover:border-indigo-500 transition-colors cursor-pointer"
          src="https://via.placeholder.com/50"
          alt="Admin Avatar"
        />
      </div>
    </header>
  );
}
