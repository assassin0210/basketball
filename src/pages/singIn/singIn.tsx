import si from "./singIn.module.scss";
import {SingInForm} from "../../ui/singInForm/singInForm";
import React, {FC} from "react";
import { SingInImage } from "../../assets/icon/singInImage";
import {useSelector} from "react-redux";
import {RootState} from "../../api/dto/types";
import {Preloader} from "../../ui/preloader/preloader";




export const SingIn:FC< JSX.Element> =  () => {
    const auth = useSelector((state:RootState)=>state.auth)

    return (
        <div className={si.wrapper}>
            {auth.isFetching && <Preloader/>}

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



