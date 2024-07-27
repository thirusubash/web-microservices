import {  blue,  teal, green,  amber, deepOrange,  grey,  } from '@mui/material/colors';

const initialTheme = {
  id: 6,
  name: "System Default",
  themeJson: {
    palette: {
      primary: {
        main: teal[500],
        light: teal[200],
        dark: teal[700],
        contrastText: '#ffffff', // Adding contrast text color for better readability
      },
      secondary: {
        main: green[500],
        light: green[200],
        dark: green[700],
        contrastText: '#ffffff', // Adding contrast text color for better readability
      },
      info: {
        main: blue[500],
        light: blue[200],
        dark: blue[700],
        contrastText: '#ffffff', // Adding contrast text color for better readability
      },
      warning: {
        main: amber[500], 
        light: amber[200],
        dark: amber[700],
        contrastText: '#000000', // Adding contrast text color for better readability
      },
      error: {
        main: deepOrange[500], 
        light: deepOrange[200],
        dark: deepOrange[700],
        contrastText: '#ffffff', // Adding contrast text color for better readability
      },
      background: {
        paper: grey[50],
        default: grey[100],
      },
      text: {
        primary: grey[900],
        secondary: grey[600],
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "36px",
        fontWeight: 500,
        color: grey[900],
      },
      h2: {
        fontSize: "28px",
        fontWeight: 400,
        color: grey[900],
      },
      body1: {
        fontSize: "16px",
        color: grey[800],
      },
      body2: {
        fontSize: "14px",
        color: grey[800],
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8, // Adjusting border radius for a more modern look
    }
  }
};

export default initialTheme;
