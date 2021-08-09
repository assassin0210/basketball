import { FC } from "react";
import si from "../../pages/singIn/singIn.module.scss";

export const ErrorText: FC<React.ReactNode> = (props) => (
        <p className={si.errorLabel}>
            {props.children}
        </p>

)

