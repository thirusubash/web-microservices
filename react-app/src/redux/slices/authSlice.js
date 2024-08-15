
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'api/axiosInstance';



// Async thunk for user authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/v1/authenticate', userData);
      // Log the response for debugging
      console.log('Login Response:', response);

      return response.data; // Successfully fetched data
    } catch (error) {
    
        return rejectWithValue({message : error.message , Code: error.Code});
    
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/auth/v1/logout', {});
    } catch (error) {
      return rejectWithValue({message : error.message , Code: error.Code});
    }
  }
);

// Async thunk for refreshing access token
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/v1/refresh', {});
      return response.data;
    } catch (error) {
      return rejectWithValue({message : error.message , Code: error.Code});
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout reducers
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Refresh access token reducers
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
