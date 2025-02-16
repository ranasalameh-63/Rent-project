import React, { useState } from "react";
import { 
  FaClipboardList, 
  FaCheck, 
  FaTimes, 
  FaFilter, 
  FaRegCalendarTimes 
} from "react-icons/fa";
import BookingWizard from "../modals/BookingWizard";

export default function BookingsSection({ bookings, properties, onBookingAction }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showWizard, setShowWizard] = useState(false);
  
  // Default the status filter to "pending"
  const [propertyFilter, setPropertyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");

  // Number of bookings to display initially
  const [visibleCount, setVisibleCount] = useState(5);

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setShowWizard(true);
  };

  const closeWizard = () => {
    setSelectedBooking(null);
    setShowWizard(false);
  };

  const getPropertyTitle = (productId) => {
    const prop = properties.find((p) => p.id === productId);
    return prop ? prop.title : "Unknown Property";
  };

  // Filter bookings based on property and status filters.
  const filteredBookings = bookings.filter((b) => {
    const matchProperty = !propertyFilter || b.productId === propertyFilter;
    const matchStatus = !statusFilter || b.status.toLowerCase() === statusFilter.toLowerCase();
    return matchProperty && matchStatus;
  });

  // Only show a subset initially.
  const displayedBookings = filteredBookings.slice(0, visibleCount);

  const statusStyles = {
    pending: "bg-orange-200 text-orange-800",
    approved: "bg-green-200 text-green-800",
    declined: "bg-red-200 text-red-800"
  };

  const handleViewMore = () => {
    setVisibleCount(visibleCount + 5);
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ECEBDE] to-[#D7D3BF] px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <FaClipboardList className="text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Booking Requests</h2>
              <p className="text-sm text-gray-600">Manage guest reservations and requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Filters:</span>
          </div>
          <div className="relative">
            <select
              className="pl-4 pr-8 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
            >
              <option value="">All Properties</option>
              {properties.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.title}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              className="pl-4 pr-8 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Property</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guest</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedBookings.map((b) => (
              <tr
                key={b.id}
                className="hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleRowClick(b)}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {getPropertyTitle(b.productId)}
                </td>
                <td className="px-6 py-4 text-gray-700">{b.fullName}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[b.status.toLowerCase()] || "bg-gray-200 text-gray-700"}`}>
                    {b.status}
                  </span>
                </td>
                <td 
                  className="px-6 py-4 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  {b.status.toLowerCase() === "pending" && (
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onBookingAction(b.id, "approved")}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <FaCheck className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onBookingAction(b.id, "declined")}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View More Button */}
      {filteredBookings.length > visibleCount && (
        <div className="flex justify-center py-4">
          <button 
            onClick={handleViewMore}
            className="px-6 py-2 bg-[#A59D84] text-white rounded-md hover:bg-[#543A14] transition-colors"
          >
            View More
          </button>
        </div>
      )}

      {/* Booking Wizard Modal */}
      {showWizard && selectedBooking && (
        <BookingWizard booking={selectedBooking} onCloseAll={closeWizard} />
      )}
    </section>
  );
}
