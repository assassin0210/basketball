import logo from '../../assets/images/logo.svg'
import s from './header.module.scss'
import defaultAvatar from '../../assets/images/profile.svg'
import {currentUser} from "../../utils/utils";

export function Header() {
    return (
        <div className={s.header_container}>
            <img src={logo} alt=""/>
            <div className={s.profile_block}>
                <p className={s.profile_name}>{currentUser.name}</p>
                <img src={currentUser.avatarUrl == null? defaultAvatar:`${currentUser.avatarUrl}`  } alt=""/>
            </div>
        </div>
    )
}
