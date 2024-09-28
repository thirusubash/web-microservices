import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { useSelector } from "react-redux";

const Notification = ({ anchorEl, setAnchorEl }) => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const theme = useTheme();
  const open = Boolean(anchorEl);

  let user = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
  };

  const defaultNotifications = [
    {
      id: 1,
      type: "success",
      message: "Your order has been placed successfully!",
      icon: <CheckCircleIcon color="success" />,
    },
    {
      id: 2,
      type: "info",
      message: "Special 20% discount on all products this weekend!",
      icon: <LocalOfferIcon color="primary" />,
    },
    {
      id: 3,
      type: "success",
      message: "Your order is out for delivery.",
      icon: <DeliveryDiningIcon color="action" />,
    },
    {
      id: 4,
      type: "warning",
      message: "Your payment method is about to expire.",
      icon: <WarningIcon color="warning" />,
    },
    {
      id: 5,
      type: "error",
      message: "There was an issue with your recent transaction.",
      icon: <ErrorIcon color="error" />,
    },
  ];

  useEffect(() => {
    axios
      .get(`/api/notifications/${user.id}`)
      .then((response) => {
        setNotifications(response.data.notifications);
      })
      .catch(() => {
        setNotifications(defaultNotifications);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.id]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="notification-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 3,
        sx: {
          overflow: "visible",
          mt: 1.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {loading ? (
        <MenuItem disabled>
          <CircularProgress size={24} />
          <Typography sx={{ ml: 2 }}>Loading notifications...</Typography>
        </MenuItem>
      ) : (
        notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleClose}>
            <ListItemIcon>
              {notification.type === "success" && (
                <CheckCircleIcon color="success" />
              )}
              {notification.type === "info" && (
                <LocalOfferIcon color="primary" />
              )}
              {notification.type === "success" && (
                <DeliveryDiningIcon color="action" />
              )}
              {notification.type === "warning" && (
                <WarningIcon color="warning" />
              )}
              {notification.type === "error" && <ErrorIcon color="error" />}
            </ListItemIcon>
            <ListItemText
              primary={notification.message}
              primaryTypographyProps={{
                sx: {
                  color: theme.palette.text.primary,
                },
              }}
            />
          </MenuItem>
        ))
      )}
      {!loading && notifications.length === 0 && (
        <MenuItem disabled>
          <Typography variant="body2" color="textSecondary">
            No new notifications
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );
};

export default Notification;
