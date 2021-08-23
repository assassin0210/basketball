import menu from "./menu.module.scss";
import { useHistory } from "react-router";
import { OnePerson } from "../../assets/icon/onePerson";
import { TwoPersons } from "../../assets/icon/TwoPersons";
import { SingOut } from "../../assets/icon/singOut";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteToken } from "../../modules/autorization/authSlice";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleExit = async () => {
    localStorage.clear();
    dispatch(deleteToken());
    await history.push("/singIn");
  };

  return (
    <div className={menu.menu_Container}>
      <div className={menu.wrapper_for_mod}>
        <NavLink
          activeClassName={menu.active_mod}
          to="/teams"
          className={`  ${menu.mod} ${menu.teams_button}  `}
        >
          <TwoPersons />
          <p>Teams</p>
        </NavLink>
        <NavLink
          to="/players"
          activeClassName={menu.active_mod}
          className={`${menu.mod} ${menu.player_button} `}
        >
          <OnePerson />
          <p>Players</p>
        </NavLink>
      </div>
      <div onClick={handleExit} className={`${menu.mod} ${menu.exit_button}`}>
        <SingOut />
        <p>Sing out</p>
      </div>
    </div>
  );
};
