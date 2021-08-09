import {FC} from "react";
import si from "../../pages/singIn/singIn.module.scss";

export const ErrorText: FC<React.ReactNode> = (props) => (
    <div className='input_error-text'>
         <span className={si.errorLabel}>
            {props.children}
        </span>

    </div>
)

