import { AddTeamsForm } from '../allTeams/addTeamsForm/addTeamsForm'
import at from './addTeams.module.scss'
import {Preloader} from "../preloader/preloader";
import React from "react";
import {useSelector} from "react-redux";
import {StateType} from '../../api/dto/types';
import {useHistory} from "react-router";


export const AddTeam = () => {
    const isFetching = useSelector<StateType>(state=>state.teams.isFetching)
    const history = useHistory()
    const handleHistoryTeam=()=>{
        history.push('/teams')
    }
    return (
        <div className={at.container}>
            <div className={at.addTeam_block}>
                { isFetching && <Preloader/>}
                <div className={at.headerContainer}>
                    <p onClick={handleHistoryTeam} >Teams</p>
                    <span>/ </span>
                        <p>Add new team</p>
                </div>
                    <AddTeamsForm/>
            </div>
        </div>
    )
}
