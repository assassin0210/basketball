import {AllTeams} from '../../ui/allTeams/allTeams'
import {Header} from '../../ui/header/header'
import {Menu} from '../../ui/menu/menu'
import mp from './mainPage.module.scss'
import {AllPlayer} from "../../ui/allPlayers/allPlayer";
import {Route, Switch} from 'react-router-dom';
import {AddTeam} from '../../ui/addTeam/addTeam';
import {AddPlayer} from '../../ui/addPlayer/addPlayer';
import React from 'react';
import {DetailsTeam} from "../../ui/detailsTeam/detailesTeam";
import {UpdateTeam} from "../../ui/updateTeam/updateTeam";
import {DetailsPlayer} from '../../ui/detailsPlayer/detailsPlayer';


export const MainPage = () => {
    return (
        <div className={mp.main_container}>
            <Header/>
            <div className={mp.main_container_children}>
                <Menu/>
                <Switch>
                    <Route path='/teams'  render={() => <AllTeams/>}/>
                    <Route path='/teams/updateTeam:id' render={() => <UpdateTeam/>}/>
                    <Route path='/players'  render={() => <AllPlayer/>}/>
                    <Route path='/players/addplayer' render={() => <AddPlayer/>}/>
                    <Route path='/teams/addteams' exact render={() => <AddTeam/>}/>
                    <Route path={`/teams/:id`} render={() => <DetailsTeam/>}/>
                    <Route path={`/players/:id`} render={() => <DetailsPlayer/>}/>
                    <Route path='/teams/updatePlayer:id' render={() => <UpdateTeam/>}/>
                </Switch>


            </div>
        </div>
    )
}
