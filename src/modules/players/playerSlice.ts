import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance, token} from "../../utils/utils";
import {AddTeamIType, addTeamType, getTeamType, PlayersSliceType, responsAddTeam, TeamType} from "../../api/dto/types";



export const getPlayers = createAsyncThunk(
    'player/getPlayers',
    async function (_, {dispatch}) {
        try {
            const response = await instance.get<getTeamType>('/api/Team/GetTeams', {
                headers: {
                    'Authorization': `Bearer  ${token()}`
                }
            })


        } catch {

        }
    }
)

export const addImagePlayer = createAsyncThunk(
    'player/addImagePlayer',
    async function (data: AddTeamIType, {dispatch}) {
        try {
            const file = data.file
            const formData = new FormData()
            formData.append("file", file[0])
            const response = await instance.post<string>('/api/Image/SaveImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer  ${token()}`
                }
            })
            const team: TeamType = {
                name: `${data.name}`,
                foundationYear: data.foundationYear,
                division: `${data.division}`,
                conference: `${data.conference}`,
                imageUrl: `http://dev.trainee.dex-it.ru${response.data}`,
                id: data.id
            }



        } catch {
        }
    }
)

export const addPlayer = createAsyncThunk(
    'player/addPlayer',
    async function (team: TeamType, {dispatch}) {
        try {
            const response = await instance.post<addTeamType>('/api/Team/Add', {
                "name": `${team.name}`,
                "foundationYear": team.foundationYear,
                "division": `${team.division}`,
                "conference": `${team.conference}`,
                "imageUrl": `${team.imageUrl}`
            }, {
                headers: {
                    'Authorization': `Bearer  ${token()}`
                }
            })

        } catch {

        }
    }
)


export const getPlayer = createAsyncThunk(
    'player/getPlayer',
    async function (id: number, {dispatch}) {
        try {
            const response: responsAddTeam = await instance.get<addTeamType>('/api/Team/Get', {
                headers: {
                    'Authorization': `Bearer  ${token()}`
                },
                params: {
                    id: id
                }
            })

        } catch {
        }
    }
)


export const deletePlayer = createAsyncThunk(
    'player/deletePlayer',
    async function (id: number, {dispatch}) {
        try {
            const response: responsAddTeam = await instance.delete<addTeamType>('/api/Team/Delete', {
                headers: {
                    'Authorization': `Bearer  ${token()}`
                },
                params: {
                    id: id
                }
            })
        } catch {
        }
    }
)

export const updatePlayer = createAsyncThunk(
    'player/updatePlayer',
    async function (team: TeamType, {dispatch}) {
        try {


            const response = await instance.put<addTeamType>('/api/Team/Update', {
                "name": `${team.name}`,
                "foundationYear": team.foundationYear,
                "division": `${team.division}`,
                "conference": `${team.conference}`,
                "imageUrl": `${team.imageUrl}`,
                "id": team.id
            }, {
                headers: {
                    'Authorization': `Bearer  ${token()}`
                }
            })

        } catch {

        }
    }
)


const initialState = {} as PlayersSliceType


export const playerSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {

    },
    extraReducers: builder => {



    },
})

export const PlayersSliceConst  = playerSlice.reducer

export const {} = playerSlice.actions;

