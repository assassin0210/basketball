import missTeams from '../../assets/images/missingTeams.svg'
import tc from './TeamCard.module.scss'

export function  MissingTeams(){
    return(
        <div className={tc.missing_mainblock}>
            <div className={tc.missingContainer}>

                <img src={missTeams} alt=""/>

                <div>
                    <h3 >Empty here</h3>
                    <p>Add new teams to continue</p>
                </div>

            </div>
        </div>
    )
}
