import { useState, useEffect } from 'react';
import { Switch, Link, Container, Typography, Box, TextField, Button, IconButton, Avatar } from '@mui/material';
import COLORS from '../constants/colors';
import SERVICESSTATES from '../constants/servicesProfile';
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
    discord: SERVICESSTATES[0].value === 'true' ? true : false,
    github: SERVICESSTATES[1].value === 'true' ? true : false,
    pivotaltracker: SERVICESSTATES[2].value === 'true' ? true : false,
    intranet: SERVICESSTATES[3].value === 'true' ? true : false,
    timer: SERVICESSTATES[4].value === 'true' ? true : false,
    teams: SERVICESSTATES[5].value === 'true' ? true : false,
  });

  const handleChangeSwitch = (event: React.ChangeEvent<any>) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
  };

  SERVICESSTATES[0].value = (stateSwitch.discord === true ? 'true' : 'false');
  SERVICESSTATES[1].value = (stateSwitch.github === true ? 'true' : 'false');
  SERVICESSTATES[2].value = (stateSwitch.pivotaltracker === true ? 'true' : 'false');
  SERVICESSTATES[3].value = (stateSwitch.intranet === true ? 'true' : 'false');
  SERVICESSTATES[4].value = (stateSwitch.timer === true ? 'true' : 'false');
  SERVICESSTATES[5].value = (stateSwitch.teams === true ? 'true' : 'false');

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log(body);
  };
  // console.log(SERVICESSTATES[0]);

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
        <TextField defaultValue='Hereismylastname' margin='normal' required fullWidth label='Last Name' name='last_name' helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }} sx={{ mt: 6 }}/>
        <TextField defaultValue='Hereismyfirstname' margin='normal' required fullWidth label='First Name' name='first_name' helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }}/>
        <TextField defaultValue='hahahaha' variant='standard' margin='normal' required fullWidth type={'password'} label='Password' name='password' sx={{ mb: 2 }} inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }} InputProps={{ readOnly: true}}/>
        <Box mb={2}>
          <Link href="/resetpassword" color="inherit" variant='subtitle2'>
            {'Change Password'}
          </Link>
        </Box>

        <TextField defaultValue='hahahaha@lol.com' margin='normal' required fullWidth label='Email' name='email' inputProps={{ pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$' }}/>

          <Box display="flex" justifyContent="center" alignItems="center" mb={2} mt={2} sx={{ color: COLORS.DARKGRAY }}>
            <IconButton aria-label="discordService">
              <Icon icon="bi:discord" style={{ color: COLORS.BLACK }}/>
              <Switch checked={stateSwitch.discord} onChange={handleChangeSwitch} name="discord" inputProps={{ 'aria-label': 'controlled' }}/>
            </IconButton>
            <IconButton aria-label="githubService">
              <Icon icon="akar-icons:github-fill" style={{ color: COLORS.BLACK }}/>
              <Switch checked={stateSwitch.github} onChange={handleChangeSwitch} name="github" inputProps={{ 'aria-label': 'controlled' }} />
            </IconButton>
            <IconButton aria-label="pivotalTrackerService">
              <img src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/000000/external-pivotal-tracker-a-project-management-tool-for-developers-around-the-world-logo-bold-tal-revivo.png" alt="pivotaltracker icon"/>
              <Switch checked={stateSwitch.pivotaltracker} onChange={handleChangeSwitch} name="pivotaltracker" inputProps={{ 'aria-label': 'controlled' }}/>
            </IconButton>
            <IconButton aria-label="teamsService">
              <Icon icon="bxl:microsoft-teams" style={{ color: COLORS.BLACK }}/>
              <Switch checked={stateSwitch.teams} onChange={handleChangeSwitch} name="teams" inputProps={{ 'aria-label': 'controlled' }}/>
            </IconButton>
            <IconButton aria-label="intranetService">
              <Icon icon="emojione-monotone:letter-e" style={{ color: COLORS.BLACK }}/>
              <Switch checked={stateSwitch.intranet} onChange={handleChangeSwitch} name="intranet" inputProps={{ 'aria-label': 'controlled' }}/>
            </IconButton>
            <IconButton aria-label="timerService">
              <Icon icon="fluent:timer-12-filled" style={{ color: COLORS.BLACK }}/>
              <Switch checked={stateSwitch.timer} onChange={handleChangeSwitch} name="timer" inputProps={{ 'aria-label': 'controlled' }}/>
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