import s from "./header.module.scss";
import { DefaultAvatar } from "../../assets/icon/defaultAvatar";
import { MainLogo } from "../../assets/icon/mainLogo";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { SolidMenu } from "../../assets/icon/solidMenu";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../modules/interfaseResponse/interfaseResponseSlice";
import { RootState } from "../../api/dto/types";

export const Header: FC = () => {
  const userData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className={s.header_container}>
      <SolidMenu toggleHandler={toggleHandler} />
        <img style={{width:"50px", height:"50px"}} src="../../assets/icon/0.png" alt=""/>
      <NavLink to="/teams">

        <MainLogo />
      </NavLink>

      <div className={s.profile_block}>
        <p className={s.profile_name}>{userData.name}</p>
        {userData.avatarUrl === "null" ? (
          <DefaultAvatar />
        ) : (
          <img src={userData.avatarUrl as string} alt="avatar" />
        )}
      </div>
    </div>
  );
};
