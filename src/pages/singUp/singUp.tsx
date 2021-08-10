import React from "react";
import si from "../singIn/singIn.module.scss";
import {SingUpForm} from "../../ui/autorization/singupForm";
import { SingUpImage } from "../../assets/icon/singUpImage";


export const SingUp = () => {

    return (
        <div className={si.wrapper}>
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





