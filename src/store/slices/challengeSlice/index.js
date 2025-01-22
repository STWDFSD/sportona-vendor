// @ import redux slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: 'Monthly',
  status: 'External Only',
  allorsingle: 'All',
};

export const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    setChallangeOption(state, action) {
      state.session = action.payload.session;
      state.allorsingle = action.payload.allorsingle;
      state.status = action.payload.status;
    },
  },
});

export const { setChallangeOption } = challengeSlice.actions;

export default challengeSlice.reducer;
