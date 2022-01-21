import { configureStore } from "@reduxjs/toolkit";
import gameClassSlice from "../redux/gameClassSlice";


export const store = configureStore({
    reducer:{
        game_Class: gameClassSlice, 
    }
})