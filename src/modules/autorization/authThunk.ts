import {createAsyncThunk} from "@reduxjs/toolkit";
import {onSubmitDataFormType, UserType} from "../../api/dto/types";
import {instance} from "../../api/baseRequest";


export const registered = createAsyncThunk(
    'auth/registeredAsync',
    async function (data: onSubmitDataFormType, { dispatch}) {
        try {
            const response = await instance.post<UserType>('/api/Auth/SignUp', {
                "userName": data.userName,
                "login": data.login,
                "password": data.password
            })
            return response.data
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
                return response.data


            }
        } catch {
        }
    }
)
