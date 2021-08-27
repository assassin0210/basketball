import menu from "./adaptionMenu.module.scss";
import { useHistory } from "react-router";
import { OnePerson } from "../../assets/icon/onePerson";
import { TwoPersons } from "../../assets/icon/TwoPersons";
import { SingOut } from "../../assets/icon/singOut";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken } from "../../modules/autorization/authSlice";
import { NavLink } from "react-router-dom";
import { RootState } from "../../api/dto/types";
import { DefaultAvatar } from "../../assets/icon/defaultAvatar";
import { closeMenu } from "../../modules/interfaseResponse/interfaseResponseSlice";

export const AdaptionMenu = () => {
  const userData = useSelector((state: RootState) => state.auth);
  const visibleMenu = useSelector(
    (state: RootState) => state.interfaceData.visibleMenu
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleExit = async () => {
    localStorage.clear();
    dispatch(deleteToken());
    dispatch(closeMenu());
    await history.push("/singIn");
  };

  const handleCloseMenu = () => {
    dispatch(closeMenu());
  };

  return (
    <>
      <div
        className={`${menu.menu_Container} ${
          visibleMenu && menu.menu_container_none
        }`}
      >
        <div className={menu.wrapper_for_mod}>
          <div className={menu.profile_block}>
            <div className={menu.avatar_block}>
              {userData.avatarUrl === "null" ? (
                <DefaultAvatar />
              ) : (
                <img src={userData.avatarUrl as string} alt="avatar" />
              )}
            </div>
            <p className={menu.profile_name}>{userData.name}</p>
          </div>
          <NavLink
            onClick={handleCloseMenu}
            activeClassName={menu.active_mod}
            to="/teams"
            className={`  ${menu.mod} ${menu.teams_button}  `}
          >
            <TwoPersons />
            <p>Teams</p>
          </NavLink>
          <NavLink
            onClick={handleCloseMenu}
            to="/players"
            activeClassName={menu.active_mod}
            className={`${menu.mod} ${menu.player_button} `}
          >
            <OnePerson />
            <p>Players</p>
          </NavLink>
        </div>
        <div onClick={handleExit} className={menu.mod}>
          <SingOut />
          <p>Sing out</p>
        </div>
      </div>
      <div
        className={`${menu.adaption_main_container} ${
          visibleMenu && menu.adaption_main_container_none
        }`}
      ></div>
    </>
  );
};
