import React from 'react';
import {makeStyles} from "@mui/styles";
import {authService} from "./machines/authMachine";
import snackbarMachine from "spider-vision/AlertBar/snackbarMachine";
import AlertBar from "spider-vision/AlertBar/AlertBar";
import {ItemsMachine} from "./machines/ItemsMachine";
import {useActor, useMachine} from "@xstate/react";
import {Home} from "@mui/icons-material";
// @ts-ignore
// import {Redirect } from "react-router-dom";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ThemeContainer from "./containers/ThemeContainer";
import {ARTICLE, THEME} from "./constant/Routes";
import ArticleContainer from "./containers/ArticleContainer";
import SignUpForm from "./containers/SignUpForm";
import SignInForm from "./containers/SignInForm";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#fff"
    },
    topRoot: {}
}));
const UnLoggedInRoutes: React.FC = () => {
    return (
        <Routes>
            <>
                <Route path="/signin" element={<SignInForm
                    // @ts-ignore
                    authService={authService}/>}>
                </Route>
                <Route path="/signup" element={<SignUpForm
                    // @ts-ignore
                    authService={authService}/>}>

                </Route>
                <Route path="/" element={<Home/>}/>
                <Route path={ARTICLE} element={<ArticleContainer/>}/>
                <Route path={THEME} element={<ThemeContainer/>}/>
            </>
            <Route path="/*" element={<Navigate
                to={{
                    pathname: '/signin',
                }}
            />}/>
        </Routes>

    );
};

function App() {
    const classes = useStyles();
    const [authState] = useActor(authService);

    const isLoggedIn = authState.matches('authorized');
    const [, , snackbarService] = useMachine(snackbarMachine);

    const unauthorized = authState.matches('unauthorized');
    const [, , ItemsService] = useMachine(ItemsMachine);
    return (
        <BrowserRouter>
            <div className={classes.topRoot}>
                {/*{isLoggedIn && (*/}
                {/*    // @ts-ignore*/}

                {/*    <Routes> <><PrivateRoutesContainer isLoggedIn={isLoggedIn} authService={authService} snackbarService={snackbarService} ItemsService={ItemsService}/> </></Routes>*/}
                {/*)}*/}
                {unauthorized && <UnLoggedInRoutes/>}
                <AlertBar
                    // @ts-ignore
                    snackbarService={snackbarService}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
