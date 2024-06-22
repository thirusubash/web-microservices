// src/redux/themeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  palette: {
    mode: "light",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#2196f3",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    divider: "#bdbdbd",
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
  darkMode: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateThemePalette: (state, action) => {
      const { palette } = action.payload;
      state.palette = palette;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      state.palette.mode = state.darkMode ? 'dark' : 'light';
    },
  },
});

export const { updateThemePalette, toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
