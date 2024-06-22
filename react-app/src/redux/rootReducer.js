import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import themeSlice from './slices/themeSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  theme: themeSlice,
});

export default rootReducer;
