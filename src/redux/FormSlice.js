
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    fullName: '',
    idType: 'National ID',
    idNumber: '',
    startDate: '',
    endDate: '',
    numGuests: '',
    phoneNumber: '',
    address: '',
    status: 'pending', 

  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;

    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;

