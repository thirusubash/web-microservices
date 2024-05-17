import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Alert,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    debounce
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOff from "@mui/icons-material/ToggleOff";
import ToggleOn from "@mui/icons-material/ToggleOn";
import VisibilityIcon from "@mui/icons-material/Visibility";

import companyApi from "@api/companyApi";
import CompanyBankDetailsForm from "@components/company/CompanyBankDetailsForm";
import ViewBankDetails from "@components/company/ViewBankDetails";

const CompanyBankDetailsCrud = ({ companyId }) => {
    const [bankDetails, setBankDetails] = useState([]);
    const [selectedBankDetail, setSelectedBankDetail] = useState(null);
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState('add');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");



    const fetchBankDetails = useCallback(async (currentPage, currentRowsPerPage, currentSearchQuery = "") => {
        if (companyId) {
            try {
                const response = await companyApi.getBankdetails(companyId, currentPage, currentRowsPerPage, currentSearchQuery);
                setBankDetails(response.content || []);
                setTotalElements(response.totalElements);
            } catch (error) {
                console.error("Failed to fetch bank details for company:", error.message);
                setSnackbarMessage("Failed to fetch bank details. Please try again later.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    }, [companyId]);
    const debouncedFetchBankDetails = debounce(() => {
        fetchBankDetails(currentPage, rowsPerPage, searchQuery);
    }, 500);

    useEffect(() => {
        fetchBankDetails(currentPage, rowsPerPage, searchQuery);
    }, [currentPage, rowsPerPage, searchQuery, fetchBankDetails]);

    const handleChangePage = useCallback((event, newPage) => {
        setCurrentPage(newPage);
        fetchBankDetails(newPage, rowsPerPage, searchQuery);
    }, [rowsPerPage, searchQuery, fetchBankDetails]);

    const handleChangeRowsPerPage = useCallback((event) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
        fetchBankDetails(0, newRowsPerPage, searchQuery);
    }, [searchQuery, fetchBankDetails]);

    const handleSnackbarNotification = ({ open, message, severity }) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchBankDetails(currentPage, rowsPerPage, searchQuery);
    };

    const handleOpenUpdateDialog = useCallback((bankDetail) => {
        setSelectedBankDetail(bankDetail);
        setDialogMode('update');
        setDialogOpen(true);
    }, []);

    const handleToggleStatus = useCallback(async (id, active) => {
        try {
            await companyApi.updateBankdetailsStatus(companyId, id, !active);
            await fetchBankDetails(currentPage, rowsPerPage, searchQuery);
            let color="warning";
            if(!active){
                color="success";
            }
            handleSnackbarNotification({
                open:true,
                message:"Updated successfully  to update !",
                severity:color
            });
        } catch (error) {
          handleSnackbarNotification({
              open:true,
              message:"Failed to update !" +error,
              severity:"error"
          });
        } finally {
            setSnackbarOpen(true);
        }
    }, []);


    const handleDelete = useCallback(async (companyId, id) => {
        try {
            await companyApi.removeBankDetail(companyId, id);
            setBankDetails(prevBankDetails => prevBankDetails.filter(bank => bank.id !== id));
            setSnackbarMessage("BankDetail deleted successfully!");
            setSnackbarSeverity("warning");
        } catch (error) {
            console.error("Error deleting the bankDetail:", error);
            setSnackbarMessage("Failed to delete the bankDetail. Please try again.");
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
        }
    }, []);

    const handleAdd = () => {
        setSelectedBankDetail(null);
        setDialogOpen(true);
    };

    const handleOpenViewDialog = (bankdetail) => {
        setSelectedBankDetail(bankdetail);
        setViewDialogOpen(true);
    };

    const handleCloseViewDialog = useCallback(() => {
        setSelectedBankDetail(null);
        setViewDialogOpen(false);
        fetchBankDetails(currentPage, rowsPerPage, searchQuery);
    }, [currentPage, rowsPerPage, searchQuery, fetchBankDetails]);

    const actions = useMemo(() => ({
        add: handleAdd,
        view: handleOpenViewDialog,
        update: handleOpenUpdateDialog,
        toggleStatus: handleToggleStatus,
        delete: handleDelete
    }), [handleOpenViewDialog, handleOpenUpdateDialog, handleToggleStatus, handleDelete]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        debouncedFetchBankDetails();
    };


    return (
        <Container>
            <Button variant="contained" onClick={() => actions.add()}>Add BankDetails</Button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <TextField
                sx={{ padding: "2px" }}
                label="Search by bankDetail"
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                fullWidth
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Account Type</TableCell>
                            <TableCell>Account Number</TableCell>
                            <TableCell>Bank Name</TableCell>
                            <TableCell>IFSC</TableCell>
                            <TableCell>Primary Account</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>UPI ID</TableCell>
                            <TableCell>QR Code URL</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Last Modified Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bankDetails && bankDetails.map((bankDetail) => (
                            <TableRow key={bankDetail.id}>
                                <TableCell>{bankDetail.id}</TableCell>
                                <TableCell>{bankDetail.accountType}</TableCell>
                                <TableCell>{bankDetail.accountNumber}</TableCell>
                                <TableCell>{bankDetail.bankName}</TableCell>
                                <TableCell>{bankDetail.ifsc}</TableCell>
                                <TableCell>{bankDetail.primaryAccount ? "Yes" : "No"}</TableCell>
                                <TableCell>{bankDetail.status}</TableCell>
                                <TableCell>{bankDetail.upiId || "N/A"}</TableCell>
                                <TableCell>{bankDetail.qrCodeUrl || "N/A"}</TableCell>
                                <TableCell>{bankDetail.createdDate}</TableCell>
                                <TableCell>{bankDetail.lastModifiedDate}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(bankDetail)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(bankDetail)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(bankDetail.id, bankDetail.active)}>
                                        {bankDetail.active ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(companyId, bankDetail.id)}>
                                        <DeleteIcon color="warning" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalElements}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogMode === 'update' ? "Update BankDetails" : "Add BankDetails"}
                </DialogTitle>
                <DialogContent>
                    <CompanyBankDetailsForm
                        companyId={companyId}
                        bankDetailData={dialogMode === 'update' ? selectedBankDetail : null}
                        onSuccess={handleCloseDialog}
                        notification={handleSnackbarNotification}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <DialogTitle>BankDetails Details</DialogTitle>
                <DialogContent>
                    <ViewBankDetails bankDetailData={selectedBankDetail} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewDialog} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CompanyBankDetailsCrud;
