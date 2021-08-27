import { createSlice } from "@reduxjs/toolkit";
import { IInitialStatePlayer } from "../../api/dto/playerTypes";
import {
  getPlayer,
  getPlayerFromSelect,
  getPlayers,
  getPositions,
  updatePlayer,
} from "./playerThunk";
import { updateTeam } from "../teams/teamThunk";

const initialState: IInitialStatePlayer = {
  data: [],
  count: 0,
  page: 1,
  size: 6,
  resultSearch: "",
  optionsData: [],
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
  name: "player",
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
    builder.addCase(getPlayerFromSelect.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getPlayerFromSelect.fulfilled, (state, { payload }) => {
      if (payload !== undefined) {
        for (let player of payload.data) {
          state.optionsData.push(player);
        }
        state.isFetching = false;
      }
    });
    builder.addCase(getPlayerFromSelect.rejected, (state, action) => {
      state.isFetching = false;
    });
    builder.addCase(updatePlayer.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(updatePlayer.fulfilled, (state, { payload }) => {
      if (payload === undefined) {
        state.error = true;
      } else {
        state.currentPlayer.name = payload.name;
        state.currentPlayer.number = payload.number;
        state.currentPlayer.weight = payload.weight;
        state.currentPlayer.team = payload.team;
        state.currentPlayer.position = payload.position;
        state.currentPlayer.birthday = payload.birthday;
        state.currentPlayer.height = payload.height;
        state.currentPlayer.id = payload.id;
        state.currentPlayer.avatarUrl = payload.avatarUrl;
        state.isFetching = false;
      }
    });
  },
});

export const PlayersSliceConst = playerSlice.reducer;

export const { setSizePlayers, setPagePlayers, setResultSearchStatePlayers } =
  playerSlice.actions;
