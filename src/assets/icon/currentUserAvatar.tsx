import React, {FC} from "react";

export type PropsAvatar={
    avatarUrl: string | undefined
}

export const CurrentUserAvatar:FC<PropsAvatar> =  ({avatarUrl}) => {
    return (
        <img src={avatarUrl } alt="avatar"/>



    )
}
