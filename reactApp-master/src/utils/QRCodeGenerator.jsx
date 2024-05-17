import React, { useRef } from "react";
import QRCode from 'qrcode.react';
import { Button, Container, Link, Typography } from "@mui/material";

function QRCodeGenerator({uuid, url}) {
  const [inputValue, setInputValue] = React.useState(uuid || '189de737-c93a-4f5a-8b68-6f4ca9941912');
  const [labelText, setLabelText] = React.useState(url || 'https://gksvp.com/scan');
  const printRef = useRef();
  const logoURL = '/logo192.png';

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print QR</title>');
    printWindow.document.write(`
        <style>
            @media print {
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    padding: 0;
                }
                img {
                    display: block;
                    margin: auto;
                    max-width: 90%;
                    max-height: 65vh;
                }
                a, a:link, a:visited {
    text-decoration: none;
}

            }
        </style>
    `);
    printWindow.document.write('</head><body>');

    const qrCanvas = document.querySelector("canvas");
    if (qrCanvas) {
      printWindow.document.write('<img src="' + qrCanvas.toDataURL() + '" />');
      printWindow.document.write('<a href="' + labelText + '">' + labelText + '</a>');
    } else {
      printWindow.document.write('<div>QR code not generated!</div>');
    }

    printWindow.document.write('</body></html>');
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Button variant="contained" color="primary" onClick={handlePrint}>Print QR Code</Button>
      <div ref={printRef} style={{ textAlign: 'center', marginTop: '5px' }}>
        <QRCode
          value={inputValue}
          size={350}
          fgColor="#006400"    // Dark Green for the QR code
          bgColor="#FFFFFF"    // White background for the QR code
          renderAs="canvas"
          errorCorrectionLevel="H"
          imageSettings={{
            src: logoURL,
            x: null,
            y: null,
            excavate: true,
          }}
        />
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          <Link href={labelText} color="secondary" underline="none">
            {labelText}
          </Link>
        </Typography>
      </div>
    </Container>
  );
}

export default QRCodeGenerator;
