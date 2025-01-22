import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  submittingStatus: '',
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader(state, action) {
      state.isLoading = action.payload;
    },
    setSubmitStatus(state, action) {
      state.submittingStatus = action.payload;
    },
  },
});

export const { setLoader, setSubmitStatus } = loaderSlice.actions;
export default loaderSlice.reducer;
