import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Assuming you have a combined reducer
import { refreshAccessToken } from './slices/authSlice';


const store = configureStore({
  reducer: rootReducer,
});

// Fetch the theme when the application starts (optional)
store.dispatch(refreshAccessToken());
export default store;
