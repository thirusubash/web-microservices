import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled, keyframes } from "@mui/system";

// Keyframes for scaling in and out
const scaleInOut = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1.3); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Create a styled Typography component with scaling effect
const AnimatedTypography = styled(Typography)(({ theme }) => ({
  display: "inline",
  whiteSpace: "pre",
  "& span": {
    display: "inline-block",
    background: `linear-gradient(190deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main}, ${theme.palette.warning.main})`,
    backgroundSize: "200% 200%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${scaleInOut} 1.5s ease-in-out infinite`,
    animationDelay: (props) => `${props.index * 0.1}s`, // Delay each character's animation
    transition: "transform 0.3s ease", // Smooth transition on hover
  },
  "&:hover span": {
    animation: "none", // Disable animation on hover
  },
}));

const AnimatedLogo = () => {
  const text = "gksvp.com";
  return (
    <AnimatedTypography variant="h6" noWrap component={Link} to="/">
      {text.split("").map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {char}
        </span>
      ))}
    </AnimatedTypography>
  );
};

export default AnimatedLogo;
