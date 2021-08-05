import si from "../../components/SingIn/SingIn.module.scss";

export const ErrorText = (props: any) => {
    return (
        <p className={si.errorLabel}>
            {props.children}
        </p>
    )
}
