import Typography from '@mui/material/Typography';
import COLORS from '../constants/colors';

const NotFoundPage = () => {
    return (
        <Typography variant="h1" color={COLORS.RED} align="center">
            Page Not Found
        </Typography>
    )
}

export default NotFoundPage;
