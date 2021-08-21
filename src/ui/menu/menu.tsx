import menu from './menu.module.scss'
import {useHistory, useLocation} from "react-router";
import {OnePerson} from '../../assets/icon/onePerson';
import {TwoPersons} from '../../assets/icon/TwoPersons';
import {SingOut} from '../../assets/icon/singOut';
import React from 'react';
import {useDispatch} from "react-redux";
import {deleteToken} from '../../modules/autorization/authSlice';


export const Menu = React.memo(() => {
    const dispatch = useDispatch()
    const history = useHistory()
    let location = useLocation()

    const toggleSetTeamsMod = () => {
        history.push('/teams')
    }
    const toggleSetPlayersMod = () => {
        history.push('/players')
    }

    const handleExit = async () => {
        localStorage.clear()
        dispatch(deleteToken())
        await history.push('/singIn')
    }

    const checkLocation = () => {
        if (location.pathname === ("/players")) {
            return true
        } else if (location.pathname === "/players/addPlayer") {
            return true
        } else if (location.pathname === "/players/") {
            return true
        } else if (location.pathname === "/players/:id") {
            return true
        }
        return false
    }

    return (
        <div className={menu.menu_Container}>
            <div className={menu.wrapper_for_mod}>
                <div onClick={toggleSetTeamsMod}
                     className={`  ${menu.mod} ${menu.teams_button} ${checkLocation() ? '' : menu.active_mod} persons-button `}>
                    <TwoPersons/>
                    <p>Teams</p>
                </div>
                <div onClick={toggleSetPlayersMod}
                     className={`${menu.mod} ${menu.player_button} ${checkLocation() ? menu.active_mod : ''} persons-button`}>
                    <OnePerson/>
                    <p>Players</p>
                </div>
            </div>
            <div onClick={handleExit} className={`${menu.mod} ${menu.exit_button}`}>
                <SingOut/>
                <p>Sing out</p>
            </div>
        </div>
    )
})
