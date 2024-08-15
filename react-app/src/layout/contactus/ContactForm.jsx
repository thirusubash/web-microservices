import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import DOMPurify from "dompurify";



// Function to validate international mobile number
const validateMobileNumber = (number) => {
  // Regex for international phone numbers
  return /^\+\d{1,3}\d{4,14}$/.test(number);
};


function ContactForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    countryCode: "+1", // Default country code
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");


  const fieldAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { duration: 500 },
  });

  const buttonAnimation = useSpring({
    opacity: submitted ? 0 : 1,
    transform: submitted ? "scale(0.8)" : "scale(1)",
    config: { duration: 500 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
  };


  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.name) newErrors.name = "Name is required";
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formValues.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!validateMobileNumber(formValues.mobile)) {
      newErrors.mobile = "Please enter a valid number with countrycode(eg. +91).";
    }
    if (!formValues.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setSubmitted(true);
      setFeedbackMessage("Sending your message...");
    

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await onSubmit(formValues);
        setFeedbackMessage("Message sent successfully!");
      } catch (error) {
        console.error("Error sending message:", error);
        setFeedbackMessage("Error sending message. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        py: 4,
        position: "relative",
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: 550 }}>
        <Grid item xs={12}>
          <animated.div style={fieldAnimation}>
            <TextField required
              name="name"
              value={formValues.name}
              onChange={handleChange}
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
              aria-labelledby="name-field-label"
              aria-describedby="name-field-helper"
            />
          </animated.div>
        </Grid>
        <Grid item xs={12}>
          <animated.div style={fieldAnimation}>
            <TextField required
              name="email"
              value={formValues.email}
              onChange={handleChange}
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              error={!!errors.email}
              helperText={errors.email}
              aria-labelledby="email-field-label"
              aria-describedby="email-field-helper"
            />
          </animated.div>
        </Grid>
        <Grid item xs={12}>
          <animated.div style={fieldAnimation}>
          <Tooltip title="Enter the phone number with country code (e.g., +919787048122)" arrow>
              <TextField required
                name="mobile"
                value={formValues.mobile}
                onChange={handleChange}
                fullWidth
                label="Mobile Number"
                variant="outlined"
                margin="normal"
                type="tel"
                error={!!errors.mobile}
                helperText={errors.mobile}
                aria-labelledby="mobile-field-label"
                aria-describedby="mobile-field-helper"
              />
            </Tooltip>
          </animated.div>
        </Grid>
        <Grid item xs={12}>
          <animated.div style={fieldAnimation}>
            <TextField required
              name="message"
              value={formValues.message}
              onChange={handleChange}
              fullWidth
              label="Message"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message}
              aria-labelledby="message-field-label"
              aria-describedby="message-field-helper"
            />
          </animated.div>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <animated.div style={buttonAnimation}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              aria-live="assertive"
              aria-describedby="feedback-message"
            >
              {feedbackMessage || "Send Message"}
            </Button>
          </animated.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactForm;
