import {useForm, SubmitHandler} from "react-hook-form";
import si from "./SingIn.module.scss";
import SingInPic from "../../assets/img/SingInPic.svg";
import {Link,  useHistory} from 'react-router-dom';
import {ErrorText} from "../../assets/ErrorText/ErrorText";
import React, {useEffect, useState} from "react";
import openEye from "../../assets/icon/open_eye.svg";
import closeEye from "../../assets/icon/close_eye.svg";
import { useDispatch, useSelector} from "react-redux";
import {authSlice,  login} from "../../Redux/reducers/authSlice";
import { isAuth} from "../../utils/utils";
import {RootState} from "../../Redux";


export const SingIn = (props: any) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>({mode: "onSubmit"});
    const [showPass, setShowPass] = useState(false)
    const showError = useSelector((state: authSlice & RootState) => state.auth.showError)
    const auth = useSelector((state: authSlice & RootState) => state.auth.isAuth)
    const dispatch = useDispatch()
    const history = useHistory();

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


    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        dispatch(login(data))
        history.push('/basketball')
    };

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

                        <input value='Sing In' type="submit"/>


                        <label style={{textAlign: "center"}}>Not a member yet? <Link to='/singUp'>Sign up</Link></label>
                        {showError && <span>User with the specified username / password was not found.</span> }
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

