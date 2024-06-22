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
    TextField
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOff from "@mui/icons-material/ToggleOff";
import ToggleOn from "@mui/icons-material/ToggleOn";
import VisibilityIcon from "@mui/icons-material/Visibility";

import designationRoleGroupApi from "@api/designationRoleGroupApi";
import useDebounce from "@assets/useDebounce";
import Loading from "@components/layout/Loading";
import ViewCompanyGroupsRolesDesignation from "@components/company/ViewCompanyGroupsRolesDesignation";
import CompanyRolesForm from "@components/company/CompanyRolesForm";
const CompanyrolesCrud = ({ companyId }) => {
    const [roles, setroles] = useState([]);
    const [selectedgroup, setSelectedgroup] = useState(null);
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

    const fetchroles = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await designationRoleGroupApi.getCompanyDesignationAndGroupsAndRoles("roles", companyId, currentPage, rowsPerPage, debouncedSearchQuery);
            setroles(response.content);
            setTotalElements(response.totalElements || 0);
        } catch (error) {
            handleSnackbarNotification({
                open:true,
                message:"Opps !" +error.message,
                severity:"error"
            });
        }
        finally {
            setIsLoading(false);
        }
    }, [companyId, currentPage, rowsPerPage, debouncedSearchQuery]);

    useEffect(() => {
        fetchroles();
    }, [fetchroles, currentPage, rowsPerPage, debouncedSearchQuery]);



    const handleChangePage = useCallback((event, newPage) => {
        setCurrentPage(newPage);
        fetchroles(newPage, rowsPerPage, searchQuery);
    }, [rowsPerPage, searchQuery, fetchroles]);

    const handleChangeRowsPerPage = useCallback((event) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
        fetchroles(0, newRowsPerPage, searchQuery);
    }, [searchQuery, fetchroles]);

    const handleSnackbarNotification = ({ open, message, severity }) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchroles(currentPage, rowsPerPage, searchQuery);
    };

    const handleOpenUpdateDialog = useCallback((group) => {
        setSelectedgroup(group);
        setDialogMode('update');
        setDialogOpen(true);
    }, []);

    const handleToggleStatus = useCallback(async (id, status) => {
        try {
            await designationRoleGroupApi.updateStatus(companyId,"roles", id, !status);
            await fetchroles(currentPage, rowsPerPage, searchQuery);
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
            await designationRoleGroupApi.delete(companyId,"roles", id);
            setroles(prevroles => prevroles.filter(bank => bank.id !== id));
            setSnackbarMessage("group deleted successfully!");
            setSnackbarSeverity("warning");
        } catch (error) {
            console.error("Error deleting the group:", error);
            setSnackbarMessage("Failed to delete the group. Please try again.");
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
        }
    }, []);

    const handleAdd = () => {
        setSelectedgroup(null);
        setDialogOpen(true);
    };

    const handleOpenViewDialog = (group) => {
        setSelectedgroup(group);
        setViewDialogOpen(true);
    };

    const handleCloseViewDialog = useCallback(() => {
        setSelectedgroup(null);
        setViewDialogOpen(false);
        fetchroles(currentPage, rowsPerPage, searchQuery);
    }, [currentPage, rowsPerPage, searchQuery, fetchroles]);

    const handleToggleDefaultStatus = useCallback(async (id, defaultGroup) => {
        try {
            await designationRoleGroupApi.updateDefaultStatus( companyId,"roles", id, !defaultGroup);
            await fetchroles(currentPage, rowsPerPage, searchQuery);
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
    }, [currentPage, rowsPerPage, searchQuery, fetchroles]);
    const handleToggleDefaultUserStatus = useCallback(async (id, defaultForUser) => {
        try {
            await designationRoleGroupApi.updateDefaultForUserStatus(companyId, "roles", id, !defaultForUser);
            await fetchroles(currentPage, rowsPerPage, searchQuery);
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
    }, [currentPage, rowsPerPage, searchQuery, fetchroles]);

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
            <Button variant="contained" onClick={() => actions.add()}>Add roles</Button>

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
                label="Search by group"
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                fullWidth
            />
            {isLoading && <Loading />}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>GROUP</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Default Group</TableCell>
                            <TableCell>Default for User</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles && roles.map((group) => (
                            <TableRow key={group.id}>
                                <TableCell>{group.id}</TableCell>
                                <TableCell>{group.name}</TableCell>
                                <TableCell>{group.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.toggleDefaultStatus(group.id, group.defaultGroup)}>
                                        {group.defaultGroup ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.toggleDefaultUserStatus(group.id, group.defaultForUser)}>
                                        {group.defaultForUser ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.toggleStatus(group.id, group.status)}>
                                        {group.status ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(group)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(group)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(companyId, group.id)}>
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
                    {dialogMode === 'update' ? "Update roles" : "Add roles"}
                </DialogTitle>
                <DialogContent>
                    <CompanyRolesForm
                        companyId={companyId}
                        groupData={dialogMode === 'update' ? selectedgroup : null}
                        onSuccess={handleCloseDialog}
                        notification={handleSnackbarNotification}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <DialogContent>
                    <ViewCompanyGroupsRolesDesignation data={selectedgroup} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewDialog} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CompanyrolesCrud;
