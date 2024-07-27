import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Box, Typography, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { refreshAccessToken } from "../../../redux/slices/authSlice";
import axiosInstance from "api/axiosInstance";
import useSnackbar from "hooks/useSnackbar";
import GlowingCircularProgress from "utils/GlowingCircularProgress";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { SnackbarComponent, showSnackbar } = useSnackbar(); // Use the custom hook

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    url: "https://gksvp.com/'user'",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dateOfBirth: user.dateOfBirth || "",
        url: user.url || "",
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
    axiosInstance
      .put(`/user-service/users/${user.id}`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("User profile updated successfully:", response.data);
          showSnackbar("User profile updated successfully", "success");
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

        showSnackbar(errorMessage, "error");
      });
  };

  if (!user) {
    return <GlowingCircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
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
      {SnackbarComponent} {/* Render the Snackbar component */}
    </Box>
  );
};

export default UserProfile;
