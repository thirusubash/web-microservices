import React, { lazy, useCallback, useEffect, useState, useMemo, Suspense } from "react";
import {
    Snackbar, Container, TableCell, TableRow, TextField, Button, TableContainer,
    Table, TableHead, TableBody, Paper, Dialog, DialogActions, DialogContent,
    DialogTitle, IconButton, TablePagination, Alert
} from "@mui/material";
import {
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    ToggleOn,
    ToggleOff,
    Delete as DeleteIcon,
    PermMediaOutlined as PermMediaOutlinedIcon,
    AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon
} from "@mui/icons-material";

import useDebounce from '@assets/useDebounce';
import Loading from "@components/layout/Loading";
import productApi from "@api/productApi";
import allProductApi from "@api/allProductApi";
import HollowBricksForm from "@components/product/HollowBricks/HollowBricksForm";
import ViewHollowBrick from "@components/product/HollowBricks/ViewhollowBricks";


const ProductImagesCurd = lazy(() => import("@components/product/ProductImagesCurd"));

const HollowBrickCRUD = ({ companyId }) => {
    const [hollowBricks, setHollowBricks] = useState([]);
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
    const [selectedHollowBrick, setSelectedHollowBrick] = useState(null);
    const [dialogMode, setDialogMode] = useState('add');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchHollowBricks = useCallback(async () => {
        setIsLoading(true);
        if (companyId) {
            try {
                const response = await allProductApi.getCompanyAll("hollowBricks",companyId, pageable, debouncedSearchTerm); // Using productApi
                setHollowBricks(response.content || []);
                console.log("Fetched HollowBricks ", response.content);
                setTotalElement(response.totalElements);
            } catch (error) {
                handleSnackbarNotification({
                    open:true,
                    message:"Oops !"+error.message,
                    severity:"error"
                })
            } finally {
                setIsLoading(false);
            }
        }
    }, [companyId, pageable, debouncedSearchTerm]);



    const handleDeleteHollowBrick = async (id) => {
        try {
            await productApi.deleteCompanyProduct(companyId, id); // Changed method name
            handleSnackbarNotification({
                open: true,
                message: "Granite deleted successfully!",
                severity: "success"
            });
            await fetchHollowBricks();
        } catch (error) {
            console.error("Error deleting the HollowBrick:", error);
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
        setSelectedHollowBrick(null);
        setDialogOpen(true);
    };

    const handleOpenViewDialog = (HollowBrick) => {
        setSelectedHollowBrick(HollowBrick);
        setViewDialogOpen(true);
    };

    const handleImageDialog = (HollowBrick) => {
        setSelectedHollowBrick(HollowBrick);
        setImageDialogOpen(true);
    };

    const handleOpenAddDialog = () => {
        setSelectedHollowBrick(null);
        setDialogMode('add');
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchHollowBricks();   // Changed from fetchGranite to fetchHollowBricks
    };


    const handleOpenUpdateDialog = (HollowBrick) => {
        setSelectedHollowBrick(HollowBrick);
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
    const handleToggleHollowBrickVisibility = async (HollowbrickId, isVisible) => {
        try {
            await productApi.updateProductVisibility(companyId, id, !isVisible);
            await fetchHollowBricks();
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling Hollowbrick Status:", error);
            handleSnackbarNotification({
                open: true,
                message: "Failed to update the status. Please try again.",
                severity: "error"
            });
        }
    };

    const handleToggleHollowBrickStatus = async (HollowbrickId, isActive) => {
        try {
            await productApi.updateStatus(companyId, id, !isActive); // Changed HollowBrickApi to HollowBrickApi
            await fetchHollowBricks();
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling HollowBrick status:", error);
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
        toggleStatus:handleToggleHollowBrickStatus,
        toggleVisibility: handleToggleHollowBrickVisibility,
        delete: handleDeleteHollowBrick
    }), [handleOpenViewDialog, handleOpenUpdateDialog, handleToggleHollowBrickStatus, handleToggleHollowBrickVisibility,handleDeleteHollowBrick]);

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
        fetchHollowBricks();
    }, [debouncedSearchTerm, pageable, fetchHollowBricks]);

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
                label="Search by Granite Name "
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
                        {hollowBricks && hollowBricks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={11} align="center">Currently, there are no Hollow-brick listed for your company. We encourage you to add some to enhance your portfolio</TableCell>
                            </TableRow>
                        ) : hollowBricks.map((HollowBrick) => (
                            <TableRow key={HollowBrick.id}>
                                <TableCell>{HollowBrick.id}</TableCell>
                                <TableCell>{HollowBrick.uuid}</TableCell>
                                <TableCell>{HollowBrick.name}</TableCell>
                                <TableCell>{HollowBrick.category}</TableCell>
                                <TableCell>{HollowBrick.color}</TableCell>
                                <TableCell>{HollowBrick.material}</TableCell>
                                <TableCell>{HollowBrick.created}</TableCell>
                                <TableCell>{HollowBrick.updated}</TableCell>
                                <TableCell>  <IconButton onClick={() => actions.toggleVisibility(HollowBrick.id, HollowBrick.isVisibleToUsers)}>
                                    {HollowBrick.isVisibleToUsers ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                </IconButton></TableCell>
                                <TableCell>{HollowBrick.plant ? HollowBrick.plant.name : "N/A"}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(HollowBrick)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(HollowBrick)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(HollowBrick.id, HollowBrick.isActive)}>
                                        {HollowBrick.isActive ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.image(HollowBrick)}>
                                        {HollowBrick.imageUrls && HollowBrick.imageUrls.length > 0 ?
                                            <PermMediaOutlinedIcon color="success" /> : <AddPhotoAlternateOutlinedIcon color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(HollowBrick.id)}>
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
                    <DialogTitle>{selectedHollowBrick ? "Update Granite" : "Add Hollow Bricks"}</DialogTitle>
                    <DialogContent>
                        <HollowBricksForm
                            companyId={1}
                            initialGranite={selectedHollowBrick ? selectedHollowBrick : null}
                            onSuccess={() => {
                                fetchHollowBricks();
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
                <Dialog open={viewDialogOpen} onClose={() => { setSelectedHollowBrick(null); setViewDialogOpen(false) }}>
                    <DialogTitle>Granite Details</DialogTitle>
                    <DialogContent>
                        <ViewHollowBrick HollowBrick={selectedHollowBrick} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setSelectedHollowBrick(null); setViewDialogOpen(false) }} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>

            <Suspense fallback={<Loading />}>
                <Dialog open={imageDialogOpen} onClose={() => { setSelectedHollowBrick(null); setImageDialogOpen(false) }}>
                    <DialogTitle>{selectedHollowBrick ? "UPDATE" : "ADD"} Hollow Bricks</DialogTitle>
                    <DialogContent>
                        <ProductImagesCurd product={selectedHollowBrick || {}} notification={handleSnackbarNotification}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setSelectedHollowBrick(null); setImageDialogOpen(false); }} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>


        </Container>
    );
};

export  default  HollowBrickCRUD;