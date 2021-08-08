import {Header} from '../../components/Header/Header'
import {Menu} from '../../components/Menu/Menu'
import mp from './MainPage.module.scss'

export const MainPage = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as any)
    //
    return (
        <div className={mp.main_container}>
            {/*@ts-ignore*/}
            <Header currentUser={currentUser}/>
            <div className={mp.main_container_children}>
                <Menu/>
                <h1>players or</h1>
            </div>
        </div>
    )
}
