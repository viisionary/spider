import React from 'react';

import {Navigate, Route, RouteProps} from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
    isLoggedIn: boolean;
    exact?:any
}

function PrivateRoute({ isLoggedIn, children, ...rest }: IPrivateRouteProps) {
    return (
        <Route
            {...rest}
            // @ts-ignore
            render={({ location }:any) =>
                isLoggedIn ? (
                    children
                ) : (
                    /* istanbul ignore next */
                    <Navigate
                        to={{
                            pathname: '/signin',
                            // state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
