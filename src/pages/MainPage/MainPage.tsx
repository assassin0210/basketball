import { AllTeams } from '../../components/AllTeams/AllTeams'
import {Header} from '../../components/Header/Header'
import {Menu} from '../../components/Menu/Menu'
import mp from './MainPage.module.scss'
import {FC, useState} from "react";
import {AllPlayer} from "../../components/AllPlayers/AllPlayer";

type MainPagePropsType={

}



export const MainPage: FC<MainPagePropsType> = () => {


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
