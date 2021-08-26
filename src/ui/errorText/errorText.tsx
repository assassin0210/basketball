import { FC } from "react";
import si from "../../pages/singIn/singIn.module.scss";
import s from "./errorText.module.scss";

export const ErrorText: FC<React.ReactNode> = (props) => (
  <div className={s.input_error_text}>
    <span className={si.errorLabel}>{props.children}</span>
  </div>
);
