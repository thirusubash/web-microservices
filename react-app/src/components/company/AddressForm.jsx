import React, { useEffect, useState } from 'react';
import { Grid, TextField, Container, Button } from '@mui/material';

const CompanyAddressForm = ({ companyId, address: initialAddress , onSuccess , notification }) => {
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [address, setAddress] = useState({
        localizedAddress: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateProvince: "",
        postalCode: "",
        country: "",
        county: "",
        district: "",
        neighborhood: "",
        building: "",
        floor: "",
        unit: "",
        landmark: ""
    });



    useEffect(() => {
        if (initialAddress) {
            setAddress(initialAddress);
        }
    }, [initialAddress]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setSaveInProgress(true);
        try {
            await companyApi.addAddress(companyId, address);
            notification({
                open: true,
                message: 'Address added successfully!',
                severity: 'success',
            });
            onSuccess(); // Call the onSuccess prop function after adding the address
        } catch (error) {
            notification({
                open: true,
                message: 'Error adding address!',
                severity: 'error',
            });
        } finally {
            setSaveInProgress(false);
        }
    };

    useEffect(() => {
        if (initialAddress) {
            setAddress(initialAddress);
        }
    }, [initialAddress]);



    return (
        <Container>
            <form noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Localized Address"
                            name="localizedAddress"
                            value={address.localizedAddress}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Address Line 1"
                            name="addressLine1"
                            value={address.addressLine1}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Address Line 2"
                            name="addressLine2"
                            value={address.addressLine2}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={address.city}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="State/Province"
                            name="stateProvince"
                            value={address.stateProvince}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Postal Code"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            value={address.country}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="County"
                            name="county"
                            value={address.county}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="District"
                            name="district"
                            value={address.district}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Neighborhood"
                            name="neighborhood"
                            value={address.neighborhood}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Building"
                            name="building"
                            value={address.building}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Floor"
                            name="floor"
                            value={address.floor}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Unit"
                            name="unit"
                            value={address.unit}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Landmark"
                            name="landmark"
                            value={address.landmark}
                            onChange={handleChange}
                        />
                    </Grid>



                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={saveInProgress}>
                            {saveInProgress ? 'Saving...' : 'Save'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CompanyAddressForm;
