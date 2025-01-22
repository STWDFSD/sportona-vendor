// @import dependencies
import { combineReducers } from '@reduxjs/toolkit';
// @import slices
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import commonReducer from './slices/commonSlice';
import loaderReducer from './slices/loaderSlice';
import challengesReducer from './slices/challengeSlice';
import venderSlice from './slices/venderslice';

const appReducer = combineReducers({
  auth: authReducer,
  vender: venderSlice,
  alert: alertReducer,
  loader: loaderReducer,
  commonState: commonReducer,
  challenges: challengesReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined; // Reset the entire state
  }
  return appReducer(state, action);
};
