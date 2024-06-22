import React, { memo, Suspense } from 'react';
import { Box } from '@mui/material';
import { refreshAccessToken } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
// Import Header and Footer components using dynamic import
const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('./Footer'));

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    dispatch(refreshAccessToken());
    return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, paddingTop: '64px' }}>
                    {children}
                </Box>
                <Footer />
            </Box>
    );
};

export default memo(Layout); 