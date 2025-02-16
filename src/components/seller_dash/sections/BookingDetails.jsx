// BookingDetails.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function BookingDetails() {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border space-y-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h2 className="text-xl font-semibold text-gray-800">Booking Details (Static)</h2>
      <div className="space-y-2">
        <p className="text-gray-700">
          <strong>Booking ID:</strong> 999
        </p>
        <p className="text-gray-700">
          <strong>Guest Name:</strong> John Doe
        </p>
        <p className="text-gray-700">
          <strong>Status:</strong> Approved
        </p>
        <p className="text-gray-700">
          <strong>Property:</strong> Cozy Apartment in Downtown (Example City)
        </p>
        <p className="text-gray-700">
          <strong>Check-In Date:</strong> Aug 10, 2025
        </p>
        <p className="text-gray-700">
          <strong>Check-Out Date:</strong> Aug 14, 2025
        </p>
      </div>
    </div>
  );
}
