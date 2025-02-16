// src/pages/Listings.jsx
import React, { useState } from "react";

export default function Listings() {
  // Local state or fetch from an API
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

  // Handle Approve/Reject
  const handleListingAction = (id, action) => {
    setListings(prev =>
      prev.map(listing =>
        listing.id === id ? { ...listing, status: action } : listing
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 sm:p-5 border-b border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Pending Property Listings
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] sm:min-w-0">
          <thead className="bg-indigo-50">
            <tr>
              {["Title", "Owner", "Status", "Actions"].map(header => (
                <th
                  key={header}
                  className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-semibold text-indigo-600 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listings.map(listing => (
              <tr
                key={listing.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-gray-800 text-sm sm:text-base">
                  {listing.title}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-600 text-sm">
                  {listing.owner}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                      listing.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : listing.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 space-y-2 sm:space-x-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleListingAction(listing.id, "Approved")}
                      className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-xs sm:text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleListingAction(listing.id, "Rejected")}
                      className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-xs sm:text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
