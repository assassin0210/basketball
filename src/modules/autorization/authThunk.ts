import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/baseRequest";
import { onSubmitDataFormType, UserType } from "../../api/dto/authTypes";
import { RootState } from "../../api/dto/types";

export const registered = createAsyncThunk(
  "auth/registeredAsync",
  async function (data: onSubmitDataFormType, { dispatch, getState }) {
    try {
      const response = await instance.post<UserType>("/api/Auth/SignUp", {
        userName: data.userName,
        login: data.login,
        password: data.password,
      });
      return response.data;
    } catch {
      let state = getState() as RootState;
      state.auth.showError = true;
      state.auth.isFetching = false;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async function (data: onSubmitDataFormType, { dispatch, getState }) {
    try {
      const response = await instance.post<UserType>("/api/Auth/SignIn", {
        login: data.login,
        password: data.password,
      });
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch {
      let state = getState() as RootState;
      state.auth.showError = true;
      state.auth.isFetching = false;
    }
  }
);
