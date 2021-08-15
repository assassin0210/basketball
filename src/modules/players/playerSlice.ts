import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance, token} from "../../utils/utils";
import {
    AddPlayersFormType,
    addTeamType, CurrentPlayer,
    PositionsType,
    responsAddTeam,
    TeamType
} from "../../api/dto/types";


export const getPositions = createAsyncThunk(
    'player/getPositions',
    async function (_, {dispatch}) {
        try {
            const response = await instance.get<PositionsType>('/api/Player/GetPositions', {
                headers: {
                    'Authorization': `Bearer  ${token()}`,
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
                headers: {
                    'Authorization': `Bearer  ${token()}`
                }
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
                    'Authorization': `Bearer  ${token()}`
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
            const response: responsAddTeam = await instance.get<addTeamType>('/api/Player/Get', {
                headers: {
                    'Authorization': `Bearer  ${token()}`
                },
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


const initialState = {
    data: [
        {
            name: '',
            number: 0,
            position: '',
            team: 0,
            birthday: '',
            height: 0,
            weight: 0,
            avatarUrl: '',
            id: 0
        }
    ],
    count: 0,
    page: 0,
    size: 0,
    positions: [],
    isFetching: false,
    currentPlayer: {
        name: '',
        number: 0,
        position: '',
        team: 0,
        birthday: '',
        height: 0,
        weight: 0,
        avatarUrl: '',
        id: 0,
        teamName: ''

    },
}


export const playerSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setPlayers(state, action) {
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.data = action.payload.data
        },
        setPositions(state, action) {
            console.log(action.payload)
            state.positions = action.payload
        },
        setCurrentPlayer(state, action) {
            state.currentPlayer = action.payload
        },


    },
    extraReducers: builder => {
        builder.addCase(getPositions.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getPositions.fulfilled, (state, action) => {
            state.isFetching = false
        })
        builder.addCase(getPlayers.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getPlayers.fulfilled, (state, action) => {
            state.isFetching = false
        })
        builder.addCase(getPlayer.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getPlayer.fulfilled, (state, action) => {
            state.isFetching = false
        })

    },
})

export const PlayersSliceConst = playerSlice.reducer

export const {setPositions, setPlayers, setCurrentPlayer} = playerSlice.actions;

