import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import {
  fetchUserData,
  updateUserData,
  logoutUser,
} from "../../redux/authSlice";
import { Camera, Save, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { database } from "../../fireBaseConfig";
import { ref, get, push, set } from "firebase/database";
import { FaStar, FaRegStar } from 'react-icons/fa';  // استيراد النجوم من Font Awesome
import Swal from 'sweetalert2';
import Navbar from "../navBar/NavBar";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRental, setCurrentRental] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [formData, setFormData] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    city: user?.city ?? "",
    profileImage: user?.profileImage ?? "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        city: user.city ?? "",
        profileImage: user.profileImage ?? "",
      });
      fetchRentalHistory(user.uid);
    }
  }, [user]);

  const fetchRentalHistory = async (userId) => {
    try {
      const historyRef = ref(database, "histoy");
      const snapshot = await get(historyRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const filteredData = Object.values(data).filter(
          (item) => item.userId === userId
        );
        setRentalHistory(filteredData);
      } else {
        setRentalHistory([]);
      }
    } catch (error) {
      console.error("Error fetching rental history:", error);
      toast.error("Failed to load rental history");
    }
  };

  const openModal = (rental) => {
    console.log("Opening modal with rental:", rental);
    setCurrentRental(rental);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRental(null);
    setComment("");
    setRating(0);
  };

  const saveReview = async () => {
    if (currentRental) {
      if (!currentRental.propertyId) {
        console.error("Error: propertyId is missing in currentRental");
        toast.error("Error: Missing property ID for this rental");
        return;
      }

      const reviewData = {
        userId: user.uid,
        productId: currentRental.propertyId,  // استخدام propertyId بدلاً من productId
        comment: comment,
        rate: rating,
      };

      try {
        const reviewsRef = ref(database, "reviews");
        const newReviewRef = push(reviewsRef);
        await set(newReviewRef, reviewData);
        toast.success("Review saved successfully!");
        closeModal();
      } catch (error) {
        console.error("Error saving review:", error);
        toast.error("Failed to save review");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUserData(formData));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Changes saved successfully",
        confirmButtonText: "OK"
      });
    } catch (error) {
      toast.error("Error saving changes");
    }
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
        toast.success("Profile image updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-48 bg-[#A59D84]">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={formData.profileImage || "/api/placeholder/150/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-0 right-0 bg-[#A59D84] hover:bg-[#A59D84] text-white p-2 rounded-full shadow-lg cursor-pointer transition-all duration-200 transform hover:scale-105"
                >
                  <Camera className="h-5 w-5" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
              </div>
            </div>
          </div>

          <div className="mt-20 px-8 pb-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              User Profile
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A59D84] focus:border-[#A59D84] transition-colors bg-gray-50"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A59D84] focus:border-[#A59D84] transition-colors bg-gray-50"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A59D84] focus:border-[#A59D84] transition-colors bg-gray-50"
                  placeholder="Enter your address"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A59D84] focus:border-[#A59D84] transition-colors bg-gray-50"
                  placeholder="Enter your city"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-2 bg-[#A59D84] hover:bg-[#8F866B] text-white rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </button>

              <Link to="/BecomeOwnerProfile">
                <button className="flex items-center px-6 py-2 bg-[#A59D84] hover:bg-[#8F866B] text-white rounded-lg shadow-md font-bold transition-all duration-200 transform hover:scale-105">
                  List Your Villa
                </button>
              </Link>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Rental History
              </h2>
              {rentalHistory.length > 0 ? (
                <div className="space-y-4">
                  {rentalHistory.map((rental, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <p className="text-gray-700">
                        <strong>Villa Name:</strong> {rental.villaName}
                      </p>
                      <p className="text-gray-700">
                        <strong>Location:</strong> {rental.location}
                      </p>
                      <p className="text-gray-700">
                        <strong>Rented Date:</strong> {rental.rentedDate}
                      </p>
                      <p className="text-gray-700">
                        <strong>Return Date:</strong>{" "}
                        {rental.returnDate || "Not specified"}
                      </p>
                      <p className="text-gray-700">
                        <strong>Price per Night:</strong>{rental.pricePerNight}JD
                      </p>
                      <button
                        onClick={() => openModal(rental)}
                        className="mt-2 bg-[#A59D84] hover:bg-[#A59D84] text-white px-4 py-2 rounded-lg"
                      >
                        Add Review
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No rental history found.</p>
              )}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-lg mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Add Review</h3>

              {/* عرض النجوم باستخدام Font Awesome */}
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    style={{ fontSize: "24px" }}
                  >
                    {star <= rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>

              {/* تعليق المستخدم */}
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg mt-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#A59D84]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment..."
                rows="4"
              />

              {/* الأزرار */}
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    saveReview(); // حفظ المراجعة
                    toast.success("Review saved successfully!"); // عرض التنبيه
                    closeModal(); // إغلاق البوب-اب
                  }}
                  className="px-6 py-2 bg-[#A59D84] text-white rounded-lg hover:bg-[#A59D84] transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
};

export default UserProfile;
