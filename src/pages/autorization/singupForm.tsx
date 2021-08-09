import {ErrorText} from "../../ui/errorText/errorText";
import si from "../singIn/singIn.module.scss";
import openEye from "../../assets/icon/open_eye.svg";
import closeEye from "../../assets/icon/close_eye.svg";
import {NavLink, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authSlice, registered} from "../../modules/autorization/authSlice";

import {SubmitHandler, useForm} from "react-hook-form";
import { InputsSingUp, onSubmitDataFormType, RootState } from "../../api/dto/types";


export const SingUpForm=()=>{

    const [showPass, setShowPass] = useState(false)
    const [showDoublePass, setShowDoublePass] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState(false)
    const dispatch = useDispatch()
    const showError = useSelector((state:typeof authSlice & RootState )=>state.auth.showError)
    const auth = useSelector((state: typeof authSlice & RootState) => state.auth.isAuth)
    const history = useHistory();

    useEffect(() => {
        if (auth) {
            history.push('/basketball')
        }

    }, [auth])

    const showPassHandler = () => {
        setShowPass(!showPass)
    }
    const showDoublePassHandler = () => {
        setShowDoublePass(!showDoublePass)
    }

    const {register, handleSubmit, watch, formState: {errors}} = useForm<InputsSingUp>({mode: "onSubmit"});

    const onSubmit: SubmitHandler<InputsSingUp> = (data:onSubmitDataFormType) => {
        if (data.password === data.doublePass) {
            dispatch(registered(data))

        } else {
            setRepeatPassword(true)
        }
    }
    return  <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sing Un</h1>
        <label> Name</label>
        <input {...register("userName", {required: true})} />
        {errors.userName && <ErrorText>Name is required</ErrorText>}
        <label> Login</label>
        <input {...register("login", {required: true})} />
        {errors.login && <ErrorText>Login is required</ErrorText>}

        <label> Password</label>

        <div className={si.inputPassWrapper}>
            <input
                type={showPass ? 'text' : 'password'} {...register("password", {required: true})} />
            <img onClick={showPassHandler} className={si.eyeImg}
                 src={showPass ? openEye : closeEye} alt=""/>
        </div>

        {errors.password && <ErrorText>Password is required</ErrorText>}
        <label> Enter your password again</label>
        <div className={si.inputPassWrapper}>
            <input
                type={showDoublePass ? 'text' : 'password'} {...register("doublePass", {required: true})} />
            <img onClick={showDoublePassHandler} className={si.eyeImg}
                 src={showDoublePass ? openEye : closeEye}/>
        </div>
        {repeatPassword && <ErrorText>Password is required</ErrorText>}

        {errors.password && <ErrorText>Enter your password required </ErrorText>}
        <div className={si.check}>
            <input {...register("policy", {required: true})} type='checkbox'/>
            <p>I accept the agreement</p>
        </div>
        {errors.policy && <ErrorText>You didn’t accept the agreement</ErrorText>}
        <input disabled={false} value='Sing Up' type="submit"/>
        <label style={{textAlign: "center"}}>Not a member yet? <NavLink to='/'>Sign
            up</NavLink></label>
        { showError&&<span>Invalid data, or this user already exists</span>}

    </form>
}

