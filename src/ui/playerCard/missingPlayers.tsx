import tc from '../teamCard/teamCard.module.scss'
import { MissingPlayersImage } from '../../assets/icon/missongPlayers';

export function  MissingPlayers(){
    return(
        <div className={tc.missing_mainblock}>
            <div className={tc.missingContainer}>

                <MissingPlayersImage/>

                <div>
                    <h3 >Empty here</h3>
                    <p>Add new players to continue</p>
                </div>

            </div>
        </div>
    )
}
