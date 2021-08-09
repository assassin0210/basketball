import at from './allTeams.module.scss'
import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTeams} from '../../modules/getTeams/teamsSlice';
import {AllTeamsPropType, RootState, teamsSliceType} from '../../api/dto/types';
import {Search} from "../../assets/icon/search";
import { MissingTeams } from '../teamCard/missingTeams';



export const AllTeams = () => {

    const count = useSelector((state: RootState & teamsSliceType & any) => state.teams.count)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTeams())
    }, [count,dispatch])
    return (
        <div className={at.allTeams_container}>
            <div className={at.top_side}>
                <div className={at.search_block}>
                    <input className='input_search' placeholder='Search...' type="text"/>
                    <Search/>
                </div>
                <input className='red-button' value='Add  +' type="submit"/>
            </div>
                {count === 0 ? <MissingTeams/> :<div className={at.contentWrapper}></div> }

                <div>пагинация</div>
        </div>
    )
}
