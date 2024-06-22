import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade"; // Import Fade from Material-UI
import { CallSharp, WhatsApp } from "@mui/icons-material";
import { keyframes, styled } from "@mui/system";

const vibrateAnimation = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
`;

// StyledFab to apply animations
const StyledFab = styled(Fab)`
  animation: ${vibrateAnimation} 0.1s ease-in-out;
`;

const FloatingButtons = () => {
  const handleButtonClick = () => {
    // Add your custom logic here (e.g., API calls, etc.)
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "16px", // Adjusted from "400px" for better visibility
        right: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Fade in timeout={1}>
        {/* Fade in over 1 second */}
        <StyledFab color="info" aria-label="add" onClick={handleButtonClick}>
          <CallSharp />
        </StyledFab>
      </Fade>
      <Fade in timeout={1}>
        {/* Fade in over 1.2 seconds (slightly delayed) */}
        <StyledFab
          color="primary"
          aria-label="edit"
          sx={{ mt: 1 }} // Add margin top
          onClick={handleButtonClick}
        >
          <WhatsApp />
        </StyledFab>
      </Fade>
    </Box>
  );
};

export default FloatingButtons;
