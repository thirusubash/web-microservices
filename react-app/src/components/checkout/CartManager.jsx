import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { fetchCartItems, addToCart, updateCartItem, deleteCartItem } from '../../redux/slices/cartSlice';

const SlideTransition = (props) => <Slide {...props} direction="up" />;

function CartManager() {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const [editIndex, setEditIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleAddItem = async () => {
    if (!itemName || itemQuantity <= 0) {
      setSnackbarMessage("Invalid item data.");
      setSnackbarOpen(true);
      return;
    }

    try {
      await dispatch(addToCart({ name: itemName, quantity: itemQuantity }));
      setItemName("");
      setItemQuantity("");
      setSnackbarMessage("Item added successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to add item.");
      setSnackbarOpen(true);
    }
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setItemName(cartItems[index].name);
    setItemQuantity(cartItems[index].quantity);
    setOpenDialog(true);
  };

  const handleUpdateItem = async () => {
    if (!itemName || itemQuantity <= 0) {
      setSnackbarMessage("Invalid item data.");
      setSnackbarOpen(true);
      return;
    }

    try {
      await dispatch(updateCartItem({ id: cartItems[editIndex].id, name: itemName, quantity: itemQuantity }));
      setEditIndex(null);
      setItemName("");
      setItemQuantity("");
      setOpenDialog(false);
      setSnackbarMessage("Item updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to update item.");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteItem = async (index) => {
    try {
      await dispatch(deleteCartItem(cartItems[index].id));
      setSnackbarMessage("Item deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to delete item.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Cart
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        Add Item
      </Button>

      <Box>
        {cartItems.map((item, index) => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
              <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleEditItem(index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteItem(index)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        TransitionComponent={SlideTransition}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          {editIndex !== null ? "Edit Item" : "Add Item"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            variant="standard"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity"
            fullWidth
            variant="standard"
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(Number(e.target.value))}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={editIndex !== null ? handleUpdateItem : handleAddItem}
          >
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

export default CartManager;
