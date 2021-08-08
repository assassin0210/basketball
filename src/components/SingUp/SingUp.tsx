import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import si from "./../SingIn/SingIn.module.scss";
import SingUnPic from "../../assets/img/SingUpPic.svg";
import {NavLink, useHistory} from 'react-router-dom';
import {ErrorText} from "../../assets/ErrorText/ErrorText";
import closeEye from '../../assets/icon/close_eye.svg'
import openEye from '../../assets/icon/open_eye.svg'
import {useDispatch, useSelector} from "react-redux";
import {authSlice, registered} from "../../Redux/reducers/authSlice";
import {RootState} from "../../Redux";







export const SingUp = () => {
    const [showPass, setShowPass] = useState(false)
    const [showDoublePass, setShowDoublePass] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState(false)
    const dispatch = useDispatch()
    const showError = useSelector((state:authSlice & RootState )=>state.auth.showError)
    const auth = useSelector((state: authSlice & RootState) => state.auth.isAuth)
    const history = useHistory();

    useEffect(() => {
        if (auth===true ) {
            history.push('/basketball')
        }

    }, [auth])

    const showPassHandler = () => {
        setShowPass(!showPass)
    }
    const showDoublePassHandler = () => {
        setShowDoublePass(!showDoublePass)
    }

    type Inputs = {
        userName: string,
        login: string,
        password: string,
        doublePass: string,
        policy: boolean,
    };
     type onSubmitDataFormType = {
        userName: string
        login: string
        password: string
        doublePass: string
    }


    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>({mode: "onSubmit"});

    const onSubmit: SubmitHandler<Inputs> = (data:onSubmitDataFormType) => {
        if (data.password === data.doublePass) {
            dispatch(registered(data))

        } else {
            setRepeatPassword(true)
        }
    }


    return (
        <div className={si.wrapper}>
            <div className={si.container}>
                <div className={si.formWrapper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <input onClick={()=>{}} value='Sing In' type="submit"/>
                        <label style={{textAlign: "center"}}>Not a member yet? <NavLink to='/'>Sign
                            up</NavLink></label>
                        { showError?<span>Invalid data, or this user already exists</span>: ''}

                    </form>
                </div>

                <div className={si.img_container}>
                    <img src={SingUnPic} alt=""/>
                </div>
            </div>

        </div>
    )
}





