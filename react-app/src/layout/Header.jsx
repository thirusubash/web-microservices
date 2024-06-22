import React, { useState, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
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
} from "@mui/material";
import {
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  Notifications as NotificationsIcon,
  Settings,
  Logout,
  AccountCircle,
  Menu as MenuIcon,
  OpenInNew,
} from "@mui/icons-material";
import logo from "assets/icons/gksvp.png";

const buttonData = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Job", path: "/job" },
  { label: "Careers", path: "/careers" },
  { label: "About", path: "/about" },
  { label: "Register", path: "/register" },
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

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const DrawerList = () => {
    const handleDrawerClose = () => {
      setDrawerOpen(false);
    };
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {memoizedButtonData.map((x) => (
            <ListItem
              key={x.label}
              component={Link}
              to={x.path}
              disableGutters
              sx={{ paddingLeft: 2 }}
              divider
            >
              <ListItemButton>
                <OpenInNew color="error" />
                <ListItemText
                  primary={x.label}
                  primaryTypographyProps={{ color: "primary" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <AppBar
      color="inherit"
      position="relative"
      sx={{ borderBottom: 1, borderColor: "#00695f" }}
    >
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
            size="large"
            edge="start"
            aria-label="open drawer"
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            <img width="80px" src={logo} alt="www.gksvp.com" />
          </IconButton>
          <Typography
            className="logo-text"
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
              backgroundImage:
                "linear-gradient(195deg, red, rgb(30, 129, 5), rgb(168, 179, 22))",
              WebkitBackgroundClip: "text",
              MozBackgroundClip: "text",
              backgroundClip: "text",
              MozTextFillColor: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            www.gksvp.com
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {memoizedButtonData.map((x) => (
            <Button
              key={x.label}
              component={Link}
              to={x.path}
              variant="text"
              sx={{
                color: "primary.light",
                fontSize: "12px",
                padding: "4px 8px",
                mx: 0.5,
                "@media (max-width: 600px)": {
                  fontSize: "10px",
                  padding: "3px 6px",
                },
                "@media (max-width: 475px)": {
                  fontSize: "8px",
                  padding: "2px 4px",
                },
              }}
            >
              {x.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            onClick={goToCart}
          >
            <Badge badgeContent={1} color="error">
              <ShoppingCartCheckoutIcon color="primary" />
            </Badge>
          </IconButton>
          <IconButton size="large" aria-label="show 17 new notifications">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon color="primary" />
            </Badge>
          </IconButton>
          {isAuthenticated && user && (
            <Typography color="text.primary" sx={{ mx: 1 }}>
              {user.firstName}
            </Typography>
          )}
          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            onClick={handleClick}
            title="User Profile" // Example of a descriptive title
          >
            {isAuthenticated && user && user.url ? (
              <Avatar alt={user.username} src={user.url} />
            ) : (
              <Avatar>
                <AssignmentIndIcon />
              </Avatar>
            )}
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
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
      </Toolbar>
      {isAuthenticated && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              navigate("/profile");
            }}
          >
            <AccountCircle color="info" />
            <Typography color="text.primary">Profile</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/settings");
            }}
          >
            <Settings fontSize="small" color="info" />{" "}
            <Typography color="text.primary">Account</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error.dark">Log Out</Typography>
          </MenuItem>
        </Menu>
      )}
    </AppBar>
  );
}

export default React.memo(Header);
