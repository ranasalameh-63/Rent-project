// redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import rentalReducer from "./rentalSlice";
import formReducer from './FormSlice';  


const store = configureStore({
  reducer: {
    auth: authReducer,
    rentals: rentalReducer,
    form: formReducer,
  }
})

export default store
