import React, { useCallback, useEffect, useMemo, useState, lazy, Suspense } from "react";

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
    TextField
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOff from "@mui/icons-material/ToggleOff";
import ToggleOn from "@mui/icons-material/ToggleOn";
import VisibilityIcon from "@mui/icons-material/Visibility";


import useDebounce from "@assets/useDebounce";
import Loading from "@components/layout/Loading";
const CompanyDesignationsForm = lazy(() => import("@components/company/CompanyDesignationsForm"));
const ViewCompanyGroupsRolesDesignation = lazy(() => import("@components/company/ViewCompanyGroupsRolesDesignation"));
import designationRoleGroupApi from "@api/designationRoleGroupApi";
const CompanyDesignationsCrud = ({ companyId }) => {
    const [designations, setDesignations] = useState([]);
    const [selecteddesignation, setSelecteddesignation] = useState(null);
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
    const [isLoading, setIsLoading] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const fetchDesignations = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await designationRoleGroupApi.getCompanyDesignationAndGroupsAndRoles("designations", companyId, currentPage, rowsPerPage, debouncedSearchQuery);
            setDesignations(response.content);
            setTotalElements(response.totalElements || 0);
        } catch (error) {
            handleSnackbarNotification({
                open: true,
                message: "Opps! " + error.message,
                severity: "error"
            });
        } finally {
            setIsLoading(false);
        }
    }, [companyId, currentPage, rowsPerPage, debouncedSearchQuery]);

    useEffect(() => {
        fetchDesignations();
    }, [fetchDesignations, currentPage, rowsPerPage, debouncedSearchQuery]);




    const handleChangePage = useCallback((event, newPage) => {
        setCurrentPage(newPage);
        fetchDesignations();
    }, [fetchDesignations]);

    const handleChangeRowsPerPage = useCallback((event) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
        fetchDesignations();
    }, [fetchDesignations]);

    const handleSnackbarNotification = ({ open, message, severity }) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchDesignations(currentPage, rowsPerPage, searchQuery);
    };

    const handleOpenUpdateDialog = useCallback((designation) => {
        setSelecteddesignation(designation);
        setDialogMode('update');
        setDialogOpen(true);
    }, []);

    const handleToggleStatus = useCallback(async (id, status) => {
        try {
            await designationRoleGroupApi.updateStatus(companyId,"designations", id, !status);
            await fetchDesignations(currentPage, rowsPerPage, searchQuery);
            let color="warning";
            if(!status){
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
            await designationRoleGroupApi.delete(companyId,"designations", id);
            setDesignations(prevroles => prevroles.filter(bank => bank.id !== id));
            setSnackbarMessage("designation deleted successfully!");
            setSnackbarSeverity("warning");
        } catch (error) {
            console.error("Error deleting the designation:", error);
            setSnackbarMessage("Failed to delete the designation. Please try again.");
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
        }
    }, []);

    const handleAdd = () => {
        setSelecteddesignation(null);
        setDialogOpen(true);
    };

    const handleOpenViewDialog = (designation) => {
        setSelecteddesignation(designation);
        setViewDialogOpen(true);
    };

    const handleCloseViewDialog = useCallback(() => {
        setSelecteddesignation(null);
        setViewDialogOpen(false);
        fetchDesignations(currentPage, rowsPerPage, searchQuery);
    }, [currentPage, rowsPerPage, searchQuery, fetchDesignations]);

    const handleToggleDefaultStatus = useCallback(async (id, defaultGroup) => {
        try {
            await designationRoleGroupApi.updateDefaultStatus( companyId,"designations", id, !defaultGroup);
            await fetchDesignations(currentPage, rowsPerPage, searchQuery);
            let color = "warning";
            if (!defaultGroup) {
                color = "success";
            }
            handleSnackbarNotification({
                open: true,
                message: "Default status updated successfully!",
                severity: color
            });
        } catch (error) {
            handleSnackbarNotification({
                open: true,
                message: "Failed to update default status! " + error,
                severity: "error"
            });
        } finally {
            setSnackbarOpen(true);
        }
    }, [currentPage, rowsPerPage, searchQuery, fetchDesignations]);
    const handleToggleDefaultUserStatus = useCallback(async (id, defaultForUser) => {
        try {
            await designationRoleGroupApi.updateDefaultForUserStatus(companyId, "designations", id, !defaultForUser);
            await fetchDesignations(currentPage, rowsPerPage, searchQuery);
            let color = "warning";
            if (!defaultForUser) {
                color = "success";
            }
            handleSnackbarNotification({
                open: true,
                message: "Default status updated successfully!",
                severity: color
            });
        } catch (error) {
            handleSnackbarNotification({
                open: true,
                message: "Failed to update default status! " + error,
                severity: "error"
            });
        } finally {
            setSnackbarOpen(true);
        }
    }, [currentPage, rowsPerPage, searchQuery, fetchDesignations]);

    const actions = useMemo(() => ({
        add: handleAdd,
        view: handleOpenViewDialog,
        update: handleOpenUpdateDialog,
        toggleStatus: handleToggleStatus,
        toggleDefaultStatus: handleToggleDefaultStatus,
        toggleDefaultUserStatus: handleToggleDefaultUserStatus,
        delete: handleDelete
    }), [handleOpenViewDialog, handleOpenUpdateDialog, handleToggleStatus, handleToggleDefaultUserStatus, handleDelete]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Container>
            {isLoading && <Loading />}
            <Button variant="contained" onClick={() => actions.add()}>Add designations</Button>

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
                sx={{ padding: "2px", marginTop: "16px" }}  // Added margin for better spacing
                label="Search by designation"
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
                            <TableCell>Designation</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Default Designation</TableCell>
                            <TableCell>Default for User</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {designations && designations.map((designation) => (
                            <TableRow key={designation.id}>
                                <TableCell>{designation.id}</TableCell>
                                <TableCell>{designation.name}</TableCell>
                                <TableCell>{designation.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.toggleDefaultStatus(designation.id, designation.defaultDesignation)}>
                                        {designation.defaultDesignation ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.toggleDefaultUserStatus(designation.id, designation.defaultForUser)}>
                                        {designation.defaultForUser ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.toggleStatus(designation.id, designation.status)}>
                                        {designation.status ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(designation)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(designation)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(companyId, designation.id)}>
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

            <Suspense fallback={<Loading />}>
                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>
                        {dialogMode === 'update' ? "Update designations" : "Add designations"}
                    </DialogTitle>
                    <DialogContent>
                        <CompanyDesignationsForm
                            companyId={companyId}
                            designationData={dialogMode === 'update' ? selecteddesignation : null}
                            onSuccess={handleCloseDialog}
                            notification={handleSnackbarNotification}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Suspense>


            <Suspense fallback={<Loading />}>
                <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
                    <DialogContent>
                        <ViewCompanyGroupsRolesDesignation data={selecteddesignation} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseViewDialog} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Suspense>

        </Container>
    );
};

export default CompanyDesignationsCrud;
