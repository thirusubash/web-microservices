import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Skeleton,
  TextField,
  Grid,
  CardMedia,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DiscountIcon from "@mui/icons-material/Discount";

const cmToFeet = (cm) => (cm * 0.0328084).toFixed(2); // Convert cm to feet

const CartManager = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Simulate fetching cart items
    setTimeout(() => {
      setCartItems([
        {
          id: 1,
          name: "Gold Brown Floor Tile",
          quantity: 2,
          price: 800, // Price in INR per sq.ft
          description:
            "A beautiful gold-brown floor tile perfect for any room.",
          imageUrl: "https://via.placeholder.com/150",
          category: "Flooring",
          discount: 10,
          width: 30, // in cm
          height: 30, // in cm
          length: 30, // in cm
          weight: "1.5kg",
          color: "Gold Brown",
        },
        {
          id: 2,
          name: "Green Ocean Kitchen Top",
          quantity: 1,
          price: 1500, // Price in INR per sq.ft
          description:
            "A stunning green ocean-colored kitchen top for modern kitchens.",
          imageUrl: "https://via.placeholder.com/150",
          category: "Kitchen",
          discount: 15,
          width: 150, // in cm
          height: 2, // in cm
          length: 150, // in cm
          weight: "25kg",
          color: "Green Ocean",
        },
        {
          id: 3,
          name: "Deep Ocean Kitchen Top",
          quantity: 3,
          price: 500, // Price in INR per sq.ft
          description: "A deep ocean blue kitchen top to complement any decor.",
          imageUrl: "https://via.placeholder.com/150",
          category: "Kitchen",
          discount: 5,
          width: 150, // in cm
          height: 2, // in cm
          length: 150, // in cm
          weight: "23kg",
          color: "Deep Ocean",
        },
        {
          id: 4,
          name: "Sky Red Tile",
          quantity: 3,
          price: 500, // Price in INR per sq.ft
          description: "A vibrant red tile for bold design choices.",
          imageUrl: "https://via.placeholder.com/150",
          category: "Tiles",
          discount: 20,
          width: 30, // in cm
          height: 30, // in cm
          length: 30, // in cm
          weight: "1.3kg",
          color: "Sky Red",
        },
      ]);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  const handleIncreaseItem = useCallback(
    (index) => {
      const updatedItem = {
        ...cartItems[index],
        quantity: cartItems[index].quantity + 1,
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = updatedItem;
      setCartItems(updatedCartItems);
    },
    [cartItems]
  );

  const handleDecreaseItem = useCallback(
    (index) => {
      const updatedItem = {
        ...cartItems[index],
        quantity: Math.max(cartItems[index].quantity - 1, 1),
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = updatedItem;
      setCartItems(updatedCartItems);
    },
    [cartItems]
  );

  const handleItemQuantityChange = useCallback(
    (index, value) => {
      const updatedItem = {
        ...cartItems[index],
        quantity: value,
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = updatedItem;
      setCartItems(updatedCartItems);
    },
    [cartItems]
  );

  const handleDimensionChange = useCallback(
    (index, field, value) => {
      const updatedItem = {
        ...cartItems[index],
        [field]: value,
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = updatedItem;
      setCartItems(updatedCartItems);
    },
    [cartItems]
  );

  const handleDeleteItem = useCallback(
    (index) => {
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
    },
    [cartItems]
  );

  const calculateFinalPrice = (item) => {
    const area =
      cmToFeet(item.width) * cmToFeet(item.height) * cmToFeet(item.length); // Area in square feet
    const totalPrice = item.price * area * item.quantity;
    const discountedPrice = totalPrice - (totalPrice * item.discount) / 100;
    return discountedPrice.toFixed(2);
  };

  const renderCartItems = useMemo(() => {
    if (loading) {
      return Array.from(new Array(3)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} mt={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="rectangular" width="100%" height={150} />
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="30%" height={20} />
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" width={40} height={40} />
              <Skeleton variant="rectangular" width={40} height={40} />
              <Skeleton variant="rectangular" width={40} height={40} />
              <Skeleton variant="rectangular" width={40} height={40} />
            </CardActions>
          </Card>
        </Grid>
      ));
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
          No items in the cart.
        </Typography>
      );
    }

    return cartItems.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={item.id} mt={4}>
        <Card sx={{ mb: 2, position: "relative" }}>
          <CardMedia
            component="img"
            height="150"
            image={item.imageUrl}
            alt={item.name}
          />
          {item.discount > 0 && (
            <Chip
              label={`${item.discount}% OFF`}
              color="secondary"
              icon={<DiscountIcon />}
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                fontWeight: "bold",
                backgroundColor: "#FF7043",
                color: "white",
              }}
            />
          )}
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {item.category}
            </Typography>
            <Typography variant="body2">
              Price per sq.ft: ₹{item.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dimensions: {cmToFeet(item.width)}ft x {cmToFeet(item.height)}ft x{" "}
              {cmToFeet(item.length)}ft
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weight: {item.weight}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Color: {item.color}
            </Typography>
            <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>
              Your Price: ₹{calculateFinalPrice(item)}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              aria-label="decrease item quantity"
              onClick={() => handleDecreaseItem(index)}
            >
              <RemoveIcon color="info" />
            </IconButton>
            <TextField
              variant="outlined"
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemQuantityChange(
                  index,
                  Math.max(Number(e.target.value), 1)
                )
              }
              inputProps={{ min: 1 }}
              sx={{ width: 60, textAlign: "center" }}
            />
            <IconButton
              aria-label="increase item quantity"
              onClick={() => handleIncreaseItem(index)}
            >
              <AddIcon color="primary" />
            </IconButton>
            <TextField
              variant="outlined"
              type="number"
              label="Width (cm)"
              value={item.width}
              onChange={(e) =>
                handleDimensionChange(
                  index,
                  "width",
                  Math.max(Number(e.target.value), 1)
                )
              }
              inputProps={{ min: 1 }}
              sx={{ width: 80, textAlign: "center", ml: 2 }}
            />
            <TextField
              variant="outlined"
              type="number"
              label="Height (cm)"
              value={item.height}
              onChange={(e) =>
                handleDimensionChange(
                  index,
                  "height",
                  Math.max(Number(e.target.value), 1)
                )
              }
              inputProps={{ min: 1 }}
              sx={{ width: 80, textAlign: "center", ml: 2 }}
            />
            <TextField
              variant="outlined"
              type="number"
              label="Length (cm)"
              value={item.length}
              onChange={(e) =>
                handleDimensionChange(
                  index,
                  "length",
                  Math.max(Number(e.target.value), 1)
                )
              }
              inputProps={{ min: 1 }}
              sx={{ width: 80, textAlign: "center", ml: 2 }}
            />
            <IconButton
              aria-label="delete item"
              onClick={() => handleDeleteItem(index)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    ));
  }, [
    loading,
    cartItems,
    handleIncreaseItem,
    handleDecreaseItem,
    handleItemQuantityChange,
    handleDimensionChange,
    handleDeleteItem,
  ]);

  return (
    <Box>
      <Grid container spacing={2}>
        {renderCartItems}
      </Grid>
    </Box>
  );
};

export default CartManager;
