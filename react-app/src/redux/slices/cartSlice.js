import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/cart');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/cart', item);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (item, { rejectWithValue }) => {
  try {
    await axios.put(`/api/cart/${item.id}`, item);
    return item;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (itemId, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/cart/${itemId}`);
    return itemId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
