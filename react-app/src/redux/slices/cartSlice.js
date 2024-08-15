import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for the cart
const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

// Async thunks for API calls

// Fetch cart items from the server
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/cart');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Add an item to the cart
export const addCartItem = createAsyncThunk('cart/addCartItem', async (item, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/cart', item);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update an item in the cart
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (item, { rejectWithValue }) => {
  try {
    await axios.put(`/api/cart/${item.id}`, item);
    return item;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete an item from the cart
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (itemId, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/cart/${itemId}`);
    return itemId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Local actions if any (e.g., incrementing quantity locally)
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.isLoading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

// Export actions and reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
