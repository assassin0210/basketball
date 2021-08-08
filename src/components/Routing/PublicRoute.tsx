
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../utils/utils';

// @ts-ignore
export const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            isAuth() && restricted ?
                <Redirect to="/basketball" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute
