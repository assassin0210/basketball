
import tc from './teamCard.module.scss'
import {MissingTeamImage} from "../../assets/icon/missingTeamsImage";

export function  MissingTeams(){
    return(
        <div className={tc.missing_mainblock}>
            <div className={tc.missingContainer}>

                <MissingTeamImage/>

                <div>
                    <h3 >Empty here</h3>
                    <p>Add new teams to continue</p>
                </div>

            </div>
        </div>
    )
}
