import {ErrorText} from "../errorText/errorText";
import si from "../../pages/singIn/singIn.module.scss";
import {login, autSliceConst} from "../../modules/autorization/authSlice";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {InputsSingIn} from "../../api/dto/types";
import {ShowPassword} from "../../assets/icon/showPassword";
import {HidePassword} from "../../assets/icon/hidePassword";


export const SingInForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<InputsSingIn>({mode: "onSubmit"});
    const [showPass, setShowPass] = useState(false)
    const showError = useSelector((state: typeof autSliceConst & RootStateOrAny) => state.auth.showError)
    const preloader = useSelector((state: typeof autSliceConst & RootStateOrAny) => state.auth.isLoading)
    const dispatch = useDispatch()
    const history = useHistory()

    const showPassHandler = () => {
        setShowPass(!showPass)
    }

    const onSubmit: SubmitHandler<InputsSingIn> = (data) => {
        dispatch(login(data))
        localStorage.clear()
        history.push('/teams')
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Sing In</h1>
            <label> Login</label>
            <input
                className={`  ${errors.login && 'input_Error'} input_form`}  {...register("login", {required: true})} />

            {errors.login && <ErrorText>Login is required</ErrorText>}
            <label> Password</label>
            <div className={si.inputPassWrapper}>
                <input className={` input_form ${errors.password && 'input_Error'}`}
                       type={showPass ? 'text' : 'password'} {...register("password", {required: true})} />
                <div onClick={showPassHandler} className={si.eyeImg}>
                    {showPass ? <ShowPassword/> : <HidePassword/>}
                </div>


            </div>
            {errors.password && <ErrorText>Password is required</ErrorText>}
            <input className='red-button red_submit' disabled={preloader} value='Sing In'
                   type="submit"/>
            <label style={{textAlign: "center"}}>Not a member yet? <Link className='linkSing' to='/singUp'>Sign up <div>

            </div>
            </Link>
            </label>
            {showError &&
            <span className='error_message_login'>User with the specified username / password was not found.</span>}
        </form>
    )
}


