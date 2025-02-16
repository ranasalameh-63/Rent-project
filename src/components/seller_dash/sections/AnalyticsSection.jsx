// src/components/seller_dash/sections/AnalyticsSection.jsx
import React from "react";
import { FaChartPie, FaCheckCircle, FaClock, FaTimesCircle, FaBuilding } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

export default function AnalyticsSection({ properties, bookings }) {
  // Normalize status strings.
  const normalizeStatus = (status) => (status ? status.trim().toLowerCase() : "");

  // Compute approved properties (products).
  const approvedProperties = properties.filter(p => normalizeStatus(p.status) === "approved").length;

  // Compute booking stats.
  const approvedBookings = bookings.filter(b => normalizeStatus(b.status) === "approved").length;
  const pendingBookings = bookings.filter(b => normalizeStatus(b.status) === "pending").length;
  const declinedBookings = bookings.filter(b => {
    const s = normalizeStatus(b.status);
    return s === "declined" || s === "rejected" || s === "final_rejected";
  }).length;

  // Define custom stats.
  const stats = [
    {
      icon: FaBuilding,
      value: approvedProperties,
      label: "Approved Properties",
      // Example gradient from your palette (feel free to adjust)
      gradient: "from-[#C1BAA1] to-[#A59D84]",
      textColor: "text-white",
      trend: "N/A"
    },
    {
      icon: FaCheckCircle,
      value: approvedBookings,
      label: "Approved Bookings",
      gradient: "from-[#6BAA6B] to-[#4A8A4A]",
      textColor: "text-white",
      trend: "8.2%"
    },
    {
      icon: FaClock,
      value: pendingBookings,
      label: "Pending Bookings",
      gradient: "from-[#FFA500] to-[#FF8C00]",
      textColor: "text-white",
      trend: "3.1%"
    },
    {
      icon: FaTimesCircle,
      value: declinedBookings,
      label: "Declined Bookings",
      gradient: "from-[#FF4D4D] to-[#FF0000]",
      textColor: "text-white",
      trend: "1.8%"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ECEBDE] to-[#D7D3BF] px-6 py-5 border-b border-gray-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-xl shadow-md">
              <FaChartPie className="text-2xl text-[#4A4947]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#4A4947]">Performance Analytics</h2>
              <p className="text-sm text-gray-600">Key metrics and property insights</p>
            </div>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Icon Background */}
                  <div className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-xl`} />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-[#4A4947] mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#4A4947]">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-md`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {/* Trend Indicator */}
                  <div className="mt-4 flex items-center space-x-2">
                    <FiTrendingUp className="w-4 h-4 text-[#4A4947]" />
                    <span className="text-sm font-medium text-[#4A4947]">
                      {stat.trend} ↑
                    </span>
                    <span className="text-sm text-gray-400">last month</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
