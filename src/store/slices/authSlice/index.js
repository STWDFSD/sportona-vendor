// @ import redux slice
import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './thunkapi';

const initialState = {
  authLoader: false,
  message: '',
  authData: {},
  token: null,
  userId: null,
  changePasswordLoader: false,
  changePasswordError: '',
  roles: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.authLoader = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload?.data?.token);
        state.authData = action?.payload?.data;
        state.token = action.payload?.data?.token;
        state.userId = action?.payload?.data?.id;
        state.authLoader = false;
        state.roles = action?.payload?.data?.rights;
        state.message = action?.payload?.responseDesc || '';
        state.error = !action?.payload?.data
          ? action?.payload?.responseDesc
          : '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authLoader = false;
        state.error = action?.error?.message.includes('401')
          ? 'Invalid username or password.'
          : action?.error?.message;
      });
  },
});

export const { reset, storeUserData } = authSlice.actions;

export default authSlice.reducer;
