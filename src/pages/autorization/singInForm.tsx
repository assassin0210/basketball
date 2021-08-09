import {ErrorText} from "../../ui/errorText/errorText";
import si from "../singIn/singIn.module.scss";
import openEye from "../../assets/icon/open_eye.svg";
import closeEye from "../../assets/icon/close_eye.svg";
import {authSlice, isLoading, login} from "../../modules/autorization/authSlice";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {isAuth} from "../../utils/utils";
import { InputsSingIn, RootState } from "../../api/dto/types";


export const SingInForm=()=>{

    const {register, handleSubmit, watch, formState: {errors}} = useForm<InputsSingIn>({mode: "onSubmit"});
    const [showPass, setShowPass] = useState(false)
    const showError = useSelector((state:typeof authSlice & RootState) => state.auth.showError)
    const auth = useSelector((state: typeof authSlice & RootState) => state.auth.isAuth)
    const preloader = useSelector((state:typeof authSlice & RootState)=>state.auth.isLoading)
    const dispatch = useDispatch()
    const history = useHistory();

    console.log(preloader)

    useEffect(() => {
        if (auth) {
            history.push('/basketball')
        }

    }, [auth])




    const showPassHandler = () => {
        setShowPass(!showPass)
        if (localStorage.getItem('currentUser')) {
            isAuth()
            history.push('/basketball')
        } else {
            console.log('не удалось проверить локал')
        }
    }


    const onSubmit: SubmitHandler<InputsSingIn> = (data: any) => {
        dispatch(login(data))
        history.push('/basketball')
    };
    return(
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
            <input disabled={preloader} onClick={dispatch(isLoading)} value='Sing In' type="submit"/>
            <label style={{textAlign: "center"}}>Not a member yet? <Link to='/singUp'>Sign up</Link></label>
            {showError && <span>User with the specified username / password was not found.</span> }
        </form>
    )
}

