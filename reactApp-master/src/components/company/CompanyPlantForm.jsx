import React, { useState } from 'react';
import { Button, Container, Grid,  TextField } from "@mui/material";
import companyApi from "@api/companyApi";
import PropTypes from 'prop-types';



function CompanyPlantForm({ companyId , plantData , onSuccess , notification }) {

    const [plant, setPlant] = useState({
        id: plantData?.id || null,
        name: plantData?.name || '',
        location: plantData?.location || '',
        capacity: plantData?.capacity || '',
        primaryProduct: plantData?.primaryProduct || '',
        machineryTypes: plantData?.machineryTypes || '',
        operationalHours: plantData?.operationalHours || null,
        qualityStandards: plantData?.qualityStandards || '',
        safetyStandards: plantData?.safetyStandards || '',
        environmentalImpact: plantData?.environmentalImpact || '',
        rawMaterialSource: plantData?.rawMaterialSource || '',
        email: plantData?.email || '',
        contactNumber: plantData?.contactNumber || '',
        storageCapacity: plantData?.storageCapacity || '',
        wasteDisposalSystem: plantData?.wasteDisposalSystem || '',
        regulationsCompliance: plantData?.regulationsCompliance || '',
        password: plantData?.password || '',
        createdDate: plantData?.createdDate || null,
        lastModifiedDate: plantData?.lastModifiedDate || null,
        status: plantData?.status || false
    });




    const [saveInProgress, setSaveInProgress] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlant(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();  // to prevent default form submission behavior
        setSaveInProgress(true);

        try {
            await companyApi.addPlant(companyId, plant);
            notification({
                open: true,
                message: "Saved successfully!",
                severity: "success"
            });
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            notification({
                open: true,
                message: "Failed to Save, Please try again !",
                severity: "error"
            });
        } finally {
            setSaveInProgress(false);
        }
    };



    return (
        <Container>

            <form noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={plant.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={plant.location}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Capacity"
                            name="capacity"
                            value={plant.capacity}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Primary Product"
                            name="primaryProduct"
                            value={plant.primaryProduct}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Machinery Types"
                            name="machineryTypes"
                            value={plant.machineryTypes}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Operational Hours"
                            name="operationalHours"
                            value={plant.operationalHours}
                            onChange={handleChange}
                            type="number"
                            InputProps={{
                                inputProps: { min: 0, max: 24 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Quality Standards"
                            name="qualityStandards"
                            value={plant.qualityStandards}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Safety Standards"
                            name="safetyStandards"
                            value={plant.safetyStandards}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Environmental Impact"
                            name="environmentalImpact"
                            value={plant.environmentalImpact}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Raw Material Source"
                            name="rawMaterialSource"
                            value={plant.rawMaterialSource}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={plant.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Contact Number"
                            name="contactNumber"
                            value={plant.contactNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Storage Capacity"
                            name="storageCapacity"
                            value={plant.storageCapacity}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Waste Disposal System"
                            name="wasteDisposalSystem"
                            value={plant.wasteDisposalSystem}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Regulations Compliance"
                            name="regulationsCompliance"
                            value={plant.regulationsCompliance}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" disabled={saveInProgress}>
                        {saveInProgress ? 'Saving...' : 'Save'}
                    </Button>

                </Grid>
            </form>
        </Container>
    );
}
CompanyPlantForm.propTypes = {
    plantData: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        status: PropTypes.bool
    }),
    onSuccess: PropTypes.func,
    notification: PropTypes.func.isRequired
};

export default CompanyPlantForm;
