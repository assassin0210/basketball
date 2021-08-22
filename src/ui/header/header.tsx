import s from "./header.module.scss";
import { DefaultAvatar } from "../../assets/icon/defaultAvatar";
import { MainLogo } from "../../assets/icon/mainLogo";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";

export const Header: FC = React.memo(() => {
  const name = () => localStorage.getItem("name");
  const avatarUrl = () => localStorage.getItem("name") as string;

  return (
    <div className={s.header_container}>
      <NavLink to="/teams">
        <MainLogo />
      </NavLink>
      <div className={s.profile_block}>
        <p className={s.profile_name}>{name()}</p>
        {avatarUrl() ? (
          <DefaultAvatar />
        ) : (
          <img src={avatarUrl()} alt="avatar" />
        )}
      </div>
    </div>
  );
});
