// @imports redux toolkit
import Swal from 'sweetalert2';
import { createSlice } from '@reduxjs/toolkit';
// @ import media
import closeCircle from 'media/svgs/close-circle-white.svg';

const initialState = {
  isAlertOpen: false,
  message: '',
  time: 3000,
  alertType: 'default_alert',
};

function swalModal(message, alertType, title) {
  Swal.fire({
    icon: 'error',
    text: message,
    showCloseButton: true,
    iconColor: 'rgba(245, 130, 32, 1)',
    title: title ? title : 'Error',
    confirmButtonColor: 'rgba(55, 71, 79, 1)',
    iconHtml: `
     <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">  
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
  `,
    closeButtonHtml: `<img src="${closeCircle}" alt="Close" />`,
  });
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openAlert(state, action) {
      const { message, alertType } = action.payload;
      state.isAlertOpen = true;
      state.message = message;
      state.alertType = alertType || 'default_alert';
    },
    openModal(state, action) {
      const { message, alertType, title } = action.payload;
      swalModal(message, alertType, title);
    },
    closeAlert(state) {
      state.isAlertOpen = false;
      state.message = '';
    },
    setAlertTime(state, action) {
      state.time = action.payload;
    },
  },
});

export const { openAlert, closeAlert, setAlertTime, openModal } =
  alertSlice.actions;
export default alertSlice.reducer;
