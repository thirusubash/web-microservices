import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  TableRow,
} from '@mui/material';

// Import your Redux action creators for authentication and profile retrieval here
import { checkAuthentication, getProfile } from '../redux/actions/authActions';

class OrderNow extends Component {
  componentDidMount() {
    // Check authentication status and get profile if authenticated
    this.props.checkAuthentication();
  }

  render() {
    const { isAuthenticated, profile } = this.props;

    return (
      <Box>
        <Typography sx={{ mt: 2, color: 'green' }} align="center">
          Select The Products
        </Typography>

        <TableContainer align="center" sx={{ borderColor: 'yellowgreen' }}>
          <Table
            sx={{
              maxWidth: 'max-content',
              borderRadius: '1rem',
              '&:hover': {
                backgroundColor: 'whitesmoke',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <TableHead sx={{ border: 1, borderColor: 'success.main', borderBottom: 2 }}>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Product</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Category</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="h6">
                    Unit
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ border: 1, borderColor: 'red' }}>
              {this.checkboxData.map((checkboxGroup) => (
                <TableRow key={checkboxGroup.id}>
                  <TableCell align="center" sx={{ border: 1, borderColor: 'success.main' }}>
                    {checkboxGroup.name}
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'success.main' }}>
                    <FormGroup>
                      {checkboxGroup.values.map((checkbox) => (
                        <FormControlLabel key={checkbox.id} control={<Checkbox />} label={checkbox.name} />
                      ))}
                    </FormGroup>
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, borderColor: 'success.main' }}>
                    <FormGroup>
                      {checkboxGroup.values.map((textField) => (
                        <TextField sx={{ minWidth: '60px', maxWidth: '250px' }} key={textField.id} type="input" placeholder={textField.placeholder} />
                      ))}
                    </FormGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Button sx={{ marginBottom: '5rem' }} variant="outlined">
            <Typography>Confirm</Typography>
          </Button>
          <Button sx={{ marginBottom: '5rem' }} variant="outlined">
            <Typography>Back</Typography>
          </Button>
        </TableContainer>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.auth.profile,
});

const mapDispatchToProps = {
  checkAuthentication,
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderNow);
