// src/components/PrivacyPolicy.jsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Effective Date: 25/07/2024</strong>
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to gksvp.com! We value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, and share your information when you use our services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Personal Information:</strong> This may include your name,
          email address, phone number, and other details you provide.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Usage Data:</strong> We collect information about how you use
          our services, including your IP address, browser type, and interaction
          with our site.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Cookies:</strong> We use cookies and similar technologies to
          enhance your experience. You can control cookies through your browser
          settings.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>To Provide and Improve Services:</strong> We use your
          information to deliver and enhance our services.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>To Communicate:</strong> We may use your email address to send
          updates, promotions, or other information.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>To Comply with Legal Obligations:</strong> We may use your
          information to comply with laws and regulations.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. How We Share Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Third-Party Services:</strong> We may share your information
          with third-party service providers who assist us in operating our
          services.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Legal Requirements:</strong> We may disclose your information
          if required by law or to protect our rights.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement various security measures to protect your information.
          However, no method of transmission over the internet is completely
          secure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Access and Correction:</strong> You can request access to or
          correction of your personal data.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Deletion:</strong> You can request us to delete your account
          and remove your personal data. This will be done if all conditions are
          met.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Opt-Out:</strong> You can opt-out of receiving marketing
          communications from us.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. The revised
          policy will be effective when posted on our website.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us
          at <a href="mailto:thiruhcl2016@gmail.com">thiruhcl2016@gmail.com</a>.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
