import {SingIn} from "../../components/SingIn/SingIn";
import React from "react";
import SP from './_SingPage.module.scss'
import SingInPic from '../../assets/img/SingInPic.svg'


export const SingPage=()=>{
    return(
        <div className={SP.singpage_container}>
            <div>
                <SingIn/>
            </div>
            <div className={SP.img_container}>
                <img src={SingInPic} alt=""/>
            </div>
        </div>
    )
}
