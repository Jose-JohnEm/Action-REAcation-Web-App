import { useState } from 'react';
import { Grid, Typography, Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import COLORS from '../constants/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

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
      <TextField margin='normal' required fullWidth label='Last Name' name='last_name' sx={{ mt: 5 }} helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }}/>
      <TextField margin='normal' required fullWidth label='First Name' name='first_name' helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }}/>
      <TextField margin='normal' required fullWidth label='Email' name='email' inputProps={{ pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$' }}/>
      <TextField margin='normal' required fullWidth type={showPassword ? 'text' : 'password'} label='Password' name='password' sx={{ mb: 5 }} helperText='Only alphanumeric characters. Minimum 8 characters' inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }}
        InputProps={{ endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>)
        }}
      />
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

// TODO: mandatory checkbox
// TODO: upload avatar