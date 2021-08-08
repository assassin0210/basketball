import { Header } from '../../components/Header/Header'
import mp from './MainPage.module.scss'

export const MainPage=(props:any)=>{
    return(
        <div className={mp.main_container}>
            <Header/>
            <div>menu left</div>
            <div>{props.children}</div>
        </div>
    )
}
