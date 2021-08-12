import menu from './menu.module.scss'
import {useDispatch} from "react-redux";
import {logOut} from '../../modules/autorization/authSlice';
import {useHistory, useLocation} from "react-router";
import { OnePerson } from '../../assets/icon/onePerson';
import { TwoPersons } from '../../assets/icon/TwoPersons';
import { SingOut } from '../../assets/icon/singOut';
import React, {useEffect} from 'react';

export const Menu = React.memo( () => {
    const dispatch = useDispatch()
    const history=useHistory()
    let location = useLocation()


    const toggleSetTeamsMod = () => {
        history.push('/teams' )
    }
    const toggleSetPlayersMod = () => {
        history.push('/players')
    }

    const handleExit = () => {
        dispatch(logOut())
        history.push('/singIn')
    }


    const checkLocation =()=>{
        if(location.pathname === "/players" && "/teams/addplayers"){
            return true
        }
            return false

    }

    useEffect(()=>{
    },[history])


    return (
        <div className={menu.menu_Container}>
            <div className={menu.wrapper_for_mod}>
                <div  onClick={toggleSetTeamsMod}
                     className={`  ${menu.mod} ${menu.teams_button} ${checkLocation()  ? ''  :menu.active_mod } persons-button `}>
                    <TwoPersons/>
                    <p>Teams</p>
                </div>
                <div onClick={toggleSetPlayersMod}
                     className={`${menu.mod} ${menu.player_button} ${checkLocation()  ? menu.active_mod : ''} persons-button`}>
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