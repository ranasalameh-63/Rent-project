import { ref, onValue, update } from "firebase/database";
import { database } from "../../../fireBaseConfig";

/**
 * Subscribes to all bookings in "formData".
 * Passes an array of booking objects to the provided callback.
 */
export function subscribeToBookings(callback) {
  const bookingsRef = ref(database, "formData");
  return onValue(bookingsRef, (snapshot) => {
    const data = snapshot.val();
    
    let allBookings = [];
    if (data) {
      allBookings = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    }
    callback(allBookings);
  });
}

/**
 * Updates the status of a booking.
 */
export async function updateBookingStatus(bookingId, newStatus) {
  return update(ref(database, `formData/${bookingId}`), { status: newStatus });
}
