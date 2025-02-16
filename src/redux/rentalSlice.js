import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentals: [],
  categories: [],
  loading: false,
  error: null,
};

const rentalSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    setRentals(state, action) {
      state.rentals = action.payload.rentals;
      state.categories = action.payload.categories;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setRentals, setLoading, setError } = rentalSlice.actions;

export default rentalSlice.reducer;
