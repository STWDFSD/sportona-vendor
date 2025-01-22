// src/features/user/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isToggle: false,
  theme: 'dark',
  isDrawer: false,
};
export const commonSlice = createSlice({
  name: 'commonState',
  initialState: initState,
  reducers: {
    togglesidebar: state => {
      state.isToggle = state.isToggle ? false : true;
    },
    toggleDrawer: state => {
      state.isDrawer = state.isDrawer ? false : true;
    },
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { togglesidebar, toggleTheme, toggleDrawer } = commonSlice.actions;

export default commonSlice.reducer;
