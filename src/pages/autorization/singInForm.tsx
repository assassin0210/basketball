import {ErrorText} from "../../ui/errorText/errorText";
import si from "../singIn/singIn.module.scss";
import authSlice, {isLoading, login} from "../../modules/autorization/authSlice";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {InputsSingIn} from "../../api/dto/types";
import {ShowPassword} from "../../assets/icon/showPassword";
import {HidePassword} from "../../assets/icon/hidePassword";


export const SingInForm = () => {

        const {register, handleSubmit, formState: {errors}} = useForm<InputsSingIn>({mode: "onSubmit"});
        const [showPass, setShowPass] = useState(false)
        const showError = useSelector((state: typeof authSlice & RootStateOrAny) => state.auth.showError)
        const auth = useSelector((state:  typeof authSlice & RootStateOrAny) => state.auth.isAuth)
        const preloader = useSelector((state: typeof authSlice & RootStateOrAny) => state.auth.isLoading)


        const dispatch = useDispatch()
        const history = useHistory();


        useEffect(() => {
            console.log(' эффект')
            if (auth) {
                history.push('/teams')
            }

        }, [auth, history])

        const dispatchIsLoader = () => {
            dispatch(isLoading)
        }

        const showPassHandler = () => {
            setShowPass(!showPass)
            if (localStorage.getItem('currentUser')) {
                history.push('/teams')
            } else {
                console.log('не удалось проверить локал')
            }
        }


        const onSubmit: SubmitHandler<InputsSingIn> = (data: any) => {
            dispatch(login(data))
            history.push('/teams')
        };
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Sing In</h1>
                <label> Login</label>
                <input className={errors.login && 'input_Error'}  {...register("login", {required: true})} />

                {errors.login && <ErrorText>Login is required</ErrorText>}
                <label> Password</label>
                <div className={si.inputPassWrapper}>
                    <input className={errors.password && 'input_Error'} type={showPass ? 'text' : 'password'} {...register("password", {required: true})} />
                    <div onClick={showPassHandler} className={si.eyeImg}>
                        {showPass ? <ShowPassword/> : <HidePassword/>}
                    </div>


                </div>
                {errors.password && <ErrorText>Password is required</ErrorText>}
                <input disabled={preloader} onClick={dispatchIsLoader} value='Sing In' type="submit"/>
                <label style={{textAlign: "center"}}>Not a member yet? <Link className='linkSing' to='/singUp'>Sign up <div></div></Link></label>
                {showError && <span className='error_message_login'>User with the specified username / password was not found.</span>}
            </form>
        )
    }


