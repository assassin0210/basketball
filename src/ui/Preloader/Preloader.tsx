import pre from './Preloader.module.scss'
import {useSelector} from "react-redux";
import {authSlice} from "../../modules/autorization/authSlice";
import {RootState} from "../../core/redux/store";




export const Preloader=()=>{


    return <div className={pre.preloader_container}>

    </div>
}
