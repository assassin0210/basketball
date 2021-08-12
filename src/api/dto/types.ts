import {store} from "../../core/redux/store";
import {persistStore} from "redux-persist";
import {rootReducer} from "../../core/redux/rootReducer";
import React from "react";


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const   persistor = persistStore(store)
export type RootStateType = ReturnType<typeof rootReducer>

export type RootReducerType = typeof rootReducer

export interface UserType {
    name: string
    avatarUrl: string
    token:string | null
}

export interface authSliceType {
    user: {
        name: string | null ,
        avatarUrl: string | null
        token: string | null
    },
    showError: boolean,
    ChangeUser: null | string,
    isRegister: boolean,
    isAuth?: boolean | null,
    token: string | null
    isFetching: boolean,
}

export interface userResponse{
    name: string | null,
    avatarUrl: string | null
    token: string | null

}

export type onSubmitDataFormType = {
    userName: string
    login: string
    password: string
    doublePass: string
}

export interface StateType{
    teams:teamsSliceType
    auth:authSliceType
}
export interface teamsSliceType {
    data: [
        {
            name?: string | null,
            foundationYear?: string | null,
            division?: string | null,
            conference?: string | null,
            imageUrl?: string | null,
            id?: string | null,
        }
    ],
    count: string | null,
    page: string | null,
    size: string | null,
    isFetching: boolean,
    currentTeam: null | number
}

export interface DataType{
    data:[{
        name?: string | null,
        foundationYear?: string | null,
        division?: string | null,
        conference?: string | null,
        imageUrl?: string | null,
        id?: string | null,
    }]
}

export type InputsSingIn = {
    login: string,
    password: string,
};

export type InputsSingUp = {
    userName: string,
    login: string,
    password: string,
    doublePass: string,
    policy: boolean,
};

export interface AddTeamIType {
    name: string;
    division: string;
    conference: string;
    foundationYear: number
    file: any

}


export type onSubmitDataFormTypes = {
    userName: string
    login: string
    password: string
    doublePass: string
}

export type AllPlayerPropType={
    teamsMod: boolean
}

export type AllTeamsPropType = {
    teamsMod: boolean
}

export type MenuPropType={
    toggleSetPlayersMod: ()=> void
    toggleSetTeamsMod: ()=> void
    teamsMod:boolean
    playersMod:boolean

}


export interface PropsType<T> {
    component: React.ElementType
    path: string
    exact? : boolean
    src?:boolean
    isAuth?: ()=> void | boolean| object |undefined
}
export type TeamType = {
    name: string
    foundationYear: number,
    division: string,
    conference: string,
    imageUrl: string
    id: number| string
}

export interface responsAddTeam{
    data: {
        "name": string,
        "foundationYear": number,
        "division": string,
        "conference": string,
        "imageUrl": string,
        "id": number
    };

}
