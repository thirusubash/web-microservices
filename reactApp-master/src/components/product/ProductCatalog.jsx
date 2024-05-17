import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import productCatlogApiService from '@api/productCatlogApiService';
import ImageDisplay from '@utils/ImageDisplay';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const CatalogCard = memo(({ catalog, onClick }) => (
    <Grid item xs={12} sm={4} md={4} key={catalog.id} onClick={onClick}>
        <Card alt={catalog.catalogTitle} height="auto" width="100%">
            <div className="image-container">
                <ImageDisplay key={catalog.id} imageId={catalog.imagesURL[0]} />
            </div>
            <CardContent>
                <Typography color='success.main' gutterBottom variant="h6">
                    {catalog.catalogTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {catalog.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {catalog.message}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
));

function ProductCatalogList() {
    const [catalogs, setCatalogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCatalogs() {
            try {
                const fetchedCatalogs = await productCatlogApiService.getProductCatalog();
                setCatalogs(fetchedCatalogs);
            } catch (error) {
                console.error('Error fetching catalogs:', error);
            }
        }
        fetchCatalogs();
    }, []);

    const handleClick = (route) => () => {
        navigate(route);
    };

    return (
        <Grid container spacing={2}>
            {catalogs.map(catalog => (
                <CatalogCard key={catalog.id} catalog={catalog} onClick={handleClick(catalog.route)} />
            ))}
        </Grid>
    );
}

export default ProductCatalogList;
