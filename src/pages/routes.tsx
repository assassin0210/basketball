import React from "react";
import {FC} from "react";
import {Redirect, Route, Switch} from "react-router";
import {SingIn} from "./singIn/singIn";
import {SingUp} from "./singUp/singUp";
import {UpdateTeam} from "../ui/updateTeam/updateTeam";
import {AddTeam} from "../ui/addTeam/addTeam";
import {AddPlayer} from "../ui/addPlayer/addPlayer";
import {DetailsTeam} from "../ui/detailsTeam/detailesTeam";
import {AllTeams} from "../ui/allTeams/allTeams";
import {DetailsPlayer} from "../ui/detailsPlayer/detailsPlayer";
import mp from "./mainPage/mainPage.module.scss";
import {Header} from "../ui/header/header";
import {Menu} from "../ui/menu/menu";
import {AllPlayer} from "../ui/allPlayers/allPlayer";


export const Routes: FC = React.memo(() => {
    return <>
        <Header/>
        <div className={mp.main_container_children}>
            <Menu/>
            <Switch>
                {Object.values(routes).filter((item) => item.type === 'private').map((item) => (
                    <Route exact strict path={item.path} component={item.component}/>
                ))}
                {Object.values(routes).filter((item) => item.type === 'public')
                    .map((item) => (
                        <Route exact path={item.path} component={item.component}/>
                    ))}

            </Switch>
            <Redirect to={localStorage.getItem('token') ? routes.singIn.path : routes.allTeams.path}/>
        </div>

    </>
})


const routes = {
    singIn: {
        path: '/singIn',
        component: SingIn,
        type: 'public',
    },
    singUp: {
        path: '/singUp',
        component: SingUp,
        type: 'public',
    },
    addTeam: {
        path: '/teams/addTeams',
        component: AddTeam,
        type: 'private',
    },
    addPlayer: {
        path: '/players/addPlayer',
        component: AddPlayer,
        type: 'private',
    },
    allPlayer: {
        path: '/players',
        component: AllPlayer,
        type: 'private',
    },
    allTeams: {
        path: '/teams',
        component: AllTeams,
        type: 'private',
    },
    detailsTeam: {
        path: '/teams/:id',
        component: DetailsTeam,
        type: 'private',
    },
    detailsPlayer: {
        path: '/players/:id',
        component: DetailsPlayer,
        type: 'private',
    },
    updateTeam: {
        path: '/teams/updateTeam:id',
        component: UpdateTeam,
        type: 'private',
    },
}
