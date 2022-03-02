import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, InputAdornment, IconButton, FormControlLabel, Checkbox, Avatar } from '@mui/material';
import COLORS from '../constants/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ISignUpData, signUp } from '../reducers/actions/auth';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState<string>('null');
  const handleChange = (event: React.ChangeEvent<any>) => {
    setSelectedImage(event.target.files[0]);
  };
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body: ISignUpData = {
      firstName: data.get('first_name') as string,
      lastName: data.get('last_name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      confirmPassword: data.get('password') as string,
      // avatar: imageUrl
    };
    console.log(body);
    signUp(body);
  };

  return (
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input accept='image/*' id='icon-button-file' type='file' style={{ display: 'none' }} onChange={handleChange} />
      <label htmlFor='icon-button-file'>
        <IconButton component='span'>
        {
          (imageUrl === 'null' &&
            <Avatar sx={{ bgcolor: COLORS.DARKGRAY, transform: 'scale(2.5)' }}><AddAPhotoIcon /></Avatar>
          ) || (
            <Avatar sx={{ transform: 'scale(2.5)' }} src={imageUrl} />
          )
        }
        </IconButton>
      </label>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField margin='normal' required fullWidth label='Last Name' name='last_name' helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }} sx={{ mt: 6 }}/>
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
    </Box>
  );
};

const SignUpPage = () => {
  return (
    <Container component='main' maxWidth='sm'>
      <Typography variant='h3' color={COLORS.DARKGRAY} align='center' sx={{ mt: 15 }}>
        Create an account
      </Typography>
      <SignUpForm />
    </Container>
  )
}

export default SignUpPage;