import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Initialize as empty string
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  // Handle server-side errors received from Redux state
  React.useEffect(() => {
    if (error) {
      setErrorMessage(error.message || "Login failed. Please try again later."); // Set error message received from server
      setShowError(true); // Show Snackbar with error message
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false); // Hide any previous error message

    try {
      await dispatch(loginUser(credentials)).unwrap();
      navigate("/"); // Navigate to home page after successful login
    } catch (error) {
      console.error("Error during authentication:", error);
      // Handle specific server-side error messages here
      if (error.message === "INVALID_CREDENTIALS") {
        setErrorMessage("Invalid username or password. Please try again.");
      } else {
        setErrorMessage("Login failed. Please try again later.");
      }
      setShowError(true); // Show Snackbar with error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const isSubmitDisabled = credentials.password.length < 8;

  const handleSnackbarClose = () => {
    setShowError(false); // Close Snackbar
  };

  return (
    <Box>
      <Helmet>
        <title>Login - gksvp</title>
        <meta
          name="description"
          content="Login to access your account and explore our website."
        />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Snackbar
            open={showError}
            autoHideDuration={6000} // Adjust as needed
            onClose={handleSnackbarClose}
          >
            <Alert severity="error" onClose={handleSnackbarClose}>
              {errorMessage} {/* Ensure errorMessage is always a string */}
            </Alert>
          </Snackbar>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockPersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={credentials.username}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: 5, mt: 3, mb: 2 }}
                  disabled={isSubmitDisabled}
                >
                  Login
                </Button>
              </Box>
              <Button
                component={Link}
                to="/register"
                variant="text"
                color="primary"
              >
                Click here to Register
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
