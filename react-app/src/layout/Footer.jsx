import React, { useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PaymentIcon from "@mui/icons-material/Payment";
import { keyframes } from "@mui/system";

// Extract theme colors
const getThemeColors = (theme) => ({
  primaryLight: theme.palette.primary.light,
  primaryMain: theme.palette.primary.main,
  primaryDark: theme.palette.primary.dark,
  secondaryLight: theme.palette.secondary.light,
  secondaryMain: theme.palette.secondary.main,
  secondaryDark: theme.palette.secondary.dark,
});

const Footer = () => {
  const theme = useTheme();
  const colors = getThemeColors(theme);

  // Define keyframes with fixed colors
  const wave = keyframes`
    0% { transform: scale(1); }
    25% { transform: scale(1.1); }
    50% { transform: scale(1.2); }
    75% { transform: scale(1.1); }
    100% { transform: scale(1); }
  `;

  const colorChange = keyframes`
  0% { color: ${colors.primaryLight}; }
  10% { color: ${colors.primaryMain}; }
  20% { color: ${colors.primaryDark}; }
  30% { color: ${colors.secondaryLight}; }
  40% { color: ${colors.secondaryMain}; }
  50% { color: ${colors.secondaryDark}; }
  60% { color: ${colors.secondaryMain}; }
  70% { color: ${colors.secondaryLight}; }
  80% { color: ${colors.primaryDark}; }
  90% { color: ${colors.primaryMain}; }
  100% { color: ${colors.primaryLight}; }
`;

  const handleAction = useCallback((url) => {
    window.open(url, "_blank");
  }, []);

  return (
    <Box
      component="footer"
      align="center"
      bgcolor="initial"
      sx={{ padding: "1rem" }}
      mb={0}
      zIndex={1500}
    >
      {/* Floating Icons */}
      <IconButton
        onClick={() => handleAction(`tel:+919787048122`)}
        aria-label="Call us"
        color="primary"
        sx={{
          animation: `${wave} 5s ease-in-out infinite, ${colorChange} 6s ease-in-out infinite`,
          transition: 'transform 0.3s ease, color 0.3s ease',
        }}
      >
        <PhoneIcon />
      </IconButton>
      <IconButton
        onClick={() =>
          handleAction(
            `https://wa.me/+919787048122?text=Hi%20Subash,%20I%20want%20to%20know%20more%20about%20your%20products.`
          )
        }
        aria-label="Send us a WhatsApp message"
        color="primary"
        sx={{
          animation: `${wave} 5s ease-in-out infinite, ${colorChange} 6s ease-in-out infinite`,
          animationDelay: "0.5s",
          transition: 'transform 0.3s ease, color 0.3s ease',
        }}
      >
        <WhatsAppIcon />
      </IconButton>
      <IconButton
        onClick={() => handleAction(`mailto:support@gksvp.com`)}
        aria-label="Send us an email"
        color="primary"
        sx={{
          animation: `${wave} 5s ease-in-out infinite, ${colorChange} 6s ease-in-out infinite`,
          animationDelay: "1s",
          transition: 'transform 0.3s ease, color 0.3s ease',
        }}
      >
        <EmailIcon />
      </IconButton>
      <IconButton
        onClick={() => handleAction(`https://goo.gl/maps/xA1wdTRdidw4vUVcA`)}
        aria-label="Find us on Google Maps"
        color="primary"
        sx={{
          animation: `${wave} 5s ease-in-out infinite, ${colorChange} 6s ease-in-out infinite`,
          animationDelay: "1.5s",
          transition: 'transform 0.3s ease, color 0.3s ease',
        }}
      >
        <LocationOnIcon />
      </IconButton>
      <IconButton
        aria-label="Payment options"
        color="primary"
        sx={{
          animation: `${wave} 5s ease-in-out infinite, ${colorChange} 6s ease-in-out infinite`,
          animationDelay: "2s",
          transition: 'transform 0.3s ease, color 0.3s ease',
        }}
      >
        <PaymentIcon />
      </IconButton>

      {/* Social Media Links */}
      <Link
        href="https://www.facebook.com/profile.php?id=61561886770605&mibextid=ZbWKwL"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="none"
        aria-label="Visit us on Facebook"
      >
        <IconButton
          color="primary"
          sx={{
            animation: `${wave} 5s ease-in-out infinite, ${colorChange} 6s ease-in-out infinite`,
            animationDelay: "2.5s",
            transition: 'transform 0.3s ease, color 0.3s ease',
          }}
        >
          <FacebookIcon />
        </IconButton>
      </Link>
      <Link
        href="https://www.linkedin.com/in/thirumalaivasank"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="none"
        aria-label="Visit us on LinkedIn"
      >
        <IconButton
          color="primary"
          sx={{
            animation: `${wave} 5s ease-in-out infinite, ${colorChange} 6s ease-in-out infinite`,
            animationDelay: "3s",
            transition: 'transform 0.3s ease, color 0.3s ease',
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Link>

      {/* Copyright Notice */}
      <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 1 }}>
        © 2024 gksvp.com. All rights reserved.
      </Typography>
    </Box>
  );
};

export default React.memo(Footer);
