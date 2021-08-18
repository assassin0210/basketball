import {createSlice} from "@reduxjs/toolkit";
import {addImage, addTeam, getTeam, getTeams, updateTeam} from "./teamThunk";




const initialState = {
    data:{},
    count: 0,
    page: 0,
    size: 0,
    isFetching: false,
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
    },
    extraReducers: builder => {

        builder.addCase(getTeams.pending, (state:typeof initialState, action) => {
            state.isFetching = true
        })
        builder.addCase(getTeams.fulfilled, (state, action:any) => {
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.data = action.payload.data
            state.isFetching = false
        })
        builder.addCase(getTeams.rejected, (state, action) => {
            //показать страницу 404
        })


        builder.addCase(addImage.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(addTeam.fulfilled, (state, action) => {
            state.isFetching = false
        })
        builder.addCase(addTeam.rejected, (state, action) => {
            //показать страницу 404
        })



        builder.addCase(getTeam.pending, (state, action) => {
            state.isFetching = true

        })
        builder.addCase(getTeam.fulfilled, (state, action:any) => {
            state.currentTeam.name = action.payload.name
            state.currentTeam.foundationYear = action.payload.foundationYear
            state.currentTeam.division = action.payload.division
            state.currentTeam.conference = action.payload.conference
            state.currentTeam.imageUrl = action.payload.imageUrl
            state.currentTeam.id = action.payload.id
            state.isFetching = false

        })
        builder.addCase(getTeam.rejected, (state, action) => {
            state.isFetching = false

        })



        builder.addCase(updateTeam.fulfilled, (state, action) => {
            state.isFetching = false

        })
    },
})

export const TeamsSliceConst = teamsSlice.reducer

export const {} = teamsSlice.actions;

