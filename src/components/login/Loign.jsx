
// import React, { useState ,useEffect  } from "react";
// import { useDispatch, useSelector } from 'react-redux'; 
// import { useNavigate } from 'react-router-dom';
// import {
//   registerUser,
//   loginUser,
//   googleSignIn
// } from '../../redux/authSlice';

// import { User, Mail, Lock, Camera, Phone } from "lucide-react";
// import toast, { Toaster } from 'react-hot-toast';


// const Auth = () => {
//   const dispatch = useDispatch();
//   const { user, loading } = useSelector((state) => state.auth);
//   const navigate = useNavigate();


//   const [isRegister, setIsRegister] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     role: "user", 
//   });

//   // Regex patterns
//   const patterns = {
//     email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
//     password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//   };

//   const validateForm = () => {
//     if (isRegister) {
//       if (!formData.fullName.trim()) {
//         toast.error("Full name is required");
//         return false;
//       }
//       if (!patterns.phone.test(formData.phone)) {
//         toast.error("Please enter a valid phone number");
//         return false;
//       }
//       if (formData.password !== formData.confirmPassword) {
//         toast.error("Passwords do not match");
//         return false;
//       }
//     }

//     if (!patterns.email.test(formData.email)) {
//       toast.error("Please enter a valid email address");
//       return false;
//     }

//     if (!patterns.password.test(formData.password)) {
//       toast.error("Password must contain at least 8 characters, including uppercase, lowercase, number and special character");
//       return false;
//     }

//     return true;
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5000000) {
//         toast.error("Image size should be less than 5MB");
//         return;
//       }
//       setProfileImage(URL.createObjectURL(file));
//       toast.success("Profile image uploaded successfully");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // دالة تسجيل الدخول عبر Google
//   const handleGoogleSignIn = async () => {
//     dispatch(googleSignIn());
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     dispatch(registerUser({
//       ...formData,
//       profileImage
//     }));
//   };

//   // const handleLogin = (e) => {
//   //   e.preventDefault();
//   //   if (!validateForm()) return;

//   //   dispatch(loginUser({
//   //     email: formData.email,
//   //     password: formData.password
//   //   }));
//   // };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     dispatch(loginUser({
//       email: formData.email,
//       password: formData.password
//     }));
//   };

//   useEffect(() => {
//     if (user) {
//       navigate('/'); // قم بتغيير '/dashboard' إلى المسار الذي تريد التوجيه إليه
//     }
//   }, [user, navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <Toaster position="top-right" />
//       <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

//         {/* Left Side - Image Section */}
//         <div className="hidden md:block md:w-1/2 relative">
//           <img
//             src="src/assets/login22.jpg"
//             alt="Luxury Villa"
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 flex flex-col justify-center px-12 text-white bg-black/30">
//             <h2 className="text-4xl font-bold mb-6">
//               {isRegister ? "Start Your Journey" : "Welcome Back"}
//             </h2>
//             <p className="text-lg opacity-90">
//               {isRegister
//                 ? "Create your account and join our community today."
//                 : "Sign in to access your personalized experience."}
//             </p>
//           </div>
//         </div>

//         {/* Right Side - Form Section */}
//         <div className="w-full md:w-1/2 p-8 md:p-12">
//           <div className="space-y-8">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-900 mb-2">
//                 {isRegister ? "Create Account" : "Sign In"}
//               </h3>
//               <p className="text-gray-600">
//                 {isRegister 
//                   ? "Fill in your details to get started"
//                   : "Enter your credentials to continue"}
//               </p>
//             </div>

//             {/* Google Sign In Button */}
//             <button
//               onClick={handleGoogleSignIn}
//               className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
//             >
//               <img 
//                 src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
//                 alt="Google" 
//                 className="w-6 h-6"
//               />
//               {loading ? "Loading..." : "Continue with Google"}
//             </button>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
//               </div>
//             </div>

//             <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-6">
//               {/* Profile Image Upload */}
//               {isRegister && (
//                 <div className="flex flex-col items-center space-y-4">
//                   <label className="relative cursor-pointer group">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageUpload}
//                     />
//                     <div className="w-32 h-32 rounded-full border-4 border-gray-100 group-hover:border-gray-200 transition-all duration-300 flex items-center justify-center bg-gray-50 overflow-hidden">
//                       {profileImage ? (
//                         <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//                       ) : (
//                         <Camera size={40} className="text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
//                       )}
//                     </div>
//                     <div className="absolute bottom-0 right-0 bg-gray-500 rounded-full p-2 shadow-lg">
//                       <Camera size={16} className="text-white" />
//                     </div>
//                   </label>
//                   <p className="text-sm text-gray-600">Upload your photo</p>
//                 </div>
//               )}

//               {/* Form Fields */}
//               <div className="space-y-4">
//                 {isRegister && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                         <input
//                           name="fullName"
//                           type="text"
//                           required
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
//                           placeholder="John Doe"
//                           value={formData.fullName}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                         <input
//                           name="phone"
//                           type="tel"
//                           required
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
//                           placeholder="(123) 456-7890"
//                           value={formData.phone}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       name="email"
//                       type="email"
//                       required
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
//                       placeholder="your@email.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       name="password"
//                       type="password"
//                       required
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
//                       placeholder="••••••••"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {isRegister && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                       <input
//                         name="confirmPassword"
//                         type="password"
//                         required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
//                         placeholder="••••••••"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-all duration-300"
//               >
//                 {loading ? "Loading..." : (isRegister ? "Create Account" : "Sign In")}
//               </button>
//             </form>

//             {/* Toggle Link */}
//             <p className="text-center text-gray-600">
//               {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
//               <button
//                 onClick={() => setIsRegister(!isRegister)}
//                 className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-300"
//               >
//                 {isRegister ? "Sign In" : "Create Account"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  registerUser,
  loginUser,
  googleSignIn
} from '../../redux/authSlice';

import { User, Mail, Lock, Camera, Phone } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';


const Auth = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const [isRegister, setIsRegister] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  // Regex patterns
  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  };

  const validateForm = () => {
    if (isRegister) {
      if (!formData.fullName.trim()) {
        toast.error("Full name is required");
        return false;
      }
      if (!patterns.phone.test(formData.phone)) {
        toast.error("Please enter a valid phone number");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }
    }

    if (!patterns.email.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!patterns.password.test(formData.password)) {
      toast.error("Password must contain at least 8 characters, including uppercase, lowercase, number and special character");
      return false;
    }

    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setProfileImage(URL.createObjectURL(file));
      toast.success("Profile image uploaded successfully");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // دالة تسجيل الدخول عبر Google
  const handleGoogleSignIn = async () => {
    dispatch(googleSignIn());
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(registerUser({
      ...formData,
      profileImage
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginUser({
      email: formData.email,
      password: formData.password
    }));
  };

  useEffect(() => {
    if (user) {
      navigate('/'); // قم بتغيير '/dashboard' إلى المسار الذي تريد التوجيه إليه
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side - Video Section */}
        <div className="hidden md:block md:w-1/2 relative">
          <video
            src="src/components/login/13135530_1920_1080_30fps.mp4"  // Replace with your video file path
            alt="Luxury Villa"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white bg-black/30">
            <h2 className="text-4xl font-bold mb-6">
              {isRegister ? "Start Your Journey" : "Welcome Back"}
            </h2>
            <p className="text-lg opacity-90">
              {isRegister
                ? "Create your account and join our community today."
                : "Sign in to access your personalized experience."}
            </p>
          </div>
        </div>


        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {isRegister ? "Create Account" : "Sign In"}
              </h3>
              <p className="text-gray-600">
                {isRegister
                  ? "Fill in your details to get started"
                  : "Enter your credentials to continue"}
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
            >
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google"
                className="w-6 h-6"
              />
              {loading ? "Loading..." : "Continue with Google"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-6">
              {/* Profile Image Upload */}
              {isRegister && (
                <div className="flex flex-col items-center space-y-4">
                  <label className="relative cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className="w-32 h-32 rounded-full border-4 border-gray-100 group-hover:border-gray-200 transition-all duration-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={40} className="text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-gray-500 rounded-full p-2 shadow-lg">
                      <Camera size={16} className="text-white" />
                    </div>
                  </label>
                  <p className="text-sm text-gray-600">Upload your photo</p>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                {isRegister && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          name="fullName"
                          type="text"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          name="phone"
                          type="tel"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
                          placeholder="+96200 0000 000"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {isRegister && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D7D3BF] focus:border-transparent transition-all duration-300"
                        placeholder="Repeat password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#D7D3BF] text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-[#D7D3BF] transition-all duration-300"
              >
                {loading ? "Loading..." : (isRegister ? "Create Account" : "Sign In")}
              </button>
            </form>

            {/* Toggle Link */}
            <p className="text-center text-gray-600">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-[#D7D3BF] font-semibold hover:text-[#D7D3BF] transition-colors duration-300"
              >
                {isRegister ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
