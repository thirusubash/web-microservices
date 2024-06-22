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
import CompanyGroupsForm from "@components/company/CompanyGroupsForm";
import useDebounce from "@assets/useDebounce";
import Loading from "@components/layout/Loading";
import ViewCompanyGroupsRolesDesignation from "@components/company/ViewCompanyGroupsRolesDesignation";
const CompanygroupsCrud = ({ companyId }) => {
    const [groups, setgroups] = useState([]);
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

    const fetchgroups = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await designationRoleGroupApi.getCompanyDesignationAndGroupsAndRoles("groups", companyId, currentPage, rowsPerPage, debouncedSearchQuery);
            setgroups(response.content);
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
        fetchgroups();
    }, [fetchgroups, currentPage, rowsPerPage, debouncedSearchQuery]);



    const handleChangePage = useCallback((event, newPage) => {
        setCurrentPage(newPage);
        fetchgroups(newPage, rowsPerPage, searchQuery);
    }, [rowsPerPage, searchQuery, fetchgroups]);

    const handleChangeRowsPerPage = useCallback((event) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
        fetchgroups(0, newRowsPerPage, searchQuery);
    }, [searchQuery, fetchgroups]);

    const handleSnackbarNotification = ({ open, message, severity }) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchgroups(currentPage, rowsPerPage, searchQuery);
    };

    const handleOpenUpdateDialog = useCallback((group) => {
        setSelectedgroup(group);
        setDialogMode('update');
        setDialogOpen(true);
    }, []);

    const handleToggleStatus = useCallback(async (id, status) => {
        try {
            await designationRoleGroupApi.updateStatus(companyId,"groups", id, !status);
            await fetchgroups(currentPage, rowsPerPage, searchQuery);
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
            await designationRoleGroupApi.delete(companyId,"groups", id);
            setgroups(prevgroups => prevgroups.filter(bank => bank.id !== id));
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
        fetchgroups(currentPage, rowsPerPage, searchQuery);
    }, [currentPage, rowsPerPage, searchQuery, fetchgroups]);

    const handleToggleDefaultStatus = useCallback(async (id, defaultGroup) => {
        try {
            await designationRoleGroupApi.updateDefaultStatus( companyId,"groups", id, !defaultGroup);
            await fetchgroups(currentPage, rowsPerPage, searchQuery);
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
    }, [currentPage, rowsPerPage, searchQuery, fetchgroups]);
    const handleToggleDefaultUserStatus = useCallback(async (id, defaultForUser) => {
        try {
            await designationRoleGroupApi.updateDefaultForUserStatus(companyId, "groups", id, !defaultForUser);
            await fetchgroups(currentPage, rowsPerPage, searchQuery);
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
    }, [currentPage, rowsPerPage, searchQuery, fetchgroups]);

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
    {isLoading && <Loading />}
    return (
        <Container>
            <Button variant="contained" onClick={() => actions.add()}>Add groups</Button>

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
                        {groups && groups.map((group) => (
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
                    {dialogMode === 'update' ? "Update groups" : "Add groups"}
                </DialogTitle>
                <DialogContent>
                    <CompanyGroupsForm
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

export default CompanygroupsCrud;
