import { Typography } from '@mui/material';
import COLORS from '../constants/colors';

const MainPage = () => {
    return (
        <Typography variant='h3' color={COLORS.DARKGRAY} align='center' sx={{ mt: 15 }}>
            Main Page
        </Typography>
    )
}

export default MainPage;