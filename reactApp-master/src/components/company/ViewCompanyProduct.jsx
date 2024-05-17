import React from 'react';
import { Paper, Typography } from '@mui/material';

const ViewCompanyProduct = ({ product }) => {
    if (!product) {
        return <Typography>No product selected.</Typography>;
    }

    return (
        <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">Product Details</Typography>
            <Typography><strong>ID:</strong> {product.id}</Typography>
            <Typography><strong>UUID:</strong> {product.productUUID}</Typography>
            <Typography><strong>Name:</strong> {product.name}</Typography>
            <Typography><strong>Brand:</strong> {product.brand}</Typography>
            <Typography><strong>Category:</strong> {product.category}</Typography>
            <Typography><strong>Color:</strong> {product.color}</Typography>
            <Typography><strong>Material:</strong> {product.material}</Typography>
            <Typography><strong>Is Active:</strong> {product.isActive ? "Yes" : "No"}</Typography>
            <Typography><strong>Plant Info:</strong> {product.plant ? product.plant.name : "N/A"}</Typography>
        </Paper>
    );
}

export default ViewCompanyProduct;
