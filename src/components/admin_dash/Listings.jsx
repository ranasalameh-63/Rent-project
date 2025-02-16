import { useEffect, useState } from "react";
import axios from "axios";
import { ref, update } from "firebase/database";
import { database } from "../../fireBaseConfig";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [sellersData, setSellersData] = useState({}); // تخزين بيانات المستخدمين

  // ✅ جلب بيانات المنتجات
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `https://testrent-b52c9-default-rtdb.firebaseio.com/products.json`
        );

        if (response.data) {
          const data = response.data;
          const pendingListings = Object.keys(data)
            .map(id => ({ id, ...data[id] }))
            .filter(listing => listing.status === "pending");
          setListings(pendingListings);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
        console.error(error.response ? error.response.data : error.message);
      }
    };

    fetchListings();
  }, []);

  // ✅ جلب بيانات المستخدمين من Firebase
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          `https://rental-website-bb300-default-rtdb.firebaseio.com/users.json`
        );

        if (response.data) {
          setSellersData(response.data); // تخزين بيانات المستخدمين
        }
      } catch (error) {
        console.error("Error fetching sellers data:", error);
      }
    };

    fetchSellers();
  }, []);

  // ✅ تحديث الحالة في Realtime Database عند الموافقة أو الرفض
  const handleListingAction = async (id, newStatus) => {
    const listingRef = ref(database, `products/${id}`);
    await update(listingRef, { status: newStatus });

    // Re-fetch the listings after the update
    fetchListings();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 sm:p-5 border-b border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Pending Product Listings
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] sm:min-w-0">
          <thead className="bg-[#ECEBDE]">
            <tr>
              {["Title", "Owner", "Status", "Actions"].map(header => (
                <th
                  key={header}
                  className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-semibold text-black text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listings.length > 0 ? (
              listings.map(listing => (
                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-gray-800 text-sm sm:text-base">
                    {listing.title}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-600 text-sm">
                    {sellersData[listing.seller]?.fullName || "Unknown"}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                        listing.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : listing.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 space-y-2 sm:space-x-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleListingAction(listing.id, "Approved")}
                        className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-xs sm:text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleListingAction(listing.id, "Rejected")}
                        className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-xs sm:text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No pending products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
