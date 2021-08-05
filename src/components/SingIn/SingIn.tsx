
import {useForm, SubmitHandler} from "react-hook-form";
import si from "./SingIn.module.scss";
import SingInPic from "../../assets/img/SingInPic.svg";
import { NavLink } from 'react-router-dom';
import { ErrorText } from "../../assets/ErrorText/ErrorText";

export const SingIn = () => {


    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>({mode: "onSubmit"});

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    let currentPassword =watch('password')
    let password = '12345'
    return (
        <div className={si.wrapper}>
            <div className={si.container}>
                <div className={si.formWrapper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sing In</h1>
                        <label> Login</label>
                        <input defaultValue=" " {...register("login", {required: true})} />

                        {errors.password && <span>User with the specified username / password was not found.</span>}
                        <label> Password</label>
                        <input {...register("password", {required: true})} />
                        {errors.password && <span>User with the specified username / password was not found.</span>}
                        {currentPassword!==password? <ErrorText >Wrong password. Please, try again.</ErrorText>: ''}
                        <input value='Sing In' type="submit"/>
                        <label style={{textAlign:"center"}}  >Not a member yet? <NavLink to='/singUp'>Sign up</NavLink></label>
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

