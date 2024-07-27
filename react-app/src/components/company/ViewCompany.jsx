import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";

import axiosInstance from "api/axiosInstance";
import GlowingCircularProgress from "utils/GlowingCircularProgress";

function ViewCompany({ companyId, notification }) {
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axiosInstance.get(
          `/company-service/${companyId}`
        );
        setCompanyData(response.data);
      } catch (error) {
        notification({
          open: true,
          message: error.message,
          severity: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [companyId, notification]);

  if (isLoading) {
    return <GlowingCircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h5">Company Information</Typography>
        <Typography>
          <strong>Name:</strong> {companyData.companyName}
        </Typography>
        <Typography>
          <strong>Business Type:</strong> {companyData.businessType}
        </Typography>
        <Typography>
          <strong>Email:</strong> {companyData.email}
        </Typography>
        <Typography>
          <strong>Contact Number:</strong> {companyData.contactNumber}
        </Typography>
        <Typography>
          <strong>Registration Number:</strong> {companyData.registrationNumber}
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5">Addresses</Typography>
        {companyData.companyAddresses &&
          companyData.companyAddresses.map((address, index) => (
            <Box key={index} mb={2}>
              <Typography>
                <strong>Localized Address:</strong> {address.localizedAddress}
              </Typography>
              <Typography>
                <strong>City:</strong> {address.city}
              </Typography>
              <Typography>
                <strong>State:</strong> {address.stateProvince}
              </Typography>
              <Typography>
                <strong>Postal Code:</strong> {address.postalCode}
              </Typography>
              <Typography>
                <strong>Country:</strong> {address.country}
              </Typography>
            </Box>
          ))}
      </Box>

      {/* Uncomment the following sections when displaying plants and products */}
      {/* <Box mb={4}>
                <Typography variant="h5">Plants</Typography>
                {companyData.plants && companyData.plants.map((plant, index) => (
                    <Box key={index} mb={2}>
                        <Typography><strong>Name:</strong> {plant.name}</Typography>
                        <Typography><strong>Capacity:</strong> {plant.capacity}</Typography>
                        <Typography><strong>Email:</strong> {plant.email}</Typography>
                        <Typography><strong>Contact Number:</strong> {plant.contactNumber}</Typography>
                    </Box>
                ))}
            </Box>

            <Box mb={4}>
                <Typography variant="h5">Products</Typography>
                {companyData.products && companyData.products.map((product, index) => (
                    <Box key={index} mb={2}>
                        <Typography><strong>Name:</strong> {product.name}</Typography>
                        <Typography><strong>Price:</strong> ${product.price}</Typography>
                        <Typography><strong>Brand:</strong> {product.brand}</Typography>
                        <Typography><strong>Stock Quantity:</strong> {product.stockQuantity}</Typography>
                    </Box>
                ))}
            </Box> */}
    </Container>
  );
}

export default ViewCompany;
