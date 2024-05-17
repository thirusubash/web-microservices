import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import {Alert, Container, Grid, IconButton, Snackbar} from '@mui/material';
import productCatalogApiService from '@api/productCatlogApiService'; // Make sure the import path is correct

function CreateProductCatalog() {
    const [catalogData, setCatalogData] = useState({
        catalogTitle: '',
        subTitle: '',
        description: '',
        category: '',
        route: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const[snackbarSeverity,setSnackbarSeverity]=useState("error");
    const [imageFiles, setImageFiles] = useState([]);
    const handleSnackbarNotification = ({ open, message, severity }) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCatalogData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImageFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('newCatalog', JSON.stringify(catalogData));
        for (const file of imageFiles) {
            formData.append('imageFiles', file);
        }

        try {
            const response = await productCatalogApiService.createProductCatalog(formData);

            console.log('Catalog created:', response.data);
            // Reset form after successful submission
            setCatalogData({
                catalogTitle: '',
                subTitle: '',
                description: '',
                category: '',
                route: '', // Reset the route field
            });
            setImageFiles([]);
            handleSnackbarNotification({
                open:true,
                message:"Catalog created successfully!",
                severity:"success"
            });
        } catch (error) {
            handleSnackbarNotification({
                open:true,
                message:error.message,
                severity:"error"
            });
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };
    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Create Product Catalog
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Catalog Title"
                            variant="outlined"
                            name="catalogTitle"
                            value={catalogData.catalogTitle}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Sub Title"
                            variant="outlined"
                            name="subTitle"
                            value={catalogData.subTitle}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            fullWidth
                            minRows={3}
                            placeholder="Description"
                            name="description"
                            value={catalogData.description}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Category"
                            variant="outlined"
                            name="category"
                            value={catalogData.category}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Route"
                            variant="outlined"
                            name="route"
                            value={catalogData.route}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload Images
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit" color="primary">
                            Create Catalog
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default CreateProductCatalog;
