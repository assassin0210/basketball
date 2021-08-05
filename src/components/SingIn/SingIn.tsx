
import {useForm, SubmitHandler} from "react-hook-form";
import si from "./SingIn.module.scss";
import SingInPic from "../../assets/img/SingInPic.svg";
import { NavLink } from 'react-router-dom';
import { ErrorText } from "../../assets/ErrorText/ErrorText";
import React, {useState} from "react";
import openEye from "../../assets/icon/open_eye.svg";
import closeEye from "../../assets/icon/close_eye.svg";

export const SingIn = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>({mode: "onSubmit"});
    const [showPass, setShowPass] = useState(false)
    const showPassHandler = () => {
        setShowPass(!showPass)
    }

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    return (
        <div className={si.wrapper}>
            <div className={si.container}>
                <div className={si.formWrapper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sing In</h1>
                        <label> Login</label>
                        <input  {...register("login", {required: true})} />

                        {errors.login && <ErrorText>Login is required</ErrorText>}
                        <label> Password</label>
                        <div className={si.inputPassWrapper}>
                            <input type={showPass ? 'text' : 'password'} {...register("password", {required: true})} />
                            <img onClick={showPassHandler} className={si.eyeImg}
                                 src={showPass ? openEye : closeEye} alt=""/>
                        </div>
                        {errors.password && <ErrorText>Password is required</ErrorText>}
                         {/*<ErrorText >Wrong password. Please, try again.</ErrorText>*/}
                        <input value='Sing In' type="submit"/>
                        <label style={{textAlign:"center"}}  >Not a member yet? <NavLink to='/singUp'>Sign up</NavLink></label>
                        <span>User with the specified username / password was not found.</span>
                    </form>
                </div>

                <div className={si.img_container}>
                    <img src={SingInPic} alt=""/>
                </div>
            </div>

        </div>
    )
}


type Inputs = {
    login: string,
    password: string,
};

