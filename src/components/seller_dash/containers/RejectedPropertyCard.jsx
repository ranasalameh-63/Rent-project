import React from "react";
import { FaRegImage, FaTrash, FaEdit, FaExclamationTriangle } from "react-icons/fa";

export default function RejectedPropertyCard({
  property,
  onEdit,
  onRemove,
  onOpenDepositModal,
}) {
  const hasPhotos = property.photos?.length > 0;
  const imageUrl = hasPhotos ? property.photos[0] : null;

  return (
    <div className="group rounded-2xl overflow-hidden shadow-lg transform transition duration-300 ">
      {/* Image Section */}
      <div className="relative h-64 w-full">
        {hasPhotos ? (
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 "
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100">
            <FaRegImage className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {/* Danger Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-800/70 via-red-700/50 to-transparent"></div>

        {/* Rejected Badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          REJECTED
        </div>

        {/* Property Details */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">
            {property.title || "Untitled Property"}
          </h3>
          <p className="text-sm text-red-100">
            {property.location || "No location specified"}
          </p>
        </div>

        {/* Action Buttons (Edit & Delete) */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(property)}
            className="bg-white p-2 rounded-full text-indigo-600 hover:bg-indigo-100"
            title="Edit property"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onRemove(property.id)}
            className="bg-white p-2 rounded-full text-red-600 hover:bg-red-100"
            title="Delete property"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rejection Details Section with Danger Styling */}
      <div className="p-4 bg-red-50 border-t-4 border-red-300">
        <div className="flex items-center gap-2 mb-2">
          <FaExclamationTriangle className="w-4 h-4 text-red-600" />
          <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
            Reason for Rejection:
          </span>
        </div>
        <p className="text-sm text-red-600 mb-4">
          {property.depositResponse || "No specific reason provided"}
        </p>
        <button
          onClick={() => onOpenDepositModal(property)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md hover:from-red-700 hover:to-red-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <FaExclamationTriangle className="w-4 h-4" />
          <span>Request Review</span>
        </button>
      </div>
    </div>
  );
}
