import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaArrowLeft, FaEnvelope, FaPhone } from "react-icons/fa";
import { ref, onValue } from "firebase/database";
import { database } from "../../../fireBaseConfig";

const defaultAvatar = "https://random.imagecdn.app/500/150";

export default function GuestDetailsModal({ guest, booking, propertyPhoto: propPhoto, onCloseAll, onBack }) {
  const [isExiting, setIsExiting] = useState(false);
  const [propertyPhoto, setPropertyPhoto] = useState(propPhoto || null);
  const [userData, setUserData] = useState({ email: "", avatar: "", phone: "" });
  const modalRef = useRef(null);

  // Fetch property photo if not provided.
  useEffect(() => {
    if (!propertyPhoto && booking?.productId) {
      const productRef = ref(database, `products/${booking.productId}`);
      console.log("Fetching product photo from:", `products/${booking.productId}`);
      const unsubscribe = onValue(productRef, (snapshot) => {
        const productData = snapshot.val();
        console.log("Fetched product data:", productData);
        if (productData && productData.photos && productData.photos.length > 0) {
          setPropertyPhoto(productData.photos[0]);
        }
      });
      return () => unsubscribe();
    }
  }, [booking, propertyPhoto]);

  // Fetch guest user data using booking.userId.
  useEffect(() => {
    if (booking?.userId) {
      const userRef = ref(database, `users/${booking.userId}`);
      console.log("Fetching user data from:", `users/${booking.userId}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Fetched user data:", data);
        if (data) {
          setUserData({
            email: data.email || "",
            avatar: data.profileImage || "",
            phone: data.phone || ""
          });
        }
      });
      return () => unsubscribe();
    } else {
      console.log("No booking.userId provided.");
    }
  }, [booking?.userId]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "translate-y-4");
      modalRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  if (!guest) return null;

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => onBack?.(), 300);
  };

  const handleCloseAll = () => {
    setIsExiting(true);
    setTimeout(() => onCloseAll?.(), 300);
  };

  // Use guest prop first, then fallback to fetched userData.
  const displayEmail = guest.email || userData.email || "Not provided";
  const displayAvatar = guest.avatar || userData.avatar || defaultAvatar;
  const displayPhone = guest.phone || userData.phone || "Not provided";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`
          transform transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          bg-white w-full max-w-md rounded-2xl p-6 relative
          border border-gray-200 shadow-2xl
          ${isExiting ? "opacity-0 -translate-x-8 rotate-6" : "opacity-0 translate-y-4"}
        `}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="p-2 text-[#A59D84] hover:text-[#543A14] hover:bg-[#ECEBDE] rounded-lg transition-all"
            title="Back to Booking"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            onClick={handleCloseAll}
            className="p-2 text-gray-400 hover:text-[#A59D84] hover:bg-gray-50 rounded-lg transition-all"
            title="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={displayAvatar || defaultAvatar}
              alt="Property"
              className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full border-2 border-[#ECEBDE] pointer-events-none" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-[#A59D84]">
            {guest.name || "Guest Profile"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Registered Guest</p>
        </div>

        {/* Contact Information */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaEnvelope className="text-[#A59D84]" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium break-all">{displayEmail}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaPhone className="text-[#A59D84]" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-900">{displayPhone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
