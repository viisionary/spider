import React from 'react';
import {CssBaseline, makeStyles} from "@material-ui/core";
import {authService} from "../machines/authMachine";
import {useMachine, useService} from "@xstate/react";
import AlertBar from '../components/AlertBar';
import {snackbarMachine} from '../machines/snackbarMachine';
import {Redirect, Route, Switch,} from "react-router-dom";
import SignInForm from "./SignInForm";
import bg from '../image/bg.jpg'
import PrivateRoutesContainer from "./PrivateRoutesContainer";
import {ItemsMachine} from "../machines/ItemsMachine";
import GettingStarted from "./gettingStarted/GettingStarted.";
import Home from "./unauthorized/Home";

const useStyles = makeStyles((theme) => ({
    topRoot: {
        background: `url(${bg}) center`,
        display: "flex",
        flexGrow: 1,
        height: "100vh",
        overflow: "hidden",
        flexDirection: 'column',
    },
}));

const UnLoggedInRoutes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/signin">
                <SignInForm authService={authService} />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/*">
                <Redirect
                    to={{
                        pathname: "/signin",
                    }}
                />
            </Route>
        </Switch>)
}

const App: React.FC = () => {
    const classes = useStyles();
    const [authState] = useService(authService);

    const isLoggedIn = authState.matches("authorized")
    const [, , snackbarService] = useMachine(snackbarMachine);

    const unauthorized = authState.matches("unauthorized")
    const [, , ItemsService] = useMachine(ItemsMachine);

    return (
        <div className={classes.topRoot}>
            <CssBaseline />
            {isLoggedIn && (
                <PrivateRoutesContainer
                    isLoggedIn={isLoggedIn}
                    authService={authService}
                    snackbarService={snackbarService}
                    ItemsService={ItemsService}
                />
            )}
            {unauthorized && <UnLoggedInRoutes />}
            <AlertBar snackbarService={snackbarService} />
        </div>
    )
}


export default App;
