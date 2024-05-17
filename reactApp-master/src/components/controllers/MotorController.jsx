import React, { Component } from 'react';
import { withStyles, Button, Typography, Snackbar, Container } from '@material-ui/core';
import Switch from '@mui/material/Switch';
import axios from 'axios';

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f8e9',
    },

    motorContainer: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',

    },
    button: {
        margin: '10px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '80px',
        textTransform: 'uppercase',
    },
    startButtonActive: {
        backgroundColor: 'green',
        color: 'white',
    },
    startButtonDisabled: {
        backgroundColor: 'gray',
        color: 'white',
    },
    stopButton: {
        backgroundColor: 'red',
        color: 'white',
    },
    stopButtonDisabled: {
        backgroundColor: 'lightgray',
        color: 'white',
    },
    switchContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    switchLabel: {
        marginLeft: '10px',
    },
    toggleButton: {
        width: '82px',
        height: '54px',
        padding: '8px',
        '& .MuiSwitch-switchBase': {
            margin: '1px',
            padding: '0',
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(28px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        'white'
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: '1',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: 'green',
            width: '32px',
            height: '30px',
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: '0',
                top: '0',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    'red'
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: 'lightgray',
            opacity: 1,
        },
    },
};


class MotorController extends Component {
    state = {
        motor_status: 0,
        power_status: 0,
        toggle: false,
        responseMsg: '',
        snackbarOpen: false,
    };

    handleMotorAction = (state) => {
        console.log(state);
        const requestBody = `state=${state}`;
        axios
            .post('http://192.168.0.83:80', requestBody)
            .then((response) => {
                // Handle the response
                console.log('HTTP request successful');
                const { motor_status, power_status, msg } = response.data;
                this.setState({ motor_status, power_status, responseMsg: msg, snackbarOpen: true });
            })
            .catch((error) => {
                // Handle errors
                console.error('Error occurred during HTTP request:', error);
                this.setState({ responseMsg: 'Unable to connect to the API /controller', snackbarOpen: true });
            });
    };



    handleToggle = () => {
        const { toggle } = this.state;
        const state = toggle ? 2 : 3;
        this.handleMotorAction(state);
        this.setState((prevState) => ({
            toggle: !prevState.toggle,
        }));
    };

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen: false });
    };
    render() {
        const { classes } = this.props;
        const { toggle, responseMsg, snackbarOpen, motor_status, power_status } = this.state;

        // Determine the button colors based on motor_status and power_status
        let startButtonColor = classes.startButtonActive;
        let stopButtonColor = classes.stopButtonDisabled;

        // Set button colors based on motor_status and power_status
        if (power_status === 1) {
            if (motor_status === 0) {
                startButtonColor = classes.startButtonActive; // Green color
                stopButtonColor = classes.stopButtonDisabled; // Gray color
            } else if (motor_status === 1) {
                startButtonColor = classes.startButtonDisabled; // Gray color
                stopButtonColor = classes.stopButton; // Red color
            }
        } else {
            startButtonColor = classes.startButtonDisabled; // Gray color
        }

        return (
            <Container className={classes.container} maxWidth={false} >
                <Typography color='primary' align="center" variant="subtitle1">
                    Motor Controller
                </Typography>
                <div className={classes.motorContainer}>
                    <Button
                        variant="contained"
                        className={`${classes.button} ${startButtonColor}`}
                        onClick={() => this.handleMotorAction(1)}
                        disabled={power_status === 0}
                    >
                        Start
                    </Button>
                    <Button
                        variant="contained"
                        className={`${classes.button} ${stopButtonColor}`}
                        onClick={() => this.handleMotorAction(0)}
                        disabled={power_status === 0}
                    >
                        Stop
                    </Button>
                </div>
                <div className={classes.switchContainer}>
                    <Typography color="primary" align="center" variant="subtitle1">
                        Power Controller
                    </Typography>
                    <Switch
                        checked={toggle}
                        onChange={this.handleToggle}
                        color={power_status === 1 ? 'error' : 'default'}
                        classes={{
                            root: classes.toggleButton,
                            switchBase: 'MuiSwitch-switchBase',
                            thumb: 'MuiSwitch-thumb',
                            track: 'MuiSwitch-track',
                        }}
                    />
                    <span className={classes.switchLabel}>{toggle ? 'OFF' : 'ON'}</span>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.handleSnackbarClose}
                    message={responseMsg}
                />
            </Container>
        );
    }


}

export default withStyles(styles)(MotorController);
