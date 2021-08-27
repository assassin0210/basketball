import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/baseRequest";
import { iGetTeamType } from "../../api/dto/teamTypes";
import { IInitialStateInterface } from "../../api/dto/interfaceResponse";

export const getTeamsSelect = createAsyncThunk(
  "player/getTenOptions",
  async function (_, { dispatch, getState }) {
    const { interfaceData } = getState() as {
      interfaceData: IInitialStateInterface;
    };
    try {
      const response = await instance.get<iGetTeamType>(`/api/Team/GetTeams`, {
        params: {
          Page: `${interfaceData.page}`,
          PageSize: `${interfaceData.size}`,
        },
      });
      return response.data;
    } catch {}
  }
);
