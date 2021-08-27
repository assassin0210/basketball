import { store } from "../../core/redux/store";
import { persistStore } from "redux-persist";
import { rootReducer } from "../../core/redux/rootReducer";
import React from "react";
import { IInitialStateTeam, ITeamInfo } from "./teamTypes";
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

export type InputsSingUp = {
  userName: string;
  login: string;
  password: string;
  doublePass: string;
  policy: boolean;
};

export interface AddPlayersFormType {
  teamName?: {};
  name: string;
  number: number;
  position: string;
  team?: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl?: string;
  file?: Array<File>;
  id?: number;
}

/*
export interface IAddPlayerData {
  data: AddPlayersFormType;
  teamId: number | undefined;
}
*/

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

export type DeleteTeamType = {
  handleDelete: () => void;
};

export type updateType = {
  handleUpdate: () => void;
};
