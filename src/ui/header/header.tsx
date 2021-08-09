import s from './header.module.scss'
import {token, name, avatarUrl} from "../../utils/utils";
import {DefaultAvatar} from '../../assets/icon/defaultAvatar';
import {CurrentUserAvatar} from '../../assets/icon/currentUserAvatar';
import {MainLogo} from '../../assets/icon/mainLogo';
import React from 'react';


export const Header = React.memo(() => {
        console.log("хедер")
        return (

            <div className={s.header_container}>
                <MainLogo/>
                <div className={s.profile_block}>
                    <p className={s.profile_name}>{token ? name : 'UserName'}</p>
                    {avatarUrl === 'null' || undefined ? <DefaultAvatar/> : <CurrentUserAvatar avatarUrl={avatarUrl}/>}
                </div>
            </div>
        )
    }
)
