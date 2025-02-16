import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaArrowRight, FaCalendarAlt, FaUser, FaUserFriends } from "react-icons/fa";
import { ref, onValue } from "firebase/database";
import { database } from "../../../fireBaseConfig";

const defaultBookingIcon = "https://random.imagecdn.app/500/150";

export default function BookingDetailsModal({ booking, onClose, onForward }) {
  const [isExiting, setIsExiting] = useState(false);
  const [propertyPhoto, setPropertyPhoto] = useState(null);
  const modalRef = useRef(null);

  // Fetch property photo from Firebase using booking.productId.
  useEffect(() => {
    if (booking && booking.productId) {
      const productRef = ref(database, `products/${booking.productId}`);
      const unsubscribe = onValue(productRef, (snapshot) => {
        const productData = snapshot.val();
        if (productData && productData.photos && productData.photos.length > 0) {
          setPropertyPhoto(productData.photos[0]);
        }
      });
      return () => unsubscribe();
    }
  }, [booking]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "translate-y-4");
      modalRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  if (!booking) return null;

  const goForward = () => {
    setIsExiting(true);
    setTimeout(() => onForward?.(), 300);
  };

  const closeAll = () => onClose?.();

  const statusColor = {
    approved: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
    pending: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
    declined: { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200" }
  }[booking.status.toLowerCase()] || { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`
          transform transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          bg-white w-full max-w-md rounded-2xl p-6 relative 
          shadow-2xl border border-gray-200
          ${isExiting ? "opacity-0 translate-x-8 rotate-3" : "opacity-0 translate-y-4"}
        `}
      >
        {/* Header Section */}
        <div className="absolute top-5 right-5 flex gap-3">
          <button
            onClick={goForward}
            className="p-2 text-[#A59D84] hover:text-[#543A14] transition-all hover:scale-110 active:scale-95"
          >
            <FaArrowRight size={20} />
          </button>
          <button
            onClick={closeAll}
            className="p-2 text-gray-400 hover:text-gray-600 transition-all hover:scale-110 active:scale-95"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Booking Overview */}
        <div className="flex flex-col items-center mt-4">
          <div className="relative group">
            <img
              src={booking.image || propertyPhoto || defaultBookingIcon}
              alt="Booking"
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover transition-transform duration-300 group-hover:rotate-2"
            />
            <div className={`absolute -bottom-3 right-0 px-4 py-1.5 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border} border shadow-sm flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-current opacity-75"></span>
              {booking.status}
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[#A59D84]">
            Booking <small>#{booking.id}</small>
          </h2>
        </div>

        {/* Details Section */}
        <div className="mt-8 space-y-4 text-gray-700">
          {/* Guest Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaUser className="text-[#A59D84]" size={18} />
            </div>
            <div>
              <p className="text-sm text-[#543A14]">Guest Name</p>
              <p className="font-medium text-gray-900">{booking.fullName}</p>
            </div>
          </div>

          {/* Date Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <FaCalendarAlt className="text-[#A59D84]" size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="font-medium text-gray-900">{booking.startDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <FaCalendarAlt className="text-[#A59D84]" size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="font-medium text-gray-900">{booking.endDate}</p>
              </div>
            </div>
          </div>

          {/* Guest Count */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaUserFriends className="text-[#A59D84]" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Guests</p>
              <p className="font-medium text-gray-900">{booking.numGuests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
