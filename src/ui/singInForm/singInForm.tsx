import { ErrorText } from "../errorText/errorText";
import si from "../../pages/singIn/singIn.module.scss";
import { autSliceConst } from "../../modules/autorization/authSlice";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { ShowPassword } from "../../assets/icon/showPassword";
import { HidePassword } from "../../assets/icon/hidePassword";
import { login } from "../../modules/autorization/authThunk";
import { onSubmitDataFormType } from "../../api/dto/authTypes";

export const SingInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<onSubmitDataFormType>({ mode: "onSubmit" });
  const [showPass, setShowPass] = useState(false);
  const showError = useSelector(
    (state: typeof autSliceConst & RootStateOrAny) => state.auth.showError
  );
  const preloader = useSelector(
    (state: typeof autSliceConst & RootStateOrAny) => state.auth.isLoading
  );
  const dispatch = useDispatch();

  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  const onSubmit: SubmitHandler<onSubmitDataFormType> = (data) => {
    dispatch(login(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sing In</h1>
      <label> Login</label>
      <input
        className={errors.login && si.input_Error}
        {...register("login", { required: true })}
      />

      {errors.login && <ErrorText>Login is required</ErrorText>}
      <label> Password</label>
      <div className={si.inputPassWrapper}>
        <input
          className={errors.password && si.input_Error}
          type={showPass ? "text" : "password"}
          {...register("password", { required: true })}
        />
        <div onClick={showPassHandler} className={si.eyeImg}>
          {showPass ? <ShowPassword /> : <HidePassword />}
        </div>
      </div>
      {errors.password && <ErrorText>Password is required</ErrorText>}
      <input disabled={preloader} value="Sing In" type="submit" />
      <label className={si.castom_label}>
        Not a member yet?{" "}
        <Link className={si.linkSing} to="/singUp">
          Sign up <div></div>
        </Link>
      </label>
      {showError && (
        <span className={si.error_message_login}>
          User with the specified username / password was not found.
        </span>
      )}
    </form>
  );
};
