import React from "react";
import { CircularProgress } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const glow = keyframes`
  0% { box-shadow: 0 0 8px #4ecc82; }
  100% { box-shadow: 0 0 20px #06532f; }
`;

const StyledCircularProgress = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    border: 4px solid rgba(255, 255, 255, 0.3);
    animation: ${glow} 1.5s infinite alternate;
    border-radius: 50%;
  }
`;

const GlowingCircularProgress = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <StyledCircularProgress />
    </div>
  );
};

export default GlowingCircularProgress;
