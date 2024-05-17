import React from 'react';
import { Container, Paper, Typography, Grid } from '@mui/material';

function CompanyDashboard() {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                Company Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Sample Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6" gutterBottom>
                            Total Employees
                        </Typography>
                        <Typography variant="h3">
                            100
                        </Typography>
                    </Paper>
                </Grid>

                {/* Sample Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6" gutterBottom>
                            Total Products
                        </Typography>
                        <Typography variant="h3">
                            50
                        </Typography>
                    </Paper>
                </Grid>

                {/* Sample Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6" gutterBottom>
                            Monthly Revenue
                        </Typography>
                        <Typography variant="h3">
                            $5000
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CompanyDashboard;
