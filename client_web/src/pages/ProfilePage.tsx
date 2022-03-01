import { useState, useEffect } from 'react';
import { Switch, Link, Container, Typography, Box, TextField, Button, IconButton, Avatar } from '@mui/material';
import COLORS from '../constants/colors';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Divider from '@mui/material/Divider';
import { Icon } from '@iconify/react';

const ProfileForm = () => {
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

  const [stateSwitch, setStateSwitch] = useState({
    discord: true,
    github: false,
    office: true,
  });

  const handleChangeSwitch = (event: React.ChangeEvent<any>) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      last_name: data.get('last_name'),
      first_name: data.get('first_name'),
      email: data.get('email'),
      password: data.get('password'),
      avatar: imageUrl
    };
    // console.log(body);
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
        <TextField defaultValue='Hereismyusername' label='Username' margin='normal' required fullWidth name='username' helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }} sx={{ mt: 6 }}/>
        <TextField defaultValue='hahahaha' variant='standard' margin='normal' required fullWidth type={'password'} label='Password' name='password' sx={{ mb: 2 }} inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }} InputProps={{ readOnly: true}}/>
        <Box mb={2}>
          <Link href="/resetpassword" color="inherit" variant='subtitle2'>
            {'Change Password'}
          </Link>
        </Box>

        <TextField defaultValue='hahahaha@lol.com' margin='normal' required fullWidth label='Email' name='email' inputProps={{ pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$' }}/>

        <Box mb={2} mt={2}>
          <IconButton aria-label="Example">
            <Icon icon="akar-icons:github-fill" style={{ color: COLORS.DARKGRAY}}/>
            <Switch
              checked={stateSwitch.discord}
              onChange={handleChangeSwitch}
              name="discord"
              inputProps={{ 'aria-label': 'controlled' }}
              />
          </IconButton>
          <IconButton aria-label="Example">
            <Icon icon="bi:discord" style={{ color: COLORS.DARKGRAY}}/>
          <Switch
            checked={stateSwitch.github}
            onChange={handleChangeSwitch}
            name="github"
            inputProps={{ 'aria-label': 'controlled' }}
          />
          </IconButton>
          <IconButton aria-label="Example">
            <Icon icon="mdi:microsoft-office" style={{ color: COLORS.DARKGRAY}}/>
          <Switch
            checked={stateSwitch.office}
            onChange={handleChangeSwitch}
            name="office"
            inputProps={{ 'aria-label': 'controlled' }}
          />
          </IconButton>

        </Box>

        <Button type='submit' fullWidth variant='contained' sx={{ bgcolor: COLORS.DARKGRAY }}>
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

const ProfilePage = () => {
  return (
    <Container component='main' maxWidth='sm'>
      <Typography variant='h3' color={COLORS.DARKGRAY} align='center' sx={{ mt: 15 }}>
        Account Settings
      </Typography>
      <Divider style={{marginTop: '3%'}} />
      <ProfileForm />
    </Container>
  )
}

export default ProfilePage;