// src/components/TermsOfService.jsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';


const TermsOfService = () => {
  return (
    <Container maxWidth="md">
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Effective Date: 01/08/2025</strong>
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using gksvp.com, you agree to comply with and be bound by these Terms of Service.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Use of Our Services
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Eligibility:</strong> You must be at least 18 years old to use our services.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Prohibited Conduct:</strong> You agree not to engage in prohibited activities such as unauthorized access, data scraping, or abuse of our services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. User Accounts
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Account Termination:</strong> We reserve the right to terminate or suspend your account for any reason, including violations of these terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          All content and materials provided on our services are owned by <strong>gksvp.com </strong>or its licensors. You may not use, reproduce, or distribute any content without our prior written consent.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          To the fullest extent permitted by law, gksvp.com shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Indemnification
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to indemnify and hold gksvp.com harmless from any claims, liabilities, or expenses arising out of your use of our services or violation of these terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Changes to These Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We may update these Terms of Service from time to time. Your continued use of our services constitutes acceptance of the revised terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These terms shall be governed by and construed in accordance with the laws of Krishnagiri Tamilnadu.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms of Service, please contact us at <a href='mailto:thiruhcl2016@gmail.com' >thiruhcl2016@gmail.com</a>.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;
