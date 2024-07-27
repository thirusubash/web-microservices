import React, { useCallback, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Link,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DOMPurify from "dompurify";
import axiosInstance from "api/axiosInstance";
import { Helmet } from "react-helmet-async";
import useSnackbar from "hooks/useSnackbar";
import Login from "./oauth/GoogleLogin";

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
  const { SnackbarComponent, showSnackbar } = useSnackbar();
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

  const [isAgreed, setIsAgreed] = useState(false); // New state for agreement

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setUserData((prevData) => {
      let updatedUserData = { ...prevData, [name]: sanitizedValue };

      if (name.startsWith("addresses")) {
        const [, index, subField] = name.split(".");
        updatedUserData.addresses = prevData.addresses.map((address, i) =>
          i === Number(index)
            ? { ...address, [subField]: sanitizedValue }
            : address
        );
      } else if (name.startsWith("mobileNumbers")) {
        const [, index, subField] = name.split(".");
        updatedUserData.mobileNumbers = prevData.mobileNumbers.map(
          (mobile, i) =>
            i === Number(index)
              ? { ...mobile, [subField]: sanitizedValue }
              : mobile
        );
      }

      // Update validation errors after state update
      setValidationErrors((prev) => {
        const errors = { ...prev };
        switch (name) {
          case "username":
            errors.username = !validateUsername(sanitizedValue);
            break;
          case "firstName":
            errors.firstName = !validateFirstName(sanitizedValue);
            break;
          case "lastName":
            errors.lastName = !validateLastName(sanitizedValue);
            break;
          case "password":
            errors.password = !validatePassword(sanitizedValue);
            errors.confirmPassword =
              updatedUserData.confirmPassword !== sanitizedValue;
            break;
          case "confirmPassword":
            errors.confirmPassword =
              sanitizedValue !== updatedUserData.password;
            break;
          case "mobileNumbers.0.number":
            errors.mobileNo = !validateMobileNumber(sanitizedValue);
            break;
          default:
            break;
        }
        return errors;
      });

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

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

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
        showSnackbar("Please correct the errors in the form.", "error");
        return;
      }

      if (!isAgreed) {
        showSnackbar("You must agree to the terms and conditions.", "error");
        return;
      }

      try {
        setLoading(true);
        console.log("Submitting data:", userData); // Debugging log
        const response = await axiosInstance.post(
          "/auth-service/v1/register",
          userData
        );
        console.log("Response:", response); // Debugging log
        showSnackbar("Registration successful!", "success");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
      } catch (error) {
        console.error("Error while submitting:", error);
        const errorMessage = error.response
          ? error.response.statusText
          : "Registration failed. Please try again.";
        showSnackbar(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    [userData, isAgreed, showSnackbar]
  );

  return (
    <>
      {SnackbarComponent}
      <Helmet>
        <title>Registration Form - gksvp.com</title>
        <meta
          name="description"
          content="Register for an account on gksvp.com"
        />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Registration Form",
            "url": "https://www.gksvp.com/register",
            "description": "Register for an account on gksvp.com",
            "applicationCategory": "Registration"
          }
          `}
        </script>
      </Helmet>

      <Box>
        <Typography textAlign="center">-- OR -- </Typography>
<Login/>
        <br></br>
      </Box>
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
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                id="dateOfBirth"
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
            <Grid item xs={12}>
              <TextField
                label="Username"
                id="username"
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
                id="password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!validationErrors.password}
                helperText={
                  validationErrors.password
                    ? "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
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
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!validationErrors.confirmPassword}
                helperText={
                  validationErrors.confirmPassword
                    ? "Passwords do not match."
                    : ""
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
                id="streetAddress"
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
                id="city"
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
            <Grid item xs={6}>
              <TextField
                label="State"
                id="state"
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
            <Grid item xs={12}>
              <TextField
                label="Postal Code"
                id="postalCode"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={isAgreed}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label={
              <>
                I agree to the{" "}
                <Link href="/privacy-policy" underline="none">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-and-conditions" underline="none">
                  Terms and Conditions
                </Link>
                .
              </>
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading || !isAgreed} // Disable if not agreed
            sx={{ mt: 3 }}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href="/signin" underline="none">
              Sign In
            </Link>
          </Typography>
        </form>
      </Container>
    </>
  );
};

export default RegistrationForm;
