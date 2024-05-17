import React, { Component } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  ButtonGroup,
  Grid,
  Container
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default class AddProduct extends Component {
  state = {
    catSelected: "ALL",
    productTypeSelected: "Granite",
    hasError: false,
  };

  producT = [
    {
      id: "1",
      value: "Marbles",
    },
    {
      id: "2",
      value: "Floor Path",
    },
    {
      id: "3",
      value: "Granite",
    },
    {
      id: "4",
      value: "Others",
    },
  ];

  val = [
    {
      id: "1",
      value: "Indoor",
    },
    {
      id: "2",
      value: "Outdoor",
    },
    {
      id: "3",
      value: 'ALL',
    },
    {
      id: "4",
      value: "Others",
    },
  ];

  onCategoryChange = (value) => {
    this.setState({ catSelected: value });
  };

  onTypeChange = (value) => {
    this.setState({ productTypeSelected: value });
  };

  render() {
    const { hasError, catSelected, productTypeSelected } = this.state;

    return (
      <Container sx={{ mb: 8 }} maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 8,
            alignItems: 'center',
          }}
        >
          <Typography color="success">ADD NEW PRODUCT</Typography>
          <TextField
            fullWidth
            color="success"
            margin="normal"
            required
            id="productname"
            label="Product Name"
            name="name"
          />
          <Grid>
            <FormControl
              sx={{ padding: 1, minWidth: 165 }}
              error={hasError}
            >
              <InputLabel color='success' id='category-label'>
                Product Category
              </InputLabel>
              <Select
                name="category"
                value={catSelected}
                onChange={(event) => this.onCategoryChange(event.target.value)}
                input={<OutlinedInput color='success' id="category" />}
                fullWidth
              >
                {this.val.map(({ id, value }) => (
                  <MenuItem key={id} value={value}>{value}</MenuItem>
                ))}
              </Select>
              {hasError && <FormHelperText>This is required!</FormHelperText>}
            </FormControl>

            <FormControl sx={{ padding: 1, minWidth: 165 }} error={hasError}>
              <InputLabel color='success' id='producttypelabel'>
                Product type
              </InputLabel>
              <Select
                name="producttype"
                value={productTypeSelected}
                onChange={(event) => this.onTypeChange(event.target.value)}
                input={<OutlinedInput color='success' id="producttype" />}
                fullWidth
              >
                {this.producT.map(({ id, value }) => (
                  <MenuItem key={id} value={value}>{value}</MenuItem>
                ))}
              </Select>
              {hasError && <FormHelperText>This is required!</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              color="success"
              margin="normal"
              required
              id="pricepersqft"
              label="Price per Square Feet"
              name="pricepersqft"
            />
            <TextField
              fullWidth
              color="success"
              margin="normal"
              required
              id="volume"
              label="Total Availability in Square Feet"
              name="volume"
            />
            <TextField
              fullWidth
              color="success"
              margin="normal"
              required
              id="totalpc"
              label="Total Number of Pieces"
              name="totalpc"
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              color="success"
              margin="normal"
              required
              id="primarycolor"
              label="Primary Color on Product"
              name="primarycolor"
            />
            <TextField
              fullWidth
              color="success"
              margin="normal"
              required
              id="othercolors"
              label="Other Colors on Product"
              name="othercolor"
            />
            <TextField
              fullWidth
              color="success"
              margin="normal"
              required
              id="secondaryColor"
              label="Secondary Color on Product"
              name="secondaryColor"
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              color="success"
              margin="normal"
              required
              id="majorPattern"
              label="Major Pattern on Product"
              name="majorPattern"
            />
            <TextField
              fullWidth
              color="success"
              margin="normal"
              required
              id="miniorPattern"
              label="Minor Pattern on Product"
              name="miniorPattern"
            />
          </Grid>
          <TextField
            fullWidth
            color="success"
            margin="normal"
            required
            multiline
            id="comments"
            label="Comments for Product"
            name="comments"
          />
          <Button
            startIcon={<CloudUploadIcon />}
            variant="outlined"
            component="label"
          >
            Upload Images
            <input type="file" multiple style={{ display: "none" }} />
          </Button>
          <ButtonGroup sx={{ m: 1, mb: 5 }} fullWidth color="success" variant="outlined" aria-label="outlined button group">
            <Button>Back</Button>
            <Button>Cancel</Button>
            <Button>Save</Button>
          </ButtonGroup>
        </Box>
      </Container>
    );
  }
}
