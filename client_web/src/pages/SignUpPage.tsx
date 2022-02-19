import { useState } from 'react';
import { Grid, Typography, Box, TextField, Button, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@mui/material';
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
    <Box component='form' onSubmit={handleSubmit} sx={{ ml: 20, mr: 20 }}>
      <TextField margin='normal' required fullWidth label='Last Name' name='last_name' sx={{ mt: 10 }} helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }}/>
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
      <FormControlLabel sx={{ mt: -3, mb: 3 }} control={<Checkbox required />} label={
        <Typography textAlign='left' fontSize={12} color='text.secondary' sx={{ fontStyle: 'oblique' }}>
          By checking this box, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookie Policy.
        </Typography>
      }/>
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

// TODO: upload avatar