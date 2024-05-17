import React, { useState } from 'react'; // Import React and useState
import { Grid, TextField } from '@mui/material'; // Import Grid and TextField from @mui/material

export default function UpdateKyc() { // Function names should start with capital letters
    const [errors, setErrors] = useState({}); // Initialize state for errors

    const handleChange = (event) => {
        // Handle changes here
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div>updateKyc</div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    color="success"
                    margin="normal"
                    required
                    name="adhaar"
                    label="Adhaar"
                    id="adhaar"
                    onChange={handleChange}
                    error={!!errors.adhaar}
                    helperText={errors.adhaar}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    color="success"
                    margin="normal"
                    required
                    name="pan"
                    label="PAN"
                    id="pan"
                    onChange={handleChange}
                    error={!!errors.pan}
                    helperText={errors.pan}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    color="success"
                    margin="normal"
                    name="gstin"
                    label="GSTIN"
                    type="text"
                    id="gstin"
                    onChange={handleChange}
                    error={!!errors.gstin}
                    helperText={errors.gstin}
                />
            </Grid>
        </Grid>
    );
}
