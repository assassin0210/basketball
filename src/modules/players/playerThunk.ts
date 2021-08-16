import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../api/baseRequest";
import {AddPlayersFormType, addTeamType, PositionsType, responsAddTeam, TeamType} from "../../api/dto/types";
import {setCurrentPlayer, setPlayers, setPositions} from "./playerSlice";

export const getPositions = createAsyncThunk(
    'player/getPositions',
    async function (_, {dispatch}) {
        try {
            const response = await instance.get<PositionsType>('/api/Player/GetPositions', {
                headers: {
                    'accept': '*/*',
                }
            })
            dispatch(setPositions(response.data))

        } catch {

        }
    }
)


export const getPlayers = createAsyncThunk(
    'player/getPlayers',
    async function (_, {dispatch}) {
        try {
            const response = await instance.get<PositionsType>('/api/Player/GetPlayers', {
            })

            dispatch(setPlayers(response.data))


        } catch {

        }
    }
)


export const addImagePlayer = createAsyncThunk(
    'player/addImagePlayer',
    async function (data: AddPlayersFormType, {dispatch}) {
        try {
            const file = data.file
            const formData = new FormData()
            formData.append("file", file[0])
            const response = await instance.post<string>('/api/Image/SaveImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            const player: AddPlayersFormType = {
                name: `${data.name}`,
                number: data.number,
                position: `${data.position}`,
                team: data.team,
                birthday: `${data.birthday}`,
                height: data.height,
                weight: data.weight,
                avatarUrl: `http://dev.trainee.dex-it.ru${response.data}`,
            }
            dispatch(addPlayer(player))
            console.log(player)


        } catch {
        }
    }
)

export const addPlayer = createAsyncThunk(
    'player/addPlayer',
    async function (player: AddPlayersFormType, {dispatch}) {
        try {
            const response = await instance.post('/api/Player/Add', {
                'name': `${player.name}`,
                'number': player.number,
                'position': `${player.position}`,
                'team': player.team,
                'birthday': `${player.birthday}`,
                'height': player.height,
                'weight': player.weight,
                'avatarUrl': `${player.avatarUrl}`,
            },)

        } catch {

        }
    }
)


export const getPlayer = createAsyncThunk(
    'player/getPlayer',
    async function (id: number, {dispatch}) {
        try {
            const response: responsAddTeam = await instance.get<addTeamType>('/api/Player/Get', {
                params: {
                    id: id
                }
            })
            dispatch(setCurrentPlayer(response.data))
        } catch {
        }
    }
)


export const deletePlayer = createAsyncThunk(
    'player/deletePlayer',
    async function (id: number, {dispatch}) {
        try {
            const response: responsAddTeam = await instance.delete<addTeamType>('/api/Player/Delete', {
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
            }, )

        } catch {

        }
    }
)
