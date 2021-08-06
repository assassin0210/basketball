import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../API/API";


export const registered = createAsyncThunk(

        'auth/registered',
        async function (data, {dispatch}) {
            try {
                const response = await instance.post('/api/Auth/SignUp', {
                    "userName": data.userName,
                    "login": data.login,
                    "password": data.password
                })
                debugger
                console.log(response)
                dispatch(register())

            } catch {

            }
        }
)


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        ProblemDetails: null,
        LoginResult: null,
        ChangeUser: null,
        isRegister: false,
        isAuth: false,
        token: null,


    },
    reducers: {
        register(state, action) {
            state.auth = !state.auth
        },

    },
    extraReducers: {}

})

export const {register,} = authSlice.actions;

export default authSlice.reducer
