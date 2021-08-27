import { combineReducers } from "@reduxjs/toolkit";
import { autSliceConst } from "../../modules/autorization/authSlice";
import { TeamsSliceConst } from "../../modules/teams/teamsSlice";
import { PlayersSliceConst } from "../../modules/players/playerSlice";
import { interfaceResponseConst } from "../../modules/interfaseResponse/interfaseResponseSlice";

export const rootReducer = combineReducers({
  teams: TeamsSliceConst,
  auth: autSliceConst,
  players: PlayersSliceConst,
  interfaceData: interfaceResponseConst,
});
