import React from 'react';
import {Switch} from 'react-router-dom';
import {Interpreter} from 'xstate';
import {AuthMachineContext, AuthMachineEvents} from '../machines/authMachine';
import {SnackbarContext, SnackbarEvents, SnackbarSchema} from '../machines/snackbarMachine';
import PrivateRoute from "../components/PrivateRoute";
import ItemsContainer from "./ItemsContainer";
import ItemDetailsContainer from './ItemDetailsContainer';
import ItemCreateContainer from "./ItemCreateContainer";
import MainLayout from '../components/MainLayout';
import HomeContainer from './HomeContainer';
import {DataContext, DataEvents} from '../machines/dataMachine';

export interface Props {
    isLoggedIn: boolean;
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
    snackbarService: Interpreter<SnackbarContext, SnackbarSchema, SnackbarEvents, any>;
    ItemsService: Interpreter<DataContext, any, DataEvents, any>;
}

const PrivateRoutesContainer: React.FC<Props> = ({isLoggedIn, ItemsService,authService, snackbarService}) => {
    return <MainLayout authService={authService}>
        <Switch>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/"}>
                <HomeContainer />
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/(public|contacts|personal)?"}>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/user/settings"}>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/items"}>
                <ItemsContainer ItemsService={ItemsService}/>
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/item/new"}>
                <ItemCreateContainer />
            </PrivateRoute>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/items/:itemId"}>
                <ItemDetailsContainer/>
            </PrivateRoute>
        </Switch>
    </MainLayout>
}

export default PrivateRoutesContainer
