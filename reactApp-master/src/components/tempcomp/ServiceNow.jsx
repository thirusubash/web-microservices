import React, { Component } from 'react';
import { Box, FormGroup, FormControlLabel, Checkbox, Typography, TextField, Table, TableHead, TableCell, TableBody, Button, TableContainer, TableRow } from '@mui/material';
import AuthService from '../../Auth/AuthService';

class ServiceNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
    this.checkbox = {
      parentInfo: [
        {
          id: 0,
          name: 'Crane',
          values: [
            { id: 0, name: 'Above 12 Ton', placeholder: '18 ton' },
            { id: 1, name: '12 Ton', placeholder: '1 to 2 hour' },
            { id: 2, name: '10 ton', placeholder: '2 to 1 hour' },
            { id: 2, name: 'Below 8 ton', placeholder: '2 to 1 hour' },
          ],
        },
        {
          id: 1,
          name: 'Tipper',
          values: [
            { id: 0, name: 'Loading & unloading', placeholder: '500' },
            { id: 1, name: 'Transporting', placeholder: '500 KM' },
          ],
        },
        {
          id: 2,
          name: 'JCB',
          values: [
            { id: 0, name: 'Loading & unloading', placeholder: '500' },
            { id: 1, name: 'Digging & Doasing', placeholder: '1 hour' },
          ],
        },
        {
          id: 3,
          name: 'Tractor',
          values: [
            { id: 0, name: 'Loading & unloading', placeholder: '500' },
            { id: 1, name: 'Rotator', placeholder: '2 hour' },
            { id: 1, name: 'Other', placeholder: '2 Hour' },
          ],
        },
      ],
    };
  }

  add = (d) => {
    this.setState({
      profile: d,
    });
  };

  componentDidMount() {
    console.log('component did mount!');
    const a = new AuthService();
    console.log(a.loggedIn());
    if (a.loggedIn() === true) {
      console.log('this is from user login info:', a.getProfile());
      this.add(a.getProfile());
    }
    console.log('this is from user login info:', this.state.profile);
  }

  handlesubmit = () => { };

  render() {
    return (
      <>
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
                {this.checkbox.parentInfo.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell align="center" sx={{ border: 1, borderColor: 'success.main' }}>
                      {x.name}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: 'success.main' }}>
                      <FormGroup>
                        {x.values.map((y) => (
                          <FormControlLabel key={y.id} control={<Checkbox />} label={y.name} />
                        ))}
                      </FormGroup>
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, borderColor: 'success.main' }}>
                      <FormGroup>
                        {x.values.map((z) => (
                          <TextField
                            sx={{ minWidth: '60px', maxWidth: '250px' }}
                            key={z.id}
                            type="input"
                            placeholder={z.placeholder}
                          />
                        ))}
                      </FormGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br />
            <Button sx={{ marginBottom: '5rem' }} variant="outlined" onClick={this.handlesubmit}>
              <Typography>Confirm</Typography>
            </Button>
            <Button sx={{ marginBottom: '5rem' }} variant="outlined">
              <Typography>Back</Typography>
            </Button>
          </TableContainer>
        </Box>
      </>
    );
  }
}

export default ServiceNow;
