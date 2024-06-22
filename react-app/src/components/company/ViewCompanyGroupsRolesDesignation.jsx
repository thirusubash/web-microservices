import React from 'react';
import { Typography, Paper, Container } from "@mui/material";

const ViewCompanyGroupsRolesDesignation = ({ data }) => {
    if (!data) {
        return <Typography variant="h6">No data provided</Typography>;
    }

    // Formatters for specific keys
    const formatters = {
        status: value => value ? 'Active' : 'Inactive',
        defaultGroup: value => value ? 'Yes' : 'No',
        defaultForUser: value => value ? 'Yes' : 'No'
    };

    return (
        <Container component={Paper} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>Details</Typography>
            {Object.entries(data).map(([key, value]) => (
                <Typography key={key} variant="body1">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}: </strong>
                    {formatters[key] ? formatters[key](value) : value}
                </Typography>
            ))}
        </Container>
    );
}

export default ViewCompanyGroupsRolesDesignation;
