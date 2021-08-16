import {ErrorText} from "../errorText/errorText";
import si from "../../pages/singIn/singIn.module.scss";
import {NavLink} from "react-router-dom";
import React, { useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import { InputsSingUp, onSubmitDataFormType, RootStateType} from "../../api/dto/types";
import {ShowPassword} from "../../assets/icon/showPassword";
import {HidePassword} from "../../assets/icon/hidePassword";
import {registered} from "../../modules/autorization/authThunk";



export const SingUpForm = () => {

    const [showPass, setShowPass] = useState(false)
    const [showDoublePass, setShowDoublePass] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState(false)
    const dispatch = useDispatch()
    const showError = useSelector((state:  RootStateType) => state.auth.showError)

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
        <input className={`${errors.userName && 'input_Error'} input_form`} {...register("userName", {required: true})} />
        {errors.userName && <ErrorText>Name is required</ErrorText>}
        <label> Login</label>
        <input  className={`${errors.login && 'input_Error'} input_form`}{...register("login", {required: true})} />
        {errors.login && <ErrorText>Login is required</ErrorText>}

        <label> Password</label>

        <div className={si.inputPassWrapper}>
            <input className={`${errors.password && 'input_Error'} input_form`}
                type={showPass ? 'text' : 'password'} {...register("password", {required: true})} />
            <div onClick={showPassHandler}
                 className={si.eyeImg}>
                {showPass? <ShowPassword/> :<HidePassword/>}
            </div>
        </div>

        {errors.password && <ErrorText>Password is required</ErrorText>}
        <label> Enter your password again</label>
        <div className={si.inputPassWrapper}>
            <input className={`${errors.doublePass && 'input_Error'} input_form`}
                type={showDoublePass ? 'text' : 'password'} {...register("doublePass", {required: true})} />

                <div onClick={showDoublePassHandler}
                     className={si.eyeImg}>
                    {showDoublePass? <ShowPassword/> :<HidePassword/>}
                </div>

        </div>
        {repeatPassword && <ErrorText>Password is required</ErrorText>}

        {errors.password && <ErrorText>Enter your password required </ErrorText>}
        <div className={si.check}>
            <input  className={`${errors.doublePass && 'input_Error'} checkbox `}    {...register("policy", {required: true})} type='checkbox'/>
            <label style={{
                margin:'0'
            }}>I accept the agreement</label>
        </div>
        {errors.policy && <ErrorText>You didn’t accept the agreement</ErrorText>}
        <input  className='red-button red_submit'  value='Sing Up' type="submit"/>

        <label style={{textAlign: "center"}}>Not a member yet? <NavLink className='linkSing' to='/singIn'>Sing
            in <div>

            </div></NavLink></label>
        {showError && <span className='error_message_login'>Invalid data, or this user already exists</span>}

    </form>
}

