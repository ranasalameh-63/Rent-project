// ReviewService.js
import { ref, onValue } from "firebase/database";
import { database } from "../../../fireBaseConfig"; // Adjust the path as needed

/**
 * Subscribes to all reviews.
 * @param {function} callback - A callback function that receives the snapshot.
 * @returns {function} A function to unsubscribe the listener.
 */
export function subscribeToReviews(callback) {
  const reviewsRef = ref(database, "reviews");
  return onValue(reviewsRef, callback);
}
