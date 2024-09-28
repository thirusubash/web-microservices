import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Category,
  LocalOffer,
  ShoppingCart,
  ChatBubbleRounded,
  NewReleases,
  LocalShipping,
} from "@mui/icons-material";

// Memoized Quick Links Component
const QuickLinks = React.memo(() => {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      aria-label="Quick Links"
      role="navigation"
      sx={{
        display: { xs: "none", md: "block" },
        width: 250,
        position: "sticky",
        top: 20,
        height: "calc(100vh - 40px)",
        mr: 2,
        bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[900] : "inherit",
        borderRadius: 2,
        p: 2,
        boxShadow: theme.shadows[4],
        color: theme.palette.mode === "dark" ? theme.palette.grey[100] : "inherit",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[8],
          transform: "scale(1.02)",
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Quick Links
      </Typography>
      <Button
        variant="text"
        startIcon={<Category />}
        sx={{ justifyContent: "flex-start", width: "100%" }}
        aria-label="Browse Categories"
        onClick={() => window.location.href = "/categories"}
      >
        Browse Categories
      </Button>
      <Button
        variant="text"
        startIcon={<LocalOffer />}
        sx={{ justifyContent: "flex-start", width: "100%", mt: 1 }}
        aria-label="View Promotions"
        onClick={() => window.location.href = "/promotions"}
      >
        View Promotions
      </Button>
      <Button
        variant="text"
        startIcon={<ShoppingCart />}
        sx={{ justifyContent: "flex-start", width: "100%", mt: 1 }}
        aria-label="My Cart"
        onClick={() => window.location.href = "/cart"}
      >
        My Cart
      </Button>
      <Button
        variant="text"
        startIcon={<ChatBubbleRounded />}
        sx={{ justifyContent: "flex-start", width: "100%", mt: 1 }}
        aria-label="Contact Us"
        onClick={() => window.location.href = "/contactus"}
      >
        Contact Us
      </Button>
    </Box>
  );
});

// Memoized Offers and Updates Component
const OffersAndUpdates = React.memo(() => {
  const theme = useTheme();

  return (
    <Box
      component="aside"
      aria-label="Offers & Updates"
      sx={{
        display: { xs: "none", md: "block" },
        width: 250,
        position: "sticky",
        top: 20,
        height: "calc(100vh - 40px)",
        ml: 2,
        bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[900] : "inherit",
        borderRadius: 2,
        p: 2,
        boxShadow: theme.shadows[4],
        color: theme.palette.mode === "dark" ? theme.palette.grey[100] : "inherit",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[8],
          transform: "scale(1.02)",
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Offers & Updates
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        <ListItem sx={{ mb: 2 }}>
          <ListItemIcon aria-label="Special Discount">
            <LocalOffer color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary="Special Discount"
            secondary="Get 10% off on your next purchase."
          />
        </ListItem>

        <ListItem sx={{ mb: 2 }}>
          <ListItemIcon aria-label="New Arrivals">
            <NewReleases color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="New Arrivals"
            secondary="Check out our latest marble collections."
          />
        </ListItem>

        <ListItem sx={{ mb: 2 }}>
          <ListItemIcon aria-label="Free Shipping">
            <LocalShipping color="success" />
          </ListItemIcon>
          <ListItemText
            primary="Free Shipping"
            secondary="Enjoy free shipping on orders above ₹8,00,000."
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        aria-label="View All Offers"
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: theme.shadows[6],
            transform: "scale(1.05)",
          },
        }}
        onClick={() => window.location.href = "/offers"}
      >
        View All Offers
      </Button>
    </Box>
  );
});

export { QuickLinks, OffersAndUpdates };
