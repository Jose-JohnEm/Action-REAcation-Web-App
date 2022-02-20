import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, InputAdornment, IconButton, FormControlLabel, Checkbox, Grid, Link, Divider, Chip } from '@mui/material';
import COLORS from '../constants/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get('email'),
      password: data.get('password')
    };
    // console.log(body);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField margin='normal' required fullWidth label='Email' name='email' inputProps={{ pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$' }}/>
      <TextField margin='normal' required fullWidth type={showPassword ? 'text' : 'password'} label='Password' name='password' sx={{ mb: 5 }} inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }}
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
        Log in
      </Button>
    </Box>
  );
};

const SignInPage = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => navigate(path);

  return (
    <Container sx={{ height: '100vh' }} component='main' maxWidth='sm'>
      <Typography variant='h3' color={COLORS.DARKGRAY} align='center' sx={{ pt: '50%', pb: '10%' }}>
        Log in
      </Typography>
      <Divider>
        <Chip label='OR' />
      </Divider>
      <SignInForm />
      <Grid container justifyContent='center'>
        <Grid item sx={{ mt: '5%' }}>
          <Link href='#' variant='body2' onClick={() => { handleClick('/forgotpassword'); }}>
            Forgot password ?
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignInPage;

//TODO: OAuth2 Github
//TODO: OAuth2 Discord
//TODO: OAuth2 Office365