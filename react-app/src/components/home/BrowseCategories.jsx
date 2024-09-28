import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { animated, useTrail } from "@react-spring/web";

const BrowseCategories = () => {
  // Memoized data arrays for performance optimization
  const categories = useMemo(
    () => [
      {
        title: "Granite",
        imageUrl:
          "https://images.pexels.com/photos/2441334/pexels-photo-2441334.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description:
          "Explore our premium selection of granite for your projects.",
      },
      {
        title: "Hollow Bricks",
        imageUrl:
          "https://images.pexels.com/photos/159909/building-construction-building-site-architecture-159909.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description:
          "High-quality hollow bricks for durable and strong constructions.",
      },
      {
        title: "M-Sand",
        imageUrl:
          "https://images.pexels.com/photos/994883/pexels-photo-994883.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description:
          "Eco-friendly M-Sand for sustainable construction solutions.",
      },
      {
        title: "Gravel",
        imageUrl:
          "https://images.pexels.com/photos/344926/pexels-photo-344926.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description: "Quality gravel for landscaping and construction.",
      },
      {
        title: "Tipper Service",
        imageUrl:
          "https://images.pexels.com/photos/6374375/pexels-photo-6374375.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description:
          "Reliable tipper services for transporting construction materials.",
      },
      {
        title: "JCB Services",
        imageUrl:
          "https://images.pexels.com/photos/2424016/pexels-photo-2424016.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description:
          "Professional JCB services for excavation and site clearing.",
      },
    ],
    []
  );

  // Animations for the category cards
  const categorySprings = useTrail(categories.length, {
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 220, friction: 15 },
  });

  return (
    <Box
      component="section"
      aria-labelledby="browse-categories-heading"
      sx={{ my: 4 }}
    >
      <Typography
        id="browse-categories-heading"
        variant="h4"
        component="h2"
        sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
      >
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
                    boxShadow: (theme) => theme.shadows[6],
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 200 }}
                  image={categories[index].imageUrl}
                  alt={categories[index].title}
                  loading="lazy"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {categories[index].title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {categories[index].description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    aria-label={`Shop ${categories[index].title}`}
                  >
                    Shop {categories[index].title}
                  </Button>
                </Box>
              </Card>
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BrowseCategories;
