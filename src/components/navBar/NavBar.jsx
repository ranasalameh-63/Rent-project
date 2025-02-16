import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutUser, fetchUserNotifications } from "../../redux/authSlice";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, notifications } = useSelector(state => state.auth);
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserData());
      dispatch(fetchUserNotifications(user.uid)); // Fetch notifications
    }
  }, [dispatch, user?.uid]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsNotifOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
    navigate('/')
  };

  const getNavItems = () => {
    const baseItems = [
      { name: "Rentals", path: "/Rentals" },
      { name: "Our Story", path: "/about" },
      { name: "Support", path: "/support" }
    ];

    if (!user) {
      return baseItems;
    }

    if (user.role === "admin") {
      return [...baseItems, { name: "Admin Dashboard", path: "/AdminDash" }];
    }

    if (user.role === "seller" || user.role === "owner") {
      return [...baseItems, { name: "Landlord Dashboard", path: "/SellerDash" }];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo Section */}
          <Link to="/" className="relative group flex items-center space-x-3 z-20">
            <div className="bg-[#A59D84] rounded-lg p-2 transition-all duration-300 group-hover:shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">HV</span>
            </div>
            <span className="text-gray-800 font-semibold text-base md:text-lg">
              Horizon Villas
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A59D84] group-hover:w-full transition-all duration-300"></div>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative group py-2 px-1 ${location.pathname === item.path
                    ? "text-[#A59D84] font-medium"
                    : "text-gray-600 hover:text-gray-900"
                    } transition-colors duration-200`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#A59D84] transition-all duration-300 ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  ></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications & User Section */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Notifications */}
            {user && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2 rounded-full bg-[#C1BAA1] hover:bg-[#A59D84] transition-all"
                >
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11A6.002 6.002 0 009.674 5.201A4 4 0 009 3a4 4 0 00-4 4v1H3v1h16v1h-1v2a2 2 0 01-2 2h-1z" />
                  </svg>
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="p-2">
                      {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                          <div key={index} className="p-2 border-b last:border-none text-sm text-gray-700">
                            <p><strong>Product:</strong> {notif.productName || "Loading..."}</p>
                            <p>{notif.message}</p>
                            {notif.status === "approve" && (
                              <Link
                                to="/checkout"
                                className="mt-2 px-3 py-1 text-sm bg-[#A59D84] text-white rounded-md hover:bg-[#C1BAA1] transition"
                              >
                                Checkout
                              </Link>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-gray-500">No new notifications</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile & Logout */}
            {user ? (
              <>
                <Link
                  to="/Wishlist"
                  className="px-4 py-2 bg-[#A59D84] text-white rounded-full"
                >
                  <FaRegHeart />
                </Link>
                <Link
                  to="/UserProfile"
                  className="px-4 py-2 bg-[#A59D84] text-white rounded-full"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-[#A59D84] text-[#A59D84] rounded-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/Login"
                className="px-4 py-2 bg-[#A59D84] text-white rounded-full"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;