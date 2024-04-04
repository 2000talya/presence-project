import React from 'react';
import { Typography } from '@mui/material';

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Talya Oded '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;