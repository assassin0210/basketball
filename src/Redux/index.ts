 import {combineReducers, configureStore} from "@reduxjs/toolkit";
 import authSlice from "./reducers/authSlice";
 import teamsSlice from "./reducers/teamsSlice";


const rootReducer = combineReducers({
    auth:authSlice,
    teams: teamsSlice,

})


 export const store = configureStore({
     reducer:rootReducer,
 })


 type RootReducerType = typeof rootReducer

 export type RootState = ReturnType<typeof store.getState>

 export type AppDispatch = typeof store.dispatch
