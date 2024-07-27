import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Grid,
  Typography,
  Button,
  CssBaseline,

  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,

  Box,
  TablePagination,

  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  Card,
  CardHeader,
  CardContent,

  CardActions,
  Chip} from "@mui/material";
import { SketchPicker } from "react-color";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import TryOutlinedIcon from "@mui/icons-material/TryOutlined";
import debounce from "lodash/debounce";
import axios from "axios";
import {
  blue,
  pink,
  red,
  orange,
  lightBlue,
  green,
} from "@mui/material/colors";
import { useTheme } from "context/ThemeContext";


const defaultFontSettings = {
  fontFamily: "Roboto, sans-serif",
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

const defaultColors = {
  primary: blue[500],
  secondary: pink[500],
  error: red[500],
  warning: orange[500],
  info: lightBlue[500],
  success: green[500],
};

const MaterialUIThemeGenerator = ({ Userid = 1 }) => {
  const [themes, setThemes] = useState([]);
  const [currentThemeId, setCurrentThemeId] = useState(null);
  const [newThemeName, setNewThemeName] = useState("");
  const [themeColors, setThemeColors] = useState(defaultColors);
  const [fontSettings, setFontSettings] = useState(defaultFontSettings);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalThemes, setTotalThemes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { refreshTheme } = useTheme();
 

  const handleFontSettingChange = useCallback((key, value) => {
    setFontSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);
  const debouncedHandleColorChange = useMemo(
    () => debounce((colorName, color) => {
      setThemeColors((prev) => ({ ...prev, [colorName]: color.hex }));
    }, 300),
    [] 
  );
  
  const handleColorChange = useCallback(debouncedHandleColorChange, [debouncedHandleColorChange]);
  

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleDialogOpen = useCallback((editing = false, theme = null) => {
    setIsEditing(editing);
    if (editing && theme) {
      setCurrentThemeId(theme.id);
      setNewThemeName(theme.name);
      setThemeColors({
        primary: theme.themeJson.palette.primary.main,
        secondary: theme.themeJson.palette.secondary.main,
        error: theme.themeJson.palette.error.main,
        warning: theme.themeJson.palette.warning.main,
        info: theme.themeJson.palette.info.main,
        success: theme.themeJson.palette.success.main,
      });
      setFontSettings({
        fontFamily: theme.themeJson.typography.fontFamily,
        fontSize: theme.themeJson.typography.fontSize,
        fontWeightLight: theme.themeJson.typography.fontWeightLight,
        fontWeightRegular: theme.themeJson.typography.fontWeightRegular,
        fontWeightMedium: theme.themeJson.typography.fontWeightMedium,
        fontWeightBold: theme.themeJson.typography.fontWeightBold,
      });
      setDarkMode(theme.themeJson.palette.mode === "dark");
    } else {
      setNewThemeName("");
      resetToDefault();
    }
    setDialogOpen(true);
  }, []); 

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetToDefault();
  };

  const saveAsNewTheme = async () => {
    const newThemeId = themes.length ? themes.length + 1 : 1;
    const newTheme = {
      id: null,
      name: newThemeName || `Theme ${newThemeId}`,
      primary: true,
      themeJson: {
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: themeColors.primary },
          secondary: { main: themeColors.secondary },
          error: { main: themeColors.error },
          warning: { main: themeColors.warning },
          info: { main: themeColors.info },
          success: { main: themeColors.success },
          background: {
            default: darkMode ? "#303030" : "#ffffff",
            paper: darkMode ? "#424242" : "#f5f5f5",
          },
        },
        typography: {
          fontFamily: fontSettings.fontFamily,
          fontSize: fontSettings.fontSize,
          fontWeightLight: fontSettings.fontWeightLight,
          fontWeightRegular: fontSettings.fontWeightRegular,
          fontWeightMedium: fontSettings.fontWeightMedium,
          fontWeightBold: fontSettings.fontWeightBold,
        },
      },
    };

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8005/user-service/v1/themes/${Userid}`,
        newTheme
      );
      setThemes((prevThemes) => [...prevThemes, newTheme]);
      handleDialogClose();
    } catch (error) {
      console.error("Error saving theme:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async (themeId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8005/user-service/v1/themes/${themeId}`);
      setThemes((prevThemes) => prevThemes.filter((t) => t.id !== themeId));
      if (currentThemeId === themeId) {
        setCurrentThemeId(null);
      }
    } catch (error) {
      console.error("Error deleting theme:", error);
    } finally {
      setLoading(false);
    }
  }, [currentThemeId]); // Add any required dependencies

  const applyTheme = useCallback(async (themeId) => {
    setCurrentThemeId(themeId);
    const theme = themes.find((theme) => theme.id === themeId);
    if (theme) {
      const { palette, typography } = theme.themeJson || {};
      setThemeColors({
        primary: palette?.primary?.main || defaultColors.primary,
        secondary: palette?.secondary?.main || defaultColors.secondary,
        error: palette?.error?.main || defaultColors.error,
        warning: palette?.warning?.main || defaultColors.warning,
        info: palette?.info?.main || defaultColors.info,
        success: palette?.success?.main || defaultColors.success,
      });
      setFontSettings({
        fontFamily: typography?.fontFamily || defaultFontSettings.fontFamily,
        fontSize: typography?.fontSize || defaultFontSettings.fontSize,
        fontWeightLight:
          typography?.fontWeightLight || defaultFontSettings.fontWeightLight,
        fontWeightRegular:
          typography?.fontWeightRegular || defaultFontSettings.fontWeightRegular,
        fontWeightMedium:
          typography?.fontWeightMedium || defaultFontSettings.fontWeightMedium,
        fontWeightBold:
          typography?.fontWeightBold || defaultFontSettings.fontWeightBold,
      });
      setDarkMode(palette?.mode === "dark");
  
      setLoading(true);
      try {
        await axios.patch(`http://localhost:8005/user-service/v1/themes/${Userid}/${themeId}`);
      } catch (error) {
        console.error("Error applying theme:", error);
      } finally {
        setLoading(false);
        refreshTheme(Userid);
      }
    }
  }, [themes, Userid, refreshTheme]);

  const updateTheme = async (themeId) => {
    if (!themeId) {
     
      return;
    }

    const updatedTheme = {
      id: themeId,
      name: newThemeName || `Theme ${themeId}`,
      primary: false,
      themeJson: {
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: themeColors.primary },
          secondary: { main: themeColors.secondary },
          error: { main: themeColors.error },
          warning: { main: themeColors.warning },
          info: { main: themeColors.info },
          success: { main: themeColors.success },
          background: {
            default: darkMode ? "#303030" : "#ffffff",
            paper: darkMode ? "#424242" : "#f5f5f5",
          },
        },
        typography: {
          fontFamily: fontSettings.fontFamily,
          fontSize: fontSettings.fontSize,
          fontWeightLight: fontSettings.fontWeightLight,
          fontWeightRegular: fontSettings.fontWeightRegular,
          fontWeightMedium: fontSettings.fontWeightMedium,
          fontWeightBold: fontSettings.fontWeightBold,
        },
      },
    };

    setLoading(true);
    try {
      console.log("Updating theme with payload:", updatedTheme); // Debugging

      const response = await axios.put(
        `http://localhost:8005/user-service/v1/themes/${themeId}`,
        updatedTheme
      );

      console.log("Update response:", response); // Debugging

      // Update the local state with the new theme data
      setThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === themeId ? { ...theme, ...updatedTheme } : theme
        )
      );
      handleDialogClose();
     
    } catch (error) {
      console.error("Error updating theme:", error);
     
    } finally {
      setLoading(false);
    }
  };

  const resetToDefault = () => {
    setThemeColors(defaultColors);
    setFontSettings(defaultFontSettings);
    setDarkMode(false);
  };

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8005/user-service/v1/themes/${Userid}`,
          {
            params: {
              page: page,
              size: rowsPerPage,
            },
          }
        );
        setThemes(response.data.content || []);
        setTotalThemes(response.data.totalElements || 0);
      } catch (error) {
        console.error("Error fetching themes:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchThemes();
  }, [Userid, page, rowsPerPage]); 

  const themeCard = useMemo(
    () =>
      themes.map((theme) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={theme.id} mt={2}>
          <Card
            sx={{
              backgroundColor:
                theme.themeJson?.palette?.background?.paper || "#ffffff",
              color:
                theme.themeJson?.palette?.mode === "dark"
                  ? "#ffffff"
                  : "#000000",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardHeader
              title={theme.name}
              action={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {theme.themeJson?.palette?.mode === "dark" ? (
                    <DarkModeOutlinedIcon sx={{ color: "#ffffff" }} />
                  ) : (
                    <LightModeOutlinedIcon sx={{ color: "#000000" }} />
                  )}
                  {theme && theme.primary && (
                    <Chip label="Primary" sx={{ marginLeft: 1 }} />
                  )}
                </Box>
              }
            />

            <CardContent>
              <Typography variant="body1">
                Font Family:{" "}
                {theme.themeJson?.typography?.fontFamily ||
                  defaultFontSettings.fontFamily}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  marginTop: 1,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor:
                      theme.themeJson?.palette?.primary?.main ||
                      defaultColors.primary,
                    marginRight: 1,
                  }}
                >
                  Primary
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor:
                      theme.themeJson?.palette?.secondary?.main ||
                      defaultColors.secondary,
                    marginRight: 1,
                  }}
                >
                  Secondary
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor:
                      theme.themeJson?.palette?.info?.main ||
                      defaultColors.info,
                    marginRight: 1,
                  }}
                >
                  Info
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor:
                      theme.themeJson?.palette?.warning?.main ||
                      defaultColors.warning,
                    marginRight: 1,
                  }}
                >
                  Warning
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor:
                      theme.themeJson?.palette?.error?.main ||
                      defaultColors.error,
                    marginRight: 1,
                  }}
                >
                  Error
                </Button>
              </Box>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 1,
              }}
            >
              <Button
                aria-label="Apply theme"
                variant="contained"
                startIcon={<TryOutlinedIcon />}
                onClick={() => applyTheme(theme.id)}
              >
                Apply
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<UpdateIcon />}
                onClick={() => handleDialogOpen(true, theme)} // Pass the entire theme object
                sx={{ marginLeft: 1 }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={() => handleDelete(theme.id)}
                sx={{ marginLeft: 1 }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )),
    [themes, applyTheme, handleDialogOpen, handleDelete]
  );

  return (
    <Box>
      <CssBaseline />
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">
          Material-UI Theme Generator
        </Typography>
      </Box>
      <Box textAlign="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDialogOpen(false)}
        >
          Create New Theme
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {themeCard}
          </Grid>
          <TablePagination
            component="div"
            count={totalThemes}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {isEditing ? "Edit Theme" : "Create New Theme"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Theme Name"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Primary Color</InputLabel>
                <SketchPicker
                  color={themeColors.primary}
                  onChange={(color) => handleColorChange("primary", color)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Secondary Color</InputLabel>
                <SketchPicker
                  color={themeColors.secondary}
                  onChange={(color) => handleColorChange("secondary", color)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Error Color</InputLabel>
                <SketchPicker
                  color={themeColors.error}
                  onChange={(color) => handleColorChange("error", color)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Warning Color</InputLabel>
                <SketchPicker
                  color={themeColors.warning}
                  onChange={(color) => handleColorChange("warning", color)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Info Color</InputLabel>
                <SketchPicker
                  color={themeColors.info}
                  onChange={(color) => handleColorChange("info", color)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Success Color</InputLabel>
                <SketchPicker
                  color={themeColors.success}
                  onChange={(color) => handleColorChange("success", color)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Font Family</InputLabel>
                <Select
                  value={fontSettings.fontFamily}
                  onChange={(e) =>
                    handleFontSettingChange("fontFamily", e.target.value)
                  }
                >
                  <MenuItem value="Roboto, sans-serif">Roboto</MenuItem>
                  <MenuItem value="Arial, sans-serif">Arial</MenuItem>
                  <MenuItem value="Helvetica, sans-serif">Helvetica</MenuItem>
                  <MenuItem value="Courier New, monospace">
                    Courier New
                  </MenuItem>
                  <MenuItem value="Georgia, serif">Georgia</MenuItem>
                </Select>
              </FormControl>
              <Typography mt={2}>
                Selected Font Family: {fontSettings.fontFamily}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Font Size"
                type="number"
                value={fontSettings.fontSize}
                onChange={(e) =>
                  handleFontSettingChange("fontSize", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Light Weight"
                type="number"
                value={fontSettings.fontWeightLight}
                onChange={(e) =>
                  handleFontSettingChange("fontWeightLight", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Regular Weight"
                type="number"
                value={fontSettings.fontWeightRegular}
                onChange={(e) =>
                  handleFontSettingChange("fontWeightRegular", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Medium Weight"
                type="number"
                value={fontSettings.fontWeightMedium}
                onChange={(e) =>
                  handleFontSettingChange("fontWeightMedium", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Bold Weight"
                type="number"
                value={fontSettings.fontWeightBold}
                onChange={(e) =>
                  handleFontSettingChange("fontWeightBold", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
                <LightModeOutlinedIcon />
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  color="primary"
                  name="darkMode"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                />
                <DarkModeOutlinedIcon />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={
              isEditing ? () => updateTheme(currentThemeId) : saveAsNewTheme
            }
            color="primary"
            variant="contained"
            startIcon={isEditing ? <UpdateIcon /> : <SaveAsIcon />}
          >
            {isEditing ? "Update Theme" : "Save As New Theme"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaterialUIThemeGenerator;
