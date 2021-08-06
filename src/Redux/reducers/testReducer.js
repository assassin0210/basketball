import {createAction, createReducer} from "@reduxjs/toolkit";


const initialState = {
    count: 0,

}

export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')

export default createReducer(initialState, {
    [increment]: function (state, action) {
        state.count = state.count + 1
    },
    [decrement]: function (state, action) {
        state.count = state.count - 1
    },
})


console.log(decrement)
