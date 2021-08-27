import { createSlice } from "@reduxjs/toolkit";
import { IInitialStatePlayer } from "../../api/dto/playerTypes";
import { getPlayer, getPlayers, getPositions } from "./playerThunk";

const initialState: IInitialStatePlayer = {
  data: [],
  count: 0,
  page: 0,
  size: 0,
  resultSearch: "",
  positions: [],
  isFetching: false,
  error: false,
  currentPlayer: {
    name: "",
    number: 0,
    position: "",
    team: 0,
    birthday: "",
    height: 0,
    weight: 0,
    avatarUrl: "",
    id: 0,
  },
};

export const playerSlice = createSlice({
  name: "teams",
  initialState: initialState,
  reducers: {
    setSizePlayers(state, action) {
      state.size = action.payload;
    },
    setPagePlayers(state, action) {
      state.page = action.payload;
    },
    setResultSearchStatePlayers(state, action) {
      state.resultSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPositions.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.positions = action.payload;
      state.isFetching = false;
    });
    builder.addCase(getPositions.rejected, (state, action) => {
      //ошибка 404
    });

    builder.addCase(getPlayers.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getPlayers.fulfilled, (state, { payload }) => {
      if (payload === undefined) {
        state.error = true;
      } else {
        state.data = payload.data;
        state.count = payload.count;
        state.page = payload.page;
        state.size = payload.size;
        state.isFetching = false;
      }
    });
    builder.addCase(getPlayers.rejected, (state, action) => {
      //ошибка 404
    });

    builder.addCase(getPlayer.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getPlayer.fulfilled, (state, action: any) => {
      state.currentPlayer = action.payload;
      state.isFetching = false;
    });
    builder.addCase(getPlayer.rejected, (state, action) => {
      state.isFetching = false;
    });
  },
});

export const PlayersSliceConst = playerSlice.reducer;

export const { setSizePlayers, setPagePlayers, setResultSearchStatePlayers } =
  playerSlice.actions;
