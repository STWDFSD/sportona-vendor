// @ import redux slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  venderData: {},
};

export const venderSlice = createSlice({
  name: 'vender',
  initialState,
  reducers: {
    storeVenderData(state, action) {
      state.venderData = action.payload;
    },
  },
});

export const { storeVenderData } = venderSlice.actions;

export default venderSlice.reducer;
