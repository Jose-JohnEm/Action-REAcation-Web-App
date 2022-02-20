import { useState } from 'react';
import { Grid, Typography, Box, TextField, Button, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import COLORS from '../constants/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ResetPasswordPageForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      new_password: data.get('new_password'),
      confirm_password: data.get('confirm_password'),
      password: data.get('password')
    };
    body.new_password === body.confirm_password || alert('Passwords should match!');
    };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ ml: 20, mr: 20 }}>
      <TextField margin='normal' required fullWidth type={showPassword ? 'text' : 'password'} label='Current Password' name='current_password' sx={{ mb: 5 }} helperText='Only alphanumeric characters. Minimum 8 characters' inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }}
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
      <TextField margin='normal' required fullWidth type={showPassword ? 'text' : 'password'} label='New Password' name='new_password' sx={{ mb: 5 }} helperText='Only alphanumeric characters. Minimum 8 characters' inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }}
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
      <TextField margin='normal' required fullWidth type={showPassword ? 'text' : 'password'} label='Confirm New Password' name='confirm_password' sx={{ mb: 5 }} helperText='Only alphanumeric characters. Minimum 8 characters' inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }}
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
        Validate
      </Button>
    </Box>
  );
};

const ResetPasswordPage = () => {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
            <Grid item>
                <Typography variant='h3' color={COLORS.DARKGRAY} align='center'>
                    Change Your Password
                </Typography>
            </Grid>
            <ResetPasswordPageForm />
        </Grid>
    )
}

export default ResetPasswordPage;