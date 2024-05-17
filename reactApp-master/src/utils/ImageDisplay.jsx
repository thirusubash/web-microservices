import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Paper, Container } from '@mui/material';
import imageApiService from '@api/imageApiService';

const ImageDisplay = ({ imageId }) => {
    const [imageData, setImageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                // Check if the image data is already cached
                const cachedImageData = localStorage.getItem(imageId);

                if (cachedImageData) {
                    // Image is available in the cache, use it
                    setImageData(JSON.parse(cachedImageData));
                    setIsLoading(false);
                } else if (navigator.onLine) {
                    // Image is not in the cache, fetch it from the server when online
                    const data = await imageApiService.getShortImage(imageId);

                    if (data.alt == null) {
                        data.alt = 'This image from gksvp.com';
                    }

                    // Cache the image data in localStorage for future use
                    localStorage.setItem(imageId, JSON.stringify(data));

                    setImageData(data);
                    setIsLoading(false);
                } else {
                    // Application is offline and image is not in cache
                    setIsLoading(false);
                    setError(new Error('Image not available offline.'));
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching image data:', error);
            }
        };

        fetchImageData();
    }, [imageId]);

    const handleContextMenu = (e) => {
        e.preventDefault();
    };
    return (
        <Container onContextMenu={handleContextMenu}>
            {isLoading ? (
                <div>
                    <CircularProgress color="success" />
                </div>
            ) : error ? (
                <Typography color="error">Oops! {error.message}</Typography>
            ) : (
              <img
                src={'data:image/jpeg;base64,' + imageData.imageData}
                alt={imageData.alt || imageData.description}
                style={{ width: '100%', height: 'auto' }}
                onContextMenu={handleContextMenu}
              />
            )}
        </Container>
    );
};

export default ImageDisplay;
