import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Box,
  Typography,
  Snackbar,
  IconButton,
  Button,
} from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { refreshAccessToken } from "../../../redux/slices/authSlice";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    url: "https://example.com/johndoe",
  });

  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dateOfBirth: user.dateOfBirth || "",
        url: user.url || "https://example.com/johndoe",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    axios
      .put(`https://localhost:8080/api/users/${user.id}`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("User profile updated successfully:", response.data);
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setEditMode(false);
          dispatch(refreshAccessToken());
        } else {
          throw new Error(response.statusText || "Update failed");
        }
      })
      .catch((error) => {
        console.error("Failed to update user profile:", error);

        let errorMessage = "Update failed";
        if (error.response) {
          console.error("Server Error:", error.response.data);
          errorMessage = error.response.data?.message || "Update failed";
        } else if (error.request) {
          console.error("Request Error:", error.request);
        } else {
          console.error("General Error:", error.message);
        }

        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarSeverity === "success"
            ? "User profile updated successfully"
            : "Failed to update user profile"}
        </Alert>
      </Snackbar>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          name="username"
          value={formData.username}
          InputProps={{
            readOnly: !editMode,
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          InputProps={{
            readOnly: !editMode,
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          InputProps={{
            readOnly: !editMode,
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          InputProps={{
            readOnly: !editMode,
          }}
        />
      </Box>
      {!editMode ? (
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
      )}
    </Box>
  );
};

export default UserProfile;
