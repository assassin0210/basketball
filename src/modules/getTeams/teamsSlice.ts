import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {currentUser, instance} from "../../utils/utils";



export const getTeams = createAsyncThunk(
    'auth/getTeams',
    async function (_, {dispatch}) {
        try {
            const response = await instance.get('/api/Team/GetTeams', {
                headers: {
                    'Authorization': `Bearer  ${currentUser.token}`
                }
            })
            dispatch(setTeams(response))
        } catch {

        }
    }
)


const initialState={
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
    size: 0
}

const teamsSlice = createSlice({
    name:'teams',
    initialState,
    reducers:{
        setTeams(state:any,action:any){
            state.count = action.payload.count
            state.page = action.payload.page
            state.size = action.payload.size
            state.data = action.payload.data

        },

    },
        extraReducers:builder => {
            builder.addCase(getTeams.pending,(state,action)=>{
                console.log('загружаюсь')
            })
            builder.addCase(getTeams.fulfilled,(state,action)=>{
                console.log('загрузился ')
            })
        },
})

export const {setTeams,} = teamsSlice.actions;
export default teamsSlice.reducer
