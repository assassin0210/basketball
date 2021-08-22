import { createSlice } from "@reduxjs/toolkit";
import { login, registered } from "./authThunk";
import { IInitialStateAuth } from "../../api/dto/authTypes";

const initialState: IInitialStateAuth = {
  showError: false,
  token: localStorage.getItem("token"),
  isFetching: false,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    deleteToken(state) {
      state.token = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registered.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(registered.fulfilled, (state, { payload }) => {
      if (payload !== undefined) {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("avatarUrl", payload.avatarUrl);
        localStorage.setItem("name", payload.name);
        state.token = localStorage.getItem("token");
        state.showError = false;
        state.isFetching = false;
        state.isAuth = true;
      }
    });

    builder.addCase(registered.rejected, (state) => {
      state.showError = true;
    });

    builder.addCase(login.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload !== undefined) {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("avatarUrl", payload.avatarUrl);
        localStorage.setItem("name", payload.name);
        state.token = localStorage.getItem("token");
        state.showError = false;
        state.isFetching = false;
        state.isAuth = true;
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.showError = true;
    });
  },
});

export const autSliceConst = authSlice.reducer;
export const { deleteToken } = authSlice.actions;
