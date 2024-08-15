import React, { useState, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  Divider,
  ListItemIcon,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import {
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  Notifications as NotificationsIcon,
  Logout,
  AccountCircle,
  Menu as MenuIcon,
  PaletteOutlined,
} from "@mui/icons-material";
import logo from "assets/icons/gksvp.png";
import AnimatedLogo from "./AnimatedLogo";

const buttonData = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Careers", path: "/careers" },
  { label: "About", path: "/about" },
  { label: "Contact Us", path: "/contactus" },
];

function Header() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (event) => {
      if (isAuthenticated) {
        setAnchorEl(event.currentTarget);
      } else {
        navigate("/signin");
      }
    },
    [isAuthenticated, navigate]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const goToCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [dispatch, navigate]);

  const memoizedButtonData = useMemo(() => buttonData, []);

  const toggleDrawer = useCallback(
    (open) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    },
    []
  );

  const DrawerList = useCallback(
    () => (
      <Box
        sx={{ width: 220 }}
        role="navigation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {memoizedButtonData.map((x) => (
            <ListItem key={x.label} component={Link} to={x.path} disableGutters>
              <ListItemButton>
                <ListItemText
                  primary={x.label}
                  primaryTypographyProps={{ color: "primary" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {!isAuthenticated && !user && (
            <ListItem component={Link} to="/register" disableGutters>
              <ListItemButton>
                <ListItemText
                  primary="Register"
                  primaryTypographyProps={{ color: "primary" }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    ),
    [memoizedButtonData, isAuthenticated, user, toggleDrawer]
  );

  return (
    <>
      <AppBar color="default">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              edge="start"
              aria-label="Go to homepage"
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: {
                  xs: "40px", // mobile
                  sm: "50px", // small tablets
                  md: "80px", // desktop
                },
                height: {
                  xs: "40px",
                  sm: "50px",
                  md: "80px",
                },
                p: 0,
                "& img": {
                  width: "100%", // Ensure image fills the button
                  height: "auto", // Maintain aspect ratio
                },
              }}
            >
              <img src={logo} alt="Gk Groups Pvt Ltd logo" />
            </IconButton>
            <AnimatedLogo />
          </Box>
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
              flexWrap: "nowrap",
              overflowX: "auto",
              py: 1,
            }}
            role="navigation"
          >
            {memoizedButtonData.map((x) => (
              <Button
                key={x.label}
                component={Link}
                to={x.path}
                variant="text"
                sx={{
                  borderRadius: 60,
                  color: "primary.light",
                  fontSize: "0.850rem",
                  padding: "0.5rem 1rem",
                  mx: 0.5,
                  transition: "all 0.3s ease", // Smooth transition for hover effects
                  "&:hover": {
                    backgroundColor: "primary.light", // Change background color on hover
                    color: "background.paper", // Change text color on hover
                    transform: "scale(1.05)", // Slightly enlarge the button on hover
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for depth
                  },
                  "@media (max-width: 600px)": {
                    fontSize: "1rem",
                    padding: "0.375rem 0.75rem",
                  },
                  "@media (max-width: 475px)": {
                    fontSize: "0.5rem",
                    padding: "0.25rem 0.5rem",
                  },
                }}
                aria-label={x.label}
              >
                {x.label}
              </Button>
            ))}

            {!isAuthenticated && !user && (
              <Button
                component={Link}
                to="/register"
                variant="text"
                color="primary"
                sx={{
                  borderRadius: 60,
                  color: "primary.light",
                  fontSize: "0.850rem",
                  padding: "0.5rem 1rem",
                  mx: 0.5,
                  transition: "all 0.3s ease", // Smooth transition for hover effects
                  "&:hover": {
                    backgroundColor: "primary.light", // Change background color on hover
                    color: "background.paper", // Change text color on hover
                    transform: "scale(1.05)", // Slightly enlarge the button on hover
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for depth
                  },
                  "@media (max-width: 600px)": {
                    fontSize: "1rem",
                    padding: "0.375rem 0.75rem",
                  },
                  "@media (max-width: 475px)": {
                    fontSize: "0.5rem",
                    padding: "0.25rem 0.5rem",
                  },
                }}
                aria-label="Register"
              >
                Register
              </Button>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="View Cart" arrow>
              <IconButton
                size="large"
                aria-label="View Cart"
                onClick={goToCart}
              >
                <Badge badgeContent={1} color="error">
                  <ShoppingCartCheckoutIcon color="primary" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="View Notifications" arrow>
              <IconButton size="large" aria-label="View Notifications">
                <Badge badgeContent={1} color="error">
                  <NotificationsIcon color="primary" />
                </Badge>
              </IconButton>
            </Tooltip>

            {isAuthenticated && user && (
              <Typography color="text.primary" sx={{ mx: 1 }}>
                {user.firstName}
              </Typography>
            )}

            <Tooltip title="Account of current user" arrow>
              <IconButton
                size="large"
                edge="end"
                aria-haspopup="true"
                onClick={handleClick}
                aria-label="Account menu"
                aria-controls="primary-search-account-menu"
                color="secondary"
              >
                {isAuthenticated && user && user.url ? (
                  <Avatar alt={user.username} src={user.url} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Navigate to themes page" arrow>
              <IconButton
                aria-label="Navigate to themes page"
                onClick={() => navigate("/themes")}
                color="primary"
              >
                <PaletteOutlined />
              </IconButton>
            </Tooltip>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="Menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <DrawerList />
              </SwipeableDrawer>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "account-menu-button",
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Profile</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Header;
