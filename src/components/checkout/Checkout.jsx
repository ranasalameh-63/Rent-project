import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navBar/NavBar";

const Checkout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");
  const totalPrice = queryParams.get("totalPrice") ? parseFloat(queryParams.get("totalPrice")) : 0;

  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle your form submission logic (like sending data to an API or saving it locally)

    // Show success message after form submission
    toast.success("Order has been submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-gray-50">
      <Navbar /> {/* ✅ Navbar ثابت بالأعلى */}

      <ToastContainer />

      <div className="min-h-screen flex flex-col items-center py-20 px-5">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg space-y-8">
          {/* 🚚 Order Summary */}
          <div className="border-b border-gray-300 pb-6">
            <h2 className="text-2xl font-semibold text-[#D7D3BF] mb-4">🛒 Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-[#D7D3BF]">Product ID</p>
              <p className="text-lg font-medium text-[#D7D3BF]">{productId || "N/A"}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-[#D7D3BF]">Subtotal</p>
              <p className="text-lg font-medium text-[#D7D3BF]">JD {totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-[#D7D3BF]">Service Fee</p>
              <p className="text-lg font-medium text-[#D7D3BF]">JD {(totalPrice * 0.1).toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-[#D7D3BF]">Discount</p>
              <p className="text-lg font-medium text-green-500">- JD 0.00</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-300 pt-4">
              <p className="text-xl font-semibold text-[#D7D3BF]">Total</p>
              <p className="text-xl font-semibold text-[#D7D3BF]">JD {(totalPrice + totalPrice * 0.1).toFixed(2)}</p>
            </div>
          </div>

          {/* 📝 Billing Information */}
          <div className="border-b border-gray-300 pb-6">
            <h2 className="text-2xl font-semibold text-[#D7D3BF] mb-4">📝 Billing Information</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="flex space-x-4">
                <div className="w-full">
                  <label className="text-lg font-medium text-[#D7D3BF]">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-3 border-2 border-[#D7D3BF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7D3BF]"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="text-lg font-medium text-[#D7D3BF]">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-3 border-2 border-[#D7D3BF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7D3BF]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-lg font-medium text-[#D7D3BF]">Email Address</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border-2 border-[#D7D3BF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7D3BF]"
                  required
                />
              </div>

              <div>
                <label className="text-lg font-medium text-[#D7D3BF]">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+123 456 7890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border-2 border-[#D7D3BF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7D3BF]"
                  required
                />
              </div>

              {/* 🚀 Checkout Button */}
              <div className="flex justify-center pt-6">
                <button type="submit" className="bg-[#D7D3BF] text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-[#B7B296] transition duration-300">
                  🚀 Complete Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
