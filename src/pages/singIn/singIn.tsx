import si from "./singIn.module.scss";
import {SingInForm} from "../../ui/autorization/singInForm";
import React, {FC} from "react";
import { SingInImage } from "../../assets/icon/singInImage";
import {useSelector} from "react-redux";
import {authSliceType, StateType} from "../../api/dto/types";
import {Preloader} from "../../ui/preloader/preloader";


export const SingIn:FC< JSX.Element> =  () => {
    const isFeaching = useSelector<StateType>(state=>state.auth.isFetching)
    return (
        <div className={si.wrapper}>
            {isFeaching && <Preloader/>}

            <div className={si.container}>
                <div className={si.formWrapper}>
                    <SingInForm/>
                </div>

                <div className={si.img_container}>
                    <SingInImage/>
                </div>
            </div>

        </div>
    )
}



