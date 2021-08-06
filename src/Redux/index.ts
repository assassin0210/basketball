 import {combineReducers, configureStore} from "@reduxjs/toolkit";
 import authReducer from "./reducers/authReducer";
 import testReducer from "./reducers/testReducer";

const rootReducer = combineReducers({
    auth:authReducer,
    test:testReducer,
})


 export const store = configureStore({
     reducer:rootReducer,
 })
