import { createSlice} from "@reduxjs/toolkit";
import {addImage, addTeam, getTeam, getTeams, updateTeam} from "./teamThunk";




const initialState = {
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
    size: 0,
    isFetching: false,
    status: 0,
    currentTeam: {
        name: '',
        foundationYear: 0,
        division: '',
        conference: '',
        imageUrl: '',
        id: 0
    }


}


export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeams(state: typeof initialState, action) {
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.data = action.payload.data
        },

        setCurrentTeam(state, action) {
            state.currentTeam.name = action.payload.name
            state.currentTeam.foundationYear = action.payload.foundationYear
            state.currentTeam.division = action.payload.division
            state.currentTeam.conference = action.payload.conference
            state.currentTeam.imageUrl = action.payload.imageUrl
            state.currentTeam.id = action.payload.id
        }
    },
    extraReducers: builder => {

        builder.addCase(getTeams.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getTeams.fulfilled, (state, action) => {
            state.isFetching = false
        })

        builder.addCase(addImage.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(addTeam.fulfilled, (state, action) => {
            state.isFetching = false
        })
        builder.addCase(getTeam.pending, (state, action) => {
            state.isFetching = true
            state.status = 2
        })
        builder.addCase(getTeam.fulfilled, (state, action) => {
            state.isFetching = false
            state.status = 0
        })
        builder.addCase(updateTeam.fulfilled, (state, action) => {
            state.isFetching = false

        })
    },
})

export const TeamsSliceConst = teamsSlice.reducer

export const {setTeams, setCurrentTeam} = teamsSlice.actions;

