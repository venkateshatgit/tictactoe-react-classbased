import { createSlice } from "@reduxjs/toolkit";

export const gameClassSlice = createSlice({
    name: 'game_Class',
    initialState:{
        rows: 3,
        coloums: 3,
        xColor: '#00CCFF',
        oColor: '#00FF61',
        winnerRatio: 0,
        history: [],
    },
    reducers:{
        
        onChangeRow: (state, action) => {
            state.rows = action.payload
        },

        onChangeColoum: (state, action) => {
            state.coloums = action.payload
        },

        onChangeWinnerRatio: (state, action) => {
            state.winnerRatio = action.payload
        },

        onChangeXColor: (state, action) => {
            state.xColor = action.payload
        },

        onChangeOColor: (state, action) => {
            state.oColor = action.payload
        },

        onChangeHistory: (state, action) => {
            while(state.history.length){
                state.history.pop()
            }

            state.history.push(action.payload)
        },

        onChangeHistoryPushBack: (state, action) => {
            state.history.push(action.payload)
        }

    }
})

export const {onChangeRow, 
    onChangeColoum, 
    onChangeOColor, 
    onChangeXColor, 
    onChangeWinnerRatio, 
    onChangeHistory, 
    onChangeHistoryPushBack,  
} = gameClassSlice.actions
export default gameClassSlice.reducer