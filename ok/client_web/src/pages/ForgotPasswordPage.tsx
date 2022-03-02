import { Grid, Typography, Box, TextField, Button } from '@mui/material';
import COLORS from '../constants/colors';

const ForgotPasswordForm = () => {
    const handleSubmit = (event: React.ChangeEvent<any>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const body = {
        email: data.get('email')
      };
      // console.log(body);
    };

    return (
      <Box component='form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth label='Enter your email' name='email' sx={{ mt: 5, mb: 5 }} inputProps={{ pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$' }}/>
        <Button type='submit' fullWidth variant='contained' sx={{ bgcolor: COLORS.DARKGRAY }}>
          Send me my password
        </Button>
      </Box>
    );
};

const ForgotPasswordPage = () => {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
            <Grid item>
                <Typography variant='h3' color={COLORS.DARKGRAY} align='center'>
                    Forgot your password ?
                </Typography>
                <ForgotPasswordForm />
            </Grid>
        </Grid>
    )
}

export default ForgotPasswordPage;
