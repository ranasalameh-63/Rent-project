import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user.uid)
      setIsAuthenticated(!!user); // True if user exists, false otherwise
    });

    // Cleanup function
    return () => unsubscribe();
  }, [auth]);

  return isAuthenticated;
};

export default useAuth;
