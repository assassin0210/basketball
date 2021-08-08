import React from 'react';
import './index.scss'
import {SingIn} from "./components/SingIn/SingIn";
import {Switch, Route} from 'react-router-dom';
import {MainPage} from './pages/MainPage/MainPage';
import {SingUp} from "./components/SingUp/SingUp";
import PublicRoute from './components/Routing/PublicRoute';
import PrivateRoute from './components/Routing/PrivateRoute';

function App() {
    //localStorage.removeItem('currentUser')
    return (
        <div className="App">
            <Switch>
                <PublicRoute restricted={true} component={SingIn} path='/' exact/>
                <PublicRoute restricted={true} component={SingUp} path='/singUp' exact/>
                <PrivateRoute component={MainPage} path='/basketball' exact/>
            </Switch>
        </div>
    );
}

export default App;
