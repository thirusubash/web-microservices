import React from 'react';
import { Typography, Link, Container } from '@mui/material';

export default function About() {
  return (
    <>
      <Container>
        <Typography variant="h2">About Us</Typography>
        <Typography variant="body1">
          Welcome to our website! We are a dedicated team of professionals committed to providing high-quality products and services.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact us at <Link color="inherit" href="mailto:info@gksvp.com">info@gksvp.com</Link> for more information.
        </Typography>
        <Copyright />
      </Container>
    </>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://gksvp.com">
        www.gksvp.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
