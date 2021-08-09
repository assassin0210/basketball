import React, {FC} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {PropsType} from "../../api/dto/types";


 const PrivateRoute:FC<PropsType<Route>> = ({component: Component,isAuth, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            !(isAuth) || isAuth() ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

 export default PrivateRoute


