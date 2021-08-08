 import {combineReducers, configureStore} from "@reduxjs/toolkit";
 import authSlice from "./reducers/authSlice";


const rootReducer = combineReducers({
    auth:authSlice,

})


 export const store = configureStore({
     reducer:rootReducer,
 })


 type RootReducerType = typeof rootReducer

 export type RootState = ReturnType<typeof store.getState>

 export type AppDispatch = typeof store.dispatch
