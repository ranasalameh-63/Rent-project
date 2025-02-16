import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../redux/authSlice"; // تحديث بيانات المستخدم في Redux
import { getDatabase, ref, update } from "firebase/database"; // Firebase
import { toast } from "react-hot-toast";
import { Camera, Save } from "lucide-react"; // أيقونات
import { useNavigate } from "react-router-dom"; // للتنقل بعد الإرسال

const BecomeOwnerProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    city: user?.city ?? "",
    company: "",
    description: "",
    profileImage: user?.profileImage ?? "",
    status: "pending", // إضافة حالة "في انتظار الموافقة"
    pendingRequest: true, // تحديد أن هناك طلب قيد المراجعة
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        city: user.city ?? "",
        profileImage: user.profileImage ?? "",
      }));
    }
  }, [user]);

  // تحديث القيم عند التعديل
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // تحديث الصورة الشخصية
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
        toast.success("Profile image updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  // إرسال الطلب ليصبح المستخدم مؤجرًا (بدون تغيير الدور)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      // تحديث البيانات في Firebase
      await update(userRef, formData);

      // تحديث Redux Store
      dispatch(updateUserData(formData));

      toast.success("Your request has been sent for approval!");
      navigate("/"); // إعادة التوجيه إلى الصفحة الرئيسية بعد الإرسال
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Request to Become a Property Owner
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Fill in your details and submit the request. Admin will approve it.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={formData.profileImage || "/api/placeholder/150/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 bg-[#A59D84] hover:bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer transition-all"
            >
              <Camera className="h-5 w-5 " />
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

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name (Optional)</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#A59D84] text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeOwnerProfile;

