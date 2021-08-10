import {AllTeams} from '../../ui/allTeams/allTeams'
import {Header} from '../../ui/header/header'
import {Menu} from '../../ui/menu/menu'
import mp from './mainPage.module.scss'
import {useEffect, useState} from "react";
import {AllPlayer} from "../../ui/allPlayers/allPlayer";
import {Route, Switch} from 'react-router-dom';
import {AddTeam} from '../../ui/addTeam/addTeam';
import {useHistory} from "react-router";
import {AddPlayer} from '../../ui/addPlayer/addPlayer';
import React from 'react';


export const MainPage = React.memo( () => {
    console.log('главная страница')



    useEffect(()=>{

        console.log('эффект')
    },[])


    return (
        <div className={mp.main_container}>
            <Header/>
            <div className={mp.main_container_children}>
                <Menu/>

                <Switch>
                    <Route path='/teams/addteams'  render={() => <AddTeam/>}/>
                    <Route path='/players/addplayers'  render={() => <AddPlayer/>}/>
                    <Route path='/teams' exact render={() => <AllTeams/>}/>
                    <Route path='/players' exact render={() => <AllPlayer/>}/>
                </Switch>


            </div>
        </div>
    )
})
