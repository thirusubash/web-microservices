import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

import axiosInstance from "api/axiosInstance";
import GlowingCircularProgress from "utils/GlowingCircularProgress";
import { API_CONFIG } from "api/apiConfig";

const apiGateway = API_CONFIG.apiGatewayUrl;

const Home = () => {
  const [data, setData] = useState([]);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const [pageable, setPageable] = useState({
    page: 0,
    size: 10,
    sort: "sortOrder,desc",
  });
  const [hasMore, setHasMore] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarNotification = useCallback(
    ({ open, message, severity }) => {
      setSnackbar({
        open,
        message,
        severity,
      });
    },
    []
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const rotateImage = useCallback((productId, numUuids) => {
    setCurrentImageIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[productId] || 0;
      return {
        ...prevIndexes,
        [productId]: (currentIndex + 1) % numUuids,
      };
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/home/v1/visible", {
        params: pageable,
      });

      const responseData = response.data;

      if (responseData?.content && Array.isArray(responseData.content)) {
        setData((prevData) => {
          const newData = responseData.content.filter(
            (item) => !prevData.some((prevItem) => prevItem.id === item.id)
          );
          return [...prevData, ...newData];
        });

        if (
          responseData.last ||
          responseData.numberOfElements < pageable.size
        ) {
          setHasMore(false);
        } else {
          setPageable((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      handleSnackbarNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  }, [pageable, handleSnackbarNotification]);

  const shareOnClick = useCallback(
    (postTitle, siteTitle) => {
      const sharingText = `Check out the latest updates on ${postTitle} at ${siteTitle}`;
      if (navigator.share) {
        navigator.share({
          title: sharingText,
          text: sharingText,
          url: window.location.href,
        });
      } else {
        handleSnackbarNotification({
          open: true,
          message: "Sharing is not supported in this browser.",
          severity: "info",
        });
      }
    },
    [handleSnackbarNotification]
  );

  useEffect(() => {
    const initialImageIndexes = data.reduce((acc, product) => {
      if (product.imageUuids && product.imageUuids.length) {
        acc[product.id] = 0;
      }
      return acc;
    }, {});
    setCurrentImageIndexes(initialImageIndexes);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      data.forEach((product) => {
        if (product.imageUuids && product.imageUuids.length > 1) {
          rotateImage(product.id, product.imageUuids.length);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [data, rotateImage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<GlowingCircularProgress />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all!</b>
          </p>
        }
      >
        <Grid container spacing={2} justifyContent="center">
          {data.map((productData, index) => (
            <Grid
              padding={5}
              item
              xs={12}
              sm={6}
              md={4}
              key={`${productData.id}-${index}`}
            >
              <Card elevation={0}>
                {productData.imageUuids &&
                  productData.imageUuids.length > 0 && (
                    <CardMedia
                      component="img"
                      alt={productData?.title || "Product Image"}
                      image={`${
                        apiGateway
                      }/media/v1/image/${
                        productData?.imageUuids?.[
                          currentImageIndexes?.[productData?.id] || 0
                        ] || "defaultImageUuid"
                      }`}
                    />
                  )}
                <CardContent>
                  <Typography
                    color="teal"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {productData.title}
                  </Typography>
                  <Typography variant="body2" color="teal">
                    {productData.detailedDescription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonGroup fullWidth={isXsDown}>
                    <Button
                      style={{
                        color: "white",
                        background: "linear-gradient(50deg, #009688, #689f38)",
                      }}
                      onClick={() =>
                        shareOnClick(
                          productData.primaryButtonRedirectUrl,
                          productData.postHeadline
                        )
                      }
                    >
                      {productData.primaryButtonTitle}
                    </Button>
                    <Button
                      style={{
                        color: "white",
                        background: "linear-gradient(50deg, #4caf50, #01579b)",
                      }}
                      onClick={() =>
                        window.open(
                          `${productData.secondaryButtonRedirectUrl}`,
                          "_self"
                        )
                      }
                    >
                      {productData.secondaryButtonTitle}
                    </Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default Home;
