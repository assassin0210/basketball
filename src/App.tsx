import React, {useEffect} from 'react';
import './index.scss'
import {Switch, useHistory} from 'react-router-dom';
import {MainPage} from './pages/mainPage/mainPage';
import {SingIn} from './pages/singIn/singIn';
import {SingUp} from "./pages/singUp/singUp";
import { PublicRoute } from './ui/routing/publicRoute';
import { PrivateRoute } from './ui/routing/privateRoute';


export const  App= React.memo( ()=> {
    const history = useHistory()


    const isAuth =  () => {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            history.push('/teams')
    }
    })

    return (
        <div className="App">
            <Switch>
                <PublicRoute isAuth={isAuth} component={SingIn} path='/singIn'/>
                <PublicRoute isAuth={isAuth} component={SingUp} path='/singUp'/>
                <PrivateRoute isAuth={isAuth} component={MainPage} path='/'/>
            </Switch>
        </div>
    );
})


