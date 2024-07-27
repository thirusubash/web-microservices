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
          paper: "#1E1E1E",
          default: "#121212",
        },
      },
      typography: {
        ...defaultFontSettings,
        h1: {
          fontWeight: 700,
          color: "#E0E0E0",
        },
        h2: {
          fontWeight: 600,
          color: "#B0BEC5",
        },
        body1: {
          color: "#E0E0E0",
        },
        body2: {
          color: "#B0BEC5",
        },
      },
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
