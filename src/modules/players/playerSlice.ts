import { createSlice} from "@reduxjs/toolkit";
import {getPlayer, getPlayers, getPositions} from "./playerThunk";



const initialState = {
    data: [
        {
            name: '',
            number: 0,
            position: '',
            team: 0,
            birthday: '',
            height: 0,
            weight: 0,
            avatarUrl: '',
            id: 0
        }
    ],
    count: 0,
    page: 0,
    size: 0,
    positions: [],
    isFetching: false,
    currentPlayer: {
        name: '',
        number: 0,
        position: '',
        team: 0,
        birthday: '',
        height: 0,
        weight: 0,
        avatarUrl: '',
        id: 0,
        teamName: ''

    },
}


export const playerSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setPlayers(state, action) {
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.data = action.payload.data
        },
        setPositions(state, action) {
            console.log(action.payload)
            state.positions = action.payload
        },
        setCurrentPlayer(state, action) {
            state.currentPlayer = action.payload
        },


    },
    extraReducers: builder => {
        builder.addCase(getPositions.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getPositions.fulfilled, (state, action) => {
            state.isFetching = false
        })
        builder.addCase(getPlayers.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getPlayers.fulfilled, (state, action) => {
            state.isFetching = false
        })
        builder.addCase(getPlayer.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getPlayer.fulfilled, (state, action) => {
            state.isFetching = false
        })

    },
})

export const PlayersSliceConst = playerSlice.reducer

export const {setPositions, setPlayers, setCurrentPlayer} = playerSlice.actions;

