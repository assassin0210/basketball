import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {currentUser, instance} from "../../utils/utils";
import {registration} from "./authSlice";



export const getTeams = createAsyncThunk(
    'auth/getTeams',
    async function (_, {dispatch}) {
        try {
            const response = await instance.get('/api/Team/GetTeams', {
                headers: {
                    'Authorization': `Bearer  ${currentUser.token}`
                }
            })

            dispatch(setTeams(response))

        } catch {

        }
    }
)

export interface teamsSliceType {
    data: [
        {
            name: string | null,
            foundationYear: string | null,
            division: string | null,
            conference: string | null,
            imageUrl: string | null,
            id: string | null,
        }
    ],
    count: string | null,
    page: string | null,
    size: string | null,
}

const initialState={
    data: [
        {
            name: '',
            foundationYear: 0,
            division: '',
            conference: '',
            imageUrl: '',
            id: 0
        }
    ],
    count: 0,
    page: 0,
    size: 0
}

const teamsSlice = createSlice({
    name:'teams',
    initialState,
    reducers:{
        setTeams(state:any,action:any){
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.data = action.payload.data

        },

    },
    extraReducers:{}
})

export const {setTeams,} = teamsSlice.actions;
export default teamsSlice.reducer
