import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';
import { Shield, CheckCircle, XCircle } from 'lucide-react'; // استيراد الأيقونات

export default function SellerObjection() {
    const [message, setMessage] = useState([]);

    const firebaseUrl = "https://testrent-b52c9-default-rtdb.firebaseio.com/products.json";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const messageResponse = await axios.get(firebaseUrl);
                if (messageResponse.data) {
                    const appeals = Object.keys(messageResponse.data)
                        .map((key) => ({ id: key, ...messageResponse.data[key] }))
                        .filter((product) => product.depositRequest); // Filter products with objections

                    setMessage(appeals);
                }
            } catch (error) {
                console.error("Error fetching appeals:", error);
            }
        };

        fetchData();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.patch(
                `https://testrent-b52c9-default-rtdb.firebaseio.com/products/${id}.json`,
                {
                    status: "approved",
                    depositResponse: "Your deposit request has been approved!"
                }
            );
            setMessage((prevMessages) => prevMessages.filter((item) => item.id !== id));

            Swal.fire({
                icon: 'success',
                title: 'Approved!',
                text: 'The request has been approved successfully!',
            });
        } catch (error) {
            console.error("Error approving product:", error);
        }
    };

    const handleFinalReject = async (id) => {
        try {
            await axios.patch(
                `https://testrent-b52c9-default-rtdb.firebaseio.com/products/${id}.json`,
                {
                    status: "rejected",
                    depositResponse: "Your deposit request has been permanently rejected."
                }
            );
            setMessage((prevMessages) => prevMessages.filter((item) => item.id !== id));

            Swal.fire({
                icon: 'error',
                title: 'Rejected!',
                text: 'The request has been permanently rejected.',
            });
        } catch (error) {
            console.error("Error rejecting product:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center mb-8 space-x-3">
                        <Shield className="w-8 h-8 text-[#C1BAA1]" />
                        <h2 className="text-3xl font-bold text-gray-900">Deposit Requests Review</h2>
                    </div>

                    {message.length > 0 ? (
                        <div className="grid gap-6">
                            {message.map((product) => (
                                <div key={product.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                {product.photos && (
                                                    <img
                                                        src={product.photos}
                                                        alt={product.title}
                                                        className="w-full h-60 object-cover rounded-lg shadow-sm border border-gray-200"
                                                    />
                                                )}
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {product.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    📍 {product.location}
                                                </p>
                                            </div>
                                            <div className="px-3 py-1 bg-[#ECEBDE] text-black text-sm font-medium rounded-full">
                                                Pending Review
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            <p className="text-gray-600">
                                                {product.description}
                                            </p>

                                            <div className="p-4 bg-[#ECEBDE] rounded-lg">
                                                <h4 className="font-medium text-black mb-2">
                                                    Deposit Request Details
                                                </h4>
                                                <p className="text-gray-500">
                                                    {product.depositRequest}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex space-x-4">
                                            <button
                                                onClick={() => handleApprove(product.id)}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-black bg-[#A59D84] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Approve Request
                                            </button>
                                            <button
                                                onClick={() => handleFinalReject(product.id)}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-black bg-[#D7D3BF] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                            >
                                                <XCircle className="w-4 h-4 mr-2" />
                                                Reject Permanently
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Shield className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No Pending Requests</h3>
                            <p className="mt-1 text-gray-500">There are no deposit requests requiring your review at this time.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
