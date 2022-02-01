import { Grid, Typography } from '@mui/material';
import COLORS from '../constants/colors';

const NotFoundPage = () => {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
            <Grid item>
                <Typography variant="h1" color={COLORS.BLUE} align="center">
                    404
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color={COLORS.BLUE} align="center">
                    Page Not Found
                </Typography>
            </Grid>
        </Grid>
    )
}

export default NotFoundPage;
