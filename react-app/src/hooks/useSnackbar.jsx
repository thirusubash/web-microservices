import { useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function useSnackbar() {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Function to show the Snackbar with a message and optional severity
  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbarState({ open: true, message, severity });
  }, []);

  // Function to close the Snackbar
  const handleCloseSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    // SnackbarComponent to render the Snackbar with current state
    SnackbarComponent: (
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000} // Snackbar will auto hide after 6000ms (6 seconds)
        onClose={handleCloseSnackbar} // Handler for close event
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Position of the Snackbar
      >
        {/* Alert component inside Snackbar, with close handler and severity */}
        <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    ),
    showSnackbar, // Expose showSnackbar function to trigger Snackbar display
  };
}

export default useSnackbar;
