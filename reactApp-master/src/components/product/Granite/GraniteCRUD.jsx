import React, { lazy, useCallback, useEffect, useState, useMemo, Suspense } from "react";

// MUI components
import {
    Snackbar, Container, TableCell, TableRow, TextField, Button, TableContainer,
    Table, TableHead, TableBody, Paper, Dialog, DialogActions, DialogContent,
    DialogTitle, IconButton, TablePagination
} from "@mui/material";

// MUI icons
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import DeleteIcon from "@mui/icons-material/Delete";
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';

// Local imports
import Alert from '@mui/material/Alert';
import useDebounce from '@assets/useDebounce';
import Loading from "@components/layout/Loading";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import productApi from "@api/productApi";
import allProductApi from "@api/allProductApi";
const ViewGranite = lazy(() => import("@components/product/Granite/ViewGranite"));
const GraniteForm = lazy(() => import("@components/product/Granite/GraniteForm"));
const ProductImagesCurd = lazy(() => import("@components/product/ProductImagesCurd"));

const GraniteCRUD = ({companyId}) => {
    const [granite, setGranite] = useState([]);
    const [totalElement, setTotalElement] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [pageable, setPageable] = useState({
        page: 0,
        size: 10,
        sort: "created,desc",
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedGranite, setSelectedGranite] = useState(null);
    const [dialogMode, setDialogMode] = useState('add');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchGranites = useCallback(async () => {
        setIsLoading(true);
        if (companyId) {
            try {
                const response = await allProductApi.getCompanyAll("granites",companyId,pageable,searchTerm);
                setGranite(response.content || []);
                console.log("Fetched Marbles ", response.content);
                setTotalElement(response.totalElements);
            } catch (error) {
                console.error("Error fetching granite:", error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [companyId, pageable, searchTerm]);



    const handleDeleteGranite = async (id) => {
        try {
            await productApi.deleteCompanyProduct(companyId, id); // Changed method name
            handleSnackbarNotification({
                open: true,
                message: "Marble deleted successfully!",
                severity: "success"
            });
            await fetchGranites();
        } catch (error) {
            console.error("Error deleting the granite:", error);
            handleSnackbarNotification({
                open: true,
                message: "Please try again." + error.message,
                severity: "error"
            });
        }
    };


    // -------------------------------
    // 2. Handlers for UI components
    // -------------------------------
    const handleChangePage = useCallback((event, newPage) => {
        setPageable(prevPageable => ({ ...prevPageable, page: newPage }));
    }, []);


    const handleChangeRowsPerPage = (event) => {
        setPageable(prevPageable => ({
            ...prevPageable,
            size: +event.target.value,
            page: 0
        }));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAdd = () => {
        setSelectedGranite(null);
        setDialogOpen(true);
    };

    const handleOpenViewDialog = (granite) => {
        setSelectedGranite(granite);
        setViewDialogOpen(true);
    };

    const handleImageDialog = (granite) => {
        setSelectedGranite(granite);
        setImageDialogOpen(true);
    };

    const handleOpenAddDialog = () => {
        setSelectedGranite(null);
        setDialogMode('add');
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchGranites();   // Changed from fetchMarble to fetchGranites
    };


    const handleOpenUpdateDialog = (granite) => {
        setSelectedGranite(granite);
        setDialogMode('update');
        setDialogOpen(true);
    };

    const handleSnackbarNotification = ({open, message, severity}) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // -------------------
    // 3. Utility functions
    // -------------------
    const handleToggleGraniteVisibility = async (graniteId, isVisible) => {
        try {
            await productApi.updateProductVisibility(companyId, id, !status);
            await fetchGranites();
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling granite Status:", error);
            handleSnackbarNotification({
                open: true,
                message: "Failed to update the status. Please try again.",
                severity: "error"
            });
        }
    };

    const handleToggleGraniteStatus = async (graniteId, isActive) => {
        try {
            await productApi.updateStatus(companyId, id, !isActive);
            await fetchGranites();
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling granite status:", error);
            handleSnackbarNotification({
                open: true,
                message: "Failed to update the status. Please try again.",
                severity: "error"
            });
        }
    };
    const actions = useMemo(() => ({
        add: handleAdd,
        view: handleOpenViewDialog,
        image: handleImageDialog,
        update: handleOpenUpdateDialog,
        toggleStatus:handleToggleGraniteStatus,
        toggleVisibility: handleToggleGraniteVisibility,
        delete: handleDeleteGranite
    }), [handleOpenViewDialog, handleOpenUpdateDialog, handleToggleGraniteStatus, handleToggleGraniteVisibility,handleDeleteGranite]);

    const getCurrentSortDirection = (field) => {
        const currentSort = pageable.sort.split(',');
        return currentSort[0] === field ? currentSort[1] : null;
    };

    const handleSort = (field) => {
        const currentDirection = getCurrentSortDirection(field);
        const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
        setPageable({
            ...pageable,
            sort: `${field},${newDirection}`
        });
    };

    useEffect(() => {
        fetchGranites();
    }, [debouncedSearchTerm, pageable, fetchGranites]);

    return (
        <Container>
            {isLoading && <Loading />}
            <Button variant="contained" onClick={handleOpenAddDialog}>Add Granite</Button>
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
                sx={{ padding: "2px" }}
                label="Search by Marble Name "
                value={searchTerm}
                onChange={handleSearchChange}
                variant="outlined"
                fullWidth
            />

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>UUID</TableCell>
                            <TableCell onClick={() => handleSort('name')}>
                                Name
                                {getCurrentSortDirection('name') === 'asc' && <ArrowUpwardIcon color="success" fontSize="small" />}
                                {getCurrentSortDirection('name') === 'desc' && <ArrowDownwardIcon color="warning" fontSize="small" />}
                            </TableCell>
                            <TableCell>Category
                                {getCurrentSortDirection('category') === 'asc' && <ArrowUpwardIcon color="success" fontSize="small" />}
                                {getCurrentSortDirection('category') === 'desc' && <ArrowDownwardIcon color="warning" fontSize="small" />}</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Material</TableCell>
                            <TableCell onClick={() => handleSort('created')}>
                                Created Time
                                {getCurrentSortDirection('created') === 'asc' && <ArrowUpwardIcon color="success" fontSize="small" />}
                                {getCurrentSortDirection('created') === 'desc' && <ArrowDownwardIcon color="warning" fontSize="small" />}
                            </TableCell>
                            <TableCell onClick={() => handleSort('updated')}>
                                Updated Time
                                {getCurrentSortDirection('updated') === 'asc' && <ArrowUpwardIcon color="success" fontSize="small" />}
                                {getCurrentSortDirection('updated') === 'desc' && <ArrowDownwardIcon color="warning" fontSize="small" />}
                            </TableCell>

                            <TableCell>isVisibleToUsers</TableCell>
                            <TableCell>Plant Info</TableCell>

                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {granite && granite.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={11} align="center">Currently, there are no granite listed for your company. We encourage you to add some to enhance your portfolio</TableCell>
                                </TableRow>
                            ) : granite.map((granite) => (
                            <TableRow key={granite.id}>
                                <TableCell>{granite.id}</TableCell>
                                <TableCell>{granite.uuid}</TableCell>
                                <TableCell>{granite.name}</TableCell>
                                <TableCell>{granite.category}</TableCell>
                                <TableCell>{granite.color}</TableCell>
                                <TableCell>{granite.material}</TableCell>
                                <TableCell>{granite.created}</TableCell>
                                <TableCell>{granite.updated}</TableCell>
                                <TableCell>  <IconButton onClick={() => actions.toggleVisibility(granite.id, granite.isVisibleToUsers)}>
                                    {granite.isVisibleToUsers ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                </IconButton></TableCell>
                                <TableCell>{granite.plant ? granite.plant.name : "N/A"}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(granite)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(granite)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(granite.id, granite.isActive)}>
                                        {granite.isActive ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.image(granite)}>
                                        {granite.imageUrls && granite.imageUrls.length > 0 ?
                                            <PermMediaOutlinedIcon color="success" /> : <AddPhotoAlternateOutlinedIcon color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(granite.id)}>
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
                page={pageable.page}
                onPageChange={handleChangePage} // <-- Changed here
                rowsPerPage={pageable.size}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


            <Suspense fallback={<Loading />}>
                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>{selectedGranite ? "UPDATE GRANITE" : "ADD GRANITE"}</DialogTitle>
                    <DialogContent>
                        <GraniteForm
                            companyId={1}
                            initialMarble={selectedGranite ? selectedGranite : null}
                            onSuccess={() => {
                                fetchGranites();
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
            </Suspense>

            <Suspense fallback={<Loading />}>
                <Dialog open={viewDialogOpen} onClose={() => { setSelectedGranite(null); setViewDialogOpen(false) }}>
                    <DialogTitle>GRANITE Details</DialogTitle>
                    <DialogContent>
                        <ViewGranite granite={selectedGranite} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setSelectedGranite(null); setViewDialogOpen(false) }} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>

            <Suspense fallback={<Loading />}>
                <Dialog open={imageDialogOpen} onClose={() => { setSelectedGranite(null); setImageDialogOpen(false) }}>
                    <DialogTitle>{selectedGranite ? "UPDATE" : "ADD"} GRANITE</DialogTitle>
                    <DialogContent>
                        <ProductImagesCurd product={selectedGranite || {}} notification={handleSnackbarNotification}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setSelectedGranite(null); setImageDialogOpen(false); }} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>


        </Container>
    );
};

export  default  GraniteCRUD;