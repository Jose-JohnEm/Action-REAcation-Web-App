import { Grid, Typography, Box, TextField, Button } from '@mui/material';
import COLORS from '../constants/colors';

const VerifyAccountForm = () => {
    const handleSubmit = (event: React.ChangeEvent<any>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const body = {
        validation_code: data.get('validation_code')
      };
      // console.log(body);
    };

    return (
      <Box component='form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth label='Enter the validation code' name='validation_code' sx={{ mt: 5, mb: 5 }}/>
        <Button type='submit' fullWidth variant='contained' sx={{ bgcolor: COLORS.DARKGRAY }}>
          Validate
        </Button>
      </Box>
    );
};

const VerifyAccountPage = () => {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
        <Grid item>
            <Typography variant='h3' color={COLORS.DARKGRAY} align='center'>
                Validate your account
            </Typography>
            <VerifyAccountForm />
        </Grid>
    </Grid>
    )
}

export default VerifyAccountPage;
