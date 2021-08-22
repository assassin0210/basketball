import React from "react";
import { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
import { SingIn } from "./singIn/singIn";
import { SingUp } from "./singUp/singUp";
import { UpdateTeam } from "./updateTeam/updateTeam";
import { AddTeam } from "./addTeam/addTeam";
import { AddPlayer } from "./addPlayer/addPlayer";
import { DetailsTeam } from "./detailsTeam/detailesTeam";
import { AllTeams } from "./allTeams/allTeams";
import { DetailsPlayer } from "./detailsPlayer/detailsPlayer";
import mp from "./allTeams/mainPage.module.scss";
import { Header } from "../ui/header/header";
import { Menu } from "../ui/menu/menu";
import { AllPlayer } from "./allPlayers/allPlayer";
import { useSelector } from "react-redux";
import { RootState } from "../api/dto/types";
import { UpdatePlayer } from "./updatePlayer/UpdatePlayer";
import { v4 as uuidv4 } from "uuid";

export const Routes: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? (
    <>
      <Header />
      <div className={mp.main_container_children}>
        <Menu />
        <Switch>
          {Object.values(routes)
            .filter((item) => item.type === "private")
            .map((item) => (
              <Route
                key={uuidv4()}
                exact
                strict
                path={item.path}
                component={item.component}
              />
            ))}
          <Redirect from="/" to="/teams" />
        </Switch>
      </div>
    </>
  ) : (
    <Switch>
      {Object.values(routes)
        .filter((item) => item.type === "public")
        .map((item) => (
          <Route key={uuidv4()} path={item.path} component={item.component} />
        ))}
      <Redirect from="/" to="/singIn" />
    </Switch>
  );
};

const routes = {
  singUp: {
    path: "/singUp",
    component: SingUp,
    type: "public",
  },
  singIn: {
    path: "/singIn",
    component: SingIn,
    type: "public",
  },

  addTeam: {
    path: "/teams/addTeams",
    component: AddTeam,
    type: "private",
  },
  addPlayer: {
    path: "/players/addPlayer",
    component: AddPlayer,
    type: "private",
  },
  allPlayer: {
    path: "/players",
    component: AllPlayer,
    type: "private",
  },
  allTeams: {
    path: "/teams",
    component: AllTeams,
    type: "private",
  },
  detailsTeam: {
    path: "/teams/:id",
    component: DetailsTeam,
    type: "private",
  },
  detailsPlayer: {
    path: "/players/:id",
    component: DetailsPlayer,
    type: "private",
  },
  updateTeam: {
    path: "/teams/updateTeam/:id",
    component: UpdateTeam,
    type: "private",
  },
  updatePlayer: {
    path: "/players/updatePlayer/:id",
    component: UpdatePlayer,
    type: "private",
  },
};
