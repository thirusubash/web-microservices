import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '@redux/store';
import { LOGOUT_SUCCESS } from '@redux/actions/ActionTypes';
import MuiAlert from '@mui/material/Alert';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    MenuItem,
    Menu,
    Avatar,
    Divider,
    ListItemIcon,
    Button,
    Grid,
} from '@mui/material';
import {
    AccountCircle,
    ShoppingCartCheckout as ShoppingCartCheckoutIcon,
    Notifications as NotificationsIcon,
    Settings,
    Logout,
} from '@mui/icons-material';



import logo from '@assets/icons/gksvp.png';
import AuthService from '@auth/AuthService'; // Use alias import

const buttonData = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Job', path: '/job' },
    { label: 'Careers', path: '/careers' },
    { label: 'About', path: '/about' },
    { label: 'Register', path: '/register' },
];



function Header() {
    const [username, setUserName] = useState(" ");
    const userProfile = useSelector(state => state.auth.userProfile);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            try {
                const firstName = userProfile?.firstName;
                const username = userProfile?.username;
                setUserName(firstName || username || "please update profile");
            } catch (error) {
                console.error("user not logged in yet", error);
            }
        }
    }, [userProfile]);

    const handleClick = (event) => {
        if (AuthService.isAuthenticated()) {
            setAnchorEl(event.currentTarget);
        } else {
            navigate('/signin');
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToCart = () => {
        navigate('/cart');
    };

    const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('gk_token');
        store.dispatch({ type: LOGOUT_SUCCESS });
        setIsLogoutSuccess(true);
    };

    const handleSnackbarClose = () => {
        setIsLogoutSuccess(false);
    };

    // Optimize by memoizing buttonData
    const memoizedButtonData = useMemo(() => buttonData, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="inherit" position="relative" sx={{ borderBottom: 1, borderColor: '#00695f' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="success"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <img width="80px" className="logo-img" src={logo} alt="www.gksvp.com" />
                    </IconButton>
                    <Typography
                        className="logo-text"
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            cursor: 'pointer',
                            backgroundImage: 'linear-gradient(195deg, red, rgb(30, 129, 5), rgb(168, 179, 22))',
                            WebkitBackgroundClip: 'text',
                            MozBackgroundClip: 'text',
                            backgroundClip: 'text',
                            MozTextFillColor: 'transparent',
                            WebkitTextFillColor: 'transparent',
                        }}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        www.gksvp.com
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="success" onClick={goToCart}>
                                <Badge badgeContent={1} color="error">
                                    <ShoppingCartCheckoutIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="large" aria-label="show 17 new notifications" color="success">
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            {AuthService.isAuthenticated() && (
                                <Typography sx={{ color: 'success.light' }}>{username}</Typography>
                            )}
                        </Box>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="success"
                            onClick={handleClick}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        wrap="nowrap" // Prevent wrapping to the next line
                        sx={{
                            width: "100%",
                            margin: "0 5px",
                            overflowX: 'auto',
                        }}
                    >
                        {memoizedButtonData.map((x) => (
                            <Grid
                                item
                                key={x.label}
                                sx={{
                                    minWidth: '10px', // Reduced minimum width for smaller buttons
                                    flex: '0 0 auto', // Allow buttons to shrink but not grow
                                    margin: "0 0px", // Reduced margin for better spacing
                                }}
                            >
                                <Button
                                    component={Link} // Use Link component
                                    to={x.path} // Specify the "to" prop for Link
                                    variant="soft"
                                    sx={{
                                        color: 'success.light', // Set the text color to the 'light' shade of the 'success' color
                                        fontSize: '12px', // Smaller font size by default
                                        padding: '4px 8px', // Smaller padding
                                        '@media (max-width: 600px)': {
                                            fontSize: '10px', // Adjust font size for screens below 600px
                                            padding: '3px 6px', // Adjust padding for screens below 600px
                                        },
                                        '@media (max-width: 475px)': {
                                            fontSize: '6px', // Adjust font size for screens below 475px
                                            padding: '1px 1px', // Adjust padding for screens below 475px
                                        },
                                    }}
                                >
                                    {x.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    overflow: 'visible',
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={()=>{navigate("profile")}}>
                    <Avatar sx={{ color: 'success.main', backgroundColor: 'transparent' }}></Avatar>Profile
                </MenuItem>
                <MenuItem onClick={()=>{navigate("settings")}}>
                    <ManageAccountsIcon sx={{color:"info.main"}}/> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={()=>{navigate("settings")}}>
                    <ListItemIcon>
                        <Settings color={"warning"} fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout color={"error"} fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default Header;
