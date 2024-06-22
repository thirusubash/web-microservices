import React from 'react';
import {  Grid, Typography, Card,  Box } from "@mui/material";

function ViewEmployee({ employeeData }) {
    return (
        <Box maxWidth="100%" sx={{ mt: 5 }}>
            <Box elevation={3} sx={{ p: 3 }}>
                <Box sx={{ p: 3, backgroundColor: 'background.default' }}>

                    <Grid item xs={12} md={6}>
                        <Typography><strong>ID:</strong> {employeeData.id}</Typography>
                        <Typography><strong>First Name:</strong> {employeeData.firstName}</Typography>
                        <Typography><strong>Last Name:</strong> {employeeData.lastName}</Typography>
                        <Typography><strong>Employee Code:</strong> {employeeData.employeeCode}</Typography>
                        <Typography><strong>Email:</strong> {employeeData.email}</Typography>
                        <Typography><strong>Mobile Number:</strong> {employeeData.mobileNumber}</Typography>
                        <Typography><strong>Salary:</strong> {employeeData.salary}</Typography>
                        <Typography><strong>Status:</strong> {employeeData.status ? "Active" : "Inactive"}</Typography>
                        <Typography><strong>Hire Date:</strong> {employeeData.hireDate}</Typography>
                        <Typography><strong>Date of Birth:</strong> {employeeData.dateOfBirth}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography><strong>Gender:</strong> {employeeData.gender}</Typography>
                        <Typography><strong>Nationality:</strong> {employeeData.nationality}</Typography>
                        <Typography><strong>Marital Status:</strong> {employeeData.maritalStatus}</Typography>
                        <Typography><strong>Address:</strong> {employeeData.address}</Typography>
                        <Typography><strong>Emergency Contact:</strong> {employeeData.emergencyContact}</Typography>
                        <Typography><strong>Employment Type:</strong> {employeeData.employmentType}</Typography>
                        <Typography><strong>Reporting To:</strong> {employeeData.reportingTo}</Typography>
                        <Typography><strong>Education:</strong> {employeeData.education}</Typography>
                        <Typography><strong>Skills:</strong> {employeeData.skills}</Typography>
                    </Grid>

                </Box>

                <Box mt={4} sx={{ p: 3, backgroundColor: 'background.default' }}>
                    <Typography variant="h5" color="warning.main" sx={{ mb: 2 }}>
                        Plant Info
                    </Typography>
                    {employeeData.plant && (
                        <Box sx={{ pl: 3 }}>
                            <Typography><strong>ID:</strong> {employeeData.plant.id}</Typography>
                            <Typography><strong>Name:</strong> {employeeData.plant.name}</Typography>
                            <Typography><strong>Email:</strong> {employeeData.plant.email}</Typography>
                            <Typography><strong>Contact:</strong> {employeeData.plant.contactNumber}</Typography>
                        </Box>
                    )}
                </Box>

                <Box mt={4} sx={{ p: 3, backgroundColor: 'background.default' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" color="info.main">
                                Roles Info
                            </Typography>
                            {employeeData.roles && employeeData.roles.map((role, index) => (
                                <Card key={index} sx={{ mt: 2, p: 2 }}>
                                    <Typography><strong>ID:</strong> {role.id}</Typography>
                                    <Typography><strong>Name:</strong> {role.name}</Typography>
                                    <Typography><strong>Description:</strong> {role.description}</Typography>
                                </Card>
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" color="info.main">
                                Groups
                            </Typography>
                            {employeeData.groups && employeeData.groups.map((group, index) => (
                                <Card key={index} sx={{ mt: 2, p: 2 }}>
                                    <Typography><strong>ID:</strong> {group.id}</Typography>
                                    <Typography><strong>Name:</strong> {group.name}</Typography>
                                    <Typography><strong>Description:</strong> {group.description}</Typography>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default ViewEmployee;
