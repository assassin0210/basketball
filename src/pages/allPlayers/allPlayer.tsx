import ap from './allPlayers.module.scss'
import {Search} from "../../assets/icon/search";
import React, {useEffect} from "react";
import {Preloader} from "../../ui/preloader/preloader";
import {useDispatch, useSelector} from "react-redux";
import {PlayersSliceType, StateType} from "../../api/dto/types";
import {MissingPlayers} from '../../ui/playerCard/missingPlayers';
import {useHistory} from "react-router";
import {PlayerCard} from '../../ui/playerCard/playerCard';
import { getPlayers } from '../../modules/players/playerThunk';
import { getTeams } from '../../modules/teams/teamThunk';


export const AllPlayer = () => {
    const players: PlayersSliceType = useSelector((state: StateType) => state.players)
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTeams())
        dispatch(getPlayers())

    }, [])

    const handleHistoryPush = () => history.push('/players/addPlayer')

    return (
        <div className={ap.container}>
            <div className={ap.top_side}>
                <div className={ap.search_block}>
                    <input className='input_search' placeholder='Search...' type="text"/>
                    <Search/>
                </div>
                <input style={{margin: '0'}} onClick={handleHistoryPush} className='red-button' value='Add  +'
                       type="submit"/>
            </div>
            {players.isFetching && <Preloader/>}
            {players.count === 0 ? <MissingPlayers/> : <div className='contentWrapper'>
                {players.data.map((player) => <PlayerCard key={player.id}
                                                          number={player.number}
                                                          name={player.name}
                                                          position={player.position}
                                                          team={player.team}
                                                          birthday={player.birthday}
                                                          height={player.height}
                                                          weight={player.weight}
                                                          avatarUrl={player.avatarUrl}
                                                          id={player.id}/>)}
            </div>}

            <div>
                <div>пагинация</div>
                <div>пагинация</div>
            </div>
        </div>)
}