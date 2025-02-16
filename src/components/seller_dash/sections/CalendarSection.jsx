import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarSection({ bookings, properties, onToggleBlockedDate }) {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [currentDate, setCurrentDate] = useState(dayjs());

  // When properties change, select the first property's id.
  React.useEffect(() => {
    if (properties && properties.length > 0) {
      setSelectedProperty(properties[0].id);
    }
  }, [properties]);

  // State for the block/unblock modal.
  const [selectedDate, setSelectedDate] = useState(null);
  const [blockModalOpen, setBlockModalOpen] = useState(false);

  // Get the selected property object and its blocked dates.
  const selectedPropertyObj = properties.find(p => p.id === selectedProperty);
  const propertyBlocked = selectedPropertyObj?.blockedDates || [];

  // Compute booked dates from the product’s approved booking ranges.
  const bookedDates = useMemo(() => {
    let dates = [];
    if (selectedPropertyObj && selectedPropertyObj.bookedDate) {
      selectedPropertyObj.bookedDate.forEach(range => {
        const start = dayjs(range.startDate);
        const end = dayjs(range.endDate);
        for (let d = start; d.isBefore(end) || d.isSame(end, "day"); d = d.add(1, "day")) {
          dates.push(d.format("YYYY-MM-DD"));
        }
      });
    }
    return dates;
  }, [selectedPropertyObj]);

  // Build the calendar matrix.
  const calendarMatrix = useMemo(() => {
    const startOfMonth = currentDate.startOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = currentDate.daysInMonth();
    const matrix = [];
    for (let i = 0; i < startDay; i++) matrix.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      matrix.push(currentDate.date(d));
    }
    return matrix;
  }, [currentDate]);

  const goToPrevMonth = () => setCurrentDate(prev => prev.subtract(1, "month"));
  const goToNextMonth = () => setCurrentDate(prev => prev.add(1, "month"));

  const isBooked = (dateObj) => {
    if (!dateObj) return false;
    return bookedDates.includes(dateObj.format("YYYY-MM-DD"));
  };

  const handleDayClick = (dayObj) => {
    if (!dayObj) return;
    if (isBooked(dayObj)) return;
    setSelectedDate(dayObj);
    setBlockModalOpen(true);
  };

  const closeBlockModal = () => {
    setBlockModalOpen(false);
    setSelectedDate(null);
  };

  const confirmToggle = () => {
    if (selectedDate) {
      const dateStr = selectedDate.format("YYYY-MM-DD");
      onToggleBlockedDate(selectedProperty, dateStr);
      console.log("Toggled date:", dateStr, "for property", selectedProperty);
    }
    closeBlockModal();
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ECEBDE] to-[#D7D3BF] px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <FaCalendarAlt className="text-xl text-[#4A4947]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#4A4947]">Availability Calendar</h2>
              <p className="text-sm text-gray-600">View and manage property bookings</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={goToPrevMonth} className="p-2.5 hover:bg-white rounded-lg transition-colors">
              <FaChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <p className="font-semibold text-gray-700 min-w-[140px] text-center">
              {currentDate.format("MMMM YYYY")}
            </p>
            <button onClick={goToNextMonth} className="p-2.5 hover:bg-white rounded-lg transition-colors">
              <FaChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Filter */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Property</label>
          <div className="relative">
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full pl-4 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {properties && properties.length > 0 ? (
                properties.map((prop) => (
                  <option key={prop.id} value={prop.id}>
                    {prop.title}
                  </option>
                ))
              ) : (
                <option value="">No properties available</option>
              )}
            </select>
            <FaHome className="absolute right-3 top-3.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {WEEKDAYS.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarMatrix.map((dayObj, idx) => {
            if (!dayObj) return <div key={idx} className="h-16 bg-gray-50 rounded-lg" />;
            const dateStr = dayObj.format("YYYY-MM-DD");
            const booked = isBooked(dayObj);
            const blocked = propertyBlocked.includes(dateStr);
            const isToday = dayjs().isSame(dayObj, "day");

            let bgColor, borderColor, textColor, label;
            if (booked) {
              bgColor = "bg-rose-50";
              borderColor = "border-rose-200 hover:border-rose-300";
              textColor = "text-rose-700";
              label = "Booked";
            } else if (blocked) {
              bgColor = "bg-gray-300";
              borderColor = "border-gray-300";
              textColor = "text-white";
              label = "Not Available";
            } else {
              bgColor = "bg-emerald-50";
              borderColor = "border-emerald-200 hover:border-emerald-300";
              textColor = "text-emerald-700";
              label = "Available";
            }
            return (
              <div
                key={dateStr}
                className={`group h-16 flex flex-col items-center justify-center rounded-lg border transition-all ${bgColor} ${borderColor} ${isToday ? "ring-2 ring-indigo-300" : ""} cursor-pointer`}
                onClick={() => !booked && handleDayClick(dayObj)}
              >
                <span className={`text-sm font-medium ${textColor}`}>{dayObj.date()}</span>
                <span className="text-xs mt-0.5">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 bg-emerald-100 rounded-sm" />
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 bg-rose-100 rounded-sm" />
            <span className="text-gray-600">Booked</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 bg-gray-300 rounded-sm" />
            <span className="text-gray-600">Blocked</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 ring-2 ring-indigo-300 rounded-sm" />
            <span className="text-gray-600">Today</span>
          </div>
        </div>
      </div>

      {/* Block/Unblock Modal */}
      {blockModalOpen && selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              {propertyBlocked.includes(selectedDate.format("YYYY-MM-DD"))
                ? "Unblock Date"
                : "Block Date"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedDate.format("dddd, MMMM D, YYYY")}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeBlockModal}
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggle}
                className="px-4 py-2 rounded bg-[#A59D84] text-white hover:bg-indigo-700"
              >
                {propertyBlocked.includes(selectedDate.format("YYYY-MM-DD"))
                  ? "Unblock"
                  : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
