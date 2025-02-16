import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaTimes,
  FaImage,
  FaMapMarkerAlt,
  FaDollarSign,
  FaHome,
  FaEdit,
} from "react-icons/fa";
import dayjs from "dayjs";

import { createProperty, updateProperty } from "../service/PropertyService.js";

const defaultBookingIcon = "https://random.imagecdn.app/500/150";

export default function PropertyModal({ property, onClose, onSave }) {
  // Get the current user from Redux.
  const user = useSelector((state) => state.auth.user);

  // Use one date input field.
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    neighborhood: "",
    bedrooms: "",
    area: "",
    category: "",
    date: "", // in YYYY-MM-DD format from input
    price: 0,
    photos: [],
    description: "",
    seller: user ? user.uid : "",
  });

  const modalRef = useRef(null);

  // Animate the modal entrance.
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "translate-y-8");
      modalRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  // When editing, load property data.
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        location: property.location || "",
        neighborhood: property.neighborhood || "",
        bedrooms: property.bedrooms || "",
        area: property.area || "",
        category: property.category || "",
        // For editing, assume the stored date is already in the "YYYY-MM-DD" format.
        date: property.date || "",
        price: property.price || 0,
        photos: property.photos || [],
        description: property.description || "",
        seller: property.seller || (user ? user.uid : ""),
      });
    }
  }, [property, user]);

  // Ensure seller is set for new properties if user is available.
  useEffect(() => {
    if (!property && user) {
      setFormData((prev) => ({ ...prev, seller: user.uid }));
    }
  }, [user, property]);

  const handleAddImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, url],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = { ...formData };
      if (dataToSave.date) {
        // Convert the selected date into "YYYY-MM-DD" format
        dataToSave.date = dayjs(dataToSave.date).format("YYYY-MM-DD");
      }
      // Save data: update if editing, create if new.
      if (property && property.id) {
        await updateProperty(property.id, dataToSave);
      } else {
        await createProperty(dataToSave);
      }
      onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-xl overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          ref={modalRef}
          className="transform transition-all duration-500 ease-out opacity-0 translate-y-8 bg-gradient-to-br from-white to-indigo-50 w-full max-w-2xl rounded-3xl p-8 relative shadow-2xl border-2 border-indigo-50 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-500 hover:text-[#543A14] transition-all hover:scale-110"
            title="Close"
          >
            <FaTimes className="w-7 h-7" />
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#ECEBDE] rounded-xl">
              <FaEdit className="text-[#A59D84] w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">
              {property ? "Edit Property" : "New Property Listing"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <FaHome className="text-[#A59D84] w-5 h-5 flex-shrink-0" />
                <span>
                  Property Title <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all placeholder-gray-400"
                placeholder="Luxury Beach Villa..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt className="text-[#A59D84] w-5 h-5 flex-shrink-0" />
                <span>
                  Location <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                required
                className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              >
                <option value="">Select City</option>
                <option value="Amman">Amman</option>
                <option value="Irbid">Irbid</option>
                <option value="Zarqa">Zarqa</option>
                <option value="Aqaba">Aqaba</option>
                <option value="Madaba">Madaba</option>
              </select>
            </div>

            {/* Neighborhood Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                Neighborhood
              </label>
              <input
                type="text"
                className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all placeholder-gray-400"
                placeholder="Enter neighborhood"
                value={formData.neighborhood}
                onChange={(e) =>
                  setFormData({ ...formData, neighborhood: e.target.value })
                }
              />
            </div>

            {/* Bedrooms and Area Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all"
                  placeholder="Number of bedrooms"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    setFormData({ ...formData, bedrooms: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Area (sq ft)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all"
                  placeholder="Enter area in sq ft"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Category and Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Category
                </label>
                <select
                  required
                  className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Historical Homes">Historical Homes</option>
                  <option value="Villa">Villa</option>
                  <option value="Castles">Castles</option>
                  <option value="Amazing pools">Amazing Pools</option>
                </select>
              </div>
              {/* Single Date Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  The date will be saved as "YYYY-MM-DD" (e.g., "2025-02-15")
                </p>
              </div>
            </div>

            {/* Price Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <FaDollarSign className="text-[#A59D84] w-5 h-5 flex-shrink-0" />
                Price per Night
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all"
                placeholder="Enter price (optional)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <FaEdit className="text-[#A59D84] w-5 h-5 flex-shrink-0" />
                Description
              </label>
              <textarea
                className="w-full px-4 py-3.5 border-2 border-[#ECEBDE] rounded-xl focus:ring-4 focus:ring-[#A59D84] focus:border-[#A59D84] transition-all placeholder-gray-400"
                rows={4}
                placeholder="Describe your property's best features..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <FaImage className="text-[#A59D84] w-5 h-5" />
                  Property Images
                </label>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#A59D84] text-white rounded-xl hover:bg-[#543A14] transition-all shadow-md hover:shadow-lg"
                >
                  <FaImage className="w-4 h-4" />
                  Add Image
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.photos.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-xl shadow-sm">
                      <img
                        src={url}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => (e.target.src = defaultBookingIcon)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {formData.photos.length === 0 && (
                  <div className="col-span-full py-8 text-center text-[#A59D84] flex flex-col items-center">
                    <FaImage className="w-12 h-12 mb-3 opacity-50" />
                    <span>No images added yet</span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#A59D84] text-white rounded-xl hover:bg-[#543A14] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <FaEdit className="w-5 h-5" />
                {property ? "Update Property" : "Create Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
