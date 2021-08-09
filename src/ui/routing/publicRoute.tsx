import React, {FC} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { PropsType } from '../../api/dto/types';

export const PublicRoute:FC<PropsType<Route>> = ({component:Component,isAuth, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            !(isAuth) || isAuth()  ?
                <Redirect to="/basketball" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute
