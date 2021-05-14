import React from 'react';
import {Switch} from 'react-router-dom';
import {Interpreter} from 'xstate';
import {AuthMachineContext, AuthMachineEvents} from '../machines/authMachine';
import {SnackbarContext, SnackbarEvents, SnackbarSchema} from '../machines/snackbarMachine';
import PrivateRoute from "../components/PrivateRoute";
import ListContainer from "./ListContainer";
import DetailsContainer from './DetailsContainer';
import CreateContainer from "./CreateContainer";
import MainLayout from '../components/MainLayout';
import ArticleContainer from './ArticleContainer';
import {DataContext, DataEvents} from '../machines/dataMachine';
import {ARTICLE, IMAGES, MEDIAS, SOCKET} from "../constant/Routes";
import MediasContainer from "./MediasContainer";
import Home from "./Home";
import SocketContainer from "./socket/SocketContainer";

export interface Props {
    isLoggedIn: boolean;
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
    snackbarService: Interpreter<SnackbarContext, SnackbarSchema, SnackbarEvents, any>;
    ItemsService: Interpreter<DataContext, any, DataEvents, any>;
}

const PrivateRoutesContainer: React.FC<Props> = ({isLoggedIn, ItemsService, authService, snackbarService}) => {
    return <MainLayout authService={authService}>
        <Switch>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/"}>
                <Home/>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/(public|contacts|personal)?"}>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/user/settings"}>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/lists"}>
                <ListContainer ItemsService={ItemsService} />
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/lists/new"}>
                <CreateContainer />
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/lists/:itemId"}>
                <DetailsContainer />
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={IMAGES}>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={ARTICLE}>
                <ArticleContainer />
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={MEDIAS}>
                <MediasContainer />
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={SOCKET}>
                <SocketContainer />
            </PrivateRoute>
        </Switch>
    </MainLayout>
}

export default PrivateRoutesContainer
