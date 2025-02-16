import React, { useState, useEffect } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

/**
 * DepositRequestModal Component
 * A modern, full-screen modal where sellers can request a review for rejected properties.
 */
export default function DepositRequestModal({ isOpen, onClose, onSubmit, propertyTitle }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter a message before submitting.");
      return;
    }

    onSubmit(message);
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 animate-slide-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-red-500 text-gray-700 hover:text-white rounded-full p-2 transition-transform transform hover:scale-110"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
          Request Review
        </h3>
        <p className="text-center text-gray-600 mt-2">
          Explain why your property{" "}
          <span className="font-semibold">"{propertyTitle}"</span> should be reconsidered.
        </p>

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 resize-none"
            placeholder="Enter your appeal message..."
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            <FaPaperPlane className="w-5 h-5" />
            <span className="font-semibold">Submit Request</span>
          </button>
        </form>
      </div>
    </div>
  );
}
