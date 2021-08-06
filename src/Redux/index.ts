import authReducer from './reducers/authReducer'
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";


const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});


export const store = configureStore({

        reducer: {
            auth:authReducer,
        },
        middleware,
        devTools: process.env.NODE_ENV !== 'production',


    }
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
