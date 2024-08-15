// themes.js

export const defaultFontSettings = {
  fontFamily: "Roboto, sans-serif",
};

export const defaultColors = {
  primary: "#00A76F",
  secondary: "#8E33FF",
  error: "#FF5630",
  warning: "#FFAB00",
  info: "#00B8D9",
};

export const shadows = [
  "none",
  "0px 1px 2px rgba(0, 0, 0, 0.2)",
  "0px 2px 4px rgba(0, 0, 0, 0.2)",
  "0px 3px 6px rgba(0, 0, 0, 0.2)",
  "0px 4px 8px rgba(0, 0, 0, 0.2)",
  "0px 6px 12px rgba(0, 0, 0, 0.2)",
  "0px 8px 16px rgba(0, 0, 0, 0.2)",
  "0px 12px 24px rgba(0, 0, 0, 0.2)",
  "0px 16px 32px rgba(0, 0, 0, 0.2)",
  "0px 24px 48px rgba(0, 0, 0, 0.2)",
];

export const themes = [
  {
    id: 0,
    name: "Tropical Paradise",
    themeJson: {
      palette: {
        mode: "light",
        primary: {
          lighter: "#C8FAD6",
          light: "#5BE49B",
          main: "#00A76F",
          dark: "#007867",
          darker: "#004B50",
        },
        secondary: {
          lighter: "#EFD6FF",
          light: "#C684FF",
          main: "#8E33FF",
          dark: "#5119B7",
          darker: "#27097A",
        },
        info: {
          lighter: "#CAFDF5",
          light: "#61F3F3",
          main: "#00B8D9",
          dark: "#006C9C",
          darker: "#003768",
        },
        success: {
          lighter: "#D3FCD2",
          light: "#77ED8B",
          main: "#22C55E",
          dark: "#118D57",
          darker: "#065E49",
        },
        warning: {
          lighter: "#FFF5CC",
          light: "#FFD666",
          main: "#FFAB00",
          dark: "#B76E00",
          darker: "#7A4100",
        },
        error: {
          lighter: "#FFEBEB",
          light: "#FF6F6F",
          main: "#FF5630",
          dark: "#C62828",
          darker: "#8E0000",
        },
        grey: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        background: {
          paper: "#ffffff",
          default: "#f5f5f5",
        },
      },
      typography: {
        ...defaultFontSettings,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
      },
    },
  },
  {
    id: 1,
    name: "Urban Nights",
    themeJson: {
      palette: {
        mode: "dark",
        primary: {
          lighter: "#C8FAD6",
          light: "#5BE49B",
          main: "#00A76F",
          dark: "#007867",
          darker: "#004B50",
          contrastText: "#ffffff", // Ensures readable text on primary buttons
        },
        secondary: {
          lighter: "#EFD6FF",
          light: "#C684FF",
          main: "#8E33FF",
          dark: "#5119B7",
          darker: "#27097A",
          contrastText: "#ffffff", // Ensures readable text on secondary buttons
        },
        info: {
          lighter: "#CAFDF5",
          light: "#61F3F3",
          main: "#00B8D9",
          dark: "#006C9C",
          darker: "#003768",
          contrastText: "#ffffff",
        },
        success: {
          lighter: "#D3FCD2",
          light: "#77ED8B",
          main: "#22C55E",
          dark: "#118D57",
          darker: "#065E49",
          contrastText: "#ffffff",
        },
        warning: {
          lighter: "#FFF5CC",
          light: "#FFD666",
          main: "#FFAB00",
          dark: "#B76E00",
          darker: "#7A4100",
          contrastText: "#000000", // Ensures readable text on warning buttons
        },
        error: {
          lighter: "#FFEBEB",
          light: "#FF6F6F",
          main: "#FF5630",
          dark: "#C62828",
          darker: "#8E0000",
          contrastText: "#ffffff",
        },
        grey: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          A100: "#D1D1D1", // Additional shades
          A200: "#A1A1A1",
          A400: "#707070",
          A700: "#515151",
        },
        background: {
          paper: "#1E1E1E",
          default: "#121212",
          appBar: "#212121", // Color for app bars or headers
          drawer: "#282828", // Color for side navigation drawers
        },
        text: {
          primary: "#E0E0E0",
          secondary: "#B0BEC5",
          disabled: "#757575",
          hint: "#9E9E9E",
        },
        action: {
          active: "#ffffff",
          hover: "rgba(255, 255, 255, 0.08)",
          selected: "rgba(255, 255, 255, 0.16)",
          disabled: "rgba(255, 255, 255, 0.3)",
          disabledBackground: "rgba(255, 255, 255, 0.12)",
        },
        divider: "rgba(255, 255, 255, 0.12)", // Divider lines between elements
      },
      typography: {
        fontFamily: "Roboto, sans-serif",
        fontSize: 14,
        htmlFontSize: 16,
        h1: {
          fontWeight: 700,
          fontSize: "3rem",
          color: "#E0E0E0",
          letterSpacing: "-0.01562em",
          lineHeight: 1.2,
        },
        h2: {
          fontWeight: 600,
          fontSize: "2.5rem",
          color: "#B0BEC5",
          letterSpacing: "-0.00833em",
          lineHeight: 1.3,
        },
        h3: {
          fontWeight: 500,
          fontSize: "2rem",
          color: "#B0BEC5",
          letterSpacing: "0em",
          lineHeight: 1.4,
        },
        h4: {
          fontWeight: 500,
          fontSize: "1.75rem",
          color: "#B0BEC5",
          letterSpacing: "0.00735em",
          lineHeight: 1.5,
        },
        h5: {
          fontWeight: 400,
          fontSize: "1.5rem",
          color: "#E0E0E0",
          letterSpacing: "0em",
          lineHeight: 1.6,
        },
        h6: {
          fontWeight: 400,
          fontSize: "1.25rem",
          color: "#E0E0E0",
          letterSpacing: "0.0075em",
          lineHeight: 1.7,
        },
        subtitle1: {
          fontWeight: 400,
          fontSize: "1rem",
          color: "#E0E0E0",
          lineHeight: 1.75,
        },
        subtitle2: {
          fontWeight: 500,
          fontSize: "0.875rem",
          color: "#B0BEC5",
          lineHeight: 1.57,
        },
        body1: {
          fontWeight: 400,
          fontSize: "1rem",
          color: "#E0E0E0",
          lineHeight: 1.5,
        },
        body2: {
          fontWeight: 400,
          fontSize: "0.875rem",
          color: "#B0BEC5",
          lineHeight: 1.43,
        },
        button: {
          fontWeight: 500,
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.02857em",
        },
        caption: {
          fontWeight: 400,
          fontSize: "0.75rem",
          color: "#9E9E9E",
          letterSpacing: "0.03333em",
          lineHeight: 1.66,
        },
        overline: {
          fontWeight: 400,
          fontSize: "0.75rem",
          color: "#9E9E9E",
          textTransform: "uppercase",
          letterSpacing: "0.08333em",
          lineHeight: 2.66,
        },
      },
      shape: {
        borderRadius: 8, // Defines global border radius for all components
      },
      shadows: [
        "none",
        "0px 1px 2px rgba(0, 0, 0, 0.2)",
        "0px 2px 4px rgba(0, 0, 0, 0.2)",
        "0px 3px 6px rgba(0, 0, 0, 0.2)",
        "0px 4px 8px rgba(0, 0, 0, 0.2)",
        "0px 6px 12px rgba(0, 0, 0, 0.2)",
        "0px 8px 16px rgba(0, 0, 0, 0.2)",
        "0px 12px 24px rgba(0, 0, 0, 0.2)",
        "0px 16px 32px rgba(0, 0, 0, 0.2)",
        "0px 24px 48px rgba(0, 0, 0, 0.2)",
        // Additional shadows for elevations above 24
        "0px 25px 50px rgba(0, 0, 0, 0.2)",
        "0px 26px 52px rgba(0, 0, 0, 0.2)",
        "0px 27px 54px rgba(0, 0, 0, 0.2)",
        "0px 28px 56px rgba(0, 0, 0, 0.2)",
        "0px 29px 58px rgba(0, 0, 0, 0.2)",
        "0px 30px 60px rgba(0, 0, 0, 0.2)",
        "0px 31px 62px rgba(0, 0, 0, 0.2)",
        "0px 32px 64px rgba(0, 0, 0, 0.2)",
        "0px 33px 66px rgba(0, 0, 0, 0.2)",
        "0px 34px 68px rgba(0, 0, 0, 0.2)",
        "0px 35px 70px rgba(0, 0, 0, 0.2)",
        "0px 36px 72px rgba(0, 0, 0, 0.2)",
        "0px 37px 74px rgba(0, 0, 0, 0.2)",
        "0px 38px 76px rgba(0, 0, 0, 0.2)",
        "0px 39px 78px rgba(0, 0, 0, 0.2)",
      ],
    },
  },  
  {
    id: 2,
    name: "Tropical Oasis",
    themeJson: {
      palette: {
        primary: {
          light: "#A379FF",
          main: "#8C57FF",
          dark: "#7E4EE6",
        },
        secondary: {
          light: "#A1A4A9",
          main: "#8A8D93",
          dark: "#7C7F84",
        },
        error: {
          light: "#FF7074",
          main: "#FF4C51",
          dark: "#E64449",
        },
        warning: {
          light: "#FFC333",
          main: "#FFB400",
          dark: "#E6A200",
        },
        info: {
          light: "#45C1FF",
          main: "#16B1FF",
          dark: "#149FE6",
        },
        success: {
          light: "#78D533",
          main: "#56CA00",
          dark: "#4DB600",
        },
        background: {
          paper: "#FFFFFF",
          default: "#F5F5F5",
        },
        text: {
          primary: "#000000",
          secondary: "#4A4A4A",
        },
      },
      typography: {
        ...defaultFontSettings,
        h1: {
          fontSize: "46px",
          lineHeight: "68px",
          fontWeight: 500,
        },
        h2: {
          fontSize: "38px",
          lineHeight: "56px",
          fontWeight: 500,
        },
        h3: {
          fontSize: "28px",
          lineHeight: "42px",
          fontWeight: 500,
        },
        h4: {
          fontSize: "24px",
          lineHeight: "38px",
          fontWeight: 500,
        },
        h5: {
          fontSize: "18px",
          lineHeight: "28px",
          fontWeight: 500,
        },
        h6: {
          fontSize: "15px",
          lineHeight: "22px",
          fontWeight: 500,
        },
        body1: {
          fontSize: "15px",
          lineHeight: "22px",
          fontWeight: 400,
        },
        body2: {
          fontSize: "13px",
          lineHeight: "20px",
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: "15px",
          lineHeight: "22px",
          fontWeight: 400,
        },
        subtitle2: {
          fontSize: "13px",
          lineHeight: "20px",
          fontWeight: 400,
        },
        button: {
          fontSize: "15px",
          lineHeight: "22px",
          fontWeight: 500,
          textTransform: "uppercase",
        },
      },
    },
  },
  {
    id: 3,
    name: "Urban Chic",
    themeJson: {
      palette: {
        primary: {
          main: "#6D6E71",
          light: "#9E9E9E",
          dark: "#43464B",
        },
        secondary: {
          main: "#B2B2B2",
          light: "#E0E0E0",
          dark: "#8C8C8C",
        },
        background: {
          paper: "#F5F5F5",
          default: "#E0E0E0",
        },
        text: {
          primary: "#333333",
          secondary: "#666666",
        },
      },
      typography: {
        ...defaultFontSettings,
        h1: {
          fontSize: "40px",
          fontWeight: 600,
        },
        h2: {
          fontSize: "32px",
          fontWeight: 500,
        },
        body1: {
          fontSize: "16px",
        },
        body2: {
          fontSize: "14px",
        },
      },
    },
  },
  {
    id: 4,
    name: "Polar Landscapes",
    themeJson: {
      palette: {
        primary: {
          main: "#004B49",
          light: "#007C77",
          dark: "#002D2C",
        },
        secondary: {
          main: "#9EBCBF",
          light: "#C8DAD8",
          dark: "#7C9E9B",
        },
        background: {
          paper: "#FFFFFF",
          default: "#E0F2F1",
        },
        text: {
          primary: "#002D2C",
          secondary: "#004B49",
        },
      },
      typography: {
        ...defaultFontSettings,
        h1: {
          fontSize: "38px",
          fontWeight: 600,
        },
        h2: {
          fontSize: "30px",
          fontWeight: 500,
        },
        body1: {
          fontSize: "16px",
        },
        body2: {
          fontSize: "14px",
        },
      },
    },
  },
  {
    id: 5,
    name: "Desert Mirage",
    themeJson: {
      palette: {
        primary: {
          main: "#D56A0E",
          light: "#F28D35",
          dark: "#A44B0A",
        },
        secondary: {
          main: "#F1E0D3",
          light: "#F5F0E8",
          dark: "#D8C8B8",
        },
        background: {
          paper: "#F7F4F1",
          default: "#EAE3D9",
        },
        text: {
          primary: "#5C3A21",
          secondary: "#8A5E42",
        },
      },
      typography: {
        ...defaultFontSettings,
        h1: {
          fontSize: "42px",
          fontWeight: 700,
        },
        h2: {
          fontSize: "34px",
          fontWeight: 600,
        },
        body1: {
          fontSize: "16px",
        },
        body2: {
          fontSize: "14px",
        },
      },
    },
  },
  {
    id: 6,
    name: "Zen Garden",
    themeJson: {
      palette: {
        primary: {
          main: "#A4B39C",
          light: "#C5D0B3",
          dark: "#7A8D6D",
        },
        secondary: {
          main: "#E2D2C6",
          light: "#F4E8E0",
          dark: "#BFAF9A",
        },
        background: {
          paper: "#F0F4F1",
          default: "#E8F2E7",
        },
        text: {
          primary: "#3E4C41",
          secondary: "#6B8E6B",
        },
      },
      typography: {
        ...defaultFontSettings,
        h1: {
          fontSize: "36px",
          fontWeight: 500,
        },
        h2: {
          fontSize: "28px",
          fontWeight: 400,
        },
        body1: {
          fontSize: "16px",
        },
        body2: {
          fontSize: "14px",
        },
      },
    },
  },
];
