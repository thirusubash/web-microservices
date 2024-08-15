import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Tooltip,
  Dialog,
  DialogContent,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import TryOutlinedIcon from "@mui/icons-material/TryOutlined";
import { useTheme } from "context/ThemeContext";
import { RestoreSharp } from "@mui/icons-material";
import { useSelector } from "react-redux";

// Lazy load the theme generator component
const MaterialUIThemeGenerator = lazy(() =>
  import("./MaterialUIThemeGenerator")
);

// Default settings
const defaultFontSettings = {
  fontFamily: "Roboto, sans-serif",
};

const defaultColors = {
  primary: "#00A76F",
  secondary: "#8E33FF",
  error: "#FF5630",
  warning: "#FFAB00",
  info: "#00B8D9",
};

function ThemeGallery() {
  const { applyTheme, resetDefaultTheme } = useTheme();
  const [openThemeGenerator, setOpenThemeGenerator] = useState(false);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    // Import themes dynamically and set state
    const loadThemes = async () => {
      const themeModule = await import("./defaultThemes");
      setThemes(themeModule.themes);
    };

    loadThemes();
  }, []);

  const handleApplyTheme = (themeJson) => {
    applyTheme(themeJson);
  };

  const handleCustomizeClick = () => {
    setOpenThemeGenerator(true);
  };

  const handleClose = () => {
    setOpenThemeGenerator(false);
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?.id);

  return (
    <Box padding={5}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Tooltip
          title="Please sign in to customize"
          aria-label="Sign in to customize"
        >
          {isAuthenticated && userId ? (
            <Button
              variant="contained"
              onClick={handleCustomizeClick}
              startIcon={<TryOutlinedIcon fontSize="small" />}
              aria-label="Customize Theme"
            >
              Personalized Themes
            </Button>
          ) : (
            <Typography variant="caption" mt={2} padding={1}>
              Enjoy limitless themes and create your own palette to match your
              space. Log in to make the theme truly yours.
            </Typography>
          )}
        </Tooltip>
        <Tooltip
          title="Reset to System Theme"
          aria-label="Reset to System Theme"
        >
          <Button
            variant="contained"
            onClick={resetDefaultTheme}
            startIcon={<RestoreSharp fontSize="small" />}
            aria-label="Reset Default Theme"
          >
            Reset Default
          </Button>
        </Tooltip>
      </Box>

      <Grid mt={2} container spacing={2}>
        {themes.map((theme) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={theme.id}>
            <Card
              sx={{
                backgroundColor:
                  theme.themeJson?.palette?.background?.paper || "#ffffff",
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardHeader
                title={theme.name}
                action={
                  theme.themeJson?.palette?.mode === "dark" ? (
                    <DarkModeOutlinedIcon sx={{ color: "#ffffff" }} />
                  ) : (
                    <LightModeOutlinedIcon sx={{ color: "#000000" }} />
                  )
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
                  variant="contained"
                  color="primary"
                  onClick={() => handleApplyTheme(theme.themeJson)}
                >
                  Apply
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for MaterialUIThemeGenerator */}
      <Dialog fullScreen open={openThemeGenerator} onClose={handleClose}>
        <DialogContent>
          <Suspense fallback={<div>Loading...</div>}>
            <MaterialUIThemeGenerator userId={userId} />
          </Suspense>
        </DialogContent>
      </Dialog>
      
    </Box>
  );
}

export default ThemeGallery;
