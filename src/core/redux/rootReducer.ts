import {combineReducers} from "@reduxjs/toolkit";
import { autSliceConst } from "../../modules/autorization/authSlice";
import {TeamsSliceConst} from "../../modules/getTeams/teamsSlice";



export const rootReducer = combineReducers({
    teams: TeamsSliceConst,
    auth: autSliceConst,
} )
