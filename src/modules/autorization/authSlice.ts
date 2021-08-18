import {createSlice} from "@reduxjs/toolkit";
import {login, registered} from "./authThunk";
import {authSliceType} from "../../api/dto/types";


const initialState = {
    showError: false,
    token: localStorage.getItem('token'),
    isFetching: false,
    isAuth:false

}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        deleteToken(state) {
            state.token = null
            state.isAuth = false
        }
    },
    extraReducers: builder => {
        builder.addCase(registered.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(registered.fulfilled, (state, action) => {
            state.token =   localStorage.getItem('token')
            state.showError = false
            state.isFetching = false
            state.isAuth = true
        })

        builder.addCase(registered.rejected, (state, action) => {
            state.showError = true
        })




        builder.addCase(login.pending, (state , action) => {
            state.isFetching = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.token =   localStorage.getItem('token')
            state.showError = false
            state.isFetching = false
            state.isAuth = true
        })
        builder.addCase(login.rejected, (state , action) => {
            state.showError = true
        })

    },
})

export const autSliceConst = authSlice.reducer
export const { deleteToken} = authSlice.actions;

