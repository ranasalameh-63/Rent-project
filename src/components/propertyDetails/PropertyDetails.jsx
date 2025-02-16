import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../../fireBaseConfig";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Star,
  Users,
  MapPin,
  Calendar as CalendarIcon,
  Wifi,
  Airplay,
  Car,
  Bath,
  Utensils,
  Coffee,
  BedDouble,
  Home,
} from "lucide-react";
import Navbar from "../../components/navBar/NavBar";
import Footer from "../footer/Footer";
import BookNowPopup from "./BookNow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import useAuth from "./useAuth";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [blockedDates, setBlockedDates] = useState(new Set());
  const [bookedDays, setBookedDays] = useState(new Set());
  const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        setIsLoading(true);
        try {
          const propertyRef = ref(database, `products/${id}`);
          const snapshot = await get(propertyRef);
          if (snapshot.exists()) {
            const propertyData = snapshot.val();
            setProperty(propertyData);

            // Convert booked dates to Set
            const allBookedDays = new Set();
            (propertyData.bookedDate || []).forEach(
              ({ startDate, endDate }) => {
                let currentDate = new Date(startDate);
                const lastDate = new Date(endDate);
                while (currentDate <= lastDate) {
                  const dateString = formatDateString(currentDate);
                  allBookedDays.add(dateString);
                  currentDate.setDate(currentDate.getDate() + 1);
                }
              }
            );
            setBookedDays(allBookedDays);

            // Convert blocked dates to Set
            const extractedBlockedDates = new Set(
              (propertyData.blockedDates || []).map((date) => {
                const d = new Date(date);
                return formatDateString(d);
              })
            );
            setBlockedDates(extractedBlockedDates);
          } else {
            toast.error("Property not found", { theme: "colored" });
          }
        } catch (error) {
          console.error("Error fetching property data:", error);
          toast.error("Failed to load property details", { theme: "colored" });
        } finally {
          setIsLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id]);

  const formatDateString = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const isDateBlocked = (date) => {
    const dateString = formatDateString(date);
    return blockedDates.has(dateString) || bookedDays.has(dateString);
  };

  const handleDateSelection = (range) => {
    if (!range || range.length < 2) return;

    const [start, end] = range;
    let currentDate = new Date(start);
    const lastDate = new Date(end);

    // Calculate number of nights
    const nights = Math.round((lastDate - start) / (1000 * 60 * 60 * 24));

    while (currentDate <= lastDate) {
      const dateString = formatDateString(currentDate);

      if (blockedDates.has(dateString) || bookedDays.has(dateString)) {
        toast.error(
          "Some selected dates are unavailable. Please choose a different range.",
          { theme: "colored" }
        );
        return;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setSelectedRange(range);
    calculateTotalPrice(); // This will recalculate based on the new date range
    calculateFullTotal(); 
  };

  // Calculate total price if property and selected range exist
  const calculateTotalPrice = () => {
    if (!property || !selectedRange[0] || !selectedRange[1]) return 0;
    const nights = Math.round(
      (selectedRange[1] - selectedRange[0]) / (1000 * 60 * 60 * 24)
    );
    return property.price * nights;
  };

  // Calculate the full total with fees
  const calculateFullTotal = () => {
    const subtotal = calculateTotalPrice();
    const cleaningFee = property?.cleaningFee || 0;
    const serviceFee = Math.round(subtotal * 0.1);
    return subtotal + cleaningFee + serviceFee;
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (!selectedRange[0] || !selectedRange[1]) {
      toast.error("Please select your stay dates first", { theme: "colored" });
      return;
    }

    const totalPrice = calculateFullTotal();
    navigate("/checkout", {
      state: {
        propertyId: id,
        propertyTitle: property?.title,
        startDate: selectedRange[0].toISOString(),
        endDate: selectedRange[1].toISOString(),
        nights: Math.round(
          (selectedRange[1] - selectedRange[0]) / (1000 * 60 * 60 * 24)
        ),
        subtotal: calculateTotalPrice(),
        cleaningFee: property?.cleaningFee || 0,
        serviceFee: Math.round(calculateTotalPrice() * 0.1),
        totalPrice: totalPrice,
      },
    });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-48 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="w-96 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-80 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-6 lg:px-8">
        {property ? (
          <div className="max-w-7xl mx-auto">
            {/* Property Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              {property.title}
            </h1>

            {/* Main content: two-column layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column: Property Information */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg mb-6">
                  {/* Rating & Location */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                    <span className="flex items-center gap-1 text-yellow-500 font-medium">
                      <Star className="w-5 h-5 fill-current" />{" "}
                      {property.rating}{" "}
                      <span className="text-gray-600">
                        ({property.reviews || 0} reviews)
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {property.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> {property.bedrooms} rooms
                    </span>
                  </div>

                  {/* Property Photos */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                    {property.photos?.length > 0 && (
                      <div className="md:col-span-2 row-span-2">
                        <img
                          src={property.photos[0]}
                          alt="Main property view"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    {property.photos?.slice(1, 5).map((photo, index) => (
                      <div key={index} className="aspect-square">
                        <img
                          src={photo}
                          alt={`Property view ${index + 2}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Property Description */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                      About this place
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description ||
                        "Experience luxury and comfort in this beautiful property. Perfect for family vacations, business trips, or a romantic getaway. Enjoy the scenic views and convenient location close to local attractions."}
                    </p>
                  </div>

                  {/* Amenities as Statistics */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-6">
                      Property Statistics
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-[#D7D3BF] rounded-lg p-4 text-center">
                        <BedDouble className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white ">
                          {property.bedrooms || 0}
                        </div>
                        <div className="text-sm text-white font-bold">
                          Bedrooms
                        </div>
                      </div>

                      <div className="bg-[#D7D3BF] rounded-lg p-4 text-center">
                        <Bath className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white ">
                          {property.bathrooms || 5}
                        </div>
                        <div className="text-sm text-white font-bold">
                          Bathrooms
                        </div>
                      </div>

                      <div className="bg-[#D7D3BF] rounded-lg p-4 text-center">
                        <Home className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white ">
                          {property.area || 0}
                        </div>
                        <div className="text-sm font-bold text-white">
                          Sq. Meters
                        </div>
                      </div>

                      <div className="bg-[#D7D3BF] rounded-lg p-4 text-center">
                        <Users className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white ">
                          {property.capacity || 0}
                        </div>
                        <div className="text-sm font-bold text-white">
                          Guests
                        </div>
                      </div>
                    </div>

                    {/* Additional Amenities List */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-y-4">
                      {property.wifi && (
                        <div className="flex items-center gap-2">
                          <Wifi className="w-5 h-5 text-[#A59D84]" />
                          <span>Free WiFi</span>
                        </div>
                      )}
                      {property.tv && (
                        <div className="flex items-center gap-2">
                          <Airplay className="w-5 h-5 text-[#A59D84]" />
                          <span>Smart TV</span>
                        </div>
                      )}
                      {property.parking && (
                        <div className="flex items-center gap-2">
                          <Car className="w-5 h-5 text-[#A59D84]" />
                          <span>Free Parking</span>
                        </div>
                      )}
                      {property.kitchen && (
                        <div className="flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-[#A59D84]" />
                          <span>Full Kitchen</span>
                        </div>
                      )}
                      {property.breakfast && (
                        <div className="flex items-center gap-2">
                          <Coffee className="w-5 h-5 text-[#A59D84]" />
                          <span>Breakfast</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Property Location with Google Maps API */}
                <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#A59D84]" />
                    Property Location
                  </h2>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <div className="h-[300px] w-full">
                    <iframe
                      className="w-full h-full rounded-lg border border-gray-200"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBlsJhvX6RoUAKg0X8eLoayIOdV09kN-lQ&q=${encodeURIComponent(
                        property.location
                      )}`}
                      allowFullScreen
                      loading="lazy"
                      title="Property location map"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Calendar and Button */}
              {isAuthenticated ? (
                <div className="w-full lg:w-1/3">
                  <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg sticky top-4">
                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-xl md:text-2xl font-bold text-gray-800">
                        JD{property.price}{" "}
                        <span className="text-base font-normal text-gray-600">
                          / night
                        </span>
                      </span>
                    </div>

                    {/* Booking Calendar */}
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-gray-700" /> Select
                      dates
                    </h2>
                    <Calendar
                      onChange={handleDateSelection}
                      value={selectedRange}
                      selectRange={true}
                      tileDisabled={({ date }) => isDateBlocked(date)}
                      className="border rounded-lg shadow-sm w-full mb-4"
                    />

                    {/* Price Calculation */}
                    {selectedRange[0] && selectedRange[1] && (
                      <div className="mt-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span>
                            JD{property.price} ×{" "}
                            {Math.round(
                              (selectedRange[1] - selectedRange[0]) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            nights
                          </span>
                          <span>JD{calculateTotalPrice()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Cleaning fee</span>
                          <span>JD{property.cleaningFee || 50}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Service fee</span>
                          <span>
                          JD{Math.round(calculateTotalPrice() * 0.1)}
                          </span>
                        </div>
                        <div className="border-t border-gray-300 mt-3 pt-3">
                          <div className="flex justify-between items-center font-bold">
                            <span>Total</span>
                            <span>JD{calculateFullTotal()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Book Now Button */}
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-[#A59D84] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#A59D84] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A59D84] focus:ring-opacity-50 mb-3"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="min-h-screen p-6">
                  <div className="bg-white shadow-xl rounded-lg p-8 max-w-md mx-auto mt-10">
                    <h1 className="text-2xl font-bold text-gray-800">
                      You are not logged in.
                    </h1>
                    <p className="text-gray-600 mt-2">
                      Log in to rent this property
                    </p>
                    <Link to="/login">
                      <button className="mt-4 bg-gradient-to-r from-[#A59D84] to-[#A59D84] text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:from-[#A59D84] hover:to-[#A59D84] hover:-translate-y-1 transition-all duration-300 active:scale-95">
                        Log in
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            Property not found or has been removed.
          </div>
        )}
      </div>

      {isBookingOpen && (
        <BookNowPopup
          onClose={() => setIsBookingOpen(false)}
          startDate={selectedRange[0]}
          endDate={selectedRange[1]}
          productId={id}
          totalPrice={calculateFullTotal()}
        />
      )}
      <Footer />
    </>
  );
};

export default PropertyDetails;
