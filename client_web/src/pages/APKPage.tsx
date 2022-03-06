import { Grid, Typography, IconButton } from '@mui/material';
import COLORS from '../constants/colors';
import AndroidIcon from '@mui/icons-material/Android';

const APKPage = () => {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
            <Grid item>
                <IconButton size='large' sx={{ mt: 15, color: COLORS.DARKGRAY, transform: 'scale(25)' }}>
                    <AndroidIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <Typography variant='h1' color={COLORS.BLUE} sx={{ mt: 20 }} align='center'>
                    Download our APK
                </Typography>
            </Grid>
        </Grid>
    )
}

export default APKPage;
