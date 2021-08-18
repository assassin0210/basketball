import {createAsyncThunk} from "@reduxjs/toolkit";
import {onSubmitDataFormType, UserType} from "../../api/dto/types";
import {instance} from "../../api/baseRequest";

export const registered = createAsyncThunk(
    'auth/registeredAsync',
    async function (data: onSubmitDataFormType, {rejectWithValue: any, dispatch}) {
        try {
            const response = await instance.post<UserType>('/api/Auth/SignUp', {
                "userName": data.userName,
                "login": data.login,
                "password": data.password
            })
            if (response.statusText === 'OK') {
                localStorage.setItem('token', (response.data.token))
                localStorage.setItem('avatarUrl', (response.data.avatarUrl))
                localStorage.setItem('name', (response.data.name))
            }
        } catch {
        }
    }
)


export const login = createAsyncThunk(
    'auth/login',
    async function (data: onSubmitDataFormType, {dispatch}) {
        try {
            const response = await instance.post<UserType>('/api/Auth/SignIn', {
                "login": data.login,
                "password": data.password
            })
            if (response.statusText === 'OK') {
                localStorage.setItem('token', (response.data.token))
                localStorage.setItem('avatarUrl', (response.data.avatarUrl))
                localStorage.setItem('name', (response.data.name))

            }
        } catch {
        }
    }
)
