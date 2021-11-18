import { AppBar as MuiAppBar, Button, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import AuthContext, { AuthUser } from '../../contexts/AuthContext';
import { storeJwt } from '../../utils/security';

export const AppBar = () => {
    const [auth, setAuth] = useContext(AuthContext);

    const handleClick = () => {
        if (auth.isLoggedIn) {
            storeJwt('');
            setAuth(new AuthUser());
        }
    }
    return <MuiAppBar position='fixed'>
        <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Vørmadal DOCS
            </Typography>
            <Button color='inherit' onClick={handleClick}>
                {auth.isLoggedIn ? "Logout" : "Login"}
            </Button>
        </Toolbar>
    </MuiAppBar>
}