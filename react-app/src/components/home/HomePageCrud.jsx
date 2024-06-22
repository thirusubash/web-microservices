import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  TablePagination,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Container,
  Paper,
  TableContainer,
} from "@mui/material";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Delete as DeleteIcon,
  PermMediaOutlined as PermMediaOutlinedIcon,
  AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon,
} from "@mui/icons-material";
import useDebounce from "hooks/useDebounce";
import axiosInstance from "api/axiosInstance";
import HomeImagesCrud from "./HomeImagesCrud";
import HomePageForm from "./HomePageForm";

const HomePageCrud = () => {
  const [homePages, setHomePages] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [pageable, setPageable] = useState({
    page: 0,
    size: 10,
    sort: "desc",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHomePage, setSelectedHomePage] = useState(null);
  const [dialogMode, setDialogMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/homepage-service/v1", {
        params: { ...pageable, searchTerm },
      });
      setHomePages(response.data.content || []);
      setTotalElement(response.data.totalElements || 0);
    } catch (error) {
      console.error("Error fetching homePages:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pageable, searchTerm]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await axiosInstance.delete(`/homepage-service/v1/${id}`);
        handleSnackbarNotification({
          open: true,
          message: "HomePage deleted successfully!",
          severity: "success",
        });
        await fetchData();
      } catch (error) {
        console.error("Error deleting the homePage:", error);
        handleSnackbarNotification({
          open: true,
          message: "Please try again. " + error.message,
          severity: "error",
        });
      }
    },
    [fetchData]
  );

  const handleToggleVisibility = useCallback(
    async (id, visibility) => {
      try {
        await axiosInstance.patch(`/homepage-service/v1/${id}`, {
          visibility: !visibility,
        });
        await fetchData();
        handleSnackbarNotification({
          open: true,
          message: "Visibility updated successfully!",
          severity: "success",
        });
      } catch (error) {
        console.error("Error while toggling homepage visibility:", error);
        handleSnackbarNotification({
          open: true,
          message: "Failed to update the visibility. Please try again.",
          severity: "error",
        });
      }
    },
    [fetchData]
  );

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    setSelectedHomePage(null);
    setDialogMode("add");
    setDialogOpen(true);
  }, []);

  const handleImageDialog = useCallback((homePage) => {
    setSelectedHomePage(homePage);
    setImageDialogOpen(true);
  }, []);

  const handleOpenUpdateDialog = useCallback((homePage) => {
    setSelectedHomePage(homePage);
    setDialogMode("update");
    setDialogOpen(true);
  }, []);

  const handleSnackbarNotification = useCallback(
    ({ open, message, severity }) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(open);
    },
    []
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const actions = useMemo(
    () => ({
      add: handleAdd,
      image: handleImageDialog,
      update: handleOpenUpdateDialog,
      toggleVisibility: handleToggleVisibility,
      delete: handleDelete,
    }),
    [
      handleAdd,
      handleImageDialog,
      handleOpenUpdateDialog,
      handleToggleVisibility,
      handleDelete,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [debouncedSearchTerm, pageable, fetchData]);

  return (
    <Container>
      <Button variant="contained" onClick={handleAdd}>
        Add Home Component
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <TextField
        sx={{ padding: "2px" }}
        label="Search by HomePage Name"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
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
                <TableCell colSpan={18} align="center">
                  Currently, there are no homePages listed for your company. We
                  encourage you to add some to enhance your portfolio
                </TableCell>
              </TableRow>
            ) : (
              homePages.map((homePage) => (
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
                    <IconButton
                      onClick={() =>
                        actions.toggleVisibility(homePage.id, homePage.visible)
                      }
                    >
                      {homePage.visible ? (
                        <ToggleOnIcon color="success" />
                      ) : (
                        <ToggleOffIcon color="error" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => actions.update(homePage)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => actions.image(homePage)}>
                      {homePage.imageUuids && homePage.imageUuids.length > 0 ? (
                        <PermMediaOutlinedIcon color="success" />
                      ) : (
                        <AddPhotoAlternateOutlinedIcon color="error" />
                      )}
                    </IconButton>
                    <IconButton onClick={() => actions.delete(homePage.id)}>
                      <DeleteIcon color="warning" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalElement}
        page={pageable.page}
        onPageChange={(event, newPage) =>
          setPageable((prevPageable) => ({ ...prevPageable, page: newPage }))
        }
        rowsPerPage={pageable.size}
        onRowsPerPageChange={(event) =>
          setPageable((prevPageable) => ({
            ...prevPageable,
            size: +event.target.value,
            page: 0,
          }))
        }
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {selectedHomePage ? "Update HomePage" : "Add HomePage Item"}
        </DialogTitle>
        <DialogContent>
          <HomePageForm
            initialData={selectedHomePage ? selectedHomePage : null}
            onSuccess={() => {
              fetchData();
              setDialogOpen(false);
            }}
            notification={handleSnackbarNotification}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)}>
        <DialogTitle>
          {selectedHomePage ? selectedHomePage.title : null}
        </DialogTitle>
        <DialogContent>
          <HomeImagesCrud
            selectedHomePage={selectedHomePage || {}}
            notification={handleSnackbarNotification}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePageCrud;
