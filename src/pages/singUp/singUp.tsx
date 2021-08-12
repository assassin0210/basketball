import React, {FC} from "react";
import si from "../singIn/singIn.module.scss";
import {SingUpForm} from "../../ui/autorization/singupForm";
import { SingUpImage } from "../../assets/icon/singUpImage";
import {Preloader} from "../../ui/preloader/preloader";
import {useSelector} from "react-redux";
import {StateType} from "../../api/dto/types";


export const SingUp:FC< JSX.Element> = () => {
    const isFeaching = useSelector<StateType>(state=>state.auth.isFetching)
    return (
        <div className={si.wrapper}>
            {isFeaching && <Preloader/>}
            <div className={si.container}>
                <div className={si.formWrapper}>
                    <SingUpForm/>
                </div>

                <div className={si.img_container}>
                    <SingUpImage/>
                </div>
            </div>

        </div>
    )
}





