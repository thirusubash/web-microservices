import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Link,
} from '@mui/material';
import countryCodes from './countryCodes';

import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import userApi from '@api/userApi';
import DOMPurify from 'dompurify'; // Import DOMPurify

// Define your validation functions here
const validateUsername = (value) => value.length >= 8;
const validateFirstName = (value) => value.length >= 3;
const validateLastName = (value) => value.length >= 1;

const RegistrationForm = () => {

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [isLoading, setLoading] = useState(false);
  const [mobileNumberValid, setMobileNumberValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: '',
    mobileNo: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    latitude: '',
    longitude: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const sanitizedValue = DOMPurify.sanitize(value);

    if (name === 'userName') {
      setUsernameValid(validateUsername(sanitizedValue));
    }
    if (name === 'firstName') {
      setFirstNameValid(validateFirstName(sanitizedValue));
    }
    if (name === 'lastName') {
      setLastNameValid(validateLastName(sanitizedValue));
    }
    if (name === 'password') {
      const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        sanitizedValue
      );
      setPasswordValid(isPasswordValid);
    }
    if (name === 'mobileNo') {
      const isMobileValid = /^\d{10}$/.test(sanitizedValue);
      setMobileNumberValid(isMobileValid);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitizedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const jsonData = {
      ...formData,
      address: {
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      location: {
        latitude: formData.latitude,
        longitude: formData.longitude,
      },
    };

    try {
      setLoading(true);
      const response = await userApi.create(jsonData);

      console.log(response);
      setSnackbar({
        severity: 'success',
        message: 'Registration successful!',
        open: true,
      });

      setTimeout(() => {
        setSnackbar({
          ...snackbar,
          open: false,
        });

        // Redirect to the signin page after successful registration
        window.location.href = '/signin'; // Make sure you have access to the navigate function here
      }, 3000);
    } catch (error) {
      console.error('Error while submitting:', error);

      if (error.response) {
        const errorMessage = error.response.data;
        setSnackbar({
          severity: 'error',
          message: errorMessage,
          open: true,
        });
      } else {
        setSnackbar({
          severity: 'error',
          message: 'Registration failed. Please try again.',
          open: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    const selectedCountry = countryCodes.find((country) => country.code === value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      countryCode: selectedCountry ? selectedCountry.code : '',
    }));
  };



  return (
    <Container maxWidth="sm">
      <Typography style={{ color: '#36a79a' }} variant="h6" align="center" gutterBottom>
        Registration
      </Typography>


      <Typography variant="h5" align="center" gutterBottom>
        {<AccountCircleIcon color='success' />}

      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              color='success'
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!firstNameValid}
              helperText={!firstNameValid ? 'First name must be at least 3 characters.' : ''}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              color='success'
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!lastNameValid}
              helperText={!lastNameValid ? 'Last name must Entered.' : ''}
            />
          </Grid>





          <Grid item xs={12}>
            <TextField
              color='success'
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>


          <Grid item xs={6}>
            <TextField
              color='success'
              label="CountryCode"
              name="countryCode"
              value={formData.countryCode}
              fullWidth
              required
              select
              SelectProps={{
                value: formData.countryCode,
                onChange: handleSelectChange,
              }}
            >
              {countryCodes.map((country) => (
                <MenuItem key={country.name} value={country.code}>
                  {`${country.name} (${country.code})`}
                </MenuItem>
              ))}

            </TextField>


          </Grid>
          <Grid item xs={6}>
            <TextField
              color='success'
              label="Mobile Number"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              fullWidth
              required
              error={!mobileNumberValid}
              helperText={!mobileNumberValid ? 'Mobile number must be 10 digits' : ''}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              color='success'
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              color='success'
              label="Username"
              name="userName"
              value={formData.userName}
              placeholder={`${formData.firstName}${formData.lastName}${formData.mobileNo.slice(-2)}`}
              onChange={handleInputChange}
              fullWidth
              required
              error={!usernameValid}
              helperText={!usernameValid ? 'Username must be at least 8 characters.' : ''}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              color='success'
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              error={!passwordValid}
              helperText={!passwordValid ? 'Password must be at least 8 characters and include letters, numbers, and special characters.' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              color='success'
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
              error={(formData.confirmPassword.length >= 8 && formData.password !== formData.confirmPassword) || (!passwordValid && formData.confirmPassword.length >= 8)}
              helperText={
                (formData.confirmPassword.length >= 8 && formData.password !== formData.confirmPassword)
                  ? 'Passwords do not match.'
                  : (!passwordValid && formData.confirmPassword.length >= 8)
                    ? 'Password must be at least 8 characters and include letters, numbers, and special characters.'
                    : ''
              }
            />
          </Grid>



          <Grid item xs={12}>
            <TextField
              color='success'
              label="Street Address"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              color='success'
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              color='success'
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              color='success'
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </Grid>

        </Grid>
      </form>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Link href="/login">Already have an account? Login here</Link>
        </Grid>
        <Grid item>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
        </Grid>
      </Grid>


      <Grid container justifyContent="center">
        <Typography variant="caption" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} gksvp.com. All rights reserved.
        </Typography>
      </Grid>




      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        style={{ bottom: 'unset', right: '50%', transform: 'translateY(-50%)' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default RegistrationForm;
