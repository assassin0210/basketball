import React, {useEffect} from 'react';
import tc from '../teamCard/teamCard.module.scss'
import {FC} from "react";
import {AddPlayersFormType, RootState, teamsSliceType} from '../../api/dto/types';
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getTeams} from "../../modules/teams/teamsSlice";


export const PlayerCard:FC<AddPlayersFormType> =   ({number,name,team,})=>{
    const teams = useSelector<RootState & teamsSliceType>(state=>state.teams.data)
    const dispatch=useDispatch()
    // @ts-ignore
    const teamName = teams.find(teamn => teamn.id === team).name
    console.log(teamName)

    useEffect(()=>{
        dispatch(getTeams())
    },[])

    // @ts-ignore
    //const selectedTeam = teams.filter((state) => state.id === id)

    const history = useHistory()

    const handleCheckId =()=>{
        //history.push(`/teams/${selectedTeam[0].id}`)

    }


    return(
        <div  onClick={handleCheckId} className={tc.teamCardContainer}>
            <div className={tc.teamLogoBlock}>
                <img src='' alt="team"/>
            </div>
            <div className={tc.teamDescription}>
                <h3>{name}{number}</h3>
                <h4> {team}</h4>
            </div>
        </div>
    )
}
