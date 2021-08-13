import {combineReducers} from "@reduxjs/toolkit";
import { autSliceConst } from "../../modules/autorization/authSlice";
import {TeamsSliceConst} from "../../modules/teams/teamsSlice";
import { PlayersSliceConst} from "../../modules/players/playerSlice";



export const rootReducer = combineReducers({
    teams: TeamsSliceConst,
    auth: autSliceConst,
    players: PlayersSliceConst,
} )
