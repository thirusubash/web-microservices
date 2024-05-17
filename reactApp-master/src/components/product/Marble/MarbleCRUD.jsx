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
import ViewMarble from "@components/product/Marble/ViewMarble";
import MarbleForm from "@components/product/Marble/MarbleForm";
import ProductImagesCurd from "@components/product/ProductImagesCurd";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import productApi from "@api/productApi";
import allProductApi from "@api/allProductApi";

const MarbleCrud = ({companyId}) => {
    const [marbles, setMarbles] = useState([]);
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
    const [selectedMarble, setSelectedMarble] = useState(null);
    const [dialogMode, setDialogMode] = useState('add');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const  fetchMarbles = useCallback(async (pageableParam, searchTermParam) => {
        setIsLoading(true);
        if (companyId) {
            try {
                const response = await allProductApi.getCompanyAll("marbles",companyId,pageable,searchTerm);
                setMarbles(response.content || []);
                console.log("Fetched Marbles ", response.content);
                setTotalElement(response.totalElements);
            } catch (error) {
                console.error("Error fetching marbles:", error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [companyId]);

    const handleToggleStatus = async (id, status) => {
        try {
            await productApi.updateStatus(companyId, id, !status); // Changed marbleApi to marbleApi
            await fetchMarbles();
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling marble status:", error);
            handleSnackbarNotification({
                open: true,
                message: "Failed to update the status. Please try again.",
                severity: "error"
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await productApi.deleteCompanyProduct(companyId, id); // Changed method name
            handleSnackbarNotification({
                open: true,
                message: "Marble deleted successfully!",
                severity: "success"
            });
            await fetchMarbles();
        } catch (error) {
            console.error("Error deleting the marble:", error);
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
        setSelectedMarble(null);
        setDialogOpen(true);
    };

    const handleOpenViewDialog = (marble) => {
        setSelectedMarble(marble);
        setViewDialogOpen(true);
    };

    const handleImageDialog = (marble) => {
        setSelectedMarble(marble);
        setImageDialogOpen(true);
    };

    const handleOpenAddDialog = () => {
        setSelectedMarble(null);
        setDialogMode('add');
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchMarbles();   // Changed from fetchMarble to fetchMarbles
    };


    const handleOpenUpdateDialog = (marble) => {
        setSelectedMarble(marble);
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
    const handletoggleisVisibility = async (id, status) => {
        try {
            await productApi.updateProductVisibility(companyId, id, !status);
            await fetchMarbles();
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling marbles tatus:", error);
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
        toggleStatus: handleToggleStatus,
        toggleVisibility: handletoggleisVisibility,
        delete: handleDelete
    }), [handleOpenViewDialog, handleOpenUpdateDialog, handleToggleStatus, handleDelete]);

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
        fetchMarbles(pageable, debouncedSearchTerm);
    }, [debouncedSearchTerm, pageable, fetchMarbles]);

    return (
        <Container>
            {isLoading && <Loading />}
            <Button variant="contained" onClick={handleOpenAddDialog}>Add Product</Button>
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
                            {marbles && marbles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={11} align="center">Currently, there are no marbles listed for your company. We encourage you to add some to enhance your portfolio</TableCell>
                                </TableRow>
                            ) : marbles.map((marble) => (
                            <TableRow key={marble.id}>
                                <TableCell>{marble.id}</TableCell>
                                <TableCell>{marble.uuid}</TableCell>
                                <TableCell>{marble.name}</TableCell>
                                <TableCell>{marble.category}</TableCell>
                                <TableCell>{marble.color}</TableCell>
                                <TableCell>{marble.material}</TableCell>
                                <TableCell>{marble.created}</TableCell>
                                <TableCell>{marble.updated}</TableCell>
                                <TableCell>  <IconButton onClick={() => actions.toggleVisibility(marble.id, marble.isVisibleToUsers)}>
                                    {marble.isVisibleToUsers ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                </IconButton></TableCell>
                                <TableCell>{marble.plant ? marble.plant.name : "N/A"}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(marble)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(marble)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(marble.id, marble.isActive)}>
                                        {marble.isActive ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.image(marble)}>
                                        {marble.imageUrls && marble.imageUrls.length > 0 ?
                                            <PermMediaOutlinedIcon color="success" /> : <AddPhotoAlternateOutlinedIcon color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(marble.id)}>
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
                    <DialogTitle>{selectedMarble ? "Update Marble" : "Add Marble"}</DialogTitle>
                    <DialogContent>
                        <MarbleForm
                            companyId={1}
                            initialMarble={selectedMarble ? selectedMarble : null}
                            onSuccess={() => {
                                fetchMarbles();
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
                <Dialog open={viewDialogOpen} onClose={() => { setSelectedMarble(null); setViewDialogOpen(false) }}>
                    <DialogTitle>Marble Details</DialogTitle>
                    <DialogContent>
                        <ViewMarble marble={selectedMarble} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setSelectedMarble(null); setViewDialogOpen(false) }} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>

            <Suspense fallback={<Loading />}>
                <Dialog open={imageDialogOpen} onClose={() => { setSelectedMarble(null); setImageDialogOpen(false) }}>
                    <DialogTitle>{selectedMarble ? "UPDATE" : "ADD"} MARBLE</DialogTitle>
                    <DialogContent>
                        <ProductImagesCurd product={selectedMarble || {}} notification={handleSnackbarNotification}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setSelectedMarble(null); setImageDialogOpen(false); }} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>


        </Container>
    );
};

export  default  MarbleCrud;