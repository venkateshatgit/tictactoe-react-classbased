import { createSlice } from "@reduxjs/toolkit";

export const gameClassSlice = createSlice({
    name: 'game_Class',
    initialState:{
        rows: 3,
        coloums: 3,
        xColor: '#00CCFF',
        oColor: '#00FF61',
    },
    reducers:{
        
        onChangeRow: (state, action) => {
            state.rows = action.payload
        },

        onChangeColoum: (state, action) => {
            state.coloums = action.payload
        },

        onChangeXColor: (state, action) => {
            state.xColor = action.payload
        },

        onChangeOColor: (state, action) => {
            state.oColor = action.payload
        }

    }
})

export const {onChangeRow, onChangeColoum, onChangeOColor, onChangeXColor} = gameClassSlice.actions
export default gameClassSlice.reducer