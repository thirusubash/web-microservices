import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" aria-label="Page loading progress" color="success" variant="indeterminate" {...props} />
        </Box>
    );
}

export default function Loading() {
    return <CircularProgressWithLabel />;
}
