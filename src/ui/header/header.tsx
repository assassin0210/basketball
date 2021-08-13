import s from './header.module.scss'
import {name, avatarUrl} from "../../utils/utils";
import {DefaultAvatar} from '../../assets/icon/defaultAvatar';
import {CurrentUserAvatar} from '../../assets/icon/currentUserAvatar';
import {MainLogo} from '../../assets/icon/mainLogo';
import React, {FC} from 'react';


export const Header:FC = React.memo(() => {
        return (
            <div className={s.header_container}>
                <MainLogo/>
                <div className={s.profile_block}>
                    <p className={s.profile_name}>{name() }</p>
                    {avatarUrl() === 'null' || undefined ? <DefaultAvatar/> : <CurrentUserAvatar avatarUrl={avatarUrl()}/>}
                </div>
            </div>
        )
    }
)
