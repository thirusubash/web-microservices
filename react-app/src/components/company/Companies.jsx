import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToggleOff, ToggleOn } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FactoryIcon from "@mui/icons-material/Factory";
import axiosInstance from "api/axiosInstance"; // Assuming axiosInstance is configured correctly

import useDebounce from "hooks/useDebounce";
import useSnackbar from "hooks/useSnackbar";
import ViewCompany from "./ViewCompany";

function Companies() {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    totalElements: 0,
  });

  const { SnackbarComponent, showSnackbar } = useSnackbar();
  const [dialogs, setDialogs] = useState({ view: false, edit: false });
  const [searchQuery, setSearchQuery] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [mode, setMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchCompanyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/company-service/", {
        params: {
          page: pagination.page,
          size: pagination.rowsPerPage,
          // ... other parameters (sorting, etc.)
        },
      });

      setCompanyData(response.data.content);
      setPagination((prev) => ({
        ...prev,
        totalElements: response.data.totalElements,
      }));
    } catch (error) {
      showSnackbar("Error fetching company data: " + error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [
    pagination.page,
    pagination.rowsPerPage,
    debouncedSearchQuery,
    showSnackbar,
  ]);

  useEffect(() => {
    fetchCompanyData();
  }, [debouncedSearchQuery, pagination.page, pagination.rowsPerPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      rowsPerPage: +event.target.value,
      page: 0,
      totalElements: pagination.totalElements,
    });
  };

  const handleToggleStatus = useCallback(
    async (companyId, status) => {
      const company = companyData.find((comp) => comp.id === companyId);

      if (!company) return;

      try {
        await axiosInstance.patch(`/company-service/${companyId}`, {
          status: !status,
        });
        await fetchCompanyData();
        showSnackbar("Company status updated.", status ? "warning" : "success");
      } catch (error) {
        showSnackbar(
          "Error toggling company status: " + error.message,
          "error"
        );
      }
    },
    [companyData, fetchCompanyData, showSnackbar]
  );

  function formatDateTime(dateTime) {
    if (!dateTime) return "";
    const parsedDate = new Date(dateTime);
    if (isNaN(parsedDate)) return "";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
  }

  async function handleDelete(id) {
    try {
      await axiosInstance.delete(`/company-service/${id}`);
      await fetchCompanyData();
      showSnackbar("Company deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Failed to delete company: " + error.message, "error");
    }
  }

  const handleOpenDialog = (type, company, mode) => {
    setSelectedCompany(company);
    setMode(mode);

    setDialogs((prev) => ({ ...prev, [type]: true }));
  };

  const handleCloseDialog = (type) => {
    setSelectedCompany(null);
    setMode(null);
    setDialogs((prev) => ({ ...prev, [type]: false }));
  };

  const actions = useMemo(
    () => ({
      add: () => handleOpenDialog("edit", null, "add"),
      view: (company) => handleOpenDialog("view", company),
      update: (company) => handleOpenDialog("edit", company, "update"),
      toggleStatus: handleToggleStatus,
      delete: handleDelete,
    }),
    [handleOpenDialog, handleToggleStatus, handleDelete]
  );

  return (
    <Container>
      <Button onClick={actions.add}>Add Company</Button>
      <TextField
        sx={{ padding: "2px" }}
        label="Search by Company Name"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>GSTIN</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date Of Incorporation</TableCell>
              <TableCell>Plant</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.gstin}</TableCell>
                <TableCell>{company.contactNumber}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>
                  {formatDateTime(company.dateOfIncorporation)}
                </TableCell>
                <TableCell>
                  <Button
                    color="info"
                    component={Link}
                    to={`/companies/${company.id}/plants`}
                    size="small"
                    startIcon={<FactoryIcon />}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>{formatDateTime(company.updated)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => actions.view(company)}>
                    <VisibilityIcon color="info" />
                  </IconButton>
                  <IconButton onClick={() => actions.update(company)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      actions.toggleStatus(company.id, company.status)
                    }
                  >
                    {company.status ? (
                      <ToggleOn color="success" />
                    ) : (
                      <ToggleOff color="error" />
                    )}
                  </IconButton>
                  <IconButton onClick={() => actions.delete(company.id)}>
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
        count={pagination.totalElements}
        page={pagination.page}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <Dialog open={dialogs.view} onClose={() => handleCloseDialog("view")}>
          <DialogTitle>
            <Typography variant="body" color="info.main">
              View Company Details
            </Typography>
          </DialogTitle>
          <DialogContent>
            {selectedCompany && (
              <ViewCompany
                companyId={selectedCompany.id}
                showSnackbar={showSnackbar}
              />
            )}
          </DialogContent>
        </Dialog>
      </Suspense>
    </Container>
  );
}

export default Companies;
