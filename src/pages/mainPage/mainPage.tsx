import { AllTeams } from '../../ui/allTeams/allTeams'
import {Header} from '../../ui/header/header'
import {Menu} from '../../ui/menu/menu'
import mp from './mainPage.module.scss'
import {useState} from "react";
import {AllPlayer} from "../../ui/allPlayers/allPlayer";





export const MainPage = () => {


    const [teamsMod, setTeamsMod] = useState(true)
    const [playersMod, setPlayersMod] = useState(false)

    const toggleSetTeamsMod = () => {
        setTeamsMod(true)
        setPlayersMod(false)
    }
    const toggleSetPlayersMod = () => {
        setPlayersMod(true)
        setTeamsMod(false )
    }


    return (
        <div className={mp.main_container}>
            <Header />
            <div className={mp.main_container_children}>
                <Menu toggleSetTeamsMod={toggleSetTeamsMod}
                      toggleSetPlayersMod={toggleSetPlayersMod}
                      teamsMod={teamsMod}
                      playersMod={playersMod}
                />

                    {teamsMod?<AllTeams teamsMod={teamsMod}/>:<AllPlayer teamsMod={teamsMod}/> }

            </div>
        </div>
    )
}
