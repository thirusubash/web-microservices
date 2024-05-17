import React, { memo, Suspense } from 'react';
import { Box } from '@mui/material';
import Loading from './Loading';

// Import Header and Footer components using dynamic import
const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('./Footer'));

const Layout = ({ children }) => {
    return (
        <Suspense fallback={<Loading />}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, paddingTop: '64px' }}>
                    {children}
                </Box>
                <Footer />
            </Box>
        </Suspense>
    );
};

export default memo(Layout); // Memoize the Layout component
