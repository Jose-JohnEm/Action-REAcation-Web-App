import { Paper } from '@mui/material';

const styles = {
    paperContainer: {
        height: 950,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/background.png'})`
    }
};

const HomePage = () => {
    return (
        <Paper style={styles.paperContainer}>
        </Paper>
    )
}

export default HomePage;