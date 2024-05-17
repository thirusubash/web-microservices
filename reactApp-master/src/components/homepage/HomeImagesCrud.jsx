import React, { useState } from 'react';
import {
    Button, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, LinearProgress, Select, MenuItem,
    FormControl, InputLabel, useTheme, useMediaQuery, Grid, Typography
} from '@mui/material';

import ImageDisplay from "@utils/ImageDisplay";
import imageApi from "@api/imageApi";
import homePageApi from "@api/homePageApi";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { styled } from '@mui/system';
const HiddenInput = styled('input')({
    display: 'none',
});
function HomeImagesCrud({ product, notification }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [images, setImages] = useState(product ? product.imageUuids || [] : []);
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [description, setDescription] = useState("Home-Image");

    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);

    const handleImageSelection = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        // If a file is selected, read it and set the preview URL
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };


    const handleUploadImage = async () => {
        console.log("Upload process started");
        if (!selectedFile) {
            console.error("No file selected.");
            return;
        }

        try {
            // console.log("Attempting to upload...");
            const uploadedImage = await imageApi.upload(selectedFile, description, `${product.id}-${description}`, progressEvent => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadProgress(progress);
            });
            // console.log("Image uploaded, updating product...");
            await homePageApi.addImage( product.id, uploadedImage.id);
            // console.log("Home updated, updating local state..."+product.company.id + product.id + uploadedImage.id );
            setImages(prevImages => [...prevImages, uploadedImage.id]);
            setSelectedFile(null);
            handleCloseDialog();
            notification({
                open: true,
                message: "Image uploaded successfully!",
                severity: "success"
            });
            setUploadProgress(0); // Reset progress
            setSelectedFile(null);
        } catch (error) {
            console.log("Triggering error notification"); // Add this line for debugging
            notification({
                open: true,
                message: "Please try again."+error.message,
                severity: "error"
            });
        }
    };


    const handleDeleteImage = async (image) => {
        try {
            await homePageApi.removeImage(product.id, image);
            await imageApi.delete(image);
            setImages(prevImages => prevImages.filter(img => img !== image));
            notification({
                open: true,
                message: "Image Deleted successfully!",
                severity: "success"
            });
        } catch (error) {

            notification({
                open: true,
                message: "Error deleting the image!"+error.message,
                severity: "success"
            });
        }
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <div>

            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>Add</Button>
            <List>
                {images.map((image, index) => (
                    <ListItem key={index} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
                        <ImageDisplay imageId={image} style={{ maxWidth: isMobile ? '100%' : '60%', marginRight: isMobile ? '0' : '1rem' }} />
                        <ListItemText primary={image} />
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteImage(image)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={handleCloseDialog} fullScreen={isMobile}>
                <DialogTitle>Add Image</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            {previewUrl && <img src={previewUrl} alt="Selected Preview" style={{ width: '100%', marginBottom: '1rem' }} />}
                        </Grid>
                        <Grid item xs={12}>
                            {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} />}
                        </Grid>
                        <Grid item xs={12}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload File
                                <HiddenInput type="file" onChange={handleImageSelection} />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" style={{ width: '100%' }}>
                                <InputLabel htmlFor="image-description">Description</InputLabel>
                                <Select
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    label="Description"
                                    id="image-description"
                                >
                                    <MenuItem value={"FRONT"}>FRONT</MenuItem>
                                    <MenuItem value={"LEFT"}>LEFT</MenuItem>
                                    <MenuItem value={"RIGHT"}>RIGHT</MenuItem>
                                    <MenuItem value={"BACK"}>BACK</MenuItem>
                                    <MenuItem value={"OTHERS"}>OTHERS</MenuItem>
                                    <MenuItem value={"ZOOMED"}>ZOOMED</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleUploadImage} color="primary">Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default HomeImagesCrud;
