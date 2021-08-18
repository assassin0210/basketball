import {createSlice} from "@reduxjs/toolkit";
import {getPlayer, getPlayers, getPositions} from "./playerThunk";


const initialState = {
    data: {},
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
    reducers: {},
    extraReducers: builder => {
        /*  builder.addCase(getPositions.pending, (state, action) => {
              state.isFetching = true
          })
          builder.addCase(getPositions.fulfilled, (state, action:any) => {
              state.positions = action.payload
              state.isFetching = false
          })
          builder.addCase(getPositions.rejected, (state, action) => {
             //ошибка 404
          })
  */


        builder.addCase(getPlayers.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getPlayers.fulfilled, (state, action: any) => {
            state.data = action.payload.data
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.isFetching = false
        })
        builder.addCase(getPlayers.rejected, (state, action) => {
            //ошибка 404
        })


        builder.addCase(getPlayer.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getPlayer.fulfilled, (state, action: any) => {
            state.currentPlayer = action.payload
            state.isFetching = false
        })
        builder.addCase(getPlayer.rejected, (state, action) => {
            state.isFetching = false
        })

    },
})

export const PlayersSliceConst = playerSlice.reducer

export const {} = playerSlice.actions;

