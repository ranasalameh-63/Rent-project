import React, { useState, useMemo } from "react";
import { 
  FaPlus, 
  FaRegImage, 
  FaRegFolderOpen, 
  FaEdit, 
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";
import PropertyModal from "../modals/PropertyModal";
import RejectedPropertyCard from "../containers/RejectedPropertyCard";

export default function PropertiesSection({
  properties,
  onAddProperty,
  onEditProperty,
  onRemoveProperty,
  onOpenDepositModal,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [approvedProperties, pendingProperties, rejectedProperties] = useMemo(
    () => [
      properties.filter((p) => p.status?.toLowerCase() === "approved"),
      properties.filter((p) => p.status?.toLowerCase() === "pending"),
      properties.filter((p) => p.status?.toLowerCase() === "rejected"),
    ],
    [properties]
  );

  const openModal = (prop = null) => {
    setEditingProperty(prop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handleSave = (formData) => {
    editingProperty ? onEditProperty(editingProperty.id, formData) : onAddProperty(formData);
    closeModal();
  };

  const statusIcons = {
    approved: FaCheckCircle,
    pending: FaClock,
    rejected: FaTimesCircle
  };

  const UniquePropertyCard = ({ property }) => {
    const hasPhotos = property.photos?.length > 0;
    const StatusIcon = statusIcons[property.status.toLowerCase()] || FaCheckCircle;
    
    return (
      <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ">
        {/* Image Section */}
        <div className="relative h-64 w-full bg-gradient-to-br from-gray-50 to-gray-100">
          {hasPhotos ? (
            <img
              src={property.photos[0]}
              alt={property.title}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FaRegImage className="h-16 w-16 text-gray-300/80" />
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4 flex items-center space-x-1.5 bg-[#ECEBDE] px-3 py-1.5 rounded-full shadow-sm">
            <StatusIcon className={`w-4 h-4 ${
              property.status.toLowerCase() === 'approved' ? 'text-emerald-500' :
              property.status.toLowerCase() === 'pending' ? 'text-amber-500' :
              'text-rose-500'
            }`} />
            <span className="text-sm font-medium text-gray-700 capitalize">
              {property.status}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-4">
          <h3 className="mb-1 truncate text-lg font-semibold text-gray-900">
            {property.title || "Untitled Property"}
          </h3>
          <p className="mb-3 truncate text-sm text-gray-500">
            {property.location || "No location specified"}
          </p>
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-[#ECEBDE] px-3 py-1.5 text-sm font-medium text-black">
              {property.price ? `$${Number(property.price).toLocaleString()}` : "N/A"}
            </span>
            <span className="flex items-center space-x-1 text-sm text-[#A59D84]">
              <FaRegImage className="h-4 w-4" />
              <span>{hasPhotos ? property.photos.length : 0}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-3 top-3 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => openModal(property)}
            className="rounded-lg bg-white/90 p-2.5 shadow-sm transition-all hover:bg-gray-100 hover:-translate-y-0.5"
            title="Edit property"
          >
            <FaEdit className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={() => onRemoveProperty(property.id)}
            className="rounded-lg bg-white/90 p-2.5 shadow-sm transition-all hover:bg-gray-100 hover:-translate-y-0.5"
            title="Delete property"
          >
            <FaTrash className="h-5 w-5 text-rose-600" />
          </button>
        </div>
      </div>
    );
  };

  const StatusSection = ({ title, count, color, properties, isRejected }) => {
    const sectionColors = {
      approved: { text: 'text-emerald-600', bg: 'bg-emerald-100' },
      pending: { text: 'text-amber-600', bg: 'bg-amber-100' },
      rejected: { text: 'text-rose-600', bg: 'bg-rose-100' }
    };
    
    const statusKey = title.split(' ')[0].toLowerCase();
    const { text, bg } = sectionColors[statusKey] || sectionColors.approved;

    return (
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className={`text-xl font-bold ${text}`}>{title}</h3>
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${bg} ${text}`}>
              {count} property{count !== 1 && 's'}
            </span>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {count > 0 ? properties.map((prop) =>
            isRejected ? (
              <RejectedPropertyCard
                key={prop.id}
                property={prop}
                onEdit={openModal}
                onRemove={onRemoveProperty}
                onOpenDepositModal={onOpenDepositModal}
              />
            ) : (
              <UniquePropertyCard key={prop.id} property={prop} />
            )
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                <FaRegFolderOpen className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-500">No properties found in this category</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-gradient-to-r from-[#A59D84] to-[#A59D84] bg-clip-text text-transparent">
            Your Properties
          </h1>
          <p className="text-lg text-gray-600">Manage and track your property listings</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A59D84] to-[#A59D84] px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <FaPlus className="h-4 w-4" />
          Add New Property
        </button>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        <StatusSection
          title="Approved Properties"
          color="text-emerald-600"
          count={approvedProperties.length}
          properties={approvedProperties}
        />
        <StatusSection
          title="Pending Approval"
          color="text-amber-600"
          count={pendingProperties.length}
          properties={pendingProperties}
        />
        <StatusSection
          title="Rejected Properties"
          color="text-rose-600"
          count={rejectedProperties.length}
          properties={rejectedProperties}
          isRejected
        />
      </div>

      {isModalOpen && (
        <PropertyModal
          property={editingProperty}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </section>
  );
}