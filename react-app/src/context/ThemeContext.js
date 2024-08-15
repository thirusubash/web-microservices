// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import PropTypes from 'prop-types';
import initalTheme from 'themes/theme';
import axiosInstance from 'api/axiosInstance';



// Create the context
const ThemeContext = createContext();

// Create a provider component
export const ThemeProviderContext = ({ children }) => {

    const [theme, setTheme] = useState(createTheme(initalTheme.themeJson))  
    useEffect(() => {
      
            const storedThemeJson = localStorage.getItem('theme');
            if (storedThemeJson) {
              setTheme(createTheme(JSON.parse(storedThemeJson))); // Parse JSON string before creating theme
            }
          },[]);

    const refreshTheme = (userID) => {
        axiosInstance.get(`/user/v1/themes/default/${userID}`)
          .then((res) => {
            console.log(res.data.themeJson); // Correctly logging themeJson
            localStorage.setItem('theme', JSON.stringify(res.data.themeJson));
            setTheme(createTheme(res.data.themeJson)); 
          })
          .catch((err) => {
            console.error('Error fetching theme:', err);
          });
      };
      const applyTheme = (themeJson) => {
        localStorage.setItem('theme', JSON.stringify(themeJson));
        setTheme(createTheme(themeJson));
      };
      const resetDefaultTheme=()=>{
        localStorage.removeItem('theme');
        setTheme(createTheme(initalTheme.themeJson));
      }

  return (
    <ThemeContext.Provider value={{ refreshTheme , applyTheme, resetDefaultTheme}}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Add prop types validation
ThemeProviderContext.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node and is required
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
