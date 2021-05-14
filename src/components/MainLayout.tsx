import React from "react";
import {Interpreter} from "xstate";
import {AuthMachineContext, AuthMachineEvents} from "../machines/authMachine";
import {Box, Container, Grid, makeStyles} from "@material-ui/core";
import NavBar from "./NavBar";
import AsideBar from "./AsideBar";
import {adminMenu} from "../constant/menuRoute";

interface Props {
    children: React.ReactNode;
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
    // notificationsService: Interpreter<DataContext, any, DataEvents, any>;
}

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },

    outSideLayout:{
        display: "flex",
        flexGrow:1,
        overflowX: "auto",
        overflowY: "auto",
    },

    mainLayout: {
        width:'100%',
        flexGrow:1,
        display: "flex",
        overflowX: "auto",
        overflowY: "auto",
        flexDirection: 'column',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        // iPad横屏以上用个大padding
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(4),
            padding: theme.spacing(4),
        },
    },
    topContainer: {
        // flexGrow: 1,
        display: "flex",
        // width:'100%',

    },    innerContent: {
        // flexGrow: 1,
        // minHeight: "77vh",
        // overflow: "auto",
    },

}));
const MainLayout: React.FC<Props> = ({children, authService}) => {
    const classes = useStyles();

    return (
        <>
            <NavBar />
            <Box className={classes.outSideLayout}>
                <AsideBar config={adminMenu}/>
                <main className={classes.mainLayout}>
                    <Container maxWidth="lg" className={classes.topContainer}>
                        <Grid container spacing={3} className={classes.innerContent}>
                            {children}
                        </Grid>
                    </Container>
                </main>
            </Box>
        </>
    )
}
export default MainLayout;
