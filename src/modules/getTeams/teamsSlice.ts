import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance, token} from "../../utils/utils";
import {AddTeamIType, addTeamType, getTeamType, responsAddTeam, TeamType} from "../../api/dto/types";



export const getTeams = createAsyncThunk(
    'teams/getTeams',
    async function (_, {dispatch}) {
        try {

            const response = await instance.get<getTeamType>('/api/Team/GetTeams', {
                headers: {
                    'Authorization': `Bearer  ${token()}`
                }
            })
            dispatch(setTeams(response.data))

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

            data.id === undefined ? dispatch(addTeam(team)) : dispatch(updateTeam(team))

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
            }, {
                headers: {
                    'Authorization': `Bearer  ${token()}`
                }
            })

        } catch {

        }
    }
)


export const getTeam = createAsyncThunk(
    'teams/getTeam',
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
            dispatch(setCurrentTeam(response.data))
        } catch {
        }
    }
)


export const deleteTeam = createAsyncThunk(
    'teams/deleteTeam',
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
            foundationYear: 0,
            division: '',
            conference: '',
            imageUrl: '',
            id: 0
        }
    ],
    count: 0,
    page: 0,
    size: 0,
    isFetching: false,
    status: 0,
    currentTeam: {
        name: '',
        foundationYear: 0,
        division: '',
        conference: '',
        imageUrl: '',
        id: 0
    }


}


export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeams(state: typeof initialState, action) {
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.data = action.payload.data
        },

        setCurrentTeam(state, action) {
            state.currentTeam.name = action.payload.name
            state.currentTeam.foundationYear = action.payload.foundationYear
            state.currentTeam.division = action.payload.division
            state.currentTeam.conference = action.payload.conference
            state.currentTeam.imageUrl = action.payload.imageUrl
            state.currentTeam.id = action.payload.id
        }
    },
    extraReducers: builder => {

        builder.addCase(getTeams.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getTeams.fulfilled, (state, action) => {
            state.isFetching = false
        })

        builder.addCase(addImage.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(addTeam.fulfilled, (state, action) => {
            state.isFetching = false
        })
        builder.addCase(getTeam.pending, (state, action) => {
            state.isFetching = true
            state.status = 2
        })
        builder.addCase(getTeam.fulfilled, (state, action) => {
            state.isFetching = false
            state.status = 0
        })
        builder.addCase(updateTeam.fulfilled, (state, action) => {
            state.isFetching = false

        })
    },
})

export const TeamsSliceConst  =teamsSlice.reducer

export const {setTeams, setCurrentTeam} = teamsSlice.actions;

