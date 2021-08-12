import dt from './detailsTeam.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState, teamsSliceType} from "../../api/dto/types";
import {DeleteTeam} from "../../assets/icon/deleteTeam";
import {useHistory, useParams} from "react-router";
import {useEffect} from "react";
import {getTeam} from '../../modules/getTeams/teamsSlice';
import {RosterList} from "../rosterList/rosterList";
import {Update} from '../../assets/icon/update';

export const DetailsTeam = () => {
    const dispatch = useDispatch()
    const params: { id: string } = useParams()
    const history = useHistory()
    let currentTeam = useSelector((state: RootState & teamsSliceType) => state.teams.currentTeam)
    dispatch(getTeam(Number(params.id)))
    return (
        <div className={dt.container}>
            <div className={dt.teamInfo}>
                <div className={dt.team_info_header}>
                    <div className={dt.descBlock}>
                        <span className={dt.goBack} onClick={() => history.push('/teams')}>Team
                        </span> <p> / </p> {currentTeam.name}  </div>
                    <div className={dt.iconBlock}>
                        <Update id={params.id}/>
                        <DeleteTeam id={currentTeam.id}/>
                    </div>
                </div>

                <div className={dt.team_info_content}>
                    <div className={dt.imageUrl_container}>
                        <img src={currentTeam.imageUrl} alt=" team logo"/>
                    </div>
                    <div className={dt.current_info_container}>
                        <h2>{currentTeam.name}</h2>
                        <div className={dt.YearFound_divisions}>
                            <p>
                                Year of foundation <br/> <span>{currentTeam.foundationYear}</span>
                            </p>
                            <p>
                                Division <br/> <span> {currentTeam.division}</span>
                            </p>
                        </div>
                        <p>
                            Conference <br/>
                            <span>{currentTeam.conference}</span>
                        </p>
                    </div>
                </div>

            </div>
            <div className={dt.roster_container}>
                <ul className={dt.roster_list}>
                    <li>Roster</li>
                    <li className={dt.second_li}>
                        <div>
                            <span className={dt.first_item}>#</span>
                            <span className={dt.second_item}>Player</span>
                            <span className={dt.no_items}> </span>
                        </div>
                        <div className={dt.charisma}>
                            <span>Height</span>
                            <span>Weight</span>
                            <span>Age</span>
                        </div>
                    </li>
                    <RosterList/>
                </ul>


            </div>

        </div>
    )

}
