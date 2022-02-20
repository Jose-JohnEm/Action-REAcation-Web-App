import { useState, useEffect } from 'react';
import { Grid, Typography, Box, TextField, Button, InputAdornment, IconButton, Avatar, Link, FormControlLabel, Checkbox } from '@mui/material';
import Divider from '@mui/material/Divider';
import COLORS from '../constants/colors';
import SelectTimezoneMaterialUi from 'select-timezone-material-ui';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { height } from '@mui/system';

const ProfilePageForm = () => {

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

  const handleTimeZone = (timezoneName: string, timezoneOffset: number) => {
    console.log(timezoneName);
  };

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get('username'),
      password: data.get('password'),
      avatar: imageUrl
    };
    };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ ml: 20, mr: 20 }}>
      <input accept='image/*' id='icon-button-file' type='file' style={{ display: 'none' }} onChange={handleChange} />
      <label htmlFor='icon-button-file'>
        <IconButton component='span' style={{ left: '50%', height: '30%'}}>
        {
          (imageUrl === 'null' &&
            <Avatar sx={{bgcolor: COLORS.DARKGRAY, transform: 'scale(2.5)' }}><AddAPhotoIcon /></Avatar>
          ) || (
            <Avatar sx={{ transform: 'scale(2.5)' }} src={imageUrl} />
          )
        }
        </IconButton>
      </label>

      <Typography variant='h5' color={COLORS.DARKGRAY}> Account </Typography>
      <TextField defaultValue='Hereismyusername' label='Username' margin='normal' required fullWidth name='username' helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }} sx={{ mt: 6 }}/>
      <TextField defaultValue='hahahaha' variant='standard' margin='normal' required fullWidth type={'password'} label='Password' name='password' sx={{ mb: 2 }} inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }} InputProps={{ readOnly: true}}/>
      <Box mb={2}>
        <Link href="/resetpassword" color="inherit" variant='subtitle2'>
          {'Change Password'}
        </Link>
      </Box>
      <TextField defaultValue='hahahaha@lol.com' margin='normal' required fullWidth label='Email' name='email' inputProps={{ pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$' }}/>

      <Box mb={2} mt={2}>
      <SelectTimezoneMaterialUi
          label="Timezone"
          helperText="Please select a timezone from the list"
          onChange={handleTimeZone}
        />
      </Box>

      <Button type='submit' fullWidth variant='contained' sx={{ bgcolor: COLORS.DARKGRAY }}>
        Validate
      </Button>
    </Box>
  );
};

const ProfilePage = () => {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '80vh' }}>
            <Typography variant='h3' color={COLORS.DARKGRAY} align='center'>
            Account Settings
            </Typography>
            <Divider style={{width:'40%', height: '2%'}} />
            <Grid item>
                <Typography variant='h4' color={COLORS.DARKGRAY} align='center'>
                    Profile
                </Typography>
            </Grid>
            <ProfilePageForm />
        </Grid>
    )
}

export default ProfilePage;

// TODO: upload avatar