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


    const [teamsMod, setTeamsMod] = useState(true)
    const [playersMod, setPlayersMod] = useState(false)
    const history=useHistory()


    const toggleSetTeamsMod = () => {
        setTeamsMod(true)
        setPlayersMod(false)
        history.push('/teams' )


    }
    const toggleSetPlayersMod = () => {
        setPlayersMod(true)
        setTeamsMod(false)
        history.push('/players')

    }

    useEffect(()=>{

        console.log('эффект')
    },[])


    return (
        <div className={mp.main_container}>
            <Header/>
            <div className={mp.main_container_children}>
                <Menu toggleSetTeamsMod={toggleSetTeamsMod}
                      toggleSetPlayersMod={toggleSetPlayersMod}
                      teamsMod={teamsMod}
                      playersMod={playersMod}
                />

                <Switch>
                    <Route path='/teams/addTeams'  render={() => <AddTeam/>}/>
                    <Route path='/players/addPlayers'  render={() => <AddPlayer/>}/>
                    <Route path='/teams' exact render={() => <AllTeams/>}/>
                    <Route path='/players' exact render={() => <AllPlayer/>}/>
                </Switch>


            </div>
        </div>
    )
})
