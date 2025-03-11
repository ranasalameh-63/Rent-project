import { createSlice } from '@reduxjs/toolkit';
import { auth, googleProvider, database } from '../fireBaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';
import toast from 'react-hot-toast';

// Fetch product name based on productId
const fetchProductName = async (productId) => {
  try {
    if (!productId) return "Unknown Product";
    
    const productRef = ref(database, `products/${productId}`);
    const snapshot = await get(productRef);

    if (snapshot.exists()) {
      return snapshot.val().title;
    } else {
      return "Unknown Product";
    }
  } catch (error) {
    console.error("Error fetching product name:", error);
    return "Unknown Product";
  }
};

export const fetchUserData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) throw new Error('User not found');

    dispatch(setUser({ uid: user.uid, ...snapshot.val() }));
    dispatch(fetchUserNotifications(user.uid)); // Fetch notifications after user logs in
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch user notifications and attach product names
export const fetchUserNotifications = (uid) => async (dispatch) => {
  try {
    if (!uid) return;
    
    const notificationsRef = ref(database, `notification`);
    const snapshot = await get(notificationsRef);

    if (snapshot.exists()) {
      let allNotifications = Object.values(snapshot.val()); // تحويل البيانات إلى مصفوفة
      
      // 🔹 فلترة الإشعارات بناءً على userId
      let userNotifications = allNotifications.filter(notif => notif.userId === uid);

      // جلب أسماء المنتجات لكل إشعار
      const notificationsWithProductNames = await Promise.all(
        userNotifications.map(async (notif) => {
          const productName = await fetchProductName(notif.productId);
          return { ...notif, productName };
        })
      );

      dispatch(setNotifications(notificationsWithProductNames));
    } else {
      dispatch(setNotifications([]));
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    notifications: [], // تخزين الإشعارات مع أسماء المنتجات
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.notifications = [];
    },
    updateUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload; 
      }
    }
  }
});

export const { setUser, setLoading, setError, setNotifications, logout, updateUserRole } = authSlice.actions;
export default authSlice.reducer;

// Register new user
export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { email, password, fullName, phone, profileImage } = formData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await set(ref(database, `users/${user.uid}`), {
      fullName,
      email,
      phone,
      profileImage: profileImage || '',
      role: "user"
    });

    toast.success('Account created successfully!');
    dispatch(setUser({ uid: user.uid, fullName, email, phone, profileImage: profileImage || '', role: "user" }));
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(`Error: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

// Login user
export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { email, password } = formData;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(fetchUserData());
    toast.success('Welcome back!');
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(`Login Error: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

// Update user profile
export const updateUserData = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userRef = ref(database, `users/${auth.currentUser.uid}`);
    await update(userRef, formData);
    dispatch(setUser({ uid: auth.currentUser.uid, ...formData }));
    toast.success("Profile updated successfully!");
  } catch (error) {
    dispatch(setError(error.message));
    toast.error("Error updating profile: " + error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

// Google sign-in
export const googleSignIn = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = ref(database, `users/${user.uid}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      await set(userRef, {
        fullName: user.displayName,
        email: user.email,
        profileImage: user.photoURL || '',
        role: "user"
      });
    }

    dispatch(fetchUserData());
    toast.success(`Welcome, ${user.displayName}!`);
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(`Google Sign-in Error: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(setUser(null));
    dispatch(setNotifications([])); // Clear notifications on logout
    toast.success("Logged out successfully!");
  } catch (error) {
    dispatch(setError(error.message));
    toast.error("Logout failed: " + error.message);
  }
};

// Become an owner
export const becomeOwner = (ownerData) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const user = getState().auth.user;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const userRef = ref(database, `users/${user.uid}`);

    await update(userRef, {
      role: "owner",
      ownerDetails: ownerData 
    });

    dispatch(updateUserRole("owner"));

    toast.success("You are now a Property Owner!");
  } catch (error) {
    dispatch(setError(error.message));
    toast.error("Failed to become an owner: " + error.message);
  } finally {
    dispatch(setLoading(false));
  }
};
