import si from "./singIn.module.scss";
import SingInPic from "../../assets/images/SingInPic.svg";
import {SingInForm} from "../autorization/singInForm";


export const SingIn = () => {


    return (
        <div className={si.wrapper}>

            <div className={si.container}>
                <div className={si.formWrapper}>
                    <SingInForm/>
                </div>

                <div className={si.img_container}>
                    <img src={SingInPic} alt=""/>
                </div>
            </div>

        </div>
    )
}



