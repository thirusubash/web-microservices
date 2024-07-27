    import React, { memo } from 'react';
    import { Box } from '@mui/material';
    import PropTypes from 'prop-types';
    // Import Header and Footer components using dynamic import
    const Header = React.lazy(() => import('./Header'));
    const Footer = React.lazy(() => import('./Footer'));

    const Layout = ({ children }) => {
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

    Layout.propTypes = {
        children: PropTypes.node.isRequired,
      };

    export default memo(Layout); 