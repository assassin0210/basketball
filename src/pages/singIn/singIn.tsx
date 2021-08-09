import si from "./singIn.module.scss";
import {SingInForm} from "../autorization/singInForm";
import React from "react";
import { SingInImage } from "../../assets/icon/singInImage";


export const SingIn =  () => {
    return (
        <div className={si.wrapper}>

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



