import React, { memo } from 'react';
import { Paper, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import ImageDisplay from "@utils/ImageDisplay";

const ViewMarble = ({ marble }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    if (!marble) return null; // Ensure marble is provided

    const renderField = (key, value) => {
        if (typeof value === 'object' && value !== null) {
            return Object.entries(value).map(([nestedKey, nestedValue]) => (
                <React.Fragment key={nestedKey}>
                    <Grid item xs={6}><Typography variant="subtitle1">{nestedKey.charAt(0).toUpperCase() + nestedKey.slice(1)}:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body1">{nestedValue || 'N/A'}</Typography></Grid>
                </React.Fragment>
            ));
        } else {
            return (
                <React.Fragment key={key}>
                    <Grid item xs={6}><Typography variant="subtitle1">{key.charAt(0).toUpperCase() + key.slice(1)}:</Typography></Grid>
                    <Grid item xs={6}><Typography variant="body1">{value || 'N/A'}</Typography></Grid>
                </React.Fragment>
            );
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h2">Marble Details</Typography>
                </Grid>

                {/* Rendering each field */}
                {Object.entries(marble).map(([key, value]) => {
                    if (key === 'imageUrls') return null;
                    return renderField(key, value);
                })}

                {/* Images */}
                {marble.imageUrls && marble.imageUrls.map((image) => (
                    <Grid item xs={isMobile ? 12 : 6} key={image}>
                        <ImageDisplay imageId={image} style={{maxWidth: '100%'}} />
                        <Typography variant="caption" display="block">{image}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default memo(ViewMarble);
