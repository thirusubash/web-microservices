import React, { useCallback } from "react";
import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
import GpayIcon from "assets/icons/google-pay-mark_800.svg";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import DraftsRounded from "@mui/icons-material/DraftsRounded";
import WifiCalling3SharpIcon from "@mui/icons-material/WifiCalling3Sharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";

const Footer = () => {
  const num = "+919787048122";
  const name = "HI subash, ";
  const msg = "i want to know product details ";
  const supportmail = "support@gksvp.com";

  const openLocation = useCallback(() => {
    window.open("https://goo.gl/maps/xA1wdTRdidw4vUVcA", "_blank");
  }, []);

  const sendWhatsApp = useCallback(() => {
    const whatsappURL = `https://wa.me/${num}?text=${encodeURIComponent(
      name
    )}%20%20${encodeURIComponent(msg)}`;
    window.open(whatsappURL, "_blank");
  }, [num, name, msg]);

  const openFacebook = useCallback(() => {
    window.open("https://facebook.com", "_blank");
  }, []);

  const openLinkedIn = useCallback(() => {
    window.open("https://linkedin.com", "_blank");
  }, []);

  const sendMail = useCallback(() => {
    window.open(`mailto:${supportmail}`);
  }, [supportmail]);

  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "#00695f",
        mt: "auto",
        py: 2,
        px: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography
            color="primary.dark"
            variant="body1"
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
          >
            Connect with us:
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              window.location = "tel:+918940301427";
            }}
            aria-label="Call us via WiFi Calling"
          >
            <WifiCalling3SharpIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              window.location = "tel:+9104343291748";
            }}
            aria-label="Call us via Local Phone"
          >
            <LocalPhoneSharpIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              window.location = "tel:+916369042826";
            }}
            aria-label="Call us via Mobile Phone"
          >
            <CallSharpIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={sendWhatsApp}
            aria-label="Send us a WhatsApp message"
          >
            <WhatsAppIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={openFacebook} aria-label="Visit us on Facebook">
            <FacebookIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={openLinkedIn} aria-label="Visit us on LinkedIn">
            <LinkedInIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={sendMail} aria-label="Send us an email">
            <DraftsRounded color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={openLocation}
            aria-label="Find us on Google Maps"
          >
            <LocationOnIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="Google Pay">
            <img src={GpayIcon} alt="Google Pay" />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="primary.light" align="center">
            © 2023 Your Company. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(Footer);
