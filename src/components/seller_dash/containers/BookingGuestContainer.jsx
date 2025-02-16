import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../fireBaseConfig";
import BookingDetailsModal from "../modals/BookingDetailsModal";
import GuestDetailsModal from "../modals/GuestDetailsModal";

export default function BookingGuestContainer({ bookingId }) {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(true);
  const [showGuestModal, setShowGuestModal] = useState(false);

  useEffect(() => {
    const bookingRef = ref(database, `formData/${bookingId}`);
    const unsubscribe = onValue(bookingRef, (snapshot) => {
      const data = snapshot.val();
      setBookingData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [bookingId]);

  const openGuestModal = () => {
    setShowBookingModal(false);
    setShowGuestModal(true);
  };

  const closeAll = () => {
    setShowBookingModal(false);
    setShowGuestModal(false);
  };

  if (loading) {
    return <div>Loading booking details...</div>;
  }

  if (!bookingData) return <div>No booking found.</div>;

  return (
    <>
      {showBookingModal && bookingData && (
        <BookingDetailsModal
          booking={{ ...bookingData, id: bookingId }} // include bookingId in the object
          onExitComplete={openGuestModal}
          onClose={closeAll}
        />
      )}
      {showGuestModal && bookingData && (
        <GuestDetailsModal
          guest={{
            name: bookingData.fullName,
            email: bookingData.guestEmail,
            phone: bookingData.phoneNumber,
            avatar: bookingData.guestAvatar,
          }}
          booking={{ ...bookingData, id: bookingId }}
          onClose={closeAll}
          onBack={() => {
            setShowGuestModal(false);
            setShowBookingModal(true);
          }}
        />
      )}
    </>
  );
}
