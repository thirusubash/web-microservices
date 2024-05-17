import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import designationRoleGroupApi from "@api/designationRoleGroupApi";


const CompanyDesignationsForm = ({ companyId, designationData, onSuccess, notification }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: false,
        defaultDesignation: false
    });

    useEffect(() => {
        if (designationData) {
            setFormData(designationData);
        }
    }, [designationData]);

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (formData.id) {
                await designationRoleGroupApi.update(companyId, "designations", formData.id, formData);  // Adjusted API call for clarity
            } else {
                await designationRoleGroupApi.create(companyId, "designations", formData);  // Adjusted API call for clarity
            }
            onSuccess();
            notification({ open: true, message: "Operation successful!", severity: "success" });
        } catch (error) {
            notification({ open: true, message: "Operation failed! " + error.message, severity: "error" });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.status}
                        onChange={handleChange}
                        name="status"
                    />
                }
                label="Status"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.defaultDesignation}
                        onChange={handleChange}
                        name="defaultDesignation"
                    />
                }
                label="Default Designation"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                Submit
            </Button>
        </form>
    );
};

export default CompanyDesignationsForm;
