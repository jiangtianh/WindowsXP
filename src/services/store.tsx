import { configureStore } from "@reduxjs/toolkit";

import volumeReducer from "./volumeSlice";
import bootReducer from "./bootStatusSlice";
import clientInfoReducer from "./clientInfoSlice";
import windowsReducer from "./Windows/windowsSlice";
import desktopIconsReducer from "./Windows/desktopIconSlice";
import weatherInfoReducer from "./weatherInfoSlice";


export const store = configureStore({
    reducer: {
        volume: volumeReducer,
        boot: bootReducer,
        clientInfo: clientInfoReducer,
        windows: windowsReducer,
        desktopIcons: desktopIconsReducer,
        weather: weatherInfoReducer,
    },

});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;