import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Box, Tooltip } from "@mui/material";
import {
  LocalPhone,
  WhatsApp,
  Email,
  LinkedIn,
  LocationOn,
} from "@mui/icons-material";
import { keyframes } from "@mui/system";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import { animated, useSpring } from "@react-spring/web";
import axiosInstance from "api/axiosInstance";
import ContactForm from "./ContactForm";
import { MAPS_API_CONFIG } from "api/apiConfig";

// Keyframe animations
const landingBounce = keyframes`
  0% { transform: translateY(-100vh); opacity: 0; }
  50% { transform: translateY(30px); opacity: 1; }
  100% { transform: translateY(0); }
`;

const floatingEffect = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const envelopeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.8) rotate(-45deg); }
  100% { transform: scale(0.5) translateX(200px) translateY(-200px); opacity: 0; }
`;

function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude},${longitude}`);
        },
        () => {
          setUserLocation(null);
        }
      );
    } else {
      setUserLocation(null);
    }
  }, []);

  const contactDetailAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { duration: 500 },
  });

  const handleSubmit = async (formValues) => {
    setSubmitted(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axiosInstance.post("/notification-service/contactus", formValues);
      setSubmitSuccess(true);
      console.log("Message sent successfully");
    } catch (error) {
      setSubmitSuccess(false);
      console.error("Error sending message:", error);
    }
  };

  const defaultLocation = "12.7303867,77.3192191";
  const destination = "12.465137,78.3167688";
  const origin = userLocation || defaultLocation;
  const mapSrc = `https://www.google.com/maps/embed/v1/directions?origin=${origin}&destination=${destination}&key=${MAPS_API_CONFIG.googleMapsApiKey}`;

  const phoneAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(200px)" },
    delay: 200,
  });
  const whatsappAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(150px)" },
    delay: 300,
  });
  const emailAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(150px)" },
    delay: 400,
  });
  const linkedinAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(150px)" },
    delay: 500,
  });
  const addressAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(150px)" },
    delay: 500,
  });

  const contactItems = [
    {
      icon: <LocalPhone color="primary" />,
      detail: "Call: 9787048122",
      link: "tel:+9787048122",
      animation: phoneAnimation,
    },
    {
      icon: <WhatsApp color="success" />,
      detail: "WhatsApp: 9787048122",
      link: "https://wa.me/9787048122",
      animation: whatsappAnimation,
    },
    {
      icon: <Email color="info" />,
      detail: "Email: support@gksvp.com",
      link: "mailto:support@gksvp.com",
      animation: emailAnimation,
    },
    {
      icon: <LinkedIn color="info" />,
      detail: "LinkedIn Profile",
      link: "https://www.linkedin.com/in/thirumalaivasank/",
      animation: linkedinAnimation,
    },
    {
      icon: <LocationOn color="error" />,
      detail:
        "4/14, Srinivasapuram Village, Jagadevi Post, Krishnagiri, Tamil Nadu 635203",
      link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "GkGroups Pvt Ltd"
      )}`,
      animation: addressAnimation,
    },
  ];

  return (
    <Container
      component="main"
      sx={{
        py: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: `${landingBounce} 1s ease-out`,
      }}
    >
      {!submitted ? (
        <Paper
          elevation={12}
          sx={{
            p: 4,
            maxWidth: 600,
            borderRadius: 3,
            boxShadow:
              "0px 10px 20px rgba(0, 0, 0, 0.2), 0px 0px 0px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: `${floatingEffect} 3s ease-in-out infinite`,
            transition: "box-shadow 0.3s ease, transform 0.3s ease",
            "&:hover": {
              boxShadow:
                "0px 15px 30px rgba(0, 0, 0, 0.3), 0px 0px 0px rgba(0, 0, 0, 0.02)",
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography
            color="primary.dark"
            variant="h4"
            align="center"
            gutterBottom
          >
            Contact Us
          </Typography>
          <ContactForm onSubmit={handleSubmit} />
        </Paper>
      ) : (
        <Paper
          elevation={12}
          sx={{
            p: 4,
            maxWidth: 600,
            borderRadius: 3,
            boxShadow:
              "0px 10px 20px rgba(0, 0, 0, 0.2), 0px 0px 0px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            animation: `${envelopeAnimation} 1.5s ease-out`,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Message Sent
          </Typography>
          {submitSuccess ? (
  <>
    <MarkEmailReadRoundedIcon
      sx={{ fontSize: 60, color: "success.main" }}
    />
    <Typography color="success.light" variant="h6" align="center" gutterBottom>
      Your message has been sent successfully! We will get back to you shortly.
    </Typography>
  </>
) : (
  <>
    <SmsFailedIcon sx={{ fontSize: 60, color: "error.main" }} />
    <Typography color="error.light" variant="h6" align="center" gutterBottom>
      Oops! Something went wrong. Please try again or contact us through the other available channels.
    </Typography>
  </>
)}

          
        </Paper>
      )}

      <animated.div style={contactDetailAnimation} sx={{ mt: 4 }}>
        <Box
          sx={{ mt: 2, textAlign: "center" }}
          display="flex"
          justifyContent="space-around"
          flexWrap="wrap"
        >
          {contactItems.map((item, index) => (
            <animated.div style={item.animation} key={index}>
              <Tooltip title={item.detail} arrow>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    cursor: "pointer",
                    mx: 2,
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => window.open(item.link, "_blank")}
                >
                  {item.icon}
                </Box>
              </Tooltip>
            </animated.div>
          ))}
        </Box>
      </animated.div>
      <Box sx={{ mt: 4, width: "100%", height: 400 }}>
        <iframe
          title="Map Location"
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </Box>
    </Container>
  );
}

export default ContactUsPage;
