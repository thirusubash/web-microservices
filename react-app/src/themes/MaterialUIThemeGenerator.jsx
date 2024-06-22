import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  CssBaseline,
  Paper,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
} from "@mui/material";
import { SketchPicker } from "react-color";
import SaveIcon from "@mui/icons-material/Save";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AddCircleOutlined, DeleteOutlined } from "@mui/icons-material";
import { colors } from "@mui/material";

const defaultTheme = {
  palette: {
    mode: "light",
    primary: { main: colors.blue[500] },
    secondary: { main: colors.pink[500] },
    error: { main: colors.red[500] },
    warning: { main: colors.orange[500] },
    info: { main: colors.lightBlue[500] },
    success: { main: colors.green[500] },
    background: { default: "#ffffff", paper: "#f5f5f5" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  spacing: 8,
};

const MaterialUIThemeGenerator = () => {
  const [themes, setThemes] = useState([
    { ...defaultTheme, name: "Default", editable: false },
  ]);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");

  useEffect(() => {
    // Ensure default theme cannot be edited
    setThemes((prevThemes) =>
      prevThemes.map((theme, index) =>
        index === 0 ? { ...theme, editable: false } : theme
      )
    );
  }, []);

  const deepCopyTheme = (theme) => ({
    ...theme,
    palette: { ...theme.palette },
    typography: { ...theme.typography },
  });

  const handleColorChange = (color, colorType) => {
    const updatedTheme = deepCopyTheme(themes[currentThemeIndex]);
    updatedTheme.palette[colorType].main = color.hex;
    setThemes((prevThemes) => {
      const updatedThemes = prevThemes.map((theme, index) =>
        index === currentThemeIndex ? updatedTheme : theme
      );
      return updatedThemes;
    });
  };

  const handleDarkModeChange = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleSaveTheme = () => {
    setThemes((prevThemes) =>
      prevThemes.map((theme, index) => {
        if (index === currentThemeIndex) {
          return {
            ...theme,
            palette: { ...theme.palette, mode: darkMode ? "dark" : "light" },
            name: newThemeName.trim() !== "" ? newThemeName.trim() : theme.name,
          };
        }
        return theme;
      })
    );
    console.log("Theme updated:", themes[currentThemeIndex]);
  };

  const handleAddTheme = () => {
    const newTheme = deepCopyTheme(themes[currentThemeIndex]);
    newTheme.name = `Theme ${themes.length}`;
    setThemes((prevThemes) => [...prevThemes, newTheme]);
    setCurrentThemeIndex(themes.length);
  };

  const handleDeleteTheme = (index) => {
    if (!themes[index].editable) {
      console.error("Cannot delete the default theme.");
      return;
    }
    const updatedThemes = themes.filter((theme, idx) => idx !== index);
    setThemes(updatedThemes);
    setCurrentThemeIndex(0);
  };

  const resetTheme = () => {
    const updatedThemes = [...themes];
    updatedThemes[currentThemeIndex] = deepCopyTheme(defaultTheme);
    setThemes(updatedThemes);
    setDarkMode(false);
  };

  const handleFontChange = (event) => {
    const updatedTheme = deepCopyTheme(themes[currentThemeIndex]);
    updatedTheme.typography.fontFamily = event.target.value;
    setThemes((prevThemes) => {
      const updatedThemes = prevThemes.map((theme, index) =>
        index === currentThemeIndex ? updatedTheme : theme
      );
      return updatedThemes;
    });
  };

  const handleFontSizeChange = (event) => {
    const updatedTheme = deepCopyTheme(themes[currentThemeIndex]);
    updatedTheme.typography.fontSize = parseInt(event.target.value);
    setThemes((prevThemes) => {
      const updatedThemes = prevThemes.map((theme, index) =>
        index === currentThemeIndex ? updatedTheme : theme
      );
      return updatedThemes;
    });
  };

  const handleFontWeightChange = (weightType, value) => {
    const updatedTheme = deepCopyTheme(themes[currentThemeIndex]);
    updatedTheme.typography[weightType] = parseInt(value);
    setThemes((prevThemes) => {
      const updatedThemes = prevThemes.map((theme, index) =>
        index === currentThemeIndex ? updatedTheme : theme
      );
      return updatedThemes;
    });
  };

  const handleSpacingChange = (event) => {
    const updatedTheme = deepCopyTheme(themes[currentThemeIndex]);
    updatedTheme.spacing = parseInt(event.target.value);
    setThemes((prevThemes) => {
      const updatedThemes = prevThemes.map((theme, index) =>
        index === currentThemeIndex ? updatedTheme : theme
      );
      return updatedThemes;
    });
  };

  const handleThemeNameChange = (event) => {
    setNewThemeName(event.target.value);
  };

  const customTheme = createTheme({
    ...themes[currentThemeIndex],
    palette: { ...themes[currentThemeIndex].palette },
    typography: { ...themes[currentThemeIndex].typography },
    mode: darkMode ? "dark" : "light",
  });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Typography variant="h5" gutterBottom>
        Material-UI Theme Palette Generator
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={handleDarkModeChange}
            color="primary"
          />
        }
        label="Dark Mode"
      />
      <FormControl style={{ minWidth: 200, margin: "10px 0" }}>
        <InputLabel htmlFor="font-select">Font Family</InputLabel>
        <Select
          value={themes[currentThemeIndex].typography.fontFamily}
          onChange={handleFontChange}
          inputProps={{
            name: "font",
            id: "font-select",
          }}
          disabled={!themes[currentThemeIndex].editable}
        >
          <MenuItem value="Roboto, sans-serif">Roboto</MenuItem>
          <MenuItem value="Arial, sans-serif">Arial</MenuItem>
          <MenuItem value="Verdana, sans-serif">Verdana</MenuItem>
          <MenuItem value="Courier New, monospace">Courier New</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ minWidth: 200, margin: "10px 0" }}>
        <TextField
          label="Font Size"
          type="number"
          value={themes[currentThemeIndex].typography.fontSize}
          onChange={handleFontSizeChange}
          disabled={!themes[currentThemeIndex].editable}
        />
      </FormControl>
      <FormControl style={{ minWidth: 200, margin: "10px 0" }}>
        <TextField
          label="Light Font Weight"
          type="number"
          value={themes[currentThemeIndex].typography.fontWeightLight}
          onChange={(e) =>
            handleFontWeightChange("fontWeightLight", e.target.value)
          }
          disabled={!themes[currentThemeIndex].editable}
        />
      </FormControl>
      <FormControl style={{ minWidth: 200, margin: "10px 0" }}>
        <TextField
          label="Regular Font Weight"
          type="number"
          value={themes[currentThemeIndex].typography.fontWeightRegular}
          onChange={(e) =>
            handleFontWeightChange("fontWeightRegular", e.target.value)
          }
          disabled={!themes[currentThemeIndex].editable}
        />
      </FormControl>
      <FormControl style={{ minWidth: 200, margin: "10px 0" }}>
        <TextField
          label="Medium Font Weight"
          type="number"
          value={themes[currentThemeIndex].typography.fontWeightMedium}
          onChange={(e) =>
            handleFontWeightChange("fontWeightMedium", e.target.value)
          }
          disabled={!themes[currentThemeIndex].editable}
        />
      </FormControl>
      <FormControl style={{ minWidth: 200, margin: "10px 0" }}>
        <TextField
          label="Bold Font Weight"
          type="number"
          value={themes[currentThemeIndex].typography.fontWeightBold}
          onChange={(e) =>
            handleFontWeightChange("fontWeightBold", e.target.value)
          }
          disabled={!themes[currentThemeIndex].editable}
        />
      </FormControl>
      <FormControl style={{ minWidth: 200, margin: "10px 0" }}>
        <TextField
          label="Spacing"
          type="number"
          value={themes[currentThemeIndex].spacing}
          onChange={handleSpacingChange}
          disabled={!themes[currentThemeIndex].editable}
        />
      </FormControl>
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Primary Color
            </Typography>
            <SketchPicker
              color={themes[currentThemeIndex].palette.primary.main}
              onChangeComplete={(color) => handleColorChange(color, "primary")}
              disabled={!themes[currentThemeIndex].editable}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Secondary Color
            </Typography>
            <SketchPicker
              color={themes[currentThemeIndex].palette.secondary.main}
              onChangeComplete={(color) =>
                handleColorChange(color, "secondary")
              }
              disabled={!themes[currentThemeIndex].editable}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Error Color
            </Typography>
            <SketchPicker
              color={themes[currentThemeIndex].palette.error.main}
              onChangeComplete={(color) => handleColorChange(color, "error")}
              disabled={!themes[currentThemeIndex].editable}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Warning Color
            </Typography>
            <SketchPicker
              color={themes[currentThemeIndex].palette.warning.main}
              onChangeComplete={(color) => handleColorChange(color, "warning")}
              disabled={!themes[currentThemeIndex].editable}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Info Color
            </Typography>
            <SketchPicker
              color={themes[currentThemeIndex].palette.info.main}
              onChangeComplete={(color) => handleColorChange(color, "info")}
              disabled={!themes[currentThemeIndex].editable}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Success Color
            </Typography>
            <SketchPicker
              color={themes[currentThemeIndex].palette.success.main}
              onChangeComplete={(color) => handleColorChange(color, "success")}
              disabled={!themes[currentThemeIndex].editable}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveTheme}
            startIcon={<SaveIcon />}
            style={{ marginRight: 10 }}
            disabled={!themes[currentThemeIndex].editable}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={resetTheme}
            style={{ marginRight: 10 }}
            disabled={!themes[currentThemeIndex].editable}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTheme}
            style={{ marginRight: 10 }}
          >
            Save as New Theme
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteTheme(currentThemeIndex)}
            disabled={
              !themes[currentThemeIndex].editable || themes.length === 1
            }
          >
            Delete Current Theme
          </Button>
          <TextField
            label="New Theme Name"
            value={newThemeName}
            onChange={handleThemeNameChange}
            style={{ marginLeft: 10 }}
            disabled={!themes[currentThemeIndex].editable}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ padding: 20 }}>
        {themes.map((theme, index) => (
          <Grid item key={index} xs={12} md={4}>
            <Paper style={{ padding: 20 }}>
              <Typography variant="h6" gutterBottom>
                {theme.name}
              </Typography>
              <Typography variant="body2" style={{ marginBottom: 10 }}>
                Font: {theme.typography.fontFamily}
              </Typography>
              <div
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.palette.primary.main,
                  marginBottom: 10,
                }}
              ></div>
              <div
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.palette.secondary.main,
                  marginBottom: 10,
                }}
              ></div>
              <IconButton
                variant="contained"
                onClick={() => setCurrentThemeIndex(index)}
                style={{ marginRight: 10 }}
              >
                Apply
              </IconButton>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteTheme(index)}
                style={{ marginLeft: 10 }}
                disabled={!theme.editable || themes.length === 1}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default MaterialUIThemeGenerator;
