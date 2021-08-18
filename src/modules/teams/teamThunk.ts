import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../api/baseRequest";
import { iGetTeamType } from "../../api/dto/teamTypes";
import {AddTeamIType, addTeamType,responsAddTeam, TeamType} from "../../api/dto/types";

export const getTeams = createAsyncThunk(
    'teams/teams',
    async function (_, {dispatch, getState}) {
                try {
            const response = await instance.get<iGetTeamType>('/api/Team/GetTeams', {})

                    return response.data


        } catch {
        }
    }
)

export const addImage = createAsyncThunk(
    'teams/addLogoTeam',
    async function (data: AddTeamIType, {dispatch}) {
        try {
            const file = data.file
            const formData = new FormData()
            formData.append("file", file[0])
            const response = await instance.post<string>('/api/Image/SaveImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            !data.id ? dispatch(addTeam(team)) : dispatch(updateTeam(team))

        } catch {
        }
    }
)

export const addTeam = createAsyncThunk(
    'teams/addFullTeam',
    async function (team: TeamType, {dispatch}) {
        try {
            const response = await instance.post<addTeamType>('/api/Team/Add', {
                    "name": `${team.name}`,
                    "foundationYear": team.foundationYear,
                    "division": `${team.division}`,
                    "conference": `${team.conference}`,
                    "imageUrl": `${team.imageUrl}`
                },
            )

        } catch {

        }
    }
)


export const getTeam = createAsyncThunk(
    'teams/getTeam',
    async function (id: number, {dispatch}) {
        try {
            const response: responsAddTeam = await instance.get<addTeamType>('/api/Team/Get', {
                params: {
                    id: id
                }
            })
            return response.data
        } catch {
        }
    }
)


export const deleteTeam = createAsyncThunk(
    'teams/deleteTeam',
    async function (id: number, {dispatch}) {
        try {
            const response: responsAddTeam = await instance.delete<addTeamType>('/api/Team/Delete', {
                params: {
                    id: id
                }
            })
            return response.data
        } catch {
        }
    }
)

export const updateTeam = createAsyncThunk(
    'teams/updateTeam',
    async function (team: TeamType, {dispatch}) {
        try {
            const response = await instance.put<addTeamType>('/api/Team/Update', {
                    "name": `${team.name}`,
                    "foundationYear": team.foundationYear,
                    "division": `${team.division}`,
                    "conference": `${team.conference}`,
                    "imageUrl": `${team.imageUrl}`,
                    "id": team.id
                },
            )
            return response.data
        } catch {

        }
    }
)

