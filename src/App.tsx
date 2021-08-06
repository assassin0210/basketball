import React from 'react';
import './index.scss'
import {SingIn} from "./components/SingIn/SingIn";
import {Switch, Route} from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import {SingUp} from "./components/SingUp/SingUp";
import { AllTeams } from './components/AllTeams/AllTeams';
import { AllPlayer } from './components/AllPlayers/AllPlayer';
import { TestComp } from './components/testComp';



function App() {

    return (
        <div className="App">

            <Switch>
                <Route exact path='/' component={SingIn}/>
                <Route exact path='/singUp' component={SingUp}/>
                <MainPage>
                    <Route exact path='/teams' component={AllTeams}/>
                    <Route exact path='/players' component={AllPlayer}/>
                </MainPage>
            </Switch>
        </div>
    );
}

export default App;
