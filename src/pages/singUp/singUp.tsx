import React from "react";
import si from "../singIn/singIn.module.scss";
import SingUnPic from "../../assets/images/SingUpPic.svg";
import {SingUpForm} from "../autorization/singupForm";


export const SingUp = () => {

    return (
        <div className={si.wrapper}>
            <div className={si.container}>
                <div className={si.formWrapper}>
                    <SingUpForm/>
                </div>

                <div className={si.img_container}>
                    <img src={SingUnPic} alt=""/>
                </div>
            </div>

        </div>
    )
}





