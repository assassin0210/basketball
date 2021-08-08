import logo from '../../assets/img/logo.svg'
import s from './Header.module.scss'
import defaultAvatar from '../../assets/img/profile.svg'
import {useDispatch, useSelector} from "react-redux";
import {authSlice} from "../../Redux/reducers/authSlice";
import {RootState} from "../../Redux";
import {useEffect} from "react";

// @ts-ignore
export function Header({currentUser}) {


    return (
        <div className={s.header_container}>

            <img src={logo} alt=""/>
            <div className={s.profile_block}>
                <p className={s.profile_name}>name</p>
                {/*@ts-ignore*/}
                <img src={currentUser.avatarUrl == null? defaultAvatar:`${currentUser.avatarUrl}`  } alt=""/>

            </div>
        </div>
    )
}
