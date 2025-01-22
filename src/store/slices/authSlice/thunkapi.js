// @import dependencies
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/loginUser', async payload => {
  try {
  } catch (error) {
    return error?.response?.data;
  }
});
