import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../navBar/NavBar";
import Footer from '../footer/Footer';
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { setRentals, setLoading, setError } from "../../redux/rentalSlice";
import background from "./assets/houses_bg.jpg";
import RentalCard from "./RentalCard";
import { Link } from "react-router-dom";


const Rentals = () => {
  const dispatch = useDispatch();
  const { rentals, categories, loading, error } = useSelector((state) => state.rentals);
  const scrollRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of rentals per page

  useEffect(() => {
    const fetchRentals = async () => {
      dispatch(setLoading());

      try {
        const response = await axios.get(
          "https://testrent-b52c9-default-rtdb.firebaseio.com/products.json"
        );
        const data = response.data;

        if (!data || typeof data !== "object") {
          dispatch(setError("No rentals found."));
          return;
        }

        // Convert Firebase object to an array
        const rentalsArray = Object.entries(data).map(([id, rental]) => ({
          id,
          ...rental,
        }));

        // Filter only approved rentals
        const approvedRentals = rentalsArray.filter((rental) => rental.status === "Approved");

        if (approvedRentals.length === 0) {
          dispatch(setError("No approved rentals found."));
          return;
        }

        // Extract unique categories from approved rentals
        const uniqueCategories = [...new Set(approvedRentals.map((rental) => rental.category).filter(Boolean))];

        dispatch(setRentals({ rentals: approvedRentals, categories: uniqueCategories }));
      } catch (error) {
        console.error("Fetch rentals error:", error);
        dispatch(setError("Failed to fetch rentals. Please try again later."));
      }
    };

    fetchRentals();
  }, [dispatch]);

  // Filter rentals based on category and search query
  const filteredRentals = rentals.filter((rental) => {
    const matchesCategory = selectedCategory === "All" || rental.category === selectedCategory;
    const matchesSearch = rental.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic: Slice rentals for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRentals = filteredRentals.slice(indexOfFirstItem, indexOfLastItem);

  // Handle Pagination
  const totalPages = Math.ceil(filteredRentals.length / itemsPerPage);
  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  if (loading) return <p className="text-center text-lg text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-6 text-center">
            <h1 className="text-4xl font-bold">Find Your Dream Villa</h1>
            <p className="text-lg mt-2">
              Discover luxury stays in the world&apos;s best destinations
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-full p-2 flex mt-6 shadow-lg max-w-lg w-full">
              <input
                type="text"
                placeholder="Search destinations..."
                className="flex-1 px-4 py-2 outline-none text-gray-700 rounded-l-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-[#A59D84] text-white px-6 py-2 rounded-full flex items-center">
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-6xl mx-auto py-8 px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Browse by Category</h2>

          <div className="relative flex items-center">
            {/* Categories List */}
            <div ref={scrollRef} className="flex space-x-4 overflow-x-auto no-scrollbar mx-12 py-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`flex items-center gap-2 bg-white shadow-md px-5 py-3 rounded-full font-semibold text-gray-700 transition 
                  ${selectedCategory === "All" ? "bg-gray-200" : "hover:bg-gray-100"}`}
              >
                All
              </button>

              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 bg-white shadow-md px-5 py-3 rounded-full font-semibold text-gray-700 transition cursor-pointer 
                    ${selectedCategory === category ? "bg-gray-200" : "hover:bg-gray-100"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rentals Listing */}
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 my-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold transition 
              ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
          >
            Previous
          </button>
          <span className="font-semibold text-gray-800">Page {currentPage} of {totalPages}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold transition 
              ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rentals;
