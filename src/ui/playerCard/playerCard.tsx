import React from 'react';
import tc from '../teamCard/teamCard.module.scss'
import {FC} from "react";
import {AddPlayersFormType, RootState, teamsSliceType} from '../../api/dto/types';
import {useHistory} from "react-router";
import { useSelector} from "react-redux";



export const PlayerCard:FC<AddPlayersFormType> =   ({number,name,team,id,avatarUrl})=>{


    const teams = useSelector<RootState & teamsSliceType>(state=>state.teams.data)
    const players = useSelector<RootState & teamsSliceType>(state=>state.players.data)


    // @ts-ignore
    const teamName = teams.find(teamn => teamn.id === team).name
    console.log(teamName)

    // @ts-ignore
    const selectedPlayer = players.filter((state) => state.id === id)
    const history = useHistory()

    const handleCheckId =()=>{
        // @ts-ignore
        history.push(`/players/${selectedPlayer[0].id}`)
    }

    return(
        // @ts-ignore
        <div  onClick={handleCheckId} className={tc.teamCardContainer}>
            <div className={tc.playerLogoBlock}>
                <img src={avatarUrl} alt="team"/>
            </div>
            <div className={tc.teamDescription}>
                <h3>{name}<span> #{number}</span></h3>
                <h4> {teamName}</h4>
            </div>
        </div>
    )
}
