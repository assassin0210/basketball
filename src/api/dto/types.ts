import { store } from "../../core/redux/store";
import { persistStore } from "redux-persist";
import { rootReducer } from "../../core/redux/rootReducer";
import React from "react";
import { IInitialStateTeam } from "./teamTypes";
import { IInitialStateAuth } from "./authTypes";
import { IInitialStatePlayer } from "./playerTypes";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type RootStateType = ReturnType<typeof rootReducer>;

export type onSubmitDataFormType = {
  userName?: string;
  login: string;
  password: string;
  doublePass?: string;
};

export interface StateType {
  teams: IInitialStateTeam;
  auth: IInitialStateAuth;
  players: IInitialStatePlayer;
}

export type InputsSingIn = {
  login: string;
  password: string;
};

export type InputsSingUp = {
  userName: string;
  login: string;
  password: string;
  doublePass: string;
  policy: boolean;
};

export interface AddTeamIType {
  name: string;
  division: string;
  conference: string;
  foundationYear: number;
  file: any;
  id?: number;
}

export interface AddPlayersFormType {
  teamName?: {};
  name: string;
  number: number;
  position: string;
  team: number | string;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl?: string;
  file?: any;
  id?: number;
}

export interface PropsType<T> {
  component: React.ElementType;
  path: string;
  exact?: boolean;
  src?: boolean;
  isAuth?: () => void | boolean | object | undefined;
}

export type TeamType = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string | undefined;
  id: number | undefined;
};

export type addTeamType = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id: number;
};

export interface responsAddTeam {
  data: {
    name: string;
    foundationYear: number;
    division: string;
    conference: string;
    imageUrl: string;
    id: number;
  };
}

export interface UpdateType {
  id: string;
}
