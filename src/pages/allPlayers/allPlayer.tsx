import ap from './allPlayers.module.scss'
import {Search} from "../../assets/icon/search";
import React, {useEffect} from "react";
import {Preloader} from "../../ui/preloader/preloader";
import {useDispatch, useSelector} from "react-redux";
import { StateType} from "../../api/dto/types";
import {MissingPlayers} from '../../ui/playerCard/missingPlayers';
import {useHistory} from "react-router";
import {PlayerCard} from '../../ui/playerCard/playerCard';
import { getPlayers } from '../../modules/players/playerThunk';
import { v4 as uuidv4 } from 'uuid';
import {getTeams} from "../../modules/teams/teamThunk";



export const AllPlayer = () => {
    const dispatch = useDispatch()
   /* useEffect(() => {
       dispatch(getTeams())
        dispatch(getPlayers())

    }, [])
    const players = useSelector((state: StateType) => state.players)
    const history = useHistory()
    console.log(players)*/




    //const handleHistoryPush = () => history.push('/players/addPlayer')

    return (
        <div className={ap.container}>
            <div className={ap.top_side}>
                <div className={ap.search_block}>
                    <input className='input_search' placeholder='Search...' type="text"/>
                    <Search/>
                </div>
                <input style={{margin: '0'}} onClick={()=>{/*handleHistoryPush*/}} className='red-button' value='Add  +'
                       type="submit"/>
            </div>
            {/*{players.isFetching && <Preloader/>}
            {!players.count  ? <MissingPlayers/> : <div className='contentWrapper'>
                {players.data.map((player) => <PlayerCard key={uuidv4()}
                                                          number={player.number}
                                                          name={player.name}
                                                          position={player.position}
                                                          team={player.team}
                                                          birthday={player.birthday}
                                                          height={player.height}
                                                          weight={player.weight}
                                                          avatarUrl={player.avatarUrl}
                                                          id={player.id}/>)}
            </div>}*/}

            <div>
                <div>пагинация</div>
                <div>пагинация</div>
            </div>
        </div>)
}
