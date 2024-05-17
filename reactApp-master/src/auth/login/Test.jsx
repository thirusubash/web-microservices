import React, { Component } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import AuthService from '../AuthService';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div>
        <LinearProgress sx={{ display: this.progress.display }} progress={this.progress.progress} color="success" />
        <Container sx={{ borderRadius: '5%' }} component="main" maxWidth="xs">
          <Box sx={{ width: '100%' }}>
            {/* Content */}
          </Box>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                color="success"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus={true}
                onChange={this.onUsernameChange}
              />
              <TextField
                color="success"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.onPasswordChange}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ borderRadius: 5, mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
            <Button onClick={() => { window.open("/register", "_self") }} color="success">
              <Typography>Click here to Register</Typography>
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

Test.propTypes = {

};

export default Test;
