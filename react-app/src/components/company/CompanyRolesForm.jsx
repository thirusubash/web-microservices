import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import designationRoleGroupApi from "@api/designationRoleGroupApi";

const CompanyRolesForm = ({ companyId, roleData, onSuccess, notification }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: false,
        defaultRole: false // Changed defaultGroup to defaultRole
    });

    useEffect(() => {
        if (roleData) {
            setFormData(roleData);
        }
    }, [roleData]);

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
                await designationRoleGroupApi.update(companyId, "roles", formData.id, formData);
            } else {
                await designationRoleGroupApi.create(companyId,"roles",formData);
            }
            onSuccess();
            notification({ open: true, message: "Operation successful!", severity: "success" });
        } catch (error) {
            notification({ open: true, message: "Operation failed!"+error.message, severity: "error" });
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
                        checked={formData.defaultRole} // Changed defaultGroup to defaultRole
                        onChange={handleChange}
                        name="defaultRole" // Changed defaultGroup to defaultRole
                    />
                }
                label="Default Role"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                Submit
            </Button>
        </form>
    );
};

export default CompanyRolesForm;
