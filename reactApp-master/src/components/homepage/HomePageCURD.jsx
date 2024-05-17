// React & Hooks
import React, { lazy, useCallback, useEffect, useState, useMemo, Suspense } from "react";

// MUI Components
import {
    Snackbar, Container, TableCell, TableRow, TextField, Button, TableContainer,
    Table, TableHead, TableBody, Paper, Dialog, DialogActions, DialogContent,
    DialogTitle, IconButton, TablePagination, Typography
} from "@mui/material";

// MUI Icons
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import DeleteIcon from "@mui/icons-material/Delete";
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

// Local Component & Utility Imports
import Alert from '@mui/material/Alert';
import useDebounce from '@assets/useDebounce';
import Loading from "@components/layout/Loading";
import ProductImagesCurd from "@components/product/ProductImagesCurd";
import HomePageForm from "@components/homepage/HomePageForm";

// API Imports
import homePageApi from "@api/homePageApi";
import HomeImagesCrud from "@components/homepage/HomeImagesCrud";
const HomePageCrud = () => {
// 1. State Declarations
const [homePages, setHomePages] = useState([]);
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
const [selectedHomePage, setSelectedHomePage] = useState(null);
const [dialogMode, setDialogMode] = useState('add');
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearchTerm = useDebounce(searchTerm, 1500);

// 2. Utility Functions
    const fetchHomePages = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await homePageApi.search(pageable, searchTerm);
            setHomePages(response.content || []);

            // Fix the typo
            setTotalElement(response.totalElements || 0);
        } catch (error) {
            console.error("Error fetching homePages:", error);
        } finally {
            setIsLoading(false);
        }
    }, [pageable, searchTerm]);

const getCurrentSortDirection = (field) => {
    const currentSort = pageable.sort.split(',');
    return currentSort[0] === field ? currentSort[1] : null;
};

const handleDelete = async (id) => {
    try {
        await homePageApi.delete(id);
        handleSnackbarNotification({
            open: true,
            message: "HomePage deleted successfully!",
            severity: "success"
        });
        await fetchHomePages();
    } catch (error) {
        console.error("Error deleting the homePage:", error);
        handleSnackbarNotification({
            open: true,
            message: "Please try again." + error.message,
            severity: "error"
        });
    }
};

const handletoggleisVisibility = async (id, visibility) => {
    try {
        await homePageApi.updateVisibility(id, !visibility);
        await fetchHomePages();
        handleSnackbarNotification({
            open: true,
            message: "Visibility updated successfully!",
            severity: "success"
        });
    } catch (error) {
        console.error("Error while toggling homepage visibility:", error);
        handleSnackbarNotification({
            open: true,
            message: "Failed to update the visibility. Please try again.",
            severity: "error"
        });
    }
};

const handleSort = (field) => {
    const currentDirection = getCurrentSortDirection(field);
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    setPageable({
        ...pageable,
        sort: `${field},${newDirection}`
    });
};

// Handlers for UI components
    const handleChangePage = useCallback((event, newPage) => {
        setPageable(prevPageable => ({ ...prevPageable, page: newPage }));
        // After changing the page, we want to fetch the new set of data
        fetchHomePages();
    }, [fetchHomePages]);

    const handleChangeRowsPerPage = (event) => {
        setPageable(prevPageable => ({
            ...prevPageable,
            size: +event.target.value,
            page: 0
        }));
        // After changing the rows per page, we want to fetch the new set of data
        fetchHomePages();
    };

const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
};

const handleAdd = () => {
    setSelectedHomePage(null);
    setDialogOpen(true);
};

const handleImageDialog = (homePage) => {
    setSelectedHomePage(homePage);
    setImageDialogOpen(true);
};

const handleOpenAddDialog = () => {
    setSelectedHomePage(null);
    setDialogMode('add');
    setDialogOpen(true);
};

const handleCloseDialog = () => {
    setSelectedHomePage(null);
    setDialogOpen(false);
    fetchHomePages();
};

const handleOpenUpdateDialog = (homePage) => {
    setSelectedHomePage(homePage);
    setDialogMode('update');
    setDialogOpen(true);
};

const handleSnackbarNotification = ({ open, message, severity }) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(open);
};

const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
};

const actions = useMemo(() => ({
    add: handleAdd,
    image: handleImageDialog,
    update: handleOpenUpdateDialog,
    toggleVisibility: handletoggleisVisibility,
    delete: handleDelete
}), [handleOpenUpdateDialog]);

    useEffect(() => {
        fetchHomePages();
    }, [debouncedSearchTerm, pageable, fetchHomePages]);


return (
        <Container>
            {isLoading && <Loading />}

            <Button variant="contained" onClick={handleOpenAddDialog}>
                Add Home Component
            </Button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
                label="Search by HomePage Name"
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
                            <TableCell>Title</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Primary Button Title</TableCell>
                            <TableCell>Secondary Button Title</TableCell>
                            <TableCell>Primary Button Redirect Url</TableCell>
                            <TableCell>Secondary Button Redirect Url</TableCell>
                            <TableCell>Post Headline</TableCell>
                            <TableCell>Website Title</TableCell>
                            <TableCell>Sort Order</TableCell>
                            <TableCell>Detailed Description</TableCell>
                            <TableCell>Notification Message</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Last Modified By</TableCell>
                            <TableCell>Updated</TableCell>
                            <TableCell>Visibility</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {homePages && homePages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={18} align="center">Currently, there are no homePages listed for your company. We encourage you to add some to enhance your portfolio</TableCell>
                            </TableRow>
                        ) : homePages.map((homePage) => (
                            <TableRow key={homePage.id}>
                                <TableCell>{homePage.id}</TableCell>
                                <TableCell>{homePage.title}</TableCell>
                                <TableCell>{homePage.type}</TableCell>
                                <TableCell>{homePage.primaryButtonTitle}</TableCell>
                                <TableCell>{homePage.secondaryButtonTitle}</TableCell>
                                <TableCell>{homePage.primaryButtonRedirectUrl}</TableCell>
                                <TableCell>{homePage.secondaryButtonRedirectUrl}</TableCell>
                                <TableCell>{homePage.postHeadline}</TableCell>
                                <TableCell>{homePage.websiteTitle}</TableCell>
                                <TableCell>{homePage.sortOrder}</TableCell>
                                <TableCell>{homePage.detailedDescription}</TableCell>
                                <TableCell>{homePage.notificationMessage}</TableCell>
                                <TableCell>{homePage.createdBy}</TableCell>
                                <TableCell>{homePage.created}</TableCell>
                                <TableCell>{homePage.lastModifiedBy}</TableCell>
                                <TableCell>{homePage.updated}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.toggleVisibility(homePage.id, homePage.visible)}>
                                        {homePage.visible ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.update(homePage)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.image(homePage)}>
                                        {homePage.imageUuids && homePage.imageUuids.length > 0 ?
                                            <PermMediaOutlinedIcon color="success" /> : <AddPhotoAlternateOutlinedIcon color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(homePage.id)}>
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
                onPageChange={handleChangePage}
                rowsPerPage={pageable.size}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


            <Suspense fallback={<Loading />}>
                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>{selectedHomePage ? "Update HomePage" : "Add HomePage"}</DialogTitle>
                    <DialogContent>
                        <HomePageForm
                            initialData={selectedHomePage ?  selectedHomePage : null}
                            onSuccess={() => {
                                fetchHomePages();
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
                <Dialog open={imageDialogOpen} onClose={() => { setSelectedHomePage(null); setImageDialogOpen(false) }}>
                    <DialogTitle> {selectedHomePage ? selectedHomePage.title : null}</DialogTitle>
                    <DialogContent>
                        <HomeImagesCrud product={selectedHomePage || {}} notification={handleSnackbarNotification}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setSelectedHomePage(null); setImageDialogOpen(false); }} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>
        </Container>
    )
};

export  default  HomePageCrud;