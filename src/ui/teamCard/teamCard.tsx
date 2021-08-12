import tc from './teamCard.module.scss'
import {FC} from "react";
import {RootState, teamsSliceType, TeamType} from '../../api/dto/types';
import {useHistory} from "react-router";
import { useSelector} from "react-redux";








export const TeamCard:FC<TeamType> = ({name,foundationYear,division,conference,imageUrl,id})=>{
    const teams = useSelector<RootState & teamsSliceType>(state=>state.teams.data)
    // @ts-ignore
    const selectedTeam = teams.filter((state) => state.id === id)

    const history = useHistory()

    const handleCheckId =()=>{
        history.push(`/teams/${selectedTeam[0].id}`)

    }


    return(
        <div  onClick={handleCheckId} className={tc.teamCardContainer}>
            <div className={tc.teamLogoBlock}>
                <img src={imageUrl} alt="team"/>
            </div>
            <div className={tc.teamDescription}>
                <h3>{name}</h3>
                <h4>Year of foundation: {foundationYear}</h4>
            </div>
        </div>
    )
}
