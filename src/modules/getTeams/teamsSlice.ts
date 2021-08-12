import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance, token} from "../../utils/utils";
import {AddTeamIType, responsAddTeam, TeamType} from "../../api/dto/types";


export const getTeams = createAsyncThunk(
    'teams/getTeams',
    async function (_, {dispatch}) {
        try {
            const response = await instance.get('/api/Team/GetTeams', {
                headers: {
                    'Authorization': `Bearer  ${token}`
                }
            })
            console.log(response)
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
            const response = await instance.post('/api/Image/SaveImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer  ${token}`
                }
            })
            console.log(response,'респонс в addImage')

            const team: TeamType = {
                name: `${data.name}`,
                foundationYear: data.foundationYear,
                division: `${data.division}`,
                conference: `${data.conference}`,
                imageUrl: `http://dev.trainee.dex-it.ru${response.data}`,
                id: 0
            }


            dispatch(addTeam(team))
        } catch {
        }
    }
)

export const addTeam = createAsyncThunk(
    'teams/addFullTeam',
    async function (team: TeamType, {dispatch}) {
        try {


            const response: string | void = await instance.post('/api/Team/Add', {
                "name": `${team.name}`,
                "foundationYear": team.foundationYear,
                "division": `${team.division}`,
                "conference": `${team.conference}`,
                "imageUrl": `${team.imageUrl}`
            }, {
                headers: {
                    'Authorization': `Bearer  ${token}`
                }
            })
            console.log(response)
        } catch {

        }
    }
)



export const getTeam = createAsyncThunk(
    'teams/getTeam',
    async function (id:number, {dispatch}) {
        try {
            const response:responsAddTeam = await instance.get('/api/Team/Get',  {
                headers: {
                    'Authorization': `Bearer  ${token}`
                },
                params:{
                    id:id
                }
            })
            dispatch(setCurrentTeam(response.data))
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
        setTeams(state: typeof initialState, action: any) {
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.data = action.payload.data
        },

        setCurrentTeam(state,action:any){
            console.log(action)
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
        builder.addCase(addImage.fulfilled, (state, action) => {

        })
        builder.addCase(addTeam.fulfilled, (state, action) => {
            state.isFetching = false

        })
        builder.addCase(getTeam.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(getTeam.fulfilled, (state, action) => {
            state.isFetching = false
        })
    },
})

export const {setTeams,setCurrentTeam} = teamsSlice.actions;
export default teamsSlice.reducer
