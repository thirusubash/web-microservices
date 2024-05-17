import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Container, Paper, Typography, Box, IconButton } from '@mui/material';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

const QRCodeScanner = () => {
  const [data, setData] = useState('No result');
  const [facingMode, setFacingMode] = useState('user');

  const handleScan = (data) => {
    if (data) {
      setData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const switchCamera = () => {
    setFacingMode(prevMode => prevMode === 'environment' ? 'user' : 'environment');
  };

  const cameraConstraints = {
    audio: false, // We don't want audio in this case, just video.
    video: {
      // Width of the video feed
      width: {
        ideal: 1280,  // Preferred width
        min: 640,     // Minimum acceptable width
        max: 1920     // Maximum acceptable width
      },
      // Height of the video feed
      height: {
        ideal: 720,   // Preferred height
        min: 480,     // Minimum acceptable height
        max: 1080     // Maximum acceptable height
      },
      // Specifies which camera to use on a device with multiple cameras
      facingMode: facingMode,  // 'user' for front camera, 'environment' for back camera
      // Frame rate of the video feed
      frameRate: {
        ideal: 30,    // Preferred frame rate in frames per second
        min: 10,      // Minimum acceptable frame rate
        max: 60       // Maximum acceptable frame rate
      },
      // ... and you can add more constraints as needed
    }
  };


  return (
    <Container>
      <Paper elevation={3} style={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          QR Code Scanner
        </Typography>

        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
          constraints={cameraConstraints} // Use constraints prop
        />

        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <IconButton color="primary" onClick={switchCamera}>
            <CameraswitchIcon />
          </IconButton>
        </Box>

        <Typography variant="body1" align="center" style={{ marginTop: '2rem' }}>
          {data}
        </Typography>
      </Paper>
    </Container>
  );
}

export default QRCodeScanner;
