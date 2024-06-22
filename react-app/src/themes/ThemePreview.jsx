import React, { useState } from "react";
import {
  Autocomplete,
  Paper,
  Typography,
  Button,
  IconButton,
  Stack,
  Switch,
  TextField,
  Badge,
  Snackbar,
  ButtonGroup,
  Grid,
  AvatarGroup,
  Avatar,
  Alert,
  AlertTitle,
  Divider,
  Box,
  Chip,
  Card,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { green, pink } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CheckCircleOutline } from "@mui/icons-material";

const ThemePreview = () => {
  // Sample data for DataGrid
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const handleSnackbarClick = () => {
    // Implement Snackbar click handler logic here
  };

  return (
    <Paper style={{ backgroundColor: "#ffffff", padding: 20, marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        Theme Preview
      </Typography>

      {/* Autocomplete examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>Autocomplete Examples</Typography>
        <Autocomplete
          options={["Option 1", "Option 2", "Option 3"]}
          renderInput={(params) => (
            <TextField {...params} label="Primary Color Autocomplete" />
          )}
        />
        <Autocomplete
          options={["Option A", "Option B", "Option C"]}
          renderInput={(params) => (
            <TextField {...params} label="Secondary Color Autocomplete" />
          )}
        />
        <Autocomplete
          options={["Option X", "Option Y", "Option Z"]}
          renderInput={(params) => (
            <TextField {...params} label="Info Color Autocomplete" />
          )}
        />
        <Autocomplete
          options={["Option Error", "Option Warning", "Option Success"]}
          renderInput={(params) => (
            <TextField {...params} label="Error Color Autocomplete" />
          )}
        />
      </Paper>

      <Divider />

      {/* AvatarGroup examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>AvatarGroup Examples</Typography>
        <AvatarGroup total={24}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </Paper>

      <Divider />

      {/* CircularProgress examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>CircularProgress Examples</Typography>
        <CircularProgress />
        <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
        <Divider />
        <CircularProgress variant="determinate" value={25} />
        <CircularProgress variant="determinate" value={50} />
        <CircularProgress variant="determinate" value={75} />
        <CircularProgress variant="determinate" value={100} />
      </Paper>

      <Divider />

      {/* Card examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>Card Examples</Typography>
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                Toothbrush
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                $4.50
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              Pinstriped cornflower blue cotton blouse takes you on a walk to
              the park or just down the hall.
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="body2">
              Select type
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip color="primary" label="Soft" size="small" />
              <Chip label="Medium" size="small" />
              <Chip label="Hard" size="small" />
            </Stack>
          </Box>
        </Card>
      </Paper>

      <Divider />

      {/* LinearProgress examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>LinearProgress Examples</Typography>
        <LinearProgress />
        <Divider />
        <LinearProgress color="secondary" />
        <Divider />
        <LinearProgress color="success" />
        <Divider />
        <LinearProgress color="inherit" />
      </Paper>

      <Divider />

      {/* Alert examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>Alert Examples</Typography>
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
        >
          Here is a gentle confirmation that your action was successful.
        </Alert>
        <Alert severity="success">This is a success Alert.</Alert>
        <Alert severity="info">This is an info Alert.</Alert>
        <Alert severity="warning">This is a warning Alert.</Alert>
        <Alert severity="error">This is an error Alert.</Alert>
        <Alert variant="filled" severity="success">
          This is a filled success Alert.
        </Alert>
        <Alert variant="filled" severity="info">
          This is a filled info Alert.
        </Alert>
        <Alert variant="filled" severity="warning">
          This is a filled warning Alert.
        </Alert>
        <Alert variant="filled" severity="error">
          This is a filled error Alert.
        </Alert>
        <Alert severity="success" color="warning">
          This is a success Alert with warning colors.
        </Alert>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success Alert with an encouraging title.
        </Alert>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          This is an info Alert with an informative title.
        </Alert>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          This is a warning Alert with a cautious title.
        </Alert>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error Alert with a scary title.
        </Alert>
      </Paper>

      <Divider />

      {/* Button examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>Button Examples</Typography>
        <Stack direction="row" spacing={2} marginBottom={2}>
          <Button variant="contained">Contained</Button>
          <Button variant="contained" disabled>
            Disabled Contained
          </Button>
          <Button variant="contained" color="secondary">
            Secondary Contained
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: green[500], color: "#ffffff" }}
          >
            Custom Primary Contained
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
      </Paper>

      <Divider />

      {/* IconButton examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>IconButton Examples</Typography>
        <Stack direction="row" spacing={2}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" disabled color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an alarm">
            <AlarmIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Stack>
      </Paper>

      <Divider />

      {/* Switch and TextField examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>Switch and TextField Examples</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Switch />
          <Switch checked />
          <Switch disabled />
          <Switch disabled checked />
          <TextField
            id="outlined-basic"
            label="Outlined TextField"
            variant="outlined"
          />
          <TextField
            id="filled-basic"
            label="Filled TextField"
            variant="filled"
          />
          <TextField
            id="standard-basic"
            label="Standard TextField"
            variant="standard"
          />
        </Stack>
      </Paper>

      <Divider />

      {/* Badge examples */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>Badge Examples</Typography>
        <Stack direction="row" spacing={2}>
          <Badge badgeContent={4} color="primary">
            Primary Badge
          </Badge>
          <Badge badgeContent={4} color="secondary">
            Secondary Badge
          </Badge>
        </Stack>
      </Paper>

      <Divider />

      {/* DataGrid example */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>DataGrid Example</Typography>
        <div style={{ height: 400, width: "100%" }}>
          <Grid
            rows={rows}
            columns={[
              { field: "id", headerName: "ID", width: 70 },
              { field: "firstName", headerName: "First name", width: 130 },
              { field: "lastName", headerName: "Last name", width: 130 },
              {
                field: "age",
                headerName: "Age",
                type: "number",
                width: 90,
              },
            ]}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </Paper>

      <Divider />

      {/* Snackbar example */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>Snackbar Example</Typography>
        <Button variant="contained" onClick={handleSnackbarClick}>
          Open Snackbar
        </Button>
        <Snackbar message="Note archived" />
      </Paper>

      <Divider />

      {/* Timeline example */}
      <Paper style={{ padding: 10, marginBottom: 10 }}>
        <Typography gutterBottom>Timeline Example</Typography>
      </Paper>
    </Paper>
  );
};

export default ThemePreview;
