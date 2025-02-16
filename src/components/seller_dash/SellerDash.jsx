import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { push, ref } from "firebase/database";

import NavBar from "../navBar/NavBar";
import PropertiesSection from "./sections/PropertiesSection";
import CalendarSection from "./sections/CalendarSection";
import BookingsSection from "./sections/BookingsSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import ReviewsSection from "./sections/ReviewsSection";
import DepositRequestModal from "./modals/DepositRequestModal";
import AlertModal from "./modals/AlertModal";

import {
  subscribeToPropertiesBySeller,
  softDeleteProperty,
  sendDepositRequest,
  updateBlockedDates,
  updateProductBookedDates,
} from "./service/PropertyService";
import { subscribeToBookings, updateBookingStatus } from "./service/BookingService";
import { subscribeToReviews } from "./service/ReviewService";

import { database } from "../../fireBaseConfig";

export default function SellerDash() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/login");
    }
  }, [user, navigate]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Helper function to send a notification to Firebase.
  const sendNotification = async (notification) => {
    const notificationsRef = ref(database, "notification");
    return push(notificationsRef, notification);
  };

  // Subscribe to seller properties.
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToPropertiesBySeller(user.uid, (fetchedProperties) => {
        console.log("Fetched properties:", fetchedProperties);
        setProperties(fetchedProperties);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Subscribe to bookings.
  useEffect(() => {
    const unsubscribe = subscribeToBookings((allBookings) => {
      const sellerProductIds = properties.map((p) => p.id);
      const sellerBookings = allBookings.filter((b) => sellerProductIds.includes(b.productId));
      console.log("Filtered seller bookings:", sellerBookings);
      setBookings(sellerBookings);
    });
    return () => unsubscribe();
  }, [properties]);

  // Subscribe to reviews.
  useEffect(() => {
    const unsubscribeReviews = subscribeToReviews((snapshot) => {
      const data = snapshot.val();
      let allReviews = [];
      if (data) {
        allReviews = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      }
      const propertyIds = properties.map((p) => p.id);
      const filteredReviews = allReviews.filter((review) => propertyIds.includes(review.productId));
      setReviews(filteredReviews);
    });
    return () => unsubscribeReviews();
  }, [properties]);

  const handleRemoveProperty = async (propertyId) => {
    await softDeleteProperty(propertyId);
  };

  const openDepositModal = (property) => {
    setSelectedProperty(property);
    setIsDepositModalOpen(true);
  };

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
    setSelectedProperty(null);
  };

  const handleDepositRequest = async (message) => {
    if (!selectedProperty) return;
    try {
      await sendDepositRequest(selectedProperty.id, message);
      console.log(`Deposit request submitted for: ${selectedProperty.title}`);
    } catch (error) {
      console.error("Error submitting deposit request:", error);
    }
  };

  // Handle booking actions with conflict checking.
  // When approving a booking, also push a notification into Firebase.
  const handleBookingAction = async (bookingId, newStatus) => {
    try {
      if (newStatus.toLowerCase() === "approved") {
        // Find the booking object.
        const booking = bookings.find((b) => b.id === bookingId);
        if (!booking) return;
        // Find the corresponding property.
        const product = properties.find((p) => p.id === booking.productId);
        if (!product) return;
        // Parse the booking's start and end dates.
        const newStart = dayjs(booking.startDate);
        const newEnd = dayjs(booking.endDate);
        // Check conflict with existing approved booking ranges in product.bookedDate.
        let conflict = false;
        if (product.bookedDate && product.bookedDate.length > 0) {
          for (const range of product.bookedDate) {
            const existingStart = dayjs(range.startDate);
            const existingEnd = dayjs(range.endDate);
            if (
              newStart.isBefore(existingEnd.add(1, "day")) &&
              newEnd.isAfter(existingStart.subtract(1, "day"))
            ) {
              conflict = true;
              break;
            }
          }
        }
        if (conflict) {
          setAlertMessage(
            "This booking request conflicts with an existing approved booking. Please check the calendar for booked dates."
          );
          setShowAlert(true);
          return;
        }
        // If no conflict, update the product's bookedDate field.
        const newRange = {
          startDate: newStart.format("YYYY-MM-DD"),
          endDate: newEnd.format("YYYY-MM-DD"),
        };
        const updatedBookedDates = product.bookedDate
          ? [...product.bookedDate, newRange]
          : [newRange];
        await updateProductBookedDates(product.id, updatedBookedDates);
      }

      // Update the booking status.
      await updateBookingStatus(bookingId, newStatus);
      console.log(`Booking ${bookingId} updated to ${newStatus}`);

      // Send notification to Firebase.
      // Map booking status to notification status and message.
      let notificationStatus, notificationMessage;
      if (newStatus.toLowerCase() === "approved") {
        notificationStatus = "approve";
        notificationMessage = "Your request has been approved.";
      } else if (newStatus.toLowerCase() === "declined") {
        notificationStatus = "rejected";
        notificationMessage = "Your request has been rejected.";
      } else {
        notificationStatus = newStatus.toLowerCase();
        notificationMessage = "Your request is pending approval.";
      }
      // Assume the booking object contains a userId.
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking && booking.userId) {
        await sendNotification({
          message: notificationMessage,
          productId: booking.productId,
          status: notificationStatus,
          userId: booking.userId,
          totalPrice: booking.totalPrice,
        });
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Toggle blocked date for a property.
  const handleToggleBlockedDate = async (propertyId, dateStr) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property) {
      console.error("Property not found for id:", propertyId);
      return;
    }
    const currentBlocked = property.blockedDates || [];
    let newBlocked;
    if (currentBlocked.includes(dateStr)) {
      newBlocked = currentBlocked.filter((d) => d !== dateStr);
      console.log(`Unblocking date ${dateStr}`);
    } else {
      newBlocked = [...currentBlocked, dateStr];
      console.log(`Blocking date ${dateStr}`);
    }
    try {
      await updateBlockedDates(propertyId, newBlocked);
      setProperties((prev) =>
        prev.map((p) => (p.id === propertyId ? { ...p, blockedDates: newBlocked } : p))
      );
    } catch (error) {
      console.error("Error updating blocked dates:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      <button
        className="sm:hidden fixed bottom-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars />
      </button>

      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <AnalyticsSection properties={properties} bookings={bookings} />
          <PropertiesSection
            properties={properties}
            onAddProperty={() => {}}
            onEditProperty={() => {}}
            onRemoveProperty={handleRemoveProperty}
            onOpenDepositModal={openDepositModal}
          />
          <BookingsSection
            bookings={bookings}
            properties={properties}
            onBookingAction={handleBookingAction}
          />
          <CalendarSection
            bookings={bookings}
            properties={properties}
            onToggleBlockedDate={handleToggleBlockedDate}
          />
          <ReviewsSection reviews={reviews} properties={properties} />
        </main>
      </div>

      <DepositRequestModal
        isOpen={isDepositModalOpen}
        onClose={closeDepositModal}
        onSubmit={handleDepositRequest}
        propertyTitle={
          selectedProperty
            ? properties.find((p) => p.id === selectedProperty)?.title
            : ""
        }
      />

      {showAlert && (
        <AlertModal
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
