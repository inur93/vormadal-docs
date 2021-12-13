import { Grid } from "@mui/material";
import { useContext } from "react";
import { Outlet } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";
import { Login } from "./Login";
import { AppBar } from "./navigation/AppBar";
import { TreeView } from "./treeview/TreeView";


export const Layout = () => {
    const [auth] = useContext(AuthContext);
    return <Grid container>
        <Grid item xs={12}>
            <AppBar />
        </Grid>

        {!auth.isLoggedIn &&
            <Grid container item style={{ paddingTop: '90px', height: '100vh', overflow: 'hidden' }}>
                <Grid item xs={12}>
                    <Login />
                </Grid>
            </Grid>
        }
        {auth.isLoggedIn &&
            <Grid container spacing={2} style={{ paddingTop: '90px', height: '100vh', overflow: 'hidden' }}>
                <Grid item xs={4} lg={3} >
                    <TreeView id='navigation-tree' />
                </Grid>
                <Grid item xs={8} lg={9} style={{ overflow: 'hidden', height: '100%' }}>
                    <Outlet />
                </Grid>
            </Grid>
        }
    </Grid>
}