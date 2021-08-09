import si from "../../pages/singIn/singIn.module.scss";

export const ErrorText = (props: any) => (
        <p className={si.errorLabel}>
            {props.children}
        </p>

)

