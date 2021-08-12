import at from './allTeams.module.scss'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTeams} from '../../modules/getTeams/teamsSlice';
import {RootState, StateType, teamsSliceType, TeamType} from '../../api/dto/types';
import {Search} from "../../assets/icon/search";
import {MissingTeams} from '../teamCard/missingTeams';
import {useHistory} from "react-router";
import {Preloader} from "../preloader/preloader";
import {TeamCard} from "../teamCard/teamCard";
import React from 'react';


export const AllTeams = React.memo( () => {

    const teams = useSelector((state: RootState & teamsSliceType) => state.teams)
    const dispatch = useDispatch()
    const history = useHistory()

    const isFeaching = useSelector<StateType>(state => state.teams.isFetching)

    useEffect(() => {
        dispatch(getTeams())
    }, [teams.count])

    const handleHistoryPush=()=>history.push('/teams/addteams')

    return (
        <div className={at.allTeams_container}>
            <div className={at.top_side}>
                <div className={at.search_block}>
                    <input className='input_search' placeholder='Search...' type="text"/>
                    <Search/>
                </div>
                <input style={{margin:'0'}} onClick={handleHistoryPush} className='red-button' value='Add  +'
                       type="submit"/>
            </div>

            {isFeaching &&  <Preloader/>}
            {teams.count === 0 ? <MissingTeams/> : <div className={at.contentWrapper}>
                {teams.data.map((team: TeamType) => <TeamCard key={team.id}
                                                              name={team.name}
                                                              foundationYear={team.foundationYear}
                                                              division={team.division}
                                                              conference={team.conference}
                                                              imageUrl={team.imageUrl}
                                                              id={team.id}/>)}
            </div>}


            <div>
                <div>пагинация</div>
                <div>пагинация</div>
            </div>
        </div>
    )
})
