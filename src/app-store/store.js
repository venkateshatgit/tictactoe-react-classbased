import { configureStore } from "@reduxjs/toolkit";
import gameClassSlice from "../redux/gameClassSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'matrix',
    storage,
};


// export const store = configureStore({
//     reducer:{
//         game_Class: gameClassSlice, 
//     }
// })

const reducers = combineReducers({ game_Class: gameClassSlice });
const persistedReducer = persistReducer(persistConfig, reducers);

export const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});