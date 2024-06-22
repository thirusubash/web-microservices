import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";
import {
  Delete,
  ToggleOffOutlined,
  ToggleOnOutlined,
} from "@mui/icons-material";
import axiosInstance, { multipartAxiosInstance } from "api/axiosInstance";

const ImageCrud = () => {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [altText, setAltText] = useState("");
  const [description, setDescription] = useState("");
  const [dir, setDir] = useState("");
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // State for Autocomplete
  const [selectedOption, setSelectedOption] = useState(null);
  const [options] = useState(["users", "products", "homepage"]);

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const fetchImages = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/media-service/media", {
        params: {
          page: page - 1,
          size: 10,
          sort: "uploadDateTime,desc",
        },
      });
      setUploadedImages(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      handleSnackbarOpen("Error fetching images: " + error.message, "error");
      setLoading(false);
    }
  };

  const handleEnableDisable = async (imageId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        `https://localhost:8080/media-service/media/disable/${imageId}`
      );
      fetchImages(page); // Refresh image list
      handleSnackbarOpen("Image status updated successfully", "success");
    } catch (error) {
      handleSnackbarOpen(
        "Error enabling/disabling image: " + error.message,
        "error"
      );
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!dir || !id || files.length === 0) {
      handleSnackbarOpen("Directory, ID, or files not set", "error");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("altText", altText);
    formData.append("description", description);

    try {
      setLoading(true);
      const response = await multipartAxiosInstance.post(
        `/media/upload/${dir}/${id}`,
        formData
      );
      fetchImages(page); // Refresh image list
      handleSnackbarOpen("Files uploaded successfully", "success");
    } catch (error) {
      handleSnackbarOpen("Error uploading files: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/media-service/media/delete/${imageId}`);
      fetchImages(page); // Refresh image list
      handleSnackbarOpen("Image deleted successfully", "success");
    } catch (error) {
      handleSnackbarOpen("Error deleting image: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Image Controller
      </Typography>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          sx={{
            backgroundColor: snackbarSeverity === "error" ? "red" : "green",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Box mb={2}>
        <Autocomplete
          options={options}
          value={selectedOption}
          onChange={(event, newValue) => {
            setSelectedOption(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Option" variant="outlined" />
          )}
        />
        <TextField
          fullWidth
          label="Alt Text"
          variant="outlined"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="ID"
          variant="outlined"
          value={id}
          onChange={(e) => setId(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <input type="file" multiple onChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {loading && (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="body2">Loading...</Typography>
          </Grid>
        )}
        {!loading &&
          uploadedImages.map((image) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={image.fileName}
                  src={`data:image/webp;base64,${image.thumbnail}`}
                />
                <Box p={2}>
                  <Typography variant="body1">{image.description}</Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleEnableDisable(image.id)}
                  >
                    {image.isActive ? (
                      <ToggleOnOutlined color="success" />
                    ) : (
                      <ToggleOffOutlined color="error" />
                    )}
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
      {!loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageCrud;
