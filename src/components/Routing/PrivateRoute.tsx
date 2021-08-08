import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../utils/utils';

// @ts-ignore
 const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            isAuth() ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

 export default PrivateRoute


