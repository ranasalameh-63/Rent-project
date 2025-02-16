import { useEffect, useState } from "react";
import { FaUserTie, FaCheckCircle, FaTimesCircle, FaBuilding } from "react-icons/fa";
import axios from "axios";

export default function StatisticsSection() {
  const [managers, setManagers] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // managers data
        const managersResponse = await axios.get(
          `https://testrent-b52c9-default-rtdb.firebaseio.com/users.json`
        );
        setManagers(managersResponse.data ? Object.values(managersResponse.data) : []);

        // products data
        const listingsResponse = await axios.get(
          `https://testrent-b52c9-default-rtdb.firebaseio.com/products.json`
        );
        setListings(listingsResponse.data ? Object.values(listingsResponse.data) : []); 
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);

  // Statistics  
  const totalManagers = managers.length;
  const approvedManagers = Array.isArray(managers) ? managers.filter((m) => m.status === "Approved").length : 0;
  const rejectedManagers = Array.isArray(managers) ? managers.filter((m) => m.status === "Rejected").length : 0;
  const totalListings = listings.length;
  const approvedListings = Array.isArray(listings) ? listings.filter((l) => l.status === "Approved").length : 0;
  const rejectedListings = Array.isArray(listings) ? listings.filter((l) => l.status === "Rejected").length : 0;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Admin Statistics
      </h2>

      {/* Grid of stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Managers */}
        <div className="flex items-center p-4 bg-[#ECEBDE] rounded-lg shadow-sm">
          <div className="p-3 bg-white rounded-full text-black mr-3">
            <FaUserTie size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Managers</p>
            <p className="text-xl font-bold text-black">{totalManagers}</p>
          </div>
        </div>

        {/* Approved Managers */}
        <div className="flex items-center p-4 bg-[#ECEBDE] rounded-lg shadow-sm">
          <div className="p-3 bg-white rounded-full text-black mr-3">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Approved Managers</p>
            <p className="text-xl font-bold text-black">{approvedManagers}</p>
          </div>
        </div>

        {/* Rejected Managers */}
        <div className="flex items-center p-4 bg-[#ECEBDE] rounded-lg shadow-sm">
          <div className="p-3 bg-white rounded-full text-black mr-3">
            <FaTimesCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Rejected Managers</p>
            <p className="text-xl font-bold text-black">{rejectedManagers}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {/* Total Listings */}
        <div className="flex items-center p-4 bg-[#D7D3BF] rounded-lg shadow-sm">
          <div className="p-3 bg-white rounded-full text-black mr-3">
            <FaBuilding size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Listings</p>
            <p className="text-xl font-bold text-black">{totalListings}</p>
          </div>
        </div>

        {/* Approved Listings */}
        <div className="flex items-center p-4 bg-[#D7D3BF] rounded-lg shadow-sm">
          <div className="p-3 bg-white rounded-full text-black mr-3">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Approved Listings</p>
            <p className="text-xl font-bold text-black">{approvedListings}</p>
          </div>
        </div>

        {/* Rejected Listings */}
        <div className="flex items-center p-4 bg-[#D7D3BF] rounded-lg shadow-sm">
          <div className="p-3 bg-white rounded-full text-black mr-3">
            <FaTimesCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Rejected Listings</p>
            <p className="text-xl font-bold text-black">{rejectedListings}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
