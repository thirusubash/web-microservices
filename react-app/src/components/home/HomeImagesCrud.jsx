import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  TextField,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { styled } from "@mui/system";
import axiosInstance, { multipartAxiosInstance } from "api/axiosInstance";

const HiddenInput = styled("input")({
  display: "none",
});

const HomeImagesCrud = ({ selectedHomePage, notification }) => {
  const [altText, setAltText] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [uuids, setUuids] = useState(selectedHomePage?.imageUuids || []);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchImages();
  }, [uuids]);

  const fetchImages = async () => {
    try {
      const response = await axiosInstance.post(
        "/media/v1/findbyAll",
        uuids
      );

      // Assuming response.data is an array of objects where each object has a `uuid` property
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      notification({
        open: true,
        message: "Error fetching images: " + error.message,
        severity: "error",
      });
    }
  };

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => {
    setOpen(false);
    setPreviewUrl(null);
    setSelectedFile(null);
    setAltText("");
    setDescription("");
    setUploadProgress(0);
  };

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

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

  const handleDeleteImage = async (imageUuid) => {
    try {
      await axiosInstance.delete(`/media/v1/delete/${imageUuid}`);
      await axiosInstance.delete(
        `/home/v1/deleteImage/${selectedHomePage.id}/${imageUuid}`
      );

      notification({
        open: true,
        message: "Image deleted successfully!",
        severity: "success",
      });
      // Remove the deleted imageUuid from uuids
      const updatedUuids = uuids.filter((uuid) => uuid !== imageUuid);
      setUuids(updatedUuids);
      // After successful deletion, refetch images
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      notification({
        open: true,
        message: "Error deleting image: " + error.message,
        severity: "error",
      });
    }
  };

  const handleToggleImage = async (imageUuid, isActive) => {
    try {
      // Perform the toggle action based on `isActive` or other logic
      await axiosInstance.patch(`/media/v1/disable/${imageUuid}`);

      // Notification on success
      notification({
        open: true,
        message: `Image ${isActive ? "disabled" : "enabled"} successfully!`,
        severity: "success",
      });

      // After toggling, refetch images
      fetchImages();
    } catch (error) {
      console.error("Error toggling image status:", error);
      notification({
        open: true,
        message: "Error toggling image status: " + error.message,
        severity: "error",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "altText") {
      setAltText(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("files", selectedFile);
    formData.append("altText", altText);
    formData.append("description", description);

    try {
      // Upload the file
      const uploadResponse = await multipartAxiosInstance.post(
        `/media/v1/upload/homepage/${selectedHomePage.id}`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      // Perform any necessary update after successful upload
      await axiosInstance.patch(
        `/home/v1/updateimage/${selectedHomePage.id}`,
        uploadResponse.data // Use uploadResponse.data here
      );

      // Notification on success
      notification({
        open: true,
        message: "Image uploaded successfully!",
        severity: "success",
      });

      // Reset form and state
      handleCloseDialog();
    } catch (error) {
      console.error("Error uploading image:", error);

      notification({
        open: true,
        message: "Error uploading image: " + error.message,
        severity: "error",
      });
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Add
      </Button>
      <List>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
            <Card>
              <CardMedia
                component="img"
                alt={image.fileName}
                src={`data:image/webp;base64,${image.thumbnail}`}
              />
              <ListItem>
                <ListItemText primary={image.description} />
                <IconButton
                  edge="end"
                  aria-label="toggle"
                  onClick={() => handleToggleImage(image.id, image.isActive)}
                >
                  {image.isActive ? (
                    <ToggleOnIcon color="success" />
                  ) : (
                    <ToggleOffIcon color="disabled" />
                  )}
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
            </Card>
          </Grid>
        ))}
      </List>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Selected Preview"
                  style={{ width: "100%", marginBottom: "1rem" }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {uploadProgress > 0 && (
                <LinearProgress variant="determinate" value={uploadProgress} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload File
                <HiddenInput type="file" onChange={handleImageSelection} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alt Text"
                variant="outlined"
                name="altText"
                value={altText}
                margin="normal"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                margin="normal"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomeImagesCrud;
