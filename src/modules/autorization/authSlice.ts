import {createSlice} from "@reduxjs/toolkit";
import {RootStateOrAny} from "react-redux";
import {login, registered} from "./authThunk";
import {authSliceType} from "../../api/dto/types";


const initialState = {} as authSliceType


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authFailed(state: RootStateOrAny,) {
            state.showError = true
        },
        isLoading(state: RootStateOrAny,) {
            state.isLoading = true
        },
        setToken(state, action) {
            state.token = action.payload
        },
        deleteToken(state) {
            state.token = ''
        }
    },
    extraReducers: builder => {

        builder.addCase(registered.fulfilled, (state, action) => {
            state.showError = false
            state.isFetching = false
        })
        builder.addCase(login.pending, (state , action) => {

        })
        builder.addCase(login.fulfilled, (state, action) => {

            state.showError = false
            state.isAuth = true;
        })
    },
})

export const autSliceConst = authSlice.reducer
export const {authFailed, setToken, deleteToken, isLoading} = authSlice.actions;

