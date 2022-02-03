import { AppBar, Toolbar, Button } from '@mui/material';
import COLORS from '../constants/colors';

const Header = () => {
    return (
      <AppBar position='static' sx={{ bgcolor: COLORS.WHITE }}>
        <Toolbar>
            <Button variant='text'sx={{ paddingLeft: 3, paddingRight: 3 }}>Sign up</Button>
            <Button variant='contained' sx={{ bgcolor: COLORS.DARKGRAY, borderRadius: 2, paddingLeft: 3, paddingRight: 3 }}>Log in</Button>
        </Toolbar>
      </AppBar>
    )
}

export default Header;
