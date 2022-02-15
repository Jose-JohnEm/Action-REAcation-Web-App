import * as React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import COLORS from '../constants/colors';

const Header = () => {
  const isLogged = true;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar elevation={0} sx={{ bgcolor: COLORS.WHITE }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box><img src='logo.png' alt='AREA logo' width='20%' /></Box>
        {
          (!isLogged &&
            <Box>
              <Button variant='text'sx={{ paddingLeft: 3, paddingRight: 3, mr: 2 }}>Sign up</Button>
              <Button variant='contained' sx={{ bgcolor: COLORS.DARKGRAY, borderRadius: 2, paddingLeft: 3, paddingRight: 3 }}>Log in</Button>
            </Box>
          ) || (
            <Box>
              <IconButton onClick={handleMenu} size='large' color='primary' sx={{ mr: 2, transform: 'scale(1.5)' }}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Create</MenuItem>
                <MenuItem onClick={handleClose}>My AREAs</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Log out</MenuItem>
              </Menu>
            </Box>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header;
