import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import GlowingCircularProgress from "utils/GlowingCircularProgress";
import OauthLogin from "./OauthLogin";
import useSnackbar from "../hooks/useSnackbar"; // Assuming you have implemented the useSnackbar hook

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const { SnackbarComponent, showSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location.state, navigate]);

  useEffect(() => {
    if (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error.message || "An unexpected error occurred";
      showSnackbar(errorMessage, "error");
    }
  }, [error, showSnackbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ ...credentials, rememberMe })).unwrap();
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error.message || "An unexpected error occurred";
      showSnackbar(errorMessage, "error");
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }, []);

  const handleRememberMeChange = useCallback((e) => {
    setRememberMe(e.target.checked);
  }, []);

  const isSubmitDisabled = credentials.password.length < 8;

  return (
    <Box>
      <Helmet>
        <title>Login - gksvp.com</title>
        <meta
          name="description"
          content="Login to access your account and explore our website. Ensure secure access with our login page."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Login - gksvp.com" />
        <meta
          property="og:description"
          content="Login to access your account and explore our website. Ensure secure access with our login page."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.gksvp.com/login" />
        <meta property="og:image" content="%PUBLIC_URL%/favicon.ico" />
        <link rel="canonical" href="https://www.gksvp.com/login" />
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
          {loading ? (
            <GlowingCircularProgress />
          ) : (
            <>
              <Avatar
                sx={{ m: 1, bgcolor: "secondary.main" }}
                aria-label="Login"
              >
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
                  aria-label="Username"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  aria-label="Password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      color="primary"
                    />
                  }
                  label="Remember me"
                  aria-label="Remember me"
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: 5, mt: 3, mb: 2 }}
                  disabled={isSubmitDisabled || loading}
                  aria-label="Login Button"
                >
                  Login
                </Button>
              </Box>
              <Button
                component={Link}
                to="/register"
                variant="text"
                color="primary"
                aria-label="Register Link"
              >
                Click here to Register
              </Button>
              <OauthLogin />
            </>
          )}
        </Box>
        {SnackbarComponent}
      </Container>
    </Box>
  );
};

export default SignIn;
