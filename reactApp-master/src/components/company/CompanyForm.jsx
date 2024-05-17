import React, { useState} from 'react';
import { Container, TextField, Button, FormControl, FormGroup, Box} from '@mui/material';
import companyApi from "@api/companyApi";
import Loading from "@components/layout/Loading";



const CompanyForm = ({ company, mode ,onSuccess, notification }) => {
    console.log(company + mode);
    const [errors, setErrors] = useState({ password: '' });
    const [isLoading, setIsLoading] = useState(false)
    const initialData = {id:null,
        companyId: "",
        password: null,
        companyName: "",
        businessType: "",
        registrationNumber: "",
        registrationAuthority: "  ",
        dateOfIncorporation: "",
        businessActivities: "",
        industryClassification: "",
        financialStatements: "",
        contactNumber: "",
        email: "",
        llpNumber: "",
        trademarkAndIP: "",
        insuranceInformation: "",
        tradeLicenseNumber: null,
        healthPermitNumber: null,
        gstin: "",
        tin:""
    };

    const validateFields = () => {
        let isValid = true;
        let validationErrors = {};

        if (!companyData.companyName) {
            isValid = false;
            validationErrors.companyName = 'Company Name is required';
        }
        if (!companyData.contactNumber) {
            isValid = false;
            validationErrors.contactNumber = 'Contact Number is required';
        }
        if (!companyData.email) {
            isValid = false;
            validationErrors.email = 'Email is required';
        }
        if (!companyData.llpNumber) {
            isValid = false;
            validationErrors.llpNumber = 'llpNumber is required';
        }
        if (!companyData.trademarkAndIP) {
            isValid = false;
            validationErrors.trademarkAndIP = 'trademarkAndIP is required';
        }
        if (!companyData.insuranceInformation) {
            isValid = false;
            validationErrors.insuranceInformation = 'Insurance Information is required';
        }
        if (!companyData.businessType) {
            isValid = false;
            validationErrors.businessType = 'Business Type is required';
        }
        if (!companyData.registrationNumber) {
            isValid = false;
            validationErrors.registrationNumber = 'Registration Number is required';
        }
        if (!companyData.dateOfIncorporation) {
            isValid = false;
            validationErrors.dateOfIncorporation = 'Date of Incorporation is required';
        }
        if (!companyData.businessActivities) {
            isValid = false;
            validationErrors.businessActivities = 'Business Activities is required';
        }
        if (!companyData.industryClassification) {
            isValid = false;
            validationErrors.industryClassification = 'Industry Classification is required';
        }
        if (!companyData.gstin) {
            isValid = false;
            validationErrors.gstin = 'GSTIN is required';
        }
        if (!companyData.pan) {
            isValid = false;
            validationErrors.pan = 'PAN is required';
        }
        // ... add validations for any other fields ...

        setErrors(validationErrors);
        return isValid;
    };


    const [companyData, setCompanyData] = useState(mode === 'add' ? initialData : company);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCompanyData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const areRequiredFieldsFilled = () => {
        return companyData.companyName && companyData.contactNumber && companyData.email;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }
        setIsLoading(true);
        try {
            if (mode === "update") {
                await companyApi.update(company.id, companyData);
            } else {
                console.log("company data",companyData);
                await companyApi.create(companyData);
            }
            notification({
                open: true,
                message: "Company successfully " + (mode === "update" ? "updated" : "registered") + "!",
                severity: "success"
            });
            if (onSuccess) {
                // console.log('CompanyForm - invoking onSuccess...');
                onSuccess();
            }
        } catch (error) {
            notification({
                open: true,
                message: "Error " + (mode === "update" ? "updating" : "registering") + " company: " + error.message,
                severity: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }
    return (
        <Container>
            <Box>
                <FormControl>
                    <FormGroup sx={{ padding: '2px' }}>
                        <Box display="flex" flexWrap="wrap" gap={2}>
                            <TextField
                                label="Company Name"
                                name="companyName"
                                value={companyData.companyName}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                error={!!errors.companyName}
                                helperText={errors.companyName || ''}
                            />

                            <TextField
                                label="Contact Number"
                                name="contactNumber"
                                value={companyData.contactNumber}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                error={!!errors.contactNumber}
                                helperText={errors.contactNumber || ''}
                            />

                            <TextField
                                label="Email"
                                name="email"
                                value={companyData.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                error={!!errors.email}
                                helperText={errors.email || ''}
                            />
                            <TextField
                                label="llpNumber"
                                name="llpNumber"
                                value={companyData.llpNumber}
                                onChange={handleInputChange}
                                variant="outlined"
                                error={!!errors.llpNumber}
                                helperText={errors.llpNumber || ''}
                            />
                            <TextField
                                label="trademarkAndIP"
                                name="trademarkAndIP"
                                value={companyData.trademarkAndIP}
                                onChange={handleInputChange}
                                variant="outlined"
                                error={!!errors.trademarkAndIP}
                                helperText={errors.trademarkAndIP || ''}
                            />
                            <TextField
                                label="insuranceInformation"
                                name="insuranceInformation"
                                value={companyData.insuranceInformation}
                                onChange={handleInputChange}
                                variant="outlined"
                                error={!!errors.insuranceInformation}
                                helperText={errors.insuranceInformation || ''}
                            />
                            <TextField
                                label="Business Type"
                                name="businessType"
                                value={companyData.businessType}
                                onChange={handleInputChange}
                                variant="outlined"
                                error={!!errors.businessType}
                                helperText={errors.businessType || ''}
                            />
                            <TextField
                                label="Registration Number"
                                name="registrationNumber"
                                value={companyData.registrationNumber}
                                onChange={handleInputChange}
                                variant="outlined"
                                error={!!errors.registrationNumber}
                                helperText={errors.registrationNumber || ''}
                            />
                            <TextField
                                label="Date of Incorporation"
                                name="dateOfIncorporation"
                                type="date"
                                value={companyData.dateOfIncorporation}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                error={!!errors.dateOfIncorporation}
                                helperText={errors.dateOfIncorporation || ''}
                            />
                            <TextField
                                label="businessActivities"
                                name="businessActivities"
                                value={companyData.businessActivities}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                error={!!errors.businessActivities}
                                helperText={errors.businessActivities || ''}
                            />
                            <TextField
                                label="industryClassification"
                                name="industryClassification"
                                value={companyData.industryClassification}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                error={!!errors.industryClassification}
                                helperText={errors.industryClassification || ''}
                            />
                            <TextField
                                label="gstin"
                                name="gstin"
                                value={companyData.gstin}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                error={!!errors.gstin}
                                helperText={errors.gstin || ''}
                            />
                            <TextField
                                label="pan"
                                name="pan"
                                value={companyData.pan}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                error={!!errors.pan}
                                helperText={errors.pan || ''}
                            />

                            <TextField
                                label="tin"
                                name="tin"
                                value={companyData.tin}
                                onChange={handleInputChange}
                                variant="outlined"
                                error={!!errors.tin}
                                helperText={errors.tin || ''}
                            />

                            <TextField
                                label="financialStatements"
                                name="financialStatements"
                                value={companyData.financialStatements}
                                onChange={handleInputChange}
                                variant="outlined"
                                error={!!errors.financialStatements}
                                helperText={errors.financialStatements || ''}
                            />

                        </Box>
                    </FormGroup>
                    <Button
                        sx={{ padding: '2px' }}
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={!areRequiredFieldsFilled()}
                    >
                        {mode === "add" ? "Register" : "Update"}
                    </Button>
                </FormControl>
            </Box>
        </Container>

    );
};

export default CompanyForm;