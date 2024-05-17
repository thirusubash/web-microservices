import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
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
  SnackbarContent,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '@auth/AuthService';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const checkAuthStatus = async () => {
      if (AuthService.isAuthenticated()) {
        navigate('/');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      setShowError(true);
      setLoginSuccess(false);
      return;
    }

    setIsLoading(true);

    try {
      const res = await AuthService.login(username, password);

      if (res) {
        console.log(res);
        setShowError(false);
        setErrorMessage('');
        setLoginSuccess(true);
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        const { message } = err.response.data;
        if (message === 'INVALID_CREDENTIALS') {
          setErrorMessage('Invalid username or password. Please try again.');
        } else {
          setErrorMessage(message);
        }
        setShowError(true);
        setLoginSuccess(false);
      } else {
        setErrorMessage('Please try again! ' + err.message);
        setShowError(true);
        setLoginSuccess(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isSubmitDisabled = password.length < 8;

  return (
    <Box>
      <Helmet>
        <title>Login - gksvp</title>
        <meta name="description" content="Login to access your account and explore our website." />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {showError ? (
            <SnackbarContent style={{ backgroundColor: '#ff3d00', color: 'white' }} message={errorMessage} />
          ) : (
            loginSuccess && <SnackbarContent style={{ backgroundColor: '#4CAF50', color: 'white' }} message={`Successfully logged in as ${username}`} />
          )}

          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  color="success"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={handleUsernameChange}
                />
                <TextField
                  color="success"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
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
              <Button component={Link} to="/register" variant="text" color="success">
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
