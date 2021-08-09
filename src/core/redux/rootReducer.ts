import {combineReducers} from "@reduxjs/toolkit";
import authSlice from "../../modules/autorization/authSlice";
import teamsSlice from "../../modules/getTeams/teamsSlice";



export const rootReducer = combineReducers({
    teams: teamsSlice,
    auth: authSlice,
} )
