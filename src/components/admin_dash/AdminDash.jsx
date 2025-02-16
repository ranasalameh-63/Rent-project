// components/AdminDash.jsx
import { useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Managers from "./Managers";
import Listings from "./Listings";

// Import the new stats component
import StatisticsSection from "./StatisticsSection";

export default function AdminDash() {
  const [managers, setManagers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
  ]);

  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Cozy Apartment in Downtown",
      owner: "John Doe",
      status: "Pending",
    },
    {
      id: 2,
      title: "Spacious Family Home",
      owner: "Jane Smith",
      status: "Pending",
    },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handlers
  const handleManagerAction = (id, action) => {
    setManagers((prev) =>
      prev.map((manager) =>
        manager.id === id ? { ...manager, status: action } : manager
      )
    );
  };

  const handleListingAction = (id, action) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, status: action } : listing
      )
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen relative">
      {/* Mobile Sidebar Toggle */}
      <button
        className="sm:hidden fixed bottom-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Content */}
        <main className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8">
          {/* New Statistics Section */}
          <StatisticsSection managers={managers} listings={listings} />

          {/* Managers Section */}
          <Managers
            managers={managers}
            handleManagerAction={handleManagerAction}
          />

          {/* Listings Section */}
          <Listings
            listings={listings}
            handleListingAction={handleListingAction}
          />
        </main>
      </div>
    </div>
  );
}
