import { configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer";



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                //ignoredActions: ['auth/getTeams', 'auth/registeredAsync'],
                // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
