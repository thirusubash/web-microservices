import React, { useState } from "react";
import {TextField, FormControlLabel, Checkbox, Button, Grid, Avatar} from "@mui/material";
import companyApi from "@api/companyApi"; // Assuming you have this path



const CompanyBankDetailsForm = ({ companyId, bankDetailData = {}, onSuccess, notification }) => {
    bankDetailData = bankDetailData || {};
    const [bankDetail, setBankDetail] = useState({
        id: bankDetailData.id || null,
        accountType: bankDetailData.accountType || "",
        accountNumber: bankDetailData.accountNumber || "",
        bankName: bankDetailData.bankName || "",
        ifsc: bankDetailData.ifsc || "",
        primaryAccount: bankDetailData.primaryAccount || false,
        status: bankDetailData.status || "NOT_VERIFIED",
        upiId: bankDetailData.upiId || "",
        qrCodeUrl: bankDetailData.qrCodeUrl || ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankDetail(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await companyApi.addBankDetail(companyId, bankDetail);
            notification({
                open: true,
                message: "Bank details added successfully",
                severity: "success"
            });
            if (onSuccess) onSuccess();
        } catch (error) {
            notification({
                open: true,
                message: "Failed to add Bank Details. Please try again.",
                severity: "error"
            });
        }
    };



                const [qrImage, setQrImage] = useState(null);
    const [qrImagePreview, setQrImagePreview] = useState(null);

    const handleQrImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setQrImage(file);

            // Create a preview of the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {['accountType', 'accountNumber', 'bankName', 'ifsc', 'upiId'].map((field, idx) => (
                    <Grid item xs={12} key={idx}>
                        <TextField
                            fullWidth
                            label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            name={field}
                            value={bankDetail[field]}
                            onChange={handleChange}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleQrImageChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span">
                            Upload QR Image
                        </Button>
                    </label>
                    {qrImagePreview && (
                        <Avatar src={qrImagePreview} alt="QR Image Preview" style={{ width: 60, height: 60, marginTop: 10 }} />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="primaryAccount"
                                checked={bankDetail.primaryAccount}
                                onChange={e => setBankDetail(prev => ({ ...prev, primaryAccount: e.target.checked }))}
                            />
                        }
                        label="Primary Account"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
export default CompanyBankDetailsForm;
