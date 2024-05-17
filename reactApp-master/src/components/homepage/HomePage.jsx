import React, { useEffect, useState, useCallback } from 'react';
import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Grid,
    Snackbar,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material";
import ImageDisplay from '@utils/ImageDisplay';
import homePageApi from "@api/homePageApi";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@components/layout/Loading";

const HomePage = () => {
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
        severity: "error"
    });

    const handleSnackbarNotification = useCallback(({ open, message, severity }) => {
        setSnackbar({
            open,
            message,
            severity,
        });
    }, []);

    const handleCloseSnackbar = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);

    const rotateImage = useCallback((productId, numUuids) => {
        setCurrentImageIndexes(prevIndexes => {
            const currentIndex = prevIndexes[productId] || 0;
            return {
                ...prevIndexes,
                [productId]: (currentIndex + 1) % numUuids,
            };
        });
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const response = await homePageApi.getAll(pageable);
            console.log("response ", response);
            if (response?.content && Array.isArray(response.content)) {
                setData(prevData => [...prevData, ...response.content]);

                // Fix: Remove the duplicated call to setPageable.
                if (response.last || response.numberOfElements < pageable.size) {
                    setHasMore(false);
                } else {
                    setPageable(prev => ({ ...prev, page: prev.page + 1 }));
                }
            }

        } catch (error) {
            console.error('Error fetching product data:', error);
            handleSnackbarNotification({
                open: true,
                message: error.message,
                severity: "error"
            });
        }
    }, [pageable, handleSnackbarNotification]);


    const shareOnClick = useCallback((postTitle, siteTitle) => {
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
                severity: "info"
            });
        }
    }, [handleSnackbarNotification]);
    useEffect(() => {
        // When data changes, initialize the currentImageIndexes
        const initialImageIndexes = data.reduce((acc, product) => {
            if (product.imageUuids && product.imageUuids.length) {
                acc[product.id] = 0; // Initialize all products' current image index to 0
            }
            return acc;
        }, {});
        setCurrentImageIndexes(initialImageIndexes);
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            data.forEach(product => {
                if (product.imageUuids && product.imageUuids.length > 1) {
                    rotateImage(product.id, product.imageUuids.length);
                }
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [data, rotateImage]);

    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
              <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
                  {snackbar.message}
              </Alert>
          </Snackbar>

          <InfiniteScroll
            scrollThreshold={0.7}
            dataLength={data.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
          >
              <Grid container spacing={2} justifyContent="center">
                  {data.map((productData) => (
                    <Grid item xs={12} sm={6} md={4} key={productData.id}>
                        <Card>
                            <CardContent>
                                {productData.imageUuids && productData.imageUuids.length > 0 && (
                                  <div style={{ width: '100%' }}>
                                      <ImageDisplay
                                        imageId={productData.imageUuids[currentImageIndexes[productData.id] || 0]}
                                        key={productData.id}
                                        style={{ width: '100%', height: 'auto' }}
                                      />
                                  </div>

                                )}
                                <Typography color="teal" gutterBottom variant="h5" component="div">
                                    {productData.title}
                                </Typography>
                                <Typography variant="body2" color="teal">
                                    {productData.description}
                                </Typography>
                            </CardContent>


                            <CardActions>
                                {isXsDown ? (
                                  <ButtonGroup fullWidth>
                                      <Button
                                        style={{ color: 'white', background: 'linear-gradient(50deg, #009688, #689f38)' }}
                                        onClick={() => shareOnClick(productData.primaryButtonRedirectUrl, productData.postHeadline)}
                                      >
                                          {productData.primaryButtonTitle}
                                      </Button>
                                      <Button
                                        style={{ color: 'white', background: 'linear-gradient(50deg, #4caf50, #01579b)' }}
                                        onClick={() => window.open(`${productData.secondaryButtonRedirectUrl}`, '_self')}
                                      >
                                          {productData.secondaryButtonTitle}
                                      </Button>
                                  </ButtonGroup>
                                ) : (
                                  <ButtonGroup>
                                      <Button
                                        style={{ color: 'white', background: 'linear-gradient(50deg, #009688, #689f38)' }}
                                        onClick={() => shareOnClick(productData.primaryButtonRedirectUrl, productData.postHeadline)}
                                      >
                                          {productData.primaryButtonTitle}
                                      </Button>
                                      <Button
                                        style={{ color: 'white', background: 'linear-gradient(50deg, #4caf50, #01579b)' }}
                                        onClick={() => window.open(`${productData.secondaryButtonRedirectUrl}`, '_self')}
                                      >
                                          {productData.secondaryButtonTitle}
                                      </Button>
                                  </ButtonGroup>
                                )}
                            </CardActions>

                    </Card>
                    </Grid>
                  ))}
              </Grid>
          </InfiniteScroll>
      </div>
    );
}

export default HomePage;