import { useState, useEffect } from 'react';
import { Switch, Container, Typography, Box, TextField, Button, IconButton, Avatar, InputAdornment, Alert } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import COLORS from '../constants/colors';
import SERVICESSTATES from '../constants/services';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Divider from '@mui/material/Divider';
import { Icon } from '@iconify/react';
import { ISignUpData } from '../reducers/actions/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import { editUser, deleteUser } from '../reducers/actions/user';
import { setUserLoggedOut } from '../reducers/actions/auth';
import { useDispatch } from 'react-redux';

const ProfileForm = () => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile') as string);

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

  const [stateSwitch, setStateSwitch] = useState({
    github: SERVICESSTATES[0].value === 'true' ? true : false,
    slack: SERVICESSTATES[1].value === 'true' ? true : false,
    discord: SERVICESSTATES[2].value === 'true' ? true : false,
    pivotaltracker: SERVICESSTATES[3].value === 'true' ? true : false,
    intra: SERVICESSTATES[4].value === 'true' ? true : false,
    teams: SERVICESSTATES[5].value === 'true' ? true : false,
    email: SERVICESSTATES[6].value === 'true' ? true : false
  });

  const handleChangeSwitch = (event: React.ChangeEvent<any>) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
  };

  SERVICESSTATES[0].value = (stateSwitch.github === true ? 'true' : 'false');
  SERVICESSTATES[1].value = (stateSwitch.slack === true ? 'true' : 'false');
  SERVICESSTATES[2].value = (stateSwitch.discord === true ? 'true' : 'false');
  SERVICESSTATES[3].value = (stateSwitch.pivotaltracker === true ? 'true' : 'false');
  SERVICESSTATES[4].value = (stateSwitch.intra === true ? 'true' : 'false');
  SERVICESSTATES[5].value = (stateSwitch.teams === true ? 'true' : 'false');
  SERVICESSTATES[6].value = (stateSwitch.email === true ? 'true' : 'false');

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.ChangeEvent<any>) => {
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
    localStorage.setItem('userProfile', JSON.stringify({
      lastName: body.lastName,
      firstName: body.firstName,
      email: body.email
    }));
    const response = await editUser(body);
    if (response === true) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
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
        <TextField defaultValue={userProfile.lastName} margin='normal' required fullWidth label='Last Name' name='last_name' helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }} sx={{ mt: 6 }}/>
        <TextField defaultValue={userProfile.firstName} margin='normal' required fullWidth label='First Name' name='first_name' helperText='Only alphabetic characters and spaces/dashes' inputProps={{ pattern: '^[a-zA-Z -]+$' }}/>
        <TextField defaultValue={userProfile.email} margin='normal' required fullWidth label='Email' name='email' inputProps={{ pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$' }}/>
        <TextField margin='normal' required fullWidth type={showPassword ? 'text' : 'password'} label='Update your password ?' name='password' helperText='Only alphanumeric characters. Minimum 8 characters' inputProps={{ pattern: '[a-zA-Z0-9]{8,}' }}
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
        <Box display="flex" justifyContent="center" alignItems="center" mb={2} mt={2} sx={{ color: COLORS.DARKGRAY }}>
          <IconButton aria-label="githubService">
            <Icon icon="akar-icons:github-fill" style={{ color: COLORS.BLACK }}/>
            <Switch checked={stateSwitch.github} onChange={handleChangeSwitch} name="github" inputProps={{ 'aria-label': 'controlled' }} />
          </IconButton>
          <IconButton aria-label="slackService">
            <Icon icon="akar-icons:slack-fill" style={{ color: COLORS.BLACK }}/>
            <Switch checked={stateSwitch.slack} onChange={handleChangeSwitch} name="slack" inputProps={{ 'aria-label': 'controlled' }} />
          </IconButton>
          <IconButton aria-label="discordService">
            <Icon icon="bi:discord" style={{ color: COLORS.BLACK }}/>
            <Switch checked={stateSwitch.discord} onChange={handleChangeSwitch} name="discord" inputProps={{ 'aria-label': 'controlled' }}/>
          </IconButton>
          <IconButton aria-label="pivotalTrackerService">
            <img src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/000000/external-pivotal-tracker-a-project-management-tool-for-developers-around-the-world-logo-bold-tal-revivo.png" alt="pivotaltracker icon"/>
            <Switch checked={stateSwitch.pivotaltracker} onChange={handleChangeSwitch} name="pivotaltracker" inputProps={{ 'aria-label': 'controlled' }}/>
          </IconButton>
          <IconButton aria-label="intranetService">
            <Icon icon="emojione-monotone:letter-e" style={{ color: COLORS.BLACK }}/>
            <Switch checked={stateSwitch.intra} onChange={handleChangeSwitch} name="intranet" inputProps={{ 'aria-label': 'controlled' }}/>
          </IconButton>
          <IconButton aria-label="teamsService">
            <Icon icon="bxl:microsoft-teams" style={{ color: COLORS.BLACK }}/>
            <Switch checked={stateSwitch.teams} onChange={handleChangeSwitch} name="teams" inputProps={{ 'aria-label': 'controlled' }}/>
          </IconButton>
          <IconButton aria-label="emailService">
            <Icon icon="entypo:email" style={{ color: COLORS.BLACK }}/>
            <Switch checked={stateSwitch.email} onChange={handleChangeSwitch} name="email" inputProps={{ 'aria-label': 'controlled' }} />
          </IconButton>
        </Box>
        { isSuccess && <Alert sx={{ mb: 2 }}>Well modified user.</Alert> }
        <Button type='submit' fullWidth variant='contained' sx={{ bgcolor: COLORS.DARKGRAY }}>
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

const ProfilePage = () => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const response = await deleteUser();
    if (response === true) {
      dispatch(setUserLoggedOut());
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Typography variant='h3' color={COLORS.DARKGRAY} align='center' sx={{ mt: 12 }}>
        Account Settings
      </Typography>
      <Divider style={{marginTop: '3%'}} />
      <ProfileForm />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button fullWidth variant='contained' sx={{ bgcolor: COLORS.RED }} startIcon={<DeleteIcon />} onClick={() => { handleClick(); }}>
          Delete my account
        </Button>
      </Box>
    </Container>
  )
}

export default ProfilePage;