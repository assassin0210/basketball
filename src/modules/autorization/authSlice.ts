import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../utils/utils";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {onSubmitDataFormType, userResponse} from "../../api/dto/types";
import {RootStateOrAny} from "react-redux";


export const registered = createAsyncThunk(
    'auth/registeredAsync',
    async function (data: onSubmitDataFormType, {rejectWithValue: any, dispatch}) {
        try {
            const response = await instance.post('/api/Auth/SignUp', {
                "userName": data.userName,
                "login": data.login,
                "password": data.password
            })
            if (response.statusText === 'OK') {
                localStorage.clear()
                localStorage.setItem('token', (response.data.token))
                localStorage.setItem('avatarUrl', (response.data.avatarUrl))
                localStorage.setItem('name', (response.data.name))
                dispatch(registration(response.data))

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
            const response = await instance.post('/api/Auth/SignIn', {
                "login": data.login,
                "password": data.password
            })
            if (response.statusText === 'OK') {
                console.log(response.data)
                localStorage.clear()
                localStorage.setItem('token', (response.data.token))
                localStorage.setItem('avatarUrl', (response.data.avatarUrl))
                localStorage.setItem('name', (response.data.name))
                dispatch(registration(response.data))
            }
        } catch {
            dispatch(authFailed())
        }
    }
)


const initialState = {
    user: {
        name: null,
        avatarUrl: null,
        token: null,
    } as userResponse || Object || undefined,
    showError: false,
    ChangeUser: null,
    isRegister: false,
    isAuth: null,
    token: null,
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registration(state: RootStateOrAny, action: PayloadAction<string | null | undefined | object>) {
            state.isAuth = true;
            state.user = action.payload
            state.showError = false
        },
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
        builder.addCase(registered.pending, () => {
            localStorage.clear()
        })
        builder.addCase(registered.fulfilled, (state) => {
            state.isLoading = false
        })
    },
})


export const {registration, logOut, authFailed, isLoading} = authSlice.actions;
export default authSlice.reducer
