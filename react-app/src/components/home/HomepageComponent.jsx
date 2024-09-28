import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ShoppingCart,
  Star,
  ArrowForwardIosTwoTone,
  SupportAgentRounded,
  ChatBubbleRounded,
  PhoneAndroid,
  Call,
  WhatsApp,
} from "@mui/icons-material";
import { useSpring, useTrail, animated } from "@react-spring/web";
import GlowingCircularProgress from "utils/GlowingCircularProgress";

// Lazy load the sidebar components for better performance
// Lazy load the sidebar components
import { QuickLinks , OffersAndUpdates } from "./SideBars";
import { useNavigate } from "react-router-dom";

function HomepageComponent() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Memoized data arrays
  const memoizedCategories = useMemo(
    () => [
      {
        title: "Absolute Black Granite",
        imageUrl:
          "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description:
          "A sleek, solid black granite perfect for creating a modern, luxurious look.",
      },
      {
        title: "Alaska White Granite",
        imageUrl:
          "https://images.pexels.com/photos/3281057/pexels-photo-3281057.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description:
          "Brighten up any space with this white granite featuring subtle gray and brown speckles.",
      },
      {
        title: "Blue Pearl Granite",
        imageUrl:
          "https://images.pexels.com/photos/724925/pexels-photo-724925.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description:
          "Add a touch of luxury with shimmering blue and silver tones, ideal for countertops.",
      },
    ],
    []
  );

  const memoizedFeaturedProducts = useMemo(
    () => [
      {
        id: 1,
        name: "Premium Black Granite",
        price: 1200,
        imageUrl:
          "https://images.pexels.com/photos/26747977/pexels-photo-26747977/free-photo-of-a-modern-living-room-with-a-green-rug-and-white-walls.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Carrara White Marble",
        price: 2500,
        imageUrl:
          "https://images.pexels.com/photos/26747977/pexels-photo-26747977/free-photo-of-a-modern-living-room-with-a-green-rug-and-white-walls.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 4.7,
      },
      {
        id: 3,
        name: "Starlight Quartz",
        price: 1800,
        imageUrl:
          "https://th.bing.com/th/id/OIP.qz5GiIHAAIey59TNyONeAgHaHa?w=191&h=192&c=7&r=0&o=5&pid=1.7",
        rating: 4.8,
      },
    ],
    []
  );

  const memoizedPromotions = useMemo(
    () => [
      {
        title: "Summer Sale",
        description: "Up to 30% off on selected Granite products.",
        imageUrl:
          "https://img.staticmb.com/mbcontent/images/crop/uploads/2023/9/marble-vs-granite-in-interiors_0_1200.jpg",
      },
      {
        title: "New Arrivals",
        description: "Check out the latest trends in Marble and Quartz.",
        imageUrl:
          "https://i.pinimg.com/736x/37/7b/d3/377bd3b3f28428156810f9bd08ab2f4a.jpg",
      },
    ],
    []
  );

  // Animations
  const heroSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 20 },
  });

  const promotionSprings = useTrail(memoizedPromotions.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 180, friction: 20 },
  });

  const categorySprings = useTrail(memoizedCategories.length, {
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 220, friction: 15 },
  });

  const productSprings = useTrail(memoizedFeaturedProducts.length, {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 220, friction: 20 },
  });

  const [showSupportButtons, setShowSupportButtons] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setShowSupportButtons(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowSupportButtons(false);
  }, []);

  const sendSMS = () => {
    const phoneNumber = "9787048122";
    const message = "Hello, I would like to inquire about your services.";
    window.location.href = `sms:${phoneNumber}?&body=${encodeURIComponent(
      message
    )}`;
  };

  const sendWhatsappMessage = () => {
    const phoneNumber = "9787048122"; // Replace with the actual WhatsApp number
    const message = "Hello, I would like to inquire about your services.";
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <Container
      maxWidth="xxl"
      sx={{ my: 4, position: "relative", display: "flex" }}
    >
      {isDesktop && (
        <Suspense fallback={<GlowingCircularProgress />}>
          <QuickLinks />
        </Suspense>
      )}
      <Box sx={{ flex: 1 }}>
        <animated.div style={heroSpring}>
          <Paper
            component="section"
            aria-labelledby="hero-section-heading"
            sx={{
              position: "relative",
              backgroundColor: "grey.900",
              color: "#fff",
              mb: 4,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage:
                "url('https://images.pexels.com/photos/26747977/pexels-photo-26747977/free-photo-of-a-modern-living-room-with-a-green-rug-and-white-walls.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
              height: { xs: 300, sm: 350, md: 400 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.5s ease, box-shadow 0.5s ease",
              "&:hover": {
                backgroundImage:
                  "url('https://www.architectureartdesigns.com/wp-content/uploads/2017/12/17-4.jpg')",
                boxShadow: 6,
              },
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
                p: { xs: 2, md: 3 },
                borderRadius: 1,
                boxShadow: 3,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <Typography
                id="hero-section-heading"
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                  fontWeight: "bold",
                }}
              >
                Discover the Beauty of Natural Stone
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  maxWidth: { xs: "100%", md: "80%" },
                  margin: "0 auto",
                }}
              >
                Explore Premium Granite Imported from Around the World
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                endIcon={<ArrowForwardIosTwoTone />}
                size="large"
                aria-label="Start Shopping"
                onClick={() => navigate("/products")}
                sx={{
                  mt: 2,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                Start Shopping
              </Button>
            </Box>
          </Paper>
        </animated.div>

        {/* Promotional Banners */}
        <Grid container spacing={4}>
          {promotionSprings.map((style, index) => (
            <Grid item xs={12} md={6} key={index}>
              <animated.div style={style}>
                <Paper
                  sx={{
                    position: "relative",
                    backgroundColor: "grey.800",
                    color: "#fff",
                    mb: 4,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${memoizedPromotions[index].imageUrl})`,
                    height: 300,
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: theme.shadows[10],
                    },
                  }}
                  role="article"
                  aria-labelledby={`promotion-title-${index}`}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      p: 2,
                    }}
                  >
                    <Typography
                      id={`promotion-title-${index}`}
                      component="h2"
                      variant="h5"
                      color="inherit"
                      gutterBottom
                    >
                      {memoizedPromotions[index].title}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                      {memoizedPromotions[index].description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 2 }}
                      aria-label="Shop Now"
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Paper>
              </animated.div>
            </Grid>
          ))}
        </Grid>

        {/* Categories Section */}
        <Typography variant="h4" gutterBottom>
          Browse Categories
        </Typography>
        <Grid container spacing={4}>
          {categorySprings.map((style, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <animated.div style={style}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 200 }}
                    image={memoizedCategories[index].imageUrl}
                    alt={memoizedCategories[index].title}
                    loading="lazy"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {memoizedCategories[index].title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {memoizedCategories[index].description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      aria-label={`Shop ${memoizedCategories[index].title}`}
                    >
                      Shop {memoizedCategories[index].title}
                    </Button>
                  </Box>
                </Card>
              </animated.div>
            </Grid>
          ))}
        </Grid>

        {/* Featured Products */}
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {productSprings.map((style, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={memoizedFeaturedProducts[index].id}
            >
              <animated.div style={style}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 200 }}
                    image={memoizedFeaturedProducts[index].imageUrl}
                    alt={memoizedFeaturedProducts[index].name}
                    loading="lazy"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {memoizedFeaturedProducts[index].name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      ₹{memoizedFeaturedProducts[index].price.toLocaleString()}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Chip
                        icon={<Star />}
                        label={`${memoizedFeaturedProducts[index].rating} Stars`}
                        color="secondary"
                        size="small"
                      />
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        aria-label={`Add ${memoizedFeaturedProducts[index].name} to cart`}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </animated.div>
            </Grid>
          ))}
        </Grid>
        {/* Testimonials Section */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mt: 4, textAlign: "center" }}
        >
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.shadows[4],
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[8],
                },
              }}
              role="article"
              aria-labelledby="testimonial-1-title"
            >
              <Typography id="testimonial-1-title" variant="h6" gutterBottom>
                "Best Quality Granite"
              </Typography>
              <Typography variant="body2" paragraph>
                I recently purchased granite for my kitchen countertops, and I'm
                thrilled with the quality. The finish is perfect, and it has
                completely transformed my kitchen. Highly recommended!
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                  J
                </Avatar>
                <Typography variant="subtitle2">- John D.</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.shadows[4],
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[8],
                },
              }}
              role="article"
              aria-labelledby="testimonial-2-title"
            >
              <Typography id="testimonial-2-title" variant="h6" gutterBottom>
                "Excellent Service"
              </Typography>
              <Typography variant="body2" paragraph>
                The service I received was excellent. The staff were
                knowledgeable and helped me choose the right marble for my
                bathroom. The delivery was on time and hassle-free.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                  S
                </Avatar>
                <Typography variant="subtitle2">- Sarah K.</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.shadows[4],
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[8],
                },
              }}
              role="article"
              aria-labelledby="testimonial-3-title"
            >
              <Typography id="testimonial-3-title" variant="h6" gutterBottom>
                "Beautiful Quartz"
              </Typography>
              <Typography variant="body2" paragraph>
                The quartz I purchased is beautiful and adds a luxurious touch
                to my home. The color and texture are just as described. I'm
                very happy with my purchase.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                  M
                </Avatar>
                <Typography variant="subtitle2">- Michael L.</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {isDesktop && (
        <Suspense fallback={<GlowingCircularProgress />}>
          <OffersAndUpdates />
        </Suspense>
      )}
      {/* Support Agent Functionality */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Support options"
        role="complementary"
      >
        {showSupportButtons && (
          <>
            <Tooltip title="Chat with us via SMS" placement="left">
              <IconButton
                aria-label="chat"
                variant="contained"
                color="info"
                onClick={sendSMS}
                sx={{
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  boxShadow: theme.shadows[8],
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: theme.shadows[12],
                  },
                }}
              >
                <ChatBubbleRounded />
              </IconButton>
            </Tooltip>

            <Tooltip title="Call us" placement="left">
              <IconButton
                aria-label="call"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  boxShadow: theme.shadows[8],
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: theme.shadows[12],
                  },
                }}
                onClick={() => {
                  window.location.href = "tel:9787048122";
                }}
              >
                <Call />
              </IconButton>
            </Tooltip>

            <Tooltip title="Send WhatsApp message" placement="left">
              <IconButton
                aria-label="send whatsapp message"
                variant="contained"
                color="success"
                onClick={sendWhatsappMessage}
                sx={{
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  boxShadow: theme.shadows[8],
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: theme.shadows[12],
                  },
                }}
              >
                <WhatsApp />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Tooltip title="Support Agent" placement="left">
          <IconButton
            color="primary"
            sx={{
              borderRadius: "50%",
              width: 60,
              height: 60,
              boxShadow: theme.shadows[8],

              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: theme.shadows[12],
                color: theme.palette.info.main,
              },
            }}
            aria-label="Support Agent"
          >
            <SupportAgentRounded />
          </IconButton>
        </Tooltip>
      </Box>
    </Container>
  );
}

export default HomepageComponent;
