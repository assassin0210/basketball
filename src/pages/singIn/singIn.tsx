import si from "./singIn.module.scss";
import {SingInForm} from "../../ui/singInForm/singInForm";
import React, {FC, useEffect} from "react";
import { SingInImage } from "../../assets/icon/singInImage";
import {useSelector} from "react-redux";
import {RootState} from "../../api/dto/types";
import {Preloader} from "../../ui/preloader/preloader";
import {useHistory} from "react-router";



export const SingIn:FC< JSX.Element> =  () => {
    const history = useHistory()

    const auth = useSelector((state:RootState)=>state.auth)
    useEffect(()=>{
        if(auth.token !== null){
            history.push('/teams')
        }
    },[auth])

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



