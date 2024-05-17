import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Container } from '@mui/material';

const LocationTracker = () => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => setPosition(pos.coords),
                    (err) => setError(err.message)
                );
            } else {
                setError("Geolocation is not supported in this browser.");
            }
        };

        getLocation();
    }, []);

    return (
        <Container>
            {error ? (
                <Typography variant="body1" color="error">
                    Error: {error}
                </Typography>
            ) : position ? (
                <>
                    <Typography variant="body1">
                        Latitude: {position.latitude}
                    </Typography>
                    <Typography variant="body1">
                        Longitude: {position.longitude}
                    </Typography>
                </>
            ) : (
                <CircularProgress color="primary" />
            )}
        </Container>
    );
};

export default React.memo(LocationTracker);
