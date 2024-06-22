import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Snackbar, Alert, debounce} from '@mui/material';

import {
    Container,
    TableCell,
    TableRow,
    TextField,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import DeleteIcon from "@mui/icons-material/Delete";
import AddressForm from "@components/company/AddressForm";
import companyApi from "@api/companyApi";
import ViewAddress from "@components/company/ViewAddress";

const CompanyAddressCrud = ({ companyId= 1 }) => {
    const [addresses, setAddresses] = useState([]);
    const [totalElement, setTotalElement] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [dialogMode, setDialogMode] = useState('add');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);


    const fetchAddresses = useCallback(async (page = 0, rowsPerPage = 10, searchQuery = "") => {
        if (companyId) {
            try {
                const response = await companyApi.getAddress(companyId , page, rowsPerPage, searchQuery); // Use companyIdprop
                setAddresses(response.content);
                setTotalElement(response.totalElements);
            } catch (error) {
                handleSnackbarNotification({
                    open: true,
                    message: "Failed to fetch the address. Please try again. " +error,
                    severity: "error"
                });
            }
        }
    }, [companyId]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchAddresses(newPage, rowsPerPage, searchQuery);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        fetchAddresses(0, +event.target.value, searchQuery);
    };
    const debouncedFetchAddresses = debounce(() => {
        fetchAddresses(page, rowsPerPage, searchQuery);
    }, 2000);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        debouncedFetchAddresses();
    };
    const handleAdd = () => {
        setSelectedAddress(null); // Set no selected address to initialize an empty form
        setDialogOpen(true); // Open the dialog to fill in the new address
    };

    const handleOpenViewDialog = (address) => {
        setSelectedAddress(address);
        setViewDialogOpen(true);
    };


    const handleOpenAddDialog = () => {
        setSelectedAddress(null);
        setDialogMode('add');
        setDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchAddresses(); // Refresh data upon dialog close
    };


    const handleOpenUpdateDialog = (address) => {
        setSelectedAddress(address);
        setDialogMode('update');
        setDialogOpen(true);
    };

    const handleToggleStatus = async (id, status) => {
        try {
            await companyApi.updateAddressStatus(companyId, id, !status);
            fetchAddresses(page, rowsPerPage, searchQuery);
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling address status:", error);
            handleSnackbarNotification({
                open: true,
                message: "Failed to update the status. Please try again.",
                severity: "error"
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await companyApi.removeAddress(companyId, id);
            handleSnackbarNotification({
                open: true,
                message: "Address deleted successfully!",
                severity: "success"
            });
            fetchAddresses(page, rowsPerPage, searchQuery);
        } catch (error) {
            console.error("Error deleting the address:", error);
            handleSnackbarNotification({
                open: true,
                message: "Failed to delete the address. Please try again.",
                severity: "error"
            });
        }
    };
    const actions = useMemo(() => ({
        add: handleAdd,
        view: handleOpenViewDialog,
        update: handleOpenUpdateDialog,
        toggleStatus: handleToggleStatus,
        delete: handleDelete
    }), [handleOpenViewDialog, handleOpenUpdateDialog, handleToggleStatus, handleDelete]);


    const handleSnackbarNotification = ({open, message, severity}) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        fetchAddresses(page, rowsPerPage, searchQuery);
    }, [fetchAddresses, page, rowsPerPage, searchQuery]);

    return (
        <Container>
            <Button variant="contained" onClick={handleOpenAddDialog}>Add Address</Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    variant="filled"
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {/* Search Field */}
            <TextField
                sx={{padding: "2px"}}
                label="Search by Address"
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                fullWidth
            />
            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{backgroundColor: "#e3f2fd"}}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>addressLine1</TableCell>
                            <TableCell>addressLine2</TableCell>
                            <TableCell>city</TableCell>
                            <TableCell>stateProvince</TableCell>
                            <TableCell>postalCode</TableCell>
                            <TableCell>country</TableCell>
                            <TableCell>neighborhood</TableCell>
                            <TableCell>building</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addresses.map((address) => (
                            <TableRow key={address.id}>
                                <TableCell>{address.id}</TableCell> {/* Assuming you want to display the ID */}
                                <TableCell>{address.addressLine1}</TableCell>
                                <TableCell>{address.addressLine2}</TableCell>
                                <TableCell>{address.city}</TableCell>
                                <TableCell>{address.stateProvince}</TableCell>
                                <TableCell>{address.postalCode}</TableCell>
                                <TableCell>{address.country}</TableCell>
                                <TableCell>{address.district}</TableCell>
                                <TableCell>{address.landmark}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(address)}>
                                        <VisibilityIcon color="info"/>
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(address)}>
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(address.id, address.status)}>
                                        {address.status ? <ToggleOn color="success"/> : <ToggleOff color="error"/>}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(address.id)}>
                                        <DeleteIcon color="warning"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Pagination */}
            <TablePagination
                component="div"
                count={totalElement}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{selectedAddress ? "Update Address" : "Add Address"}</DialogTitle>
                <DialogContent>
                    <AddressForm
                        companyId={companyId}
                        address={selectedAddress}
                        onSuccess={() => {
                            fetchAddresses();
                            handleCloseDialog();
                        }}
                        notification={handleSnackbarNotification}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={viewDialogOpen} onClose={() => {setSelectedAddress(null); setViewDialogOpen(false)}}>
                <DialogTitle>Address Details</DialogTitle>
                <DialogContent>
                    <ViewAddress address={selectedAddress} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setSelectedAddress(null); setViewDialogOpen(false)}} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export  default  CompanyAddressCrud;