import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQeXVHH0EZPkoAK7511KZA4FV432Dt6RE",
  authDomain: "testrent-b52c9.firebaseapp.com",
  databaseURL: "https://testrent-b52c9-default-rtdb.firebaseio.com",
  projectId: "testrent-b52c9",
  storageBucket: "testrent-b52c9.firebasestorage.app",
  messagingSenderId: "1033254211926",
  appId: "1:1033254211926:web:2bb45349175902a69c46f7",
  measurementId: "G-PDTT53QXLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, database };
export default app;
