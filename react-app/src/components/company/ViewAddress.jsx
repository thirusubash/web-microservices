import React from 'react';
import { Grid, Typography, Container } from '@mui/material';

const ViewAddress = ({ address }) => {
    if (!address) {
        return (
            <Container>
                <Typography variant="h6" gutterBottom>
                    No Address Data Available
                </Typography>
            </Container>
        );
    }

    const formatLabel = (key) => {
        const words = key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return words.join(" ");
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Address Details
            </Typography>

            <Grid container spacing={3}>
                {Object.entries(address).map(([key, value], index) => {
                    if (key === 'company') return null;  // Skip the 'company' object for now
                    return (
                        <Grid item xs={12} md={6} key={index}>
                            <Typography>
                                <strong>{formatLabel(key)}:</strong> {value || "N/A"}
                            </Typography>
                        </Grid>
                    );
                })}

                {/* Optionally, if you want to display company details */}
                {address.company && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Company Details
                        </Typography>
                        {Object.entries(address.company).map(([key, value], index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Typography>
                                    <strong>{formatLabel(key)}:</strong> {value || "N/A"}
                                </Typography>
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default ViewAddress;
