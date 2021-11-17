import { Button, Grid, TextField } from "@mui/material"
import { FormEvent, useContext, useState } from "react"
import { AdminService } from "../api";
import AuthContext, { AuthUser } from "../contexts/AuthContext";
import { storeJwt } from "../utils/security";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setAuth] = useContext(AuthContext);
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const token = await AdminService.login({
            email, password
        });
        storeJwt(token.jwt);
        setAuth(new AuthUser(token.jwt));
    }
    return <form onSubmit={handleLogin}>
        <Grid container justifyContent={'center'}>

            <Grid item xs={10} sm={6} md={4} lg={4} container spacing={2} >

                <Grid item xs={12}>
                    <TextField
                        id='email'
                        name='email'
                        type='email'
                        fullWidth
                        label='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='password'
                        name='password'
                        type='password'
                        fullWidth
                        label='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12} >
                    <Button color='primary' type='submit'>
                        Login
                    </Button>
                </Grid>
            </Grid >
        </Grid >
    </form>
}