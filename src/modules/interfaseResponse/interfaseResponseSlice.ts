import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateInterface } from "../../api/dto/interfaceResponse";
import { getTeamsSelect } from "../players/playerThunk";

const initialState: IInitialStateInterface = {
  visibleMenu: true,
  data: [],
  count: 0,
  page: 1,
  size: 10,
};

const interfaceResponseSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.visibleMenu = !state.visibleMenu;
    },
    closeMenu(state) {
      state.visibleMenu = true;
    },
    moreOptionsItSelect(state) {
      state.page = state.page + 10;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeamsSelect.pending, (state, action) => {});
    builder.addCase(getTeamsSelect.fulfilled, (state, { payload }) => {
      if (payload === undefined) {
      } else {
        state.data = payload.data;
        state.count = payload.count;
        state.page = payload.page;
        state.size = payload.size;
      }
    });
    builder.addCase(getTeamsSelect.rejected, (state, action) => {});
  },
});

export const interfaceResponseConst = interfaceResponseSlice.reducer;
export const { toggleMenu, closeMenu, moreOptionsItSelect } =
  interfaceResponseSlice.actions;
