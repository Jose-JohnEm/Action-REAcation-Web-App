import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import COLORS from '../constants/colors';

const HomePage = () => {
    return (
        <Box mb={2} mt={50}>
            <Typography variant='h1' color={COLORS.DARKGRAY} align='center'>
            Automation platform of his digital life.
            </Typography>
        </Box>
    )
}

export default HomePage;