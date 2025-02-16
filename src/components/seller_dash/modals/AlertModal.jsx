// src/components/seller_dash/AlertModal.jsx
import React from "react";

export default function AlertModal({ message, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 max-w-sm w-full shadow-2xl">
                <h3 className="text-2xl font-bold text-red-600 mb-4">Booking Conflict</h3>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
