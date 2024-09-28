import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { useTrail, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Memoized offers data for performance optimization
  const memoizedOffers = useMemo(
    () => [
      {
        title: "Exclusive Summer Discounts",
        description: "Enjoy up to 40% off on our premium granite collection.",
        imageUrl:
          "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1600",
        link: "/offers/summer-discounts",
      },
      {
        title: "New Marble Arrivals",
        description: "Discover our latest marble designs with a 20% discount.",
        imageUrl:
          "https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg?auto=compress&cs=tinysrgb&w=1600",
        link: "/offers/new-marble-arrivals",
      },
      {
        title: "Quartz Clearance Sale",
        description: "Limited stock of high-quality quartz at clearance prices.",
        imageUrl:
          "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1600",
        link: "/offers/quartz-clearance",
      },
    ],
    []
  );

  // Animations for offer banners
  const offersSprings = useTrail(memoizedOffers.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 180, friction: 20 },
  });

  return (
    <Box
      component="section"
      aria-labelledby="offers-section-heading"
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
        id="offers-section-heading"
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.dark,
        }}
      >
        Special Offers
      </Typography>
      <Grid container spacing={4}>
        {offersSprings.map((style, index) => (
          <Grid item xs={12} md={4} key={index}>
            <animated.div style={style}>
              <Paper
                sx={{
                  position: "relative",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : theme.palette.grey[200],
                  color: "#fff",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${memoizedOffers[index].imageUrl})`,
                  height: 300,
                  transition: "box-shadow 0.3s, transform 0.3s",
                  borderRadius: 2,
                  "&:hover": {
                    boxShadow: theme.shadows[8],
                    transform: "scale(1.05)",
                  },
                }}
                role="article"
                aria-labelledby={`offer-title-${index}`}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    p: 2,
                    borderBottomLeftRadius: "inherit",
                    borderBottomRightRadius: "inherit",
                  }}
                >
                  <Typography
                    id={`offer-title-${index}`}
                    component="h3"
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                      fontWeight: "bold",
                    }}
                  >
                    {memoizedOffers[index].title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      mb: 2,
                      color: theme.palette.common.white,
                    }}
                  >
                    {memoizedOffers[index].description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    aria-label={`Learn more about ${memoizedOffers[index].title}`}
                    onClick={() => navigate(memoizedOffers[index].link)}
                    sx={{
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
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

export default Offers;
