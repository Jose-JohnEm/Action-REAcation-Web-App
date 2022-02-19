import { Grid, Typography, Box, TextField, Button } from '@mui/material';
import COLORS from '../constants/colors';

const SignUpForm = () => {
    const handleSubmit = (event: React.ChangeEvent<any>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const body = {
        last_name: data.get('last_name'),
        first_name: data.get('first_name'),
        email: data.get('email'),
        password: data.get('password')
      };
      // console.log(body);
    };

    return (
      <Box component='form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth label='Last Name' name='last_name' sx={{ mt: 5 }}/>
        <TextField margin='normal' required fullWidth label='First Name' name='first_name'/>
        <TextField margin='normal' required fullWidth label='Email' name='email'/>
        <TextField margin='normal' required fullWidth type='password' label='Password' name='password' sx={{ mb: 5 }}/>
        <Button type='submit' fullWidth variant='contained' sx={{ bgcolor: COLORS.DARKGRAY }}>
          Create
        </Button>
      </Box>
    );
};

const SignUpPage = () => {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
            <Grid item>
                <Typography variant='h3' color={COLORS.DARKGRAY} align='center'>
                    Create an account
                </Typography>
            </Grid>
            <SignUpForm />
        </Grid>
    )
}

export default SignUpPage;


// TODO: regex
// TODO: eye password
// TODO: mandatory checkbox
// TODO: upload avatar