import React, { useMemo } from "react";
import { Box, Grid, Paper, Typography, Button, useTheme } from "@mui/material";
import { useTrail, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

const Promotions = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Memoized promotions data for performance optimization
  const memoizedPromotions = useMemo(
    () => [
      {
        title: "Summer Sale",
        description: "Up to 30% off on selected Granite products.",
        imageUrl:
          "https://img.staticmb.com/mbcontent/images/crop/uploads/2023/9/marble-vs-granite-in-interiors_0_1200.jpg",
        link: "/summer-sale",
      },
      {
        title: "New Arrivals",
        description: "Check out the latest trends in Marble and Quartz.",
        imageUrl:
          "https://i.pinimg.com/736x/37/7b/d3/377bd3b3f28428156810f9bd08ab2f4a.jpg",
        link: "/new-arrivals",
      },
      {
        title: "Exclusive Granite Collection",
        description: "Discover our exclusive range of premium granite slabs.",
        imageUrl:
          "https://images.pexels.com/photos/2441334/pexels-photo-2441334.jpeg?auto=compress&cs=tinysrgb&w=1600",
        link: "/exclusive-granite",
      },
      {
        title: "Custom Marble Designs",
        description:
          "Get customized marble designs for your unique architectural projects.",
        imageUrl:
          "https://images.pexels.com/photos/434249/pexels-photo-434249.jpeg?auto=compress&cs=tinysrgb&w=1600",
        link: "/custom-marble",
      },
    ],
    []
  );

  // Animations for promotional banners
  const promotionSprings = useTrail(memoizedPromotions.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 180, friction: 20 },
  });

  return (
    <Box
      component="section"
      aria-labelledby="promotions-section-heading"
      sx={{
        mt: 4,
        mb: 4,
        p: 2,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
        borderRadius: 2,
      }}
    >
      <Typography
        id="promotions-section-heading"
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Latest Promotions
      </Typography>
      <Grid container spacing={4}>
        {promotionSprings.map((style, index) => (
          <Grid item xs={12} md={6} key={index}>
            <animated.div style={style}>
              <Paper
                sx={{
                  position: "relative",
                  backgroundColor: theme.palette.grey[800],
                  color: "#fff",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${memoizedPromotions[index].imageUrl})`,
                  height: 350,
                  transition: "box-shadow 0.3s, transform 0.3s",
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:hover": {
                    boxShadow: theme.shadows[8],
                    transform: "scale(1.05)",
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
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    id={`promotion-title-${index}`}
                    component="h3"
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                      fontWeight: "bold",
                    }}
                  >
                    {memoizedPromotions[index].title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      mb: 2,
                    }}
                  >
                    {memoizedPromotions[index].description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    aria-label={`Learn more about ${memoizedPromotions[index].title}`}
                    onClick={() => navigate(memoizedPromotions[index].link)}
                    sx={{
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Paper>
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Promotions;
