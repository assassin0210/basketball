import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../utils/utils";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {examinationAuth} from "../../utils/utils";
import {onSubmitDataFormType, userResponse } from "../../api/dto/types";



export const registered = createAsyncThunk(
    'auth/registeredAsync',
    async function (data: onSubmitDataFormType, {rejectWithValue:any, dispatch}) {
        try {
            const response = await instance.post('/api/Auth/SignUp', {
                "userName": data.userName,
                "login": data.login,
                "password": data.password
            })
            if (response.statusText === 'OK') {
                localStorage.removeItem('currentUser')
                JSON.stringify(localStorage.setItem('currentUser', JSON.stringify(response.data)))
                dispatch(registration(response.data))

            } else {
                examinationAuth(false)
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
                localStorage.removeItem('currentUser')
                JSON.stringify(localStorage.setItem('currentUser', JSON.stringify(response.data)))
                dispatch(registration(response.data))
            } else {
                examinationAuth(false)
            }
        } catch {
            dispatch(authFailed())
        }
    }
)




const initialState = {
    user: {
        name: null,
        avatarUrl:  null,
        token:  null,
    } as userResponse,
    showError: false,
    ChangeUser: null,
    isRegister: false,
    isAuth: null,
    token: null ,
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registration(state: any, action: PayloadAction<string | null | undefined | object>) {
            state.isAuth = true;
            state.user = action.payload
            state.showError = false
        },
        logOut(state: any, action: PayloadAction) {
            localStorage.removeItem('currentUser')
            state.isAuth = false
        },
        authFailed(state: any, action: PayloadAction<string | null | undefined | object>) {
            state.showError = true
        },
        isLoading(state:any,action){
            state.isLoading = true
        }
    },
    extraReducers:builder => {
        builder.addCase(registered.pending,(state,action)=>{
        })
        builder.addCase(registered.fulfilled,(state,action)=>{
            state.isLoading = false
        })
    },
})


export const {registration, logOut, authFailed,isLoading} = authSlice.actions;

export default authSlice.reducer
