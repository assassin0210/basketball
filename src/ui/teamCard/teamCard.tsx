import tc from './teamCard.module.scss'
import POR1 from '../../assets/images/POR1.png'







export const TeamCard=()=>{
    return(
        <div className={tc.teamCardContainer}>
            <div className={tc.teamLogoBlock}>
                <img src={POR1} alt=""/>
            </div>
            <div className={tc.teamDescription}>
                <h3>Portland trail blazers</h3>
                <h4>Year of foundation: 1970</h4>
            </div>
        </div>
    )
}
