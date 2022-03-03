import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../reducers/store';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import COLORS from '../constants/colors';
import { useDispatch } from 'react-redux';
import { setUserLoggedOut } from '../reducers/actions/auth';

const Header = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => navigate(path);

  const { isLogged } = useTypedSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  return (
    <AppBar elevation={0} sx={{ bgcolor: COLORS.WHITE }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box onClick={() => { handleClick('/'); }}><img src='logo.png' alt='AREA logo' width='20%' /></Box>
        {
          (!isLogged &&
            <Box>
              <Button variant='text'sx={{ paddingLeft: 3, paddingRight: 3, mr: 2 }} onClick={() => { handleClick('/signup'); }}>Sign up</Button>
              <Button variant='contained' sx={{ bgcolor: COLORS.DARKGRAY, borderRadius: 2, paddingLeft: 3, paddingRight: 3 }} onClick={() => { handleClick('/signin'); }}>Log in</Button>
            </Box>
          ) || (
            <Box>
              <IconButton onClick={handleMenu} size='large' color='primary' sx={{ mr: 2, transform: 'scale(1.5)' }}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => { handleClick('/mainpage'); handleClose(); }}>
                  <ListItemIcon><CreateIcon /></ListItemIcon>
                  <ListItemText>Create</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => { handleClick('/mainpage'); handleClose(); }}>
                  <ListItemIcon><ListIcon /></ListItemIcon>
                  <ListItemText>My AREAs</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => { handleClick('/profile'); handleClose(); }}>
                  <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { dispatch(setUserLoggedOut()); handleClick('/'); handleClose(); }}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText>Log out</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header;