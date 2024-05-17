import React, { useCallback, useEffect, useState, useMemo } from "react";
import allProductApi from "@api/allProductApi";
import productApi from "@api/productApi";
// MUI components
import {
    Snackbar, Container, TableCell, TableRow, TextField, Button, TableContainer,
    Table, TableHead, TableBody, Paper, Dialog, DialogActions, DialogContent,
    DialogTitle, IconButton, TablePagination, Alert, CircularProgress
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

const tableConfigurations = {
    granites: [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name', isSortable: true },
        // ... other columns for granite
    ],
    marbles: [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name', isSortable: true },
        // ... other columns for marble
    ],
    hollowBricks: [
        { key: 'id', title: 'ID' },
        { key: 'dimension', title: 'Dimension', isSortable: true },
        // ... other columns for hollow bricks
    ],
    // ... similar configurations for other products
};


const ProductCRUD = ({ companyId, productType }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageable, setPageable] = useState({ page: 0, size: 10, sort: '' });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        if (companyId) {
            try {
                const response = await allProductApi.getCompanyAll(productType, companyId, pageable, searchTerm);
                setProducts(response.content || []);
                console.log(`Fetched ${productType} `, response.content);
            } catch (error) {
                console.error(`Error fetching ${productType}:`, error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [companyId, pageable, searchTerm, productType]);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleToggleStatus = async (id, status) => {
        try {
            await productApi.updateStatus(companyId, id, !status);
            await fetchProducts();
            handleSnackbarNotification({
                open: true,
                message: `${productType.charAt(0).toUpperCase() + productType.slice(1)} status updated successfully!`,
                severity: "success"
            });
        } catch (error) {
            console.error(`Error while toggling ${productType} status:`, error);
            handleSnackbarNotification({
                open: true,
                message: `Failed to update the status of ${productType}. Please try again.`,
                severity: "error"
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await productApi.deleteCompanyProduct(companyId, id);
            handleSnackbarNotification({
                open: true,
                message: `${productType.charAt(0).toUpperCase() + productType.slice(1)} deleted successfully!`,
                severity: "success"
            });
            await fetchProducts();
        } catch (error) {
            console.error(`Error deleting the ${productType}:`, error);
            handleSnackbarNotification({
                open: true,
                message: `Failed to delete ${productType}. Please try again. Error: ` + error.message,
                severity: "error"
            });
        }
    };

    // Handlers for UI components:

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarNotification = ({ open, message, severity }) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(open);
    };

    const handleSort = useCallback((field) => {
        const currentDirection = getCurrentSortDirection(field);
        const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
        setPageable({
            ...pageable,
            sort: `${field},${newDirection}`
        });
    }, [pageable]);

    const getCurrentSortDirection = (field) => {
        const currentSort = pageable.sort.split(',');
        return currentSort[0] === field ? currentSort[1] : null;
    };

    useEffect(() => {
        fetchProducts();
    }, [searchTerm, pageable, fetchProducts]);

    return (
        <Container>
            {/* Filters or Search Components */}
            <TextField
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={`Search ${productType}...`}
            />

            {/* Products Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                        <TableRow>
                            {tableConfigurations[productType].map((column) => (
                                <TableCell
                                    key={column.key}
                                    onClick={column.isSortable ? () => handleSort(column.key) : undefined}
                                >
                                    {column.title}
                                    {column.isSortable && getCurrentSortDirection(column.key) === 'asc' &&
                                        <ArrowUpwardIcon color="success" fontSize="small" />
                                    }
                                    {column.isSortable && getCurrentSortDirection(column.key) === 'desc' &&
                                        <ArrowDownwardIcon color="warning" fontSize="small" />
                                    }
                                </TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={tableConfigurations[productType].length + 1} align="center">
                                    <CircularProgress /> {/* Display loading spinner */}
                                </TableCell>
                            </TableRow>
                        ) : products.map((product) => (
                            <TableRow key={product.id}>
                                {tableConfigurations[productType].map((column) => (
                                    <TableCell key={column.key}>
                                        {product[column.key]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {/* Action buttons */}
                                    <IconButton>
                                        <VisibilityIcon color="action" />
                                    </IconButton>
                                    <IconButton>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleToggleStatus(product.id, product.isActive)}>
                                        {product.isActive ? <ToggleOn color="success" /> : <ToggleOff color="error" />}
                                    </IconButton>
                                    <IconButton>
                                        <PermMediaOutlinedIcon color="action" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(product.id)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Other components like Pagination, Dialogs for adding or editing products */}
            {/* ... */}

            {/* Snackbar for Notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );

};

export default ProductCRUD;
