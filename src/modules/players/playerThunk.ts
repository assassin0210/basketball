import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/baseRequest";
import {
  IGetPlayersType,
  IInitialStatePlayer,
  IPlayerInfo,
} from "../../api/dto/playerTypes";
import { AddPlayersFormType } from "../../api/dto/types";
import { AxiosResponse } from "axios";
import { iGetTeamType } from "../../api/dto/teamTypes";

export const getPositions = createAsyncThunk(
  "player/getPositions",
  async function (_, { dispatch }) {
    try {
      const response = await instance.get("/api/Player/GetPositions", {
        headers: {
          accept: "*/*",
        },
      });
      return response.data;
    } catch {}
  }
);

export const getPlayers = createAsyncThunk(
  "player/getPlayers",
  async function (_, { dispatch, getState }) {
    const { players } = getState() as { players: IInitialStatePlayer };
    try {
      const response: AxiosResponse<IGetPlayersType> = await instance.get(
        "/api/Player/GetPlayers",
        {
          params: {
            Page: `${players.page}`,
            PageSize: `${players.size}`,
            Name: `${players.resultSearch}`,
          },
        }
      );
      return response.data;
    } catch {}
  }
);

export const addImagePlayer = createAsyncThunk(
  "player/addImagePlayer",
  async function (data: IPlayerInfo, { dispatch }) {
    try {
      // @ts-ignore
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await instance.post<string>(
        "/api/Image/SaveImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const player: IPlayerInfo = {
        name: `${data.name}`,
        number: data.number,
        position: `${data.position}`,
        team: data.team,
        birthday: `${data.birthday}`,
        height: data.height,
        weight: data.weight,
        id: data.id,
        avatarUrl: `http://dev.trainee.dex-it.ru${response.data}`,
      };
      console.log(player);
      data.id ? dispatch(updatePlayer(player)) : dispatch(addPlayer(player));
    } catch {}
  }
);

export const addPlayer = createAsyncThunk(
  "player/addPlayer",
  async function (player: IPlayerInfo, { dispatch }) {
    try {
      const response = await instance.post("/api/Player/Add", {
        name: `${player.name}`,
        number: player.number,
        position: `${player.position}`,
        team: player.team,
        birthday: `${player.birthday}`,
        height: player.height,
        weight: player.weight,
        avatarUrl: `${player.avatarUrl}`,
      });
      return response.data;
    } catch {}
  }
);

export const getPlayer = createAsyncThunk(
  "player/getPlayer",
  async function (id: number, { dispatch }) {
    try {
      const response = await instance.get<IPlayerInfo>("/api/Player/Get", {
        params: {
          id: id,
        },
      });

      return response.data;
    } catch {}
  }
);

export const getPlayerFromSelect = createAsyncThunk(
  "player/getPlayerFromSelect",
  async function (id: number, { dispatch }) {
    try {
      const response: AxiosResponse<IGetPlayersType> = await instance.get(
        "/api/Player/GetPlayers",
        {
          params: {
            TeamIds: id,
          },
        }
      );
      return response.data;
    } catch {}
  }
);

export const deletePlayer = createAsyncThunk(
  "player/deletePlayer",
  async function (id: number, { dispatch }) {
    try {
      const response = await instance.delete<IPlayerInfo>(
        "/api/Player/Delete",
        {
          params: {
            id: id,
          },
        }
      );
      return response.data;
    } catch {}
  }
);

export const getTeamsSelect = createAsyncThunk(
  "player/getTenOptions",

  async function (_, { dispatch, getState }) {
    try {
      const response = await instance.get<iGetTeamType>(`/api/Team/GetTeams`, {
        params: {
          PageSize: 10,
        },
      });
      return response.data;
    } catch {}
  }
);

export const updatePlayer = createAsyncThunk(
  "player/updatePlayer",
  async function (player: IPlayerInfo, { dispatch }) {
    try {
      const response = await instance.put<IPlayerInfo>("/api/Player/Update", {
        name: `${player.name}`,
        number: +player.number,
        position: `${player.position}`,
        team: player.team,
        birthday: `${player.birthday}`,
        height: player.height,
        weight: player.weight,
        avatarUrl: player.avatarUrl,
        id: player.id,
      });
      return response.data;
    } catch {}
  }
);
