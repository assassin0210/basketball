import s from "./header.module.scss";
import { DefaultAvatar } from "../../assets/icon/defaultAvatar";
import { MainLogo } from "../../assets/icon/mainLogo";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { SolidMenu } from "../../assets/icon/solidMenu";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../modules/interfaseResponse/interfaseResponseSlice";
import { avatarUrl, userName } from "../secondaryFunctions";

export const Header: FC = () => {
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className={s.header_container}>
      <SolidMenu toggleHandler={toggleHandler} />
      <NavLink to="/teams">
        <MainLogo />
      </NavLink>

      <div className={s.profile_block}>
        <p className={s.profile_name}>{userName()}</p>
        {avatarUrl() ? (
          <DefaultAvatar />
        ) : (
          <img src={avatarUrl()} alt="avatar" />
        )}
      </div>
    </div>
  );
};
