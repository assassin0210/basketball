import {ErrorText} from "../../ui/errorText/errorText";
import si from "../singIn/singIn.module.scss";
import {NavLink, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { registered} from "../../modules/autorization/authSlice";

import {SubmitHandler, useForm} from "react-hook-form";
import { InputsSingUp, onSubmitDataFormType, RootStateType} from "../../api/dto/types";
import {ShowPassword} from "../../assets/icon/showPassword";
import {HidePassword} from "../../assets/icon/hidePassword";


export const SingUpForm = () => {

    const [showPass, setShowPass] = useState(false)
    const [showDoublePass, setShowDoublePass] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState(false)
    const dispatch = useDispatch()
    const showError = useSelector((state:  RootStateType) => state.auth.showError)
    const auth = useSelector((state:  RootStateType) => state.auth.isAuth)
    const history = useHistory();

    useEffect(() => {
        if (auth) {
            history.push('/basketball')
        }

    }, [auth, history])

    const showPassHandler = () => {
        setShowPass(!showPass)
    }
    const showDoublePassHandler = () => {
        setShowDoublePass(!showDoublePass)
    }

    const {register, handleSubmit, formState: {errors}} = useForm<InputsSingUp>({mode: "onSubmit"});

    const onSubmit: SubmitHandler<InputsSingUp> = (data: onSubmitDataFormType) => {
        if (data.password === data.doublePass) {
            dispatch(registered(data))

        } else {
            setRepeatPassword(true)
        }
    }
    return <form onSubmit={handleSubmit(onSubmit)}>
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
            <div onClick={showPassHandler}
                 className={si.eyeImg}>
                {showPass? <ShowPassword/> :<HidePassword/>}
            </div>
        </div>

        {errors.password && <ErrorText>Password is required</ErrorText>}
        <label> Enter your password again</label>
        <div className={si.inputPassWrapper}>
            <input
                type={showDoublePass ? 'text' : 'password'} {...register("doublePass", {required: true})} />

                <div onClick={showDoublePassHandler}
                     className={si.eyeImg}>
                    {showDoublePass? <ShowPassword/> :<HidePassword/>}
                </div>

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
        {showError && <span>Invalid data, or this user already exists</span>}

    </form>
}

