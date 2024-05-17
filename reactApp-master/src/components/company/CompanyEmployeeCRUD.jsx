import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Snackbar, Alert, debounce} from '@mui/material';
import useDebounce from "@assets/useDebounce";

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

import companyApi from "@api/companyApi";
import ViewEmployee from "@components/company/ViewEmployee";
import CompanyEmployeeForm from "@components/company/CompanyEmployeeForm";
import Loading from "@components/layout/Loading";
const CompanyEmployeeCrud = ({ companyId }) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);  // Corrected the naming
    const [employees, setEmployees] = useState([]); // Fixed naming
    const [totalElement, setTotalElement] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState('add');
    const [page, setPage  ]=useState(0);
    const [rowsPerPage, setRowsPerPage  ]=useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);




    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
        fetchEmployees(newPage, rowsPerPage, searchQuery);
    }, [rowsPerPage, searchQuery, fetchEmployees]);


    const handleSnackbarNotification = ({ open, message, severity }) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };



    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(+event.target.value);
        setPage(0); // Resetting page number to 0 after changing rows per page
        fetchEmployees(0, +event.target.value, searchQuery);
    }, [searchQuery, fetchEmployees]);


    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
        fetchEmployees(page, rowsPerPage, searchQuery);
    }, []);

    const handleOpenAddDialog = useCallback(() => {
        setSelectedEmployee(null);
        setDialogMode('add');
        setDialogOpen(true);
    }, []);


    const handleOpenUpdateDialog = useCallback((employee) => {
        setSelectedEmployee(employee);
        setDialogMode('update');
        setDialogOpen(true);
    }, []);


    const debouncedFetchBankDetails = debounce(() => {
        fetchEmployees(0, rowsPerPage, searchQuery);
    }, 500);





    const handleToggleStatus = useCallback(async (id, status) => {
        try {
            await companyApi.updateEmployeeStatus(companyId, id, !status);
            await fetchEmployees();
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
                open: true, message: "Failed to update the Status . Please try again.",
                severity: "error"
            });
        }
    },[]);

        const handleDelete = useCallback(async (id) => {
        try {
            await companyApi.removeEmployee(companyId, id);
            setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id)); // Fixed naming
            handleSnackbarNotification({
                open:true,
                message:"Employee deleted successfully!",
                severity:"success"
            });
        } catch (error) {
            handleSnackbarNotification({
                open:true,
                message:"Failed to delete the Employee. Please try again.",
                severity:"error"
            });
        }
        }, []);

    const fetchEmployees = async (page = 0, rowsPerPage = 10, searchQuery = "") => {
        if (companyId) {
            try {
                setIsLoading(true);
                const response = await companyApi.getEmployees(companyId, page, rowsPerPage, searchQuery);

                setEmployees(response.content);

                setTotalElement(response.totalElements);
            } catch (error) {
                handleSnackbarNotification({
                    open:true,
                    message:"Please try again."+error.message,
                    severity:"error"
                });
            }finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchEmployees(page, rowsPerPage, debouncedSearchQuery);
    }, [debouncedSearchQuery, page, rowsPerPage]);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);



    function handleCloseViewDialog() {
        setViewDialogOpen(false);
    }

    const [viewDialogOpen, setViewDialogOpen]=useState();

        const handleAdd = () => {
            setSelectedEmployee(null);
            setDialogOpen(true);
        };

        const handleOpenViewDialog = (employee) => {
            setSelectedEmployee(employee);
            setViewDialogOpen(true);
        };


        const actions = useMemo(() => ({
            add: handleAdd,
            view: handleOpenViewDialog,
            update: handleOpenUpdateDialog,
            toggleStatus: handleToggleStatus,
            delete: handleDelete
        }), [handleOpenViewDialog, handleOpenUpdateDialog, handleToggleStatus, handleDelete]);


    return (
        <Container maxWidth="100%">
            {isLoading && <Loading />}
            {/* Pass the function reference, not invoke it */}
            <Button variant="contained" onClick={actions.add}>Add Employee</Button>
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

            {/* Search Field */}
            <TextField
                sx={{ padding: "2px" }}
                label="Search by Employee"
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
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Employee Code</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Plant</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell>Groups</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.employeeCode}</TableCell>
                                <TableCell>{employee.designation?.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.mobileNumber}</TableCell>
                                <TableCell>{employee.salary}</TableCell>
                                <TableCell>{employee.plant?.name}</TableCell>
                                <TableCell>{employee.companyId}</TableCell>
                                <TableCell>{employee.roles?.[employee.roles.length - 1]?.name}</TableCell>
                                <TableCell>{employee.groups?.[employee.groups.length - 1]?.name}</TableCell>


                                <TableCell>
                                    <IconButton onClick={() => actions.view(employee)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(employee)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(employee.id, employee.status)}>
                                        {employee.status ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(employee.id)}>
                                        <DeleteIcon color="warning" />
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

            {/* Add Employee Dialog */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{dialogMode === 'update' ? "Update Employee" : "Add Employee"}</DialogTitle>
                <DialogContent>
                    <CompanyEmployeeForm companyId={companyId} employeeData={selectedEmployee} onSuccess={handleCloseDialog} notification={handleSnackbarNotification} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* View Employee Dialog */}
            <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <DialogTitle color="info.main">   Employee Details </DialogTitle>
                <DialogContent>
                    <ViewEmployee companyId={companyId} employeeData={selectedEmployee} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>

    );
};

export default CompanyEmployeeCrud;
