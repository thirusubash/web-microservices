import React, { useState, useEffect } from "react";
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
    Snackbar,
    Alert
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import companyApi from "@api/companyApi";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import CompanySupplierForm from "@components/company/CompanySupplierForm";
import ViewSupplier from "@components/company/ViewSupplier";
// Add import for your CompanySupplierForm and ViewSupplier components when created

const CompanySupplierCrud = ({ companyId }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElement, setTotalElement] = useState(0); // Mocking, adjust with real API data
    const [dialogMode, setDialogMode] = useState('add');
    async function fetchSuppliers() {
        try {
            const response = await companyApi.getSuppliersByCompanyId(companyId);
            if (response && response.data) {
                setSuppliers(response.data);
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            // Handle error accordingly
        }
    }

    useEffect(() => {
       fetchSuppliers()
    }, [companyId]);



    const handleDeleteSupplier = async (supplierId) => {
        try {
            await companyApi.removeSupplier(companyId, supplierId);
            setSuppliers(prevSuppliers => prevSuppliers.filter(supp => supp.id !== supplierId));
        } catch (error) {
            console.error("Error deleting supplier:", error);
            // Handle error accordingly
        }
    };
// Handlers
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Add debounce or API call to filter suppliers if needed
    };

    const handleOpenviewDialog = (supplier) => {
        setSelectedSupplier(supplier);
        setViewDialogOpen(true);
    };

    const handleCloseViewDialog = () => {
        setSelectedSupplier(null);
        setViewDialogOpen(false);
    };

    const handleOpenUpdateDialog = (supplier) => {
        setSelectedSupplier(supplier);
        setDialogMode('update');
        setDialogOpen(true);
    };

    const handleToggleStatus = async (supplierId, status) => {
        // Implement the logic for toggling supplier status
        console.log("Toggle status for supplier:", supplierId, status);
        // Mocking a status toggle
        const updatedSuppliers = suppliers.map(s =>
            s.id === supplierId ? { ...s, status: !status } : s
        );
        setSuppliers(updatedSuppliers);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // Add API call to fetch suppliers for the new page
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        // Add API call to fetch suppliers with the new rows per page value
    };

    return (
        <Container>

            <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Supplier</Button>
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
                label="Search by supplier"
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
                            <TableCell>Supplier Name</TableCell>
                            <TableCell>Operational Hours</TableCell>
                            <TableCell>Quality Standards</TableCell>
                            <TableCell>Safety Standards</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Storage Capacity</TableCell>
                            <TableCell>Regulations Compliance</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers && suppliers.map((supplier) => (
                            <TableRow key={supplier.id}>
                                <TableCell>{supplier.id}</TableCell>
                                <TableCell>{supplier.name}</TableCell>
                                <TableCell>{supplier.operationalHours}</TableCell>
                                <TableCell>{supplier.qualityStandards}</TableCell>
                                <TableCell>{supplier.safetyStandards}</TableCell>
                                <TableCell>{supplier.email}</TableCell>
                                <TableCell>{supplier.contactNumber}</TableCell>
                                <TableCell>{supplier.storageCapacity}</TableCell>
                                <TableCell>{supplier.regulationsCompliance}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenviewDialog(supplier)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenUpdateDialog(supplier)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleToggleStatus(supplier.id, supplier.status)}>
                                        {supplier.status ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(companyId, supplier.id)}>
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
                count={totalElement}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{dialogMode === 'update' ? "Update Supplier" : "Add Supplier"}</DialogTitle>
                <DialogContent>
                    <CompanySupplierForm companyId={companyId} supplierData={selectedSupplier}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <DialogTitle> Supplier Details</DialogTitle>
                <DialogContent>
                    <ViewSupplier supplierData={selectedSupplier} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewDialog} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CompanySupplierCrud;
