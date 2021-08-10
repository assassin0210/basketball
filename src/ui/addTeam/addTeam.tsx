import { AddTeamsForm } from '../allTeams/addTeamsForm/addTeamsForm'
import at from './addTeams.module.scss'


export const AddTeam = () => {
    return (
        <div className={at.container}>
            <div className={at.addTeam_block}>
                <div className={at.headerContainer}>
                    <p>Teams <span>/ </span>Add new team</p>
                </div>
                    <AddTeamsForm/>
            </div>
        </div>
    )
}
