import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Typography,
  TextField,
  IconButton,
  Chip,
  Skeleton,
  Tooltip,
  Button,
} from "@mui/material";
import {
  AddShoppingCart,
  Remove,
  Add,
  Discount as DiscountIcon,
  WorkspacePremium,
  Info as InfoIcon,
} from "@mui/icons-material";
import axiosInstance from "api/axiosInstance";
import useSnackbar from "hooks/useSnackbar";

// Utility function to convert centimeters to feet
const cmToFeet = (cm) => (cm / 30.48).toFixed(2);

// Utility function to calculate final price after discount
const calculateFinalPrice = (item, unit = "cm") => {
  let areaInSqFt;

  if (unit === "cm") {
    areaInSqFt = (item.width / 30.48) * (item.length / 30.48); // Corrected the "length" typo
  } else if (unit === "ft") {
    areaInSqFt = item.width * item.length;
  }

  const totalPrice = item.price * areaInSqFt * item.quantity;
  const discountedPrice = totalPrice - (totalPrice * item.discount) / 100;
  return discountedPrice.toFixed(2);
};

function BasicProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { SnackbarComponent, showSnackbar } = useSnackbar();

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/product-service/v1/products");
      setProducts(response.data); // Replace with API response when ready
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      showSnackbar("Error fetching products", "error");
      setTimeout(() => {
        setProducts([
          {
            id: 1,
            name: "Gold Brown Floor Tile",
            quantity: 2,
            price: 650, // Price in INR per sq.ft
            description: "A beautiful gold-brown floor tile perfect for any room.",
            imageUrl:
              "https://images.pexels.com/photos/3059489/pexels-photo-3059489.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Flooring",
            discount: 10,
            width: 30, // in cm
            height: 30, // in cm
            length: 30, // in cm
            weight: "1.5kg",
            color: "Gold Brown",
            secondaryColor: "Beige",
            pattern: "Polished",
            origin: "India",
            manufacturer: {
              name: "Elegant Tiles Ltd.",
              factoryLocation: "Morbi, Gujarat",
            },
            premium: true,
            unit: "cm",
            polishedType: "Machine", // machine or manual
          },
          {
            id: 2,
            name: "Green Ocean Kitchen Top",
            quantity: 1,
            price: 850, // Price in INR per sq.ft
            description: "A stunning green ocean-colored kitchen top for modern kitchens.",
            imageUrl:
              "https://images.pexels.com/photos/4705833/pexels-photo-4705833.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Kitchen",
            discount: 15,
            width: 150, // in cm
            height: 2, // in cm
            length: 150, // in cm
            weight: "25kg",
            color: "Green Ocean",
            secondaryColor: "Teal",
            pattern: "Matte Finish",
            origin: "Brazil",
            manufacturer: {
              name: "Premium Surfaces Inc.",
              factoryLocation: "Rio de Janeiro, Brazil",
            },
            premium: false,
            unit: "cm",
            polishedType: "Manual", // machine or manual
          },
          {
            id: 3,
            name: "Deep Ocean Kitchen Top",
            quantity: 3,
            price: 500, // Price in INR per sq.ft
            description: "A deep ocean blue kitchen top to complement any decor.",
            imageUrl:
              "https://images.pexels.com/photos/3609832/pexels-photo-3609832.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Kitchen",
            discount: 5,
            width: 150, // in cm
            height: 2, // in cm
            length: 150, // in cm
            weight: "23kg",
            color: "Deep Ocean",
            secondaryColor: "Navy Blue",
            pattern: "Glossy",
            origin: "Italy",
            manufacturer: {
              name: "Italian Stoneworks",
              factoryLocation: "Carrara, Italy",
            },
            premium: false,
            unit: "cm",
            polishedType: "Machine", // machine or manual
          },
          {
            id: 4,
            name: "Sky Red Tile",
            quantity: 3,
            price: 500, // Price in INR per sq.ft
            description: "A vibrant red tile for bold design choices.",
            imageUrl:
              "https://images.pexels.com/photos/7718458/pexels-photo-7718458.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Tiles",
            discount: 20,
            width: 30, // in cm
            height: 30, // in cm
            length: 30, // in cm
            weight: "1.3kg",
            color: "Sky Red",
            secondaryColor: "Pink",
            pattern: "Textured",
            origin: "China",
            manufacturer: {
              name: "Dragon Ceramics Co.",
              factoryLocation: "Foshan, China",
            },
            premium: false,
            unit: "cm",
            polishedType: "Manual", // machine or manual
          },
          {
            id: 5,
            name: "Midnight Black Marble",
            quantity: 4,
            price: 400, // Price in INR per sq.ft
            description: "A luxurious black marble for premium interiors.",
            imageUrl:
              "https://images.pexels.com/photos/6634140/pexels-photo-6634140.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Marble",
            discount: 12,
            width: 60, // in cm
            height: 2, // in cm
            length: 60, // in cm
            weight: "30kg",
            color: "Midnight Black",
            secondaryColor: "Charcoal",
            pattern: "Veined",
            origin: "Spain",
            manufacturer: {
              name: "Royal Marble Ltd.",
              factoryLocation: "Valencia, Spain",
            },
            premium: true,
            unit: "cm",
            polishedType: "Machine", // machine or manual
          },
          {
            id: 6,
            name: "Sunset Yellow Granite",
            quantity: 2,
            price: 600, // Price in INR per sq.ft
            description: "A bright yellow granite for vibrant designs.",
            imageUrl:
              "https://images.pexels.com/photos/4705842/pexels-photo-4705842.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Granite",
            discount: 8,
            width: 100, // in cm
            height: 3, // in cm
            length: 100, // in cm
            weight: "45kg",
            color: "Sunset Yellow",
            secondaryColor: "Golden",
            pattern: "Flamed",
            origin: "South Africa",
            manufacturer: {
              name: "African Granite Works",
              factoryLocation: "Cape Town, South Africa",
            },
            premium: false,
            unit: "cm",
            polishedType: "Machine", // machine or manual
          },
          {
            id: 7,
            name: "Arctic White Quartz",
            quantity: 1,
            price: 1400, // Price in INR per sq.ft
            description: "A pristine white quartz for modern aesthetics.",
            imageUrl:
              "https://images.pexels.com/photos/4744795/pexels-photo-4744795.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Quartz",
            discount: 18,
            width: 200, // in cm
            height: 2.5, // in cm
            length: 200, // in cm
            weight: "50kg",
            color: "Arctic White",
            secondaryColor: "Ivory",
            pattern: "Smooth",
            origin: "Canada",
            manufacturer: {
              name: "Northern Stones",
              factoryLocation: "Ontario, Canada",
            },
            premium: true,
            unit: "cm",
            polishedType: "Machine", // machine or manual
          },
          {
            id: 8,
            name: "Lavender Blue Slate",
            quantity: 5,
            price: 700, // Price in INR per sq.ft
            description: "A unique blue slate with a touch of lavender.",
            imageUrl:
              "https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Slate",
            discount: 25,
            width: 30, // in cm
            height: 30, // in cm
            length: 30, // in cm
            weight: "1.2kg",
            color: "Lavender Blue",
            secondaryColor: "Slate Gray",
            pattern: "Natural Cleaved",
            origin: "Wales",
            manufacturer: {
              name: "Welsh Slate Ltd.",
              factoryLocation: "Snowdonia, Wales",
            },
            premium: false,
            unit: "cm",
            polishedType: "Manual", // machine or manual
          },
        ]);        
        setLoading(false);
      }, 100);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleIncreaseItem = useCallback((index) => {
    setProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index].quantity += 1;
      return updatedProducts;
    });
  }, []);

  const handleDecreaseItem = useCallback((index) => {
    setProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index].quantity = Math.max(
        updatedProducts[index].quantity - 1,
        1
      );
      return updatedProducts;
    });
  }, []);

  const handleDimensionChange = useCallback((index, field, value) => {
    setProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index][field] = value;
      return updatedProducts;
    });
  }, []);

  const renderProducts = useMemo(() => {
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
          </Card>
        </Grid>
      ));
    }

    if (!Array.isArray(products) || products.length === 0) {
      return (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
          No products available.
        </Typography>
      );
    }

    return products.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={item.id} mt={4}>
        <Card sx={{ mb: 2, position: "relative" }}>
          <CardMedia
            component="img"
            height="200"
            image={item.imageUrl}
            alt={item.name}
            sx={{ objectFit: "cover" }}
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
          {item.premium && (
            <Chip
              label="Premium"
              color="primary"
              icon={<WorkspacePremium />}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                fontWeight: "bold",
              }}
            />
          )}
          <CardContent sx={{ position: "relative" }}>
            <Tooltip title="Click to view product details and measurement guidelines">
              <IconButton
                aria-label="Information"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <InfoIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Typography color="primary" variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Category: {item.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Origin: {item.origin}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total aviable Quatiry: {item.weight}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Manufacturer: {item.manufacturer.name},{" "}
              {item.manufacturer.factoryLocation}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pattern: {item.pattern}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PolishedType: {item.polishedType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Primary Color: {item.color}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secondary Color: {item.secondaryColor}
            </Typography>
            <Typography variant="body2" mt={1}>
              Price per sq.ft: ₹{item.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dimensions:{" "}
              {item.unit === "cm" ? (
                <>
                  {cmToFeet(item.width)}ft x {cmToFeet(item.length)}ft
                </>
              ) : (
                <>
                  {item.width}ft x {item.length}ft
                </>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              thicknes: {item.thickness}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weight: {item.weight}
            </Typography>
            <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>
              Your Price: ₹{calculateFinalPrice(item, item.unit)}
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="Decrease quantity">
              <IconButton
                aria-label="decrease item quantity"
                onClick={() => handleDecreaseItem(index)}
              >
                <Remove color="info" />
              </IconButton>
            </Tooltip>

            <TextField
              variant="outlined"
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleDimensionChange(
                  index,
                  "quantity",
                  Math.max(Number(e.target.value), 1)
                )
              }
              inputProps={{ min: 1 }}
              sx={{ width: 60, textAlign: "center" }}
            />

            <Tooltip title="Increase quantity">
              <IconButton
                aria-label="increase item quantity"
                onClick={() => handleIncreaseItem(index)}
              >
                <Add color="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={`This is the width of the product in ${
                item.unit === "cm" ? "centimeters" : "feet"
              }`}
            >
              <TextField
                variant="outlined"
                type="number"
                label={item.unit === "cm" ? "Width (cm)" : "Width (ft)"}
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
            </Tooltip>

            <Tooltip
              title={`This is the length of the product in ${
                item.unit === "cm" ? "centimeters" : "feet"
              }`}
            >
              <TextField
                variant="outlined"
                type="number"
                label={item.unit === "cm" ? "Length (cm)" : "Length (ft)"}
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
            </Tooltip>

            <Tooltip title="Add to Cart">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCart />}
                onClick={() => console.log("Added to cart")}
              >
                Add To Cart
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </Grid>
    ));
  }, [
    loading,
    products,
    handleIncreaseItem,
    handleDecreaseItem,
    handleDimensionChange,
  ]);

  return (
    <Box m={1}>
      {SnackbarComponent}
      <Grid container spacing={2}>
        {renderProducts}
      </Grid>
    </Box>
  );
}

export default BasicProducts;
