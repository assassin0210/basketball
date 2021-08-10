import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { AddTeamIType } from "../../ui/allTeams/addTeamsForm/addTeamsForm";
import { instance, token} from "../../utils/utils";
import {log} from "util";



export const getTeams = createAsyncThunk(
    'teams/getTeams',
    async function (_, {dispatch}) {
        try {
            const response = await instance.get('/api/Team/GetTeams', {
                headers: {
                    'Authorization': `Bearer  ${token}`
                }
            })
            dispatch(setTeams(response.data))
        } catch {

        }
    }
)

export const addImage = createAsyncThunk(
    'teams/addLogoTeam',

    async function (data :AddTeamIType, {dispatch}) {
        try {


            const file = data.file
            const formData = new FormData()
            formData.append("file", file[0])
            const response = await instance.post('/api/Image/SaveImage',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer  ${token}`
                }
            })


        } catch {

        }
    }
)



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

export const teamsSlice = createSlice({
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
        extraReducers:builder => {
            builder.addCase(getTeams.pending,(state,action)=>{
                console.log('загружаюсь')
            })
            builder.addCase(getTeams.fulfilled,(state,action)=>{
                console.log('загрузился ')
            })
        },
})

export const {setTeams,} = teamsSlice.actions;
export default teamsSlice.reducer
