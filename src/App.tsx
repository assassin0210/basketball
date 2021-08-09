import React from 'react';
import './index.scss'
import {Switch} from 'react-router-dom';
import {MainPage} from './pages/mainPage/mainPage';
import PublicRoute from './ui/routing/publicRoute';
import PrivateRoute from './ui/routing/privateRoute';
import { SingIn } from './pages/singIn/singIn';
import {SingUp} from "./pages/singUp/singUp";


function App() {
     const isAuth = () => {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    }




    return (
        <div className="App">
            <Switch>
                <PublicRoute isAuth={isAuth}  component={SingIn} path='/' exact/>
                <PublicRoute isAuth={isAuth} component={SingUp} path='/singUp' exact/>
                <PrivateRoute isAuth={isAuth} component={MainPage} path='/basketball' exact/>
            </Switch>
        </div>
    );
}

export default App;
