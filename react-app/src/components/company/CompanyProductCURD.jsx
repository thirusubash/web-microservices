// React imports
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

// Local imports
import Alert from '@mui/material/Alert';
import useDebounce from '@assets/useDebounce';
import Loading from "@components/layout/Loading";
import productApi from "@api/productApi";
const ProductForm = lazy(() => import('@components/company/CompanyProductForm'));
const ViewCompanyProduct = lazy(() => import('@components/company/ViewCompanyProduct'));





const CompanyProductCrud = ({ companyId = 1 }) => {
    const [products, setProducts] = useState([]);
    const [totalElement, setTotalElement] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [pageable, setPageable] = useState({
        page: 0,
        size: 10,
        sort: "created,desc",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogMode, setDialogMode] = useState('add');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchProducts = useCallback(async (pageableParam, searchTermParam) => {
        setIsLoading(true);
        if (companyId) {
            try {
                const response = await productApi.getAllProductsByCompanyID(companyId, pageableParam, searchTermParam);
                setProducts(response.content);
                console.log("Fetched Products ", response.content);
                setTotalElement(response.totalElements);

            } catch (error) {
                console.error("Error fetching products:", error);

                // Check for HTTP status code
                if (error.response && error.response.status === 404) {
                    handleSnackbarNotification({
                        open: true,
                        message: "No products available for this company,.",
                        severity: "info"
                    });
                } else {
                    handleSnackbarNotification({
                        open: true,
                        message: "Please try again.",
                        severity: "error"
                    });
                }

            } finally {
                setIsLoading(false);
            }
        }
    }, [companyId]);




    const handleToggleStatus = async (id, status) => {
        try {
            await productApi.updateStatus(companyId, id, !status);
            fetchProducts();
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling product status:", error);
            handleSnackbarNotification({
                open: true,
                message: "Failed to update the status. Please try again.",
                severity: "error"
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await productApi.deleteCompanyProduct(companyId, id);
            handleSnackbarNotification({
                open: true,
                message: "Product deleted successfully!",
                severity: "success"
            });
            await fetchProducts();
        } catch (error) {
            console.error("Error deleting the product:", error);
            handleSnackbarNotification({
                open: true,
                message: "Please try again."+error.message,
                severity: "error"
            });
        }
    };

    // -------------------------------
    // 2. Handlers for UI components
    // -------------------------------
    const handleChangePage = (event, newPage) => {
        setPageable(prevPageable => ({ ...prevPageable, page: newPage }));
    };

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
        setSelectedProduct(null);
        setDialogOpen(true);
    };

    const handleOpenViewDialog = (product) => {
        setSelectedProduct(product);
        setViewDialogOpen(true);
    };

    const handleOpenAddDialog = () => {
        setSelectedProduct(null);
        setDialogMode('add');
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchProducts();
    };

    const handleOpenUpdateDialog = (product) => {
        setSelectedProduct(product);
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
            fetchProducts();
            handleSnackbarNotification({
                open: true,
                message: "Status updated successfully!",
                severity: "success"
            });
        } catch (error) {
            console.error("Error while toggling product status:", error);
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
        fetchProducts(pageable, debouncedSearchTerm);
    }, [debouncedSearchTerm, pageable, fetchProducts]);
    return (
        <Container>
            {isLoading && <Loading/>}
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
                label="Search by Product"
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
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={11} align="center">Currently, there are no products listed for your company. We encourage you to add some to enhance your portfolio</TableCell>
                            </TableRow>
                        ) :  products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.uuid}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.color}</TableCell>
                                <TableCell>{product.material}</TableCell>
                                <TableCell>{product.created}</TableCell>
                                <TableCell>{product.updated}</TableCell>
                                <TableCell>  <IconButton onClick={() => actions.toggleVisibility(product.id, product.isVisibleToUsers)}>
                                    {product.isVisibleToUsers ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                </IconButton></TableCell>
                                <TableCell>{product.plant ? product.plant.name : "N/A"}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => actions.view(product)}>
                                        <VisibilityIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.update(product)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => actions.toggleStatus(product.id, product.isActive)}>
                                        {product.isActive ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton onClick={() => actions.delete(product.id)}>
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


            <Suspense fallback={<Loading/>}>
                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>{selectedProduct ? "Update Product" : "Add Product"}</DialogTitle>
                    <DialogContent>
                        <ProductForm
                            companyId={companyId}
                            product={selectedProduct}
                            onSuccess={() => {
                                fetchProducts();
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
            <Suspense fallback={<Loading/>}>
                <Dialog open={viewDialogOpen} onClose={() => {setSelectedProduct(null); setViewDialogOpen(false)}}>
                    <DialogTitle>Product Details</DialogTitle>
                    <DialogContent>
                        <ViewCompanyProduct product={selectedProduct} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setSelectedProduct(null); setViewDialogOpen(false)}} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>
        </Container>
    );
};

export  default  CompanyProductCrud;