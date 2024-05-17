import React from 'react';
import { Typography, Grid, Paper } from "@mui/material";

const ViewBankDetails = ({ bankDetailData = {} }) => {
    if (!bankDetailData) {
        return <Typography variant="body1">Loading bank details...</Typography>;
    }
    return (
        <Paper elevation={3} style={{ padding: '16px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>Account Type:</strong> {bankDetailData.accountType || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>Account Number:</strong> {bankDetailData.accountNumber || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>Bank Name:</strong> {bankDetailData.bankName || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>IFSC:</strong> {bankDetailData.ifsc  || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>Primary Account:</strong> {bankDetailData.primaryAccount ? "Yes" : "No"}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>Status:</strong> {bankDetailData.status || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>UPI ID:</strong> {bankDetailData.upiId || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>QR Code:</strong> {bankDetailData.qrCodeUrl || "N/A"}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};
ViewBankDetails.defaultProps = {
    bankDetailData: {}
};
export default ViewBankDetails;
