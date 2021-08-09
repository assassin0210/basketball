import menu from './menu.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {logOut} from '../../modules/autorization/authSlice';
import {FC, useEffect} from "react";
import {useHistory} from "react-router";
import { MenuPropType,  RootStateType} from '../../api/dto/types';
import { OnePerson } from '../../assets/icon/onePerson';
import { TwoPersons } from '../../assets/icon/TwoPersons';
import { SingOut } from '../../assets/icon/singOut';
import React from 'react';

export const Menu: FC<MenuPropType> = React.memo( ({toggleSetPlayersMod,toggleSetTeamsMod,teamsMod,playersMod}) => {
    const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleExit = () => {
        dispatch(logOut())
        history.push('/singIn')
    }
    useEffect(() => {

    }, [isAuth,history])

    return (
        <div className={menu.menu_Container}>
            <div className={menu.wrapper_for_mod}>
                <div onClick={toggleSetTeamsMod}
                     className={`${menu.mod} ${menu.teams_button} ${teamsMod ? menu.active_mod : ''}`}>
                    <TwoPersons/>
                    <p>Teams</p>
                </div>
                <div onClick={toggleSetPlayersMod}
                     className={`${menu.mod} ${menu.player_button} ${playersMod ? menu.active_mod : ''}`}>
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
