import ap from './allPlayers.module.scss'
import {Search} from "../../assets/icon/search";
import React from "react";
import {Preloader} from "../preloader/preloader";
import {useSelector} from "react-redux";
import {StateType} from "../../api/dto/types";
import { MissingPlayers } from '../playerCard/missingPlayers';
import {useHistory} from "react-router";


export const AllPlayer=()=>{
    const history = useHistory()
    const isFetching = useSelector<StateType>(state => state.teams.isFetching)


    const handleHistoryPush=()=>history.push('/players/addplayer')

    return(
        <div className={ap.container}>
            <div className={ap.top_side}>
                <div className={ap.search_block}>
                    <input className='input_search' placeholder='Search...' type="text"/>
                    <Search/>
                </div>
                <input style={{margin:'0'}} onClick={handleHistoryPush} className='red-button' value='Add  +'
                       type="submit"/>
            </div>
            {/*{isFetching &&  <Preloader/>}*/}
            <MissingPlayers/>
            <div>
                <div>пагинация</div>
                <div>пагинация</div></div>
        </div>
    )
}
