import React, {useEffect} from "react";
import {Interpreter} from "xstate";
import {AuthMachineContext, AuthMachineEvents} from "../machines/authMachine";
import {makeStyles, Container, Grid, useMediaQuery, useTheme} from "@material-ui/core";
import NavBar from "./NavBar";

interface Props {
    children: React.ReactNode;
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
    // notificationsService: Interpreter<DataContext, any, DataEvents, any>;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBarSpacer: {
        minHeight: theme.spacing(13),
        [theme.breakpoints.up("sm")]: {
            minHeight: theme.spacing(14),
        },
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        minHeight: "77vh",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(4),
            padding: theme.spacing(4),
        },
    },
}));
const MainLayout: React.FC<Props> = ({children, authService}) => {
    const classes = useStyles();
    return (
        <>
            <NavBar />
            <Container maxWidth="md" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default MainLayout;
