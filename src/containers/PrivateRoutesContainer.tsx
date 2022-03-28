import React from 'react';
// @ts-ignore
import {Interpreter} from 'xstate';
import {AuthMachineContext, AuthMachineEvents} from '../machines/authMachine';

// import PrivateRoute from '../components/PrivateRoute';
// import ListContainer from './ListContainer';
// import DetailsContainer from './DetailsContainer';
// import CreateContainer from './CreateContainer';
import MainLayout from '../components/MainLayout';
// import ArticleContainer from './ArticleContainer';
// import { DataContext, DataEvents } from '../machines/dataMachine';
import {ARTICLE, MEDIAS, MESSAGES, NOTIFICATIONS, PROFILE, RESUMABLE_CLIENT, SOCKET, THEME,} from '../constant/Routes';
// import MediasContainer from './MediasContainer';
// import Home from './Home';
// import SocketContainer from './socket/SocketContainer';
// import ProfileContainer from './profile/ProfileContainer';
// import NotificationsContainer from './notifications/NotificationsContainer';
// import ThemeContainer from './ThemeContainer';
// import MessagesContainer from './messages/MessagesContainer.';
// import { ResumableClientContainer } from './resumableClient/ResumableClientContainer';
import {DataContext, DataEvents} from "spider-vision/Form/dataMachine";
import PrivateRoute from '../components/PrivateRoute';
import ArticleContainer from "./ArticleContainer";
import MediasContainer from "./MediasContainer";
import ThemeContainer from "./ThemeContainer";
import {SnackbarContext, SnackbarEvents, SnackbarSchema} from "spider-vision/AlertBar/type";
import SocketContainer from "./socket/SocketContainer";
import {ResumableClientContainer} from "./resumableClient/ResumableClientContainer";
import ProfileContainer from "./profile/ProfileContainer";
import NotificationsContainer from "./notifications/NotificationsContainer";
import MessagesContainer from "./messages/MessagesContainer.";

export interface Props {
    isLoggedIn: boolean;
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
    snackbarService: Interpreter<SnackbarContext,
        SnackbarSchema,
        SnackbarEvents,
        any>;
    ItemsService: Interpreter<DataContext<any>, any, DataEvents, any>;
}

const PrivateRoutesContainer: React.FC<Props> = ({
                                                     isLoggedIn,
                                                     ItemsService,
                                                     authService,
                                                     snackbarService,
                                                 }) => {
    return (
        <MainLayout authService={authService}>
            {/*<PrivateRoute isLoggedIn={isLoggedIn} exact path={'/'}>*/}
            {/*    <Home />*/}
            {/*</PrivateRoute>*/}
            {/*<PrivateRoute*/}
            {/*    isLoggedIn={isLoggedIn}*/}
            {/*    exact*/}
            {/*    path={'/(public|contacts|personal)?'}*/}
            {/*></PrivateRoute>*/}
            {/*<PrivateRoute*/}
            {/*    isLoggedIn={isLoggedIn}*/}
            {/*    exact*/}
            {/*    path={'/user/settings'}*/}
            {/*></PrivateRoute>*/}
            {/*<PrivateRoute isLoggedIn={isLoggedIn} exact path={'/lists'}>*/}
            {/*    <ListContainer ItemsService={ItemsService} />*/}
            {/*</PrivateRoute>*/}
            {/*<PrivateRoute isLoggedIn={isLoggedIn} exact path={'/lists/new'}>*/}
            {/*    <CreateContainer />*/}
            {/*</PrivateRoute>*/}
            {/*<PrivateRoute*/}
            {/*    isLoggedIn={isLoggedIn}*/}
            {/*    exact*/}
            {/*    path={'/lists/:itemId'}*/}
            {/*>*/}
            {/*    <DetailsContainer />*/}
            {/*</PrivateRoute>*/}
            {/*<PrivateRoute*/}
            {/*    isLoggedIn={isLoggedIn}*/}
            {/*    exact*/}
            {/*    path={IMAGES}*/}
            {/*></PrivateRoute>*/}
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={ARTICLE}>
                <ArticleContainer/>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={MEDIAS}>
                <MediasContainer/>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={SOCKET}>
                <SocketContainer authService={authService}/>
            </PrivateRoute>
            <PrivateRoute
                isLoggedIn={isLoggedIn}
                exact
                path={RESUMABLE_CLIENT}
            >
                <ResumableClientContainer/>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={PROFILE}>
                <ProfileContainer authService={authService}/>
            </PrivateRoute>
            <PrivateRoute
                isLoggedIn={isLoggedIn}
                exact
                path={NOTIFICATIONS}
            >
                <NotificationsContainer authService={authService}/>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={THEME}>
                <ThemeContainer/>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={MESSAGES}>
                <MessagesContainer/>
            </PrivateRoute>
        </MainLayout>
    );
};

export default PrivateRoutesContainer;
