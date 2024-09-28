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
  Snackbar,
  Alert,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import GlowingCircularProgress from "utils/GlowingCircularProgress";
import OauthLogin from "./OauthLogin";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
      setShowError(true);
    }
  }, [error]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setShowError(false);
      setPasswordError(""); // Reset password error on submit

      if (passwordError) return;

      try {
        await dispatch(loginUser(credentials)).unwrap();
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } catch (error) {
        setErrorMessage(error.message || "An unknown error occurred.");
        setShowError(true);
      }
    },
    [credentials, passwordError, dispatch, navigate, location.state]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));

      if (name === "password") {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const isValidLength = value.length >= 8;

        if (!isValidLength) {
          setPasswordError("Password must be at least 8 characters long.");
        } else if (!hasUpperCase) {
          setPasswordError("Password must contain at least one uppercase letter.");
        } else if (!hasLowerCase) {
          setPasswordError("Password must contain at least one lowercase letter.");
        } else {
          setPasswordError("");
        }
      }
    },
    []
  );

  const isSubmitDisabled = !!passwordError || loading;

  const handleSnackbarClose = useCallback(() => setShowError(false), []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Login - gksvp.com</title>
        <meta
          name="description"
          content="Securely login to your account. Access your personalized dashboard and exclusive features."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Login - gksvp.com" />
        <meta
          property="og:description"
          content="Login to access your account and explore our website. Ensure secure access with our login page."
        />
        <meta property="keywords" content="login, sign in, account, secure access, user login" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.gksvp.com/login" />
        <meta property="og:image" content="/favicon.ico" />
        <link rel="canonical" href="https://www.gksvp.com/login" />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Snackbar
            open={showError}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            aria-live="assertive"
          >
            <Alert severity="error" onClose={handleSnackbarClose}>
              {errorMessage}
            </Alert>
          </Snackbar>
          {loading ? (
            <GlowingCircularProgress />
          ) : (
            <React.Fragment>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} aria-label="Login Icon">
                <LockPersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5" role="heading" aria-level="1">
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={handleChange}
                  aria-label="Password"
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: 5, mt: 3, mb: 2 }}
                  disabled={isSubmitDisabled}
                  aria-label="Login"
                >
                  Login
                </Button>
              </Box>
              <Button
                component={Link}
                to="/register"
                variant="text"
                color="primary"
                aria-label="Register"
              >
                Click here to Register
              </Button>
            </React.Fragment>
          )}
        </Box>
      </Container>
      <OauthLogin />
    </React.Fragment>
  );
};

export default Login;
