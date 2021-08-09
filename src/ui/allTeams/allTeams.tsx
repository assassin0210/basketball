import at from './allTeams.module.scss'
import search from '../../assets/icon/search.svg'
import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTeams} from '../../modules/getTeams/teamsSlice';
import { MissingTeams } from '../teamCard/missingTeams';
import { Preloader } from '../preloader/preloader';
import {AllTeamsPropType, RootState, teamsSliceType} from '../../api/dto/types';



export const AllTeams: FC<AllTeamsPropType> = ({teamsMod}) => {
    const count = useSelector((state: RootState & teamsSliceType & any) => state.teams.data.count)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTeams())
        console.log(count)
    }, [count])
    return (
        <div className={at.allTeams_container}>
            <Preloader/>

            <div className={at.top_side}>
                <div className={at.search_block}>
                    <input placeholder='Search...' type="text"/>
                    <img src={search} alt=""/>
                </div>
                <input className='red-button' value='Add  +' type="submit"/>
            </div>
                {count === 0 ? <MissingTeams/> :<div className={at.contentWrapper}></div> }

                <div>пагинация</div>
        </div>
    )
}
