import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import {
    Button,
    Container, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField, Paper, Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToggleOff, ToggleOn } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import companyApi from "@api/companyApi";
import EditIcon from "@mui/icons-material/Edit";
import useDebounce from "@assets/useDebounce";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const ViewCompany = lazy(() => import("@components/company/ViewCompany"));
const CompanyForm = lazy(() => import("@components/company/CompanyForm"));
import Loading from "@components/layout/Loading";


function ListCompanies() {
    // Group related states
    const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 10, totalElements: 0 });
    const [dialogs, setDialogs] = useState({ view: false, edit: false });
    const [searchQuery, setSearchQuery] = useState('');
    const [companyData, setCompanyData] = useState([]);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [mode, setMode]=useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSnackbarNotification = (config) => {
        setNotification({
            open: config.open || false,
            message: config.message || '',
            severity: config.severity || 'info',
        });
    };
    const handleCloseSnackbar = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const fetchCompanyData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await companyApi.get(pagination.page, pagination.rowsPerPage, debouncedSearchQuery);
            setCompanyData(response.content);
            setPagination(prev => ({ ...prev, totalElements: response.totalElements }));
        } catch (error) {
            setNotification({
                open: true,
                message: "" + error.message,
                severity: "error"
            });
        }finally {
            setIsLoading(false);
        }
    }, [pagination.page, pagination.rowsPerPage, debouncedSearchQuery]);

    useEffect(() => {
        fetchCompanyData();
    }, [debouncedSearchQuery, pagination.page, pagination.rowsPerPage]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        setPagination({ rowsPerPage: +event.target.value, page: 0, totalElements: pagination.totalElements });
    };





    const handleToggleStatus = useCallback(async (companyId, status) => {
        const company = companyData.find(comp => comp.id === companyId);

        if (!company) return;

        try {

            await companyApi.updateStatus(companyId, !status);
            await fetchCompanyData();

            handleSnackbarNotification({
                open: true,
                message: 'Company status updated.',
                severity:status?"warning":"success"
            });
        } catch (error) {
            handleSnackbarNotification({
                open: true,
                message: 'Error toggling company status!' + error.message,
                severity: 'error'
            });
        }
    }, [companyData, fetchCompanyData]);




    function formatDateTime(dateTime) {
        if (!dateTime) return '';
        const parsedDate = new Date(dateTime);
        if (isNaN(parsedDate)) return '';
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        return new Intl.DateTimeFormat('en-US', options).format(parsedDate);
    }

    async function handleDelete(id) {
        try {
            await companyApi.delete(id);
            await fetchCompanyData();
            handleSnackbarNotification({
                open:true,
                message:" Deleted Successfully !",
                severity:"success"
            })
        } catch (error) {
            handleSnackbarNotification({
                open:true,
                message:"Failed to delete !"+error.message,
                severity:"error"
            })
        }
    }

    const handleOpenDialog = (type, company, mode) => {
        setSelectedCompany(company);
        setMode(mode);

        const newDialogState = { "view": false, "edit": false };
        newDialogState[type] = true;
        setDialogs(newDialogState);
    };

    const handleCloseDialog = (type) => {
        setSelectedCompany(null);
        setMode(null);
        setDialogs(prev => ({ ...prev, [type]: false }));
    };




    const actions = useMemo(() => ({
        add: () => handleOpenDialog('edit', null, 'add'),
        view: (company) => handleOpenDialog('view', company),
        update: (company) => handleOpenDialog('edit', company, 'update'),
        toggleStatus: handleToggleStatus,
        delete: handleDelete
    }), [handleOpenDialog, handleToggleStatus, handleDelete]);



    return (
        <Container>
            {isLoading && <Loading />}
            <Suspense fallback={<Loading />}>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
            <Button onClick={()=>{actions.add()}}>Add Company</Button>
            <TextField
                sx={{ padding: '2px' }}
                label="Search by Company Name"
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
                            <TableCell>Company Name</TableCell>
                            <TableCell>GSTIN</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date Of Incorporation</TableCell>
                            <TableCell>Plant</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companyData.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>{company.id}</TableCell>
                                <TableCell>{company.companyName}</TableCell>
                                <TableCell>{company.gstin}</TableCell>
                                <TableCell>{company.contactNumber}</TableCell>
                                <TableCell>{company.email}</TableCell>

                                <TableCell>{formatDateTime(company.dateOfIncorporation)}</TableCell>
                                <TableCell>{  }</TableCell>

                                <TableCell>{formatDateTime(company.updated)}</TableCell>
                                <TableCell>
                                    <IconButton onClick={()=>{actions.view(company)}}>
                                        <VisibilityIcon color='info' />
                                    </IconButton>
                                    <IconButton onClick={()=>{actions.update(company)}}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(company.id, company.status)}>
                                        {company.status ? <ToggleOn color='success' /> : <ToggleOff color='error' />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(company.id)}>
                                        <DeleteIcon color='warning' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={pagination.totalElements}
                page={pagination.page}
                onPageChange={handleChangePage}
                rowsPerPage={pagination.rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
                <Dialog open={dialogs.edit} onClose={() => handleCloseDialog('edit')}>
                    <DialogTitle>
                        <Typography variant="body" color="success.main">
                            {mode === "add" ? "Register " : "Update"} Company Details
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <CompanyForm
                            company={selectedCompany}
                            mode={mode}
                            onSuccess={() => handleCloseDialog('edit')}
                            notification={handleSnackbarNotification}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseDialog('edit')} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={dialogs.view} onClose={() => handleCloseDialog('view')}>
                    <DialogTitle>
                        <Typography variant="h4" align="center" gutterBottom>
                            Company Info
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <ViewCompany companyId={selectedCompany ? selectedCompany.id : ""} notification={handleSnackbarNotification} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseDialog('view')} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>

            </Suspense>
        </Container>
    );
}

export default ListCompanies;
