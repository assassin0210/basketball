import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../utils/utils";
import {authSliceType, onSubmitDataFormType, UserType} from "../../api/dto/types";
import {RootStateOrAny} from "react-redux";


export const registered = createAsyncThunk(
    'auth/registeredAsync',
    async function (data: onSubmitDataFormType, {rejectWithValue: any, dispatch}) {
        try {
            const response = await instance.post<UserType>('/api/Auth/SignUp', {
                "userName": data.userName,
                "login": data.login,
                "password": data.password
            })
             if (response.statusText === 'OK')  {
                localStorage.setItem('token', (response.data.token))
                localStorage.setItem('avatarUrl', (response.data.avatarUrl))
                localStorage.setItem('name', (response.data.name))

            }
        } catch (error) {
            if (error.message.toString() === 'Request failed with status code 409') {
                dispatch(authFailed())
            }
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
            dispatch(authFailed())
        }
    }
)


const initialState = {} as authSliceType



const  authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        logOut(state: RootStateOrAny, ) {
            localStorage.clear()
            state.isAuth = false
        },
        authFailed(state: RootStateOrAny,) {
            state.showError = true
        },
        isLoading(state: RootStateOrAny, ) {
            state.isLoading = true
        }
    },
    extraReducers: builder => {
        builder.addCase(registered.pending, (state) => {
            state.isFetching= true
            localStorage.clear()

        })
        builder.addCase(registered.fulfilled, (state :RootStateOrAny, action) => {
            state.isAuth = true
            state.user =state.user.push(action.payload)
            state.showError = false
            state.isFetching = false
        })
        builder.addCase(login.pending, (state :RootStateOrAny, action) => {

        })
        builder.addCase(login.fulfilled, (state :RootStateOrAny, action) => {

            state.showError = false
            state.isAuth = true;
        })
    },
})

export const autSliceConst = authSlice.reducer


export const { logOut, authFailed, isLoading} = authSlice.actions;

