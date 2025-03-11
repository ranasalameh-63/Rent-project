// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Managers() {
//   const [managers, setManagers] = useState([]);
//   const [loading, setLoading] = useState(null);

//   const firebaseUrl = "https://testrent-b52c9-default-rtdb.firebaseio.com/users.json";

//   // Fetch managers from Firebase
//   useEffect(() => {
//     const fetchManagersData = async () => {
//       try {
//         const response = await axios.get(firebaseUrl);
//         if (response.data) {
//           const managersData = Object.keys(response.data).map((key) => ({
//             id: key,
//             ...response.data[key],
//           }));
//           setManagers(managersData);
//         }
//       } catch (error) {
//         console.error("Error fetching data from Firebase:", error);
//       }
//     };
//     fetchManagersData();
//   }, []);

//   // Update Manager Status & Role
//   const updateManagerStatus = async (managerId, newStatus, newRole) => {
//     setLoading(managerId); // Show loading state for clicked button

//     try {
//       await axios.patch(
//         `https://testrent-b52c9-default-rtdb.firebaseio.com/users/${managerId}.json`,
//         { status: newStatus, role: newRole }
//       );
//       setManagers((prevManagers) =>
//         prevManagers.map((manager) =>
//           manager.id === managerId ? { ...manager, status: newStatus, role: newRole } : manager
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status and role in Firebase:", error);
//     } finally {
//       setLoading(null);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//       <div className="p-4 sm:p-5 border-b border-gray-100">
//         <h2 className="text-base sm:text-lg font-semibold text-gray-800">
//           Pending Property Managers
//         </h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[600px] sm:min-w-0">
//           <thead className="bg-[#ECEBDE]">
//             <tr>
//               {["Name", "Email", "Status", "Role", "Actions"].map((header) => (
//                 <th
//                   key={header}
//                   className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-semibold text-black text-left"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {managers.map((manager) => (
//               <tr key={manager.id} className="hover:bg-gray-50 transition-colors">
//                 {/* Name */}
//                 <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-gray-800 text-sm sm:text-base">
//                   {manager.fullName}
//                 </td>

//                 {/* Email */}
//                 <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-600 text-sm">
//                   {manager.email}
//                 </td>

//                 {/* Status */}
//                 <td className="px-4 py-3 sm:px-6 sm:py-4">
//                   <span
//                     className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${manager.status === "Approved"
//                       ? "bg-green-100 text-green-700"
//                       : manager.status === "Rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-amber-100 text-amber-700"
//                       }`}
//                   >
//                     {manager.status}
//                   </span>
//                 </td>

//                 {/* Role */}
//                 <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-600 text-sm">
//                   {manager.role || "User"}
//                 </td>

//                 {/* Actions */}
//                 <td className="px-4 py-3 sm:px-6 sm:py-4 space-y-2 sm:space-x-2">
//                   <div className="flex flex-col sm:flex-row gap-2">
//                     {/* Approve Button */}
//                     <button
//                       onClick={() => updateManagerStatus(manager.id, "Approved", "seller")}
//                       className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-xs sm:text-sm"
//                       disabled={loading === manager.id}
//                     >
//                       {loading === manager.id ? "Loading..." : "Approve"}
//                     </button>

//                     {/* Reject Button */}
//                     <button
//                       onClick={() => updateManagerStatus(manager.id, "Rejected", "User")}
//                       className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-xs sm:text-sm"
//                       disabled={loading === manager.id}
//                     >
//                       {loading === manager.id ? "Loading..." : "Reject"}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import axios from "axios";

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set number of items per page

  const firebaseUrl = "https://testrent-b52c9-default-rtdb.firebaseio.com/users.json";

  // Fetch managers from Firebase
  useEffect(() => {
    const fetchManagersData = async () => {
      try {
        const response = await axios.get(firebaseUrl);
        if (response.data) {
          const managersData = Object.keys(response.data).map((key, index) => ({
            id: key,
            index: index + 1, // Numbering
            ...response.data[key],
          }));
          setManagers(managersData);
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
    fetchManagersData();
  }, []);

  // Update Manager Status & Role
  const updateManagerStatus = async (managerId, newStatus, newRole) => {
    setLoading(managerId);

    try {
      await axios.patch(
        `https://testrent-b52c9-default-rtdb.firebaseio.com/users/${managerId}.json`,
        { status: newStatus, role: newRole }
      );
      setManagers((prevManagers) =>
        prevManagers.map((manager) =>
          manager.id === managerId ? { ...manager, status: newStatus, role: newRole } : manager
        )
      );
    } catch (error) {
      console.error("Error updating status and role in Firebase:", error);
    } finally {
      setLoading(null);
    }
  };

  // Filter and Search Logic
  const filteredManagers = managers
    .filter((manager) =>
      (filterStatus ? manager.status === filterStatus : true) &&
      (searchQuery
        ? manager.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          manager.email.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
    );

  // Pagination Logic
  const totalPages = Math.ceil(filteredManagers.length / itemsPerPage);
  const paginatedManagers = filteredManagers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Property Managers</h2>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="border p-2 rounded-lg w-full sm:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded-lg w-full sm:w-1/4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-[#ECEBDE]">
            <tr>
              {["#", "Name", "Email", "Status", "Role", "Actions"].map((header) => (
                <th key={header} className="px-4 py-3 text-sm font-semibold text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedManagers.map((manager, index) => (
              <tr key={manager.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-3">{manager.fullName}</td>
                <td className="px-4 py-3">{manager.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${manager.status === "Approved" ? "bg-green-100 text-green-700" :
                      manager.status === "Rejected" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"}`}>
                    {manager.status}
                  </span>
                </td>
                <td className="px-4 py-3">{manager.role || "User"}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => updateManagerStatus(manager.id, "Approved", "seller")}
                    className="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm"
                    disabled={loading === manager.id}
                  >
                    {loading === manager.id ? "Loading..." : "Approve"}
                  </button>
                  <button
                    onClick={() => updateManagerStatus(manager.id, "Rejected", "User")}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm"
                    disabled={loading === manager.id}
                  >
                    {loading === manager.id ? "Loading..." : "Reject"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
