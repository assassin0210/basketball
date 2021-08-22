import ap from './addPlayer.module.scss'
import { useSelector} from "react-redux";
import {StateType} from "../../api/dto/types";
import {Preloader} from "../../ui/preloader/preloader";
import React from "react";
import {useHistory} from "react-router";
import { AddPlayersForm } from '../../ui/addPlayerForm/addPlayersForm';


export const AddPlayer =()=>{
    const history = useHistory()
    const isFetching = useSelector<StateType>(state=>state.players.isFetching)
    const handleHistoryPlayer=()=>{
        history.push('/players')
    }
    return(
       <div className={ap.container}>
           <div className={ap.block}>
               { isFetching && <Preloader/>}
               <div className={ap.headerContainer}>
                   <p onClick={handleHistoryPlayer} >Players</p>
                   <span>/ </span>
                   <p>Add new player</p>
               </div>
               <AddPlayersForm/>
           </div>


       </div>
    )
}
