import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Box, Typography, Container, Grid } from '@mui/material';
import employeeApi from '@api/employeeApi';
import userApi from '@api/userApi';
import companyApi from '@api/companyApi';

const EmployeeForm = () => {
    const [companies, setCompanies] = useState([]);
    const [currentCompanyPlants, setCurrentCompanyPlants] = useState([]);
    const [previousCompanies, setPreviousCompanies] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: '',
        department: '',
        jobTitle: '',
        currentCompany: { id: 1, companyName: 'ABC Corp' },
        currentPlant: { id: 1, plantName: 'Plant A' },
        user: { id: 102 },
        companies: [{ id: 1, companyName: 'ABC Corp' }],
        plants: [{ id: 1, plantName: 'Plant A' }],
    });

    useEffect(() => {
        fetchUsers();
        fetchCompanies();
    }, []);

    const fetchUsers = async () => {
        const response = await userApi.get();
        setUsers(response);
    };

    const fetchCompanies = async () => {
        const response = await companyApi.get();
        setCompanies(response);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleUserSelect = (event, newValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            user: newValue,
        }));
    };

    const handleCurrentCompanySelect = (event, newValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            currentCompany: newValue,
            currentPlant: newValue?.plants?.[0] || null,
            companies: [{ id: newValue?.id, companyName: newValue?.companyName }],
            plants: newValue?.plants || [],
        }));
        setCurrentCompanyPlants(newValue?.plants || []);
    };

    const handlePreviousCompanySelect = async (event, newCompanies) => {
        setPreviousCompanies(newCompanies);

        for (const company of newCompanies) {
            try {
                const plants = await companyApi.getPlants(company.id);
                const updatedCompany = {
                    ...company,
                    plants: plants || [],
                };
                setPreviousCompanies((prevCompanies) => prevCompanies.map((prevCompany) => (prevCompany.id === updatedCompany.id ? updatedCompany : prevCompany)));
            } catch (error) {
                console.error(`Failed to fetch plants for company ${company.id}:`, error);
            }
        }
    };


    const handlePreviousPlantsSelect = (event, selectedPlants, companyId) => {
        const updatedPreviousCompanies = previousCompanies.map((company) =>
            company.id === companyId ? { ...company, plants: selectedPlants } : company
        );

        setPreviousCompanies(updatedPreviousCompanies);
    };

    const handleCurrentPlantSelect = (event, newValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            currentPlant: newValue,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedData = {
            employeeId: formData.employeeId,
            department: formData.department,
            jobTitle: formData.jobTitle,
            currentCompany: formData.currentCompany,
            currentPlant: formData.currentPlant,
            user: { id: formData.user.id },
            companies: formData.companies,
            plants: formData.plants,
        };

        console.log('Form data:', formattedData);
        const response = await employeeApi.create(formattedData);
        console.log('Response:', response);
    };

    return (
        <Container>
            <Box my={3}>
                <Typography variant="h4">Create Employee</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Employee ID"
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Department"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Job Title"
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={users}
                        getOptionLabel={(user) => user.userName}
                        onChange={handleUserSelect}
                        renderInput={(params) => <TextField {...params} label="Select User" fullWidth margin="normal" />}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={companies}
                        getOptionLabel={(company) => company.companyName}
                        onChange={handleCurrentCompanySelect}
                        renderInput={(params) => <TextField {...params} label="Current Company" fullWidth margin="normal" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={currentCompanyPlants}
                        getOptionLabel={(plant) => plant.plantName}
                        value={formData.currentPlant}
                        onChange={handleCurrentPlantSelect}
                        renderInput={(params) => <TextField {...params} label="Current Plant" fullWidth margin="normal" />}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        multiple
                        options={companies}
                        getOptionLabel={(company) => company.companyName}
                        onChange={handlePreviousCompanySelect}
                        renderInput={(params) => <TextField {...params} label="Previous Companies" fullWidth margin="normal" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {previousCompanies.map((prevCompany) => (
                        <Box key={prevCompany.id} my={1}>
                            <Typography variant="subtitle1">{prevCompany.companyName}</Typography>
                            <Typography variant="body2">{prevCompany.companyDetails}</Typography>
                            <Autocomplete
                                multiple
                                options={prevCompany.plants || []}
                                getOptionLabel={(plant) => plant.plantName}
                                value={prevCompany.plants || []}
                                onChange={(event, selectedPlants) => handlePreviousPlantsSelect(event, selectedPlants, prevCompany.id)}
                                renderInput={(params) => <TextField {...params} label="Previous Plants" fullWidth margin="normal" />}
                            />
                        </Box>
                    ))}
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={handleSubmit} type="button" variant="contained" color="primary">
                        Create Employee
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default EmployeeForm;
