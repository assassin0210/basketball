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
  async function (data: AddPlayersFormType, { dispatch }) {
    try {
      const file = data.file;
      const formData = new FormData();
      if (file) {
        return formData.append("file", file[0]);
      }

      const response = await instance.post("/api/Image/SaveImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const player: AddPlayersFormType = {
        name: `${data.name}`,
        number: data.number,
        position: `${data.position}`,
        team: data.team,
        birthday: `${data.birthday}`,
        height: data.height,
        weight: data.weight,
        avatarUrl: `http://dev.trainee.dex-it.ru${response.data}`,
      };
      dispatch(addPlayer(player));
    } catch {}
  }
);

export const addPlayer = createAsyncThunk(
  "player/addPlayer",
  async function (player: AddPlayersFormType, { dispatch }) {
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
      console.log(response.data);
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
      /*?Page=${teams.page}&PageSize=${teams.size}*/
      return response.data;
    } catch {}
  }
);

/*
export const updatePlayer = createAsyncThunk(
    'player/updatePlayer',
    async function (team: TeamType, {dispatch}) {
        try {
            const response = await instance.put<IPlayerInfo>('/api/Team/Update', {
                "name": `${team.name}`,
                "foundationYear": team.foundationYear,
                "division": `${team.division}`,
                "conference": `${team.conference}`,
                "imageUrl": `${team.imageUrl}`,
                "id": team.id
            },)
            return response.data

        } catch {

        }
    }
)
*/
