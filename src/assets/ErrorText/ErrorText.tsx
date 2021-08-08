import si from "../../components/SingIn/SingIn.module.scss";

export const ErrorText = (props: any) => (
        <p className={si.errorLabel}>
            {props.children}
        </p>

)

