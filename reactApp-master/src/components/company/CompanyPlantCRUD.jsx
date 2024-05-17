import React, {useCallback, useEffect, useState, useMemo} from "react";
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
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import DeleteIcon from "@mui/icons-material/Delete";

import companyApi from "@api/companyApi";
import CompanyPlantForm from "@components/company/CompanyPlantForm";
import ViewPlant from "@components/company/ViewPlant";
import Loading from "@components/layout/Loading";

const CompanyPlantCrud = ({ companyId }) => {
    const [searchTimeoutId, setSearchTimeoutId] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [plants, setPlants] = useState([]);
    const [totalElement, setTotalElement] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [dialogMode, setDialogMode] = useState('add');
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPlants = useCallback(async (page = 0, rowsPerPage = 10, searchQuery = "") => {
        if (companyId) {
            setIsLoading(true);
            try {
                const response = await companyApi.getPlants(companyId, page, rowsPerPage, searchQuery);
                setPlants(response.content || []);
                setTotalElement(response.totalElements);
            } catch (error) {
                console.error("Failed to fetch plants for company:", error.message);
               handleSnackbarNotification(true, "Failed Fetch the plants !","error")
            }finally {
                setIsLoading(false);
            }
        }
    }, [companyId]);


    const handleSnackbarNotification = ({open, message, severity}) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };

    const handleSearchChange = useCallback((event) => {
        const value = event.target.value;
        setSearchQuery(value);

        if (searchTimeoutId) clearTimeout(searchTimeoutId);

        const newTimeoutId = setTimeout(() => {
            fetchPlants(page, rowsPerPage, value);
        }, 1500);

        setSearchTimeoutId(newTimeoutId);
    }, [fetchPlants, page, rowsPerPage, searchTimeoutId]);



    const handleToggleStatus = useCallback(async (id, status) => {
        try {
            await companyApi.updatePlantStatus(companyId, id, !status);
            await fetchPlants(page, rowsPerPage, searchQuery);
            let color="success";
            if(status){
                color="warning";
            }

            handleSnackbarNotification({
                open: true,
                message: "Status update success!",
                severity: color
            });
        } catch (error) {
            handleSnackbarNotification({
                open: true,
                message: "Failed to  update success!",
                severity: "error"
            });

        }
    }, [companyId, fetchPlants]);

    const handleDelete = useCallback(async (companyId, id) => {
        try {
            await companyApi.removePlant(companyId, id);
            await fetchPlants(page, rowsPerPage, searchQuery);
            handleSnackbarNotification({
                open: true,
                message: "Plant deleted success!",
                severity: "success"
            });

        } catch (error) {
            console.error("Error deleting the plant:", error);
            handleSnackbarNotification({
                open: true,
                message: "Status update success!",
                severity: "error"
            });

        }
    }, [companyId, fetchPlants]);




    useEffect(() => {
        if (!companyId) return;

        const fetchPlantsInitial = async () => {
            try {
                await fetchPlants(page, rowsPerPage, searchQuery);
            } catch (error) {
                handleSnackbarNotification({
                    open: true,
                    message: "Status update success!"+error,
                    severity: "error"
                });
            }
        };

        fetchPlantsInitial();

        return () => {
            if (searchTimeoutId) clearTimeout(searchTimeoutId);
        };
    }, [fetchPlants, page, rowsPerPage, searchQuery , companyId]);


    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
        fetchPlants(newPage, rowsPerPage, searchQuery);
    }, [fetchPlants, rowsPerPage, searchQuery]);


    const handleChangeRowsPerPage = useCallback((event) => {
        const newRowsPerPage = +event.target.value;
        const newPage = 0;
        setRowsPerPage(newRowsPerPage);
        setPage(newPage);
        fetchPlants(newPage, newRowsPerPage, searchQuery);
    }, [fetchPlants]);

    const handleOpenUpdateDialog = useCallback((plant) => {
        setSelectedPlant(plant);
        setDialogMode('update');
        setDialogOpen(true);
    }, []);



    const handleOpenViewDialog = useCallback((plant) => {
        setSelectedPlant(plant);
        setViewDialogOpen(true);
    }, []);

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCloseViewDialog = () => {
        setViewDialogOpen(false);
    };

    const handleAdd = useCallback(() => {
        setDialogOpen(true);
        setSelectedPlant(null);
    }, []);

    const actions = useMemo(() => ({
        add: handleAdd,
        view: handleOpenViewDialog,
        update: handleOpenUpdateDialog,
        toggleStatus: handleToggleStatus,
        delete: handleDelete
    }), [handleOpenViewDialog, handleOpenUpdateDialog, handleToggleStatus, handleDelete]);
    {isLoading && <Loading />}
    return (  <Container>

            <Button variant="contained" onClick={actions.add}>Add Plant</Button>
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
                label="Search by plant"
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
                            <TableCell>Plant Name</TableCell>
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
                        {plants && plants.map((plant) => (
                            <TableRow key={plant.id}>
                                <TableCell>{plant.id}</TableCell>
                                <TableCell>{plant.name}</TableCell>
                                <TableCell>{plant.operationalHours}</TableCell>
                                <TableCell>{plant.qualityStandards}</TableCell>
                                <TableCell>{plant.safetyStandards}</TableCell>
                                <TableCell>{plant.email}</TableCell>
                                <TableCell>{plant.contactNumber}</TableCell>
                                <TableCell>{plant.storageCapacity}</TableCell>
                                <TableCell>{plant.regulationsCompliance}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(plant)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(plant)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(plant.id, plant.status)}>
                                        {plant.status ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(companyId, plant.id)}>
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
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{selectedPlant ? "Update Plant" : "Add Plant"}</DialogTitle>
                <DialogContent>
                    <CompanyPlantForm
                      companyId={companyId}
                      plantData={selectedPlant}
                      onSuccess={() => {
                          fetchPlants();
                          handleCloseDialog();
                      }}
                      notification={handleSnackbarNotification}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <DialogTitle>Plant Details</DialogTitle>
                <DialogContent>
                    <ViewPlant plantData={selectedPlant} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewDialog} color="primary">Cancel</Button>
                </DialogActions>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CompanyPlantCrud;
