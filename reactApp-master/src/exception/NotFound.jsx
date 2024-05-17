import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const NotFoundContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
    animation: '$fadeIn 0.5s ease-in',
    '@keyframes fadeIn': {
        '0%': {
            opacity: 0,
            transform: 'scale(0.5)',
        },
        '100%': {
            opacity: 1,
            transform: 'scale(1)',
        },
    },
});

const NotFound = () => {
    return (
        <NotFoundContainer>
            <Typography color="success.main" variant="h1" aria-label="404">
                404
            </Typography>
            <Typography color="success.main" variant="h4" aria-label="Page Not Found">
                Page Not Found
            </Typography>
        </NotFoundContainer>
    );
};

export default NotFound;
