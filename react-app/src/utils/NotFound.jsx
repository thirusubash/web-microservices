// src/NotFound.js
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const GhostHead = styled(Box)`
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  animation: ${float} 2s infinite ease-in-out;
  margin-bottom: 4px; /* Adjust this value to control space between head and body */

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    background: #321;
    border-radius: 50%;
    top: 30%;
  }

  &::before {
    left: 20%;
  }

  &::after {
    left: 65%;
  }
`;

const Ghost = styled(Box)`
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 50% 40% 100% 0%;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  animation: ${float} 2s infinite ease-in-out;
`;

const NotFound = () => {
  return (
    <Container sx={{ textAlign: "center", maxWidth: "600px", mt: 10 }}>
      <Typography
        color="warning.dark"
        variant="h1"
        component="div"
        sx={{
          fontSize: "10em",
          animation: `${shake} 1s infinite`,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        color="warning.dark"
        component="p"
        sx={{ my: 2 }}
      >
        Oops! The page you're looking for can't be found.
      </Typography>
      <Button variant="contained" color="warning" href="/">
        Go back home
      </Button>
      <Box mt={5} sx={{ textAlign: "center" }}>
        <GhostHead />
        <Ghost />
      </Box>
    </Container>
  );
};

export default NotFound;
