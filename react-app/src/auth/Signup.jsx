import React, { useState, useCallback } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Link,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DOMPurify from "dompurify";
import axiosInstance from "api/axiosInstance";

const countryCodes = [
  {
    name: "India",
    code: "+91",
  },
];

// Validation functions
const validateUsername = (value) => value.length >= 8;
const validateFirstName = (value) => value.length >= 3;
const validateLastName = (value) => value.length >= 1;
const validateMobileNumber = (value) => /^\d{10}$/.test(value);
const validatePassword = (value) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);

const RegistrationForm = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [isLoading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    mobileNumbers: [
      {
        number: "",
        countryCode: "+91",
        countryName: "India",
        isPrimary: true,
      },
    ],
    dateOfBirth: "",
    username: "",
    password: "",
    confirmPassword: "",
    addresses: [
      {
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
      },
    ],
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setUserData((prevData) => {
      let updatedUserData = { ...prevData, [name]: sanitizedValue };

      if (name.startsWith("addresses")) {
        const [_, index, subField] = name.split(".");
        updatedUserData.addresses = prevData.addresses.map((address, i) =>
          i === Number(index)
            ? { ...address, [subField]: sanitizedValue }
            : address
        );
      } else if (name.startsWith("mobileNumbers")) {
        const [_, index, subField] = name.split(".");
        updatedUserData.mobileNumbers = prevData.mobileNumbers.map(
          (mobile, i) =>
            i === Number(index)
              ? { ...mobile, [subField]: sanitizedValue }
              : mobile
        );
      }

      // Update validation errors after state update
      switch (name) {
        case "username":
          setValidationErrors((prev) => ({
            ...prev,
            username: !validateUsername(sanitizedValue),
          }));
          break;
        case "firstName":
          setValidationErrors((prev) => ({
            ...prev,
            firstName: !validateFirstName(sanitizedValue),
          }));
          break;
        case "lastName":
          setValidationErrors((prev) => ({
            ...prev,
            lastName: !validateLastName(sanitizedValue),
          }));
          break;
        case "password":
          setValidationErrors((prev) => ({
            ...prev,
            password: !validatePassword(sanitizedValue),
            confirmPassword: updatedUserData.confirmPassword !== sanitizedValue,
          }));
          break;
        case "confirmPassword":
          setValidationErrors((prev) => ({
            ...prev,
            confirmPassword: sanitizedValue !== updatedUserData.password,
          }));
          break;
        case "mobileNumbers.0.number":
          setValidationErrors((prev) => ({
            ...prev,
            mobileNo: !validateMobileNumber(sanitizedValue),
          }));
          break;
        default:
          break;
      }

      return updatedUserData;
    });
  }, []);

  const handleSelectChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const newErrors = {
        firstName: !validateFirstName(userData.firstName),
        lastName: !validateLastName(userData.lastName),
        username: !validateUsername(userData.username),
        password: !validatePassword(userData.password),
        confirmPassword: userData.confirmPassword !== userData.password,
        mobileNo: !validateMobileNumber(userData.mobileNumbers[0].number),
      };

      setValidationErrors(newErrors);

      if (Object.values(newErrors).some((error) => error)) {
        setSnackbar({
          severity: "error",
          message: "Please correct the errors in the form.",
          open: true,
        });
        return;
      }

      try {
        setLoading(true);
        const response = await axiosInstance.post(
          "https://localhost:8080/auth-service/v1/register",
          userData
        );
        setSnackbar({
          severity: "success",
          message: "Registration successful!",
          open: true,
        });
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
      } catch (error) {
        console.error("Error while submitting:", error);
        const errorMessage = error.response
          ? error.response.data
          : "Registration failed. Please try again.";
        setSnackbar({
          severity: "error",
          message: errorMessage,
          open: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [userData]
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" align="center" color="primary" gutterBottom>
        Registration
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        <AccountCircleIcon color="secondary" />
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!validationErrors.firstName}
              helperText={
                validationErrors.firstName
                  ? "First name must be at least 3 characters."
                  : ""
              }
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!validationErrors.lastName}
              helperText={
                validationErrors.lastName ? "Last name is required." : ""
              }
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Country Code"
              name="countryCode"
              id="countryCode"
              value={userData.countryCode}
              onChange={handleSelectChange}
              fullWidth
              required
              select
              InputLabelProps={{
                shrink: true,
              }}
            >
              {countryCodes.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {`${country.name} (${country.code})`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mobile Number"
              id="mobileNumber"
              name="mobileNumbers.0.number"
              value={userData.mobileNumbers[0].number}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!validationErrors.mobileNo}
              helperText={
                validationErrors.mobileNo
                  ? "Mobile number must be 10 digits."
                  : ""
              }
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="tel-national"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={userData.dateOfBirth}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="bday"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!validationErrors.username}
              helperText={
                validationErrors.username
                  ? "Username must be at least 8 characters."
                  : ""
              }
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!validationErrors.password}
              helperText={
                validationErrors.password
                  ? "Password must be at least 8 characters, include 1 letter, 1 number, and 1 special character."
                  : ""
              }
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!validationErrors.confirmPassword}
              helperText={
                validationErrors.confirmPassword ? "Passwords must match." : ""
              }
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street Address"
              name="addresses.0.streetAddress"
              value={userData.addresses[0].streetAddress}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="street-address"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              name="addresses.0.city"
              value={userData.addresses[0].city}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="address-level2"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="State"
              name="addresses.0.state"
              value={userData.addresses[0].state}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="address-level1"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Postal Code"
              name="addresses.0.postalCode"
              value={userData.addresses[0].postalCode}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="postal-code"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          style={{ marginTop: "16px" }}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "16px" }}
        >
          Already have an account?{" "}
          <Link href="/signin" underline="hover">
            Sign In
          </Link>
        </Typography>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegistrationForm;
