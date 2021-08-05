import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import si from "./../SingIn/SingIn.module.scss";
import SingUnPic from "../../assets/img/SingUpPic.svg";
import {NavLink} from 'react-router-dom';
import {ErrorText} from "../../assets/ErrorText/ErrorText";
import closeEye from '../../assets/icon/close_eye.svg'
import openEye from '../../assets/icon/open_eye.svg'


export const SingUp = () => {
    const [showPass, setShowPass] = useState(false)
    const [showDoublePass, setShowDoublePass] = useState(false)

    const showPassHandler = () => {
        setShowPass(!showPass)
    }
    const showDoublePassHandler = () => {
        setShowDoublePass(!showDoublePass)
    }

    type Inputs = {
        name: string,
        login: string,
        password: string,
        doublePass: string,
        policy: boolean,
    };
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>({mode: "onSubmit"});
    /* console.log(watch())*/

    const onSubmit: SubmitHandler<Inputs> = data => {

    };
    console.log(errors)

    return (
        <div className={si.wrapper}>
            <div className={si.container}>
                <div className={si.formWrapper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sing Un</h1>
                        <label> Name</label>
                        <input {...register("name", {required: true})} />
                        {errors.name && <ErrorText>Name is required</ErrorText>}
                        <label> Login</label>
                        <input {...register("login", {required: true})} />
                        {errors.login && <ErrorText>Login is required</ErrorText>}

                        <label> Password</label>

                        <div className={si.inputPassWrapper}>
                            <input type={showPass ? 'text' : 'password'} {...register("password", {required: true})} />
                            <img onClick={showPassHandler} className={si.eyeImg}
                                 src={showPass ? openEye : closeEye} alt=""/>
                        </div>

                        {errors.password && <ErrorText>Password is required</ErrorText>}
                        <label> Enter your password again</label>
                        <div className={si.inputPassWrapper}>
                            <input type={showDoublePass ? 'text' : 'password'} {...register("doublePass", {required: true})} />
                            <img onClick={showDoublePassHandler} className={si.eyeImg}
                                 src={showDoublePass ? openEye : closeEye}/>
                        </div>

                        {errors.password && <ErrorText>Enter your password required </ErrorText>}
                        <div className={si.check}>
                            <input {...register("policy", {required: true})} type='checkbox'/>
                            <p>I accept the agreement</p>
                        </div>
                        {errors.policy && <ErrorText>You didn’t accept the agreement</ErrorText>}
                        <input value='Sing In' type="submit"/>
                        <label style={{textAlign: "center"}}>Not a member yet? <NavLink to='/'>Sign up</NavLink></label>
                    </form>
                </div>

                <div className={si.img_container}>
                    <img src={SingUnPic} alt=""/>
                </div>
            </div>

        </div>
    )
}




