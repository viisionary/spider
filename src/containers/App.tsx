import React from 'react';
import {Box, Button, Container, makeStyles} from "@material-ui/core";
import {authService} from "../machines/authMachine";
import {useService, useMachine} from "@xstate/react";
import AlertBar from '../components/AlertBar';
import {snackbarMachine} from '../machines/snackbarMachine';
import {Switch, Route, Redirect} from "react-router-dom";
import SignInForm from "./SignInForm";
import bg from '../image/bg.jpg'
import PrivateRoutesContainer from "./PrivateRoutesContainer";
import {ItemsMachine} from "../machines/ItemsMachine";

const useStyles = makeStyles((theme) => ({
    root: {
        background: `url(${bg}) center`,
        display: "flex",
        width: '100%',
        height:'100vh',
        flexDirection: 'column',
    },
}));

const UnLoggedInRoutes: React.FC = () => {
    return (<Switch>
        <Route exact path="/signin">
            <SignInForm authService={authService} />
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
        <div className={classes.root}>
            {isLoggedIn && (
                <PrivateRoutesContainer
                    isLoggedIn={isLoggedIn}
                    authService={authService}
                    snackbarService={snackbarService}
                    ItemsService={ItemsService}
                />
            )}
            {unauthorized && <UnLoggedInRoutes/>}
            <AlertBar snackbarService={snackbarService} />
        </div>
    )
}


export default App;
