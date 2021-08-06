import {createAction, createReducer } from "@reduxjs/toolkit";
import { authApi, signUpDataType } from "../../API/API";
import {UnpackNestedValue} from "react-hook-form";


const initialState={
    isAuth: false,
    isRegistered: false,
    name: null as string | null,
    token: null as string | null,
}

export type InitialStateType = typeof initialState

export const SING_UP: any = createAction('SING_UP')
export const SING_IN: any = createAction('SING_IN')


export const testDeb=()=>{
    console.log('попал в редюсер')
}


export const getConfirmationAuthUser = (data:getConfirmationAuthUserType) => async (dispatch: any) => {
    console.log('попал в санку')
    try {
        let response = await authApi.singUp(data)
        if (response.status === 200) {
            dispatch(SING_UP(response.data));
        }
    } catch (error) {
        console.log(error)
    }

};

type getConfirmationAuthUserType = {
    userName: string,
    login: string,
    password: string,
    doublePass: string,
    policy: boolean,
};



type getAuthUserDataType = {
    login: string
    password: string
}

export const getAuthUserData = (data: getAuthUserDataType) => async (dispatch: any) => {
    try {
        let response = await authApi.singIn(data)
        if (response.status === 200) {
            dispatch(SING_IN(response.data))
        }
    } catch (error) {
        console.log(error)
    }
};



export default createReducer(initialState,{
    [SING_UP]: function (state, action) {
        state.isRegistered = true
    },
    [SING_IN]:function (state, action) {
        state.isAuth = true
        state.name = action.payload.name
        state.token = action.payload.token
    },
})

