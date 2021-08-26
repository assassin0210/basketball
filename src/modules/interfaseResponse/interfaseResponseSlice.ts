import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateInterface } from "../../api/dto/interfaceResponse";

const initialState: IInitialStateInterface = {
  visibleMenu: true,
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
  },
  extraReducers: {},
});

export const interfaceResponseConst = interfaceResponseSlice.reducer;
export const { toggleMenu, closeMenu } = interfaceResponseSlice.actions;
