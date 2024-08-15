import React, { memo, Suspense } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// Import Header and Footer components using dynamic import
const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('./Footer'));

// Fallback component for Suspense
const LoadingFallback = () => (
  <Box sx={{ padding: '20px', textAlign: 'center' }}>Loading...</Box>
);

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Suspense fallback={<LoadingFallback />}>
        <Header />
      </Suspense>
      <Box component="main" sx={{ flexGrow: 1, paddingTop: '64px' }}>
        {children}
      </Box>
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Layout);
