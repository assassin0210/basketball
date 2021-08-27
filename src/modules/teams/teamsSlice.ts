import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateTeam } from "../../api/dto/teamTypes";
import { addImage, addTeam, getTeam, getTeams, updateTeam } from "./teamThunk";

const initialState: IInitialStateTeam = {
  data: [],
  count: 0,
  page: 0,
  size: 0,
  error: false,
  isFetching: false,
  resultSearch: "",
  currentTeam: {
    name: "",
    foundationYear: 0,
    division: "",
    conference: "",
    imageUrl: "",
    id: 0,
  },
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState: initialState,
  reducers: {
    setSizeAction(state, action) {
      state.size = action.payload;
    },
    setPageAction(state, action) {
      state.page = action.payload;
    },
    setResultSearchState(state, action) {
      state.resultSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeams.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getTeams.fulfilled, (state, { payload }) => {
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

    builder.addCase(addImage.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(addTeam.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(getTeam.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getTeam.fulfilled, (state, { payload }) => {
      if (payload === undefined) {
        state.error = true;
      } else {
        state.currentTeam.name = payload.name;
        state.currentTeam.foundationYear = payload.foundationYear;
        state.currentTeam.division = payload.division;
        state.currentTeam.conference = payload.conference;
        state.currentTeam.imageUrl = payload.imageUrl;
        state.currentTeam.id = payload.id;
        state.isFetching = false;
      }
    });
    builder.addCase(getTeam.rejected, (state, action) => {
      state.isFetching = false;
    });
    builder.addCase(updateTeam.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(updateTeam.fulfilled, (state, { payload }) => {
      if (payload === undefined) {
        state.error = true;
      } else {
        state.currentTeam.name = payload.name;
        state.currentTeam.foundationYear = payload.foundationYear;
        state.currentTeam.division = payload.division;
        state.currentTeam.conference = payload.conference;
        state.currentTeam.imageUrl = payload.imageUrl;
        state.currentTeam.id = payload.id;
        state.isFetching = false;
      }
    });
  },
});

export const TeamsSliceConst = teamsSlice.reducer;

export const { setSizeAction, setPageAction, setResultSearchState } =
  teamsSlice.actions;
