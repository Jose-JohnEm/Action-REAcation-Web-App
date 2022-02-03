import { AppBar, Toolbar, Button, Box } from '@mui/material';
import COLORS from '../constants/colors';

const Header = () => {
    return (
      <AppBar elevation={0} sx={{ bgcolor: COLORS.WHITE }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Button><img src='logo.png' alt='AREA logo' width='20%' /></Button>
            <Box>
              <Button variant='text'sx={{ paddingLeft: 3, paddingRight: 3, mr: 2 }}>Sign up</Button>
              <Button variant='contained' sx={{ bgcolor: COLORS.DARKGRAY, borderRadius: 2, paddingLeft: 3, paddingRight: 3 }}>Log in</Button>
            </Box>
        </Toolbar>
      </AppBar>
    )
}

export default Header;
