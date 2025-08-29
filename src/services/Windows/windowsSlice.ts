import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { initialWindowState } from "./initialWindowState";
import type { WindowKey, WindowsState, WindowPosition } from "../types";

import { TASKBAR_HEIGHT } from "../../components/Taskbar";


const initialState: WindowsState = {
    windows: initialWindowState,
    openQueue: [],
    taskBarList: []
}

const windowsSlice = createSlice({
    name: "windows",
    initialState,
    reducers: {
        openWindow: (state, action: PayloadAction<WindowKey>) => {
            const key = action.payload;
            // If already open but minimized, restore. 
            if (state.windows[key].isOpen && state.windows[key].isMinimized) {
                state.windows[key].isMinimized = false;
            } else {
                state.windows[key].isOpen = true;

                // Add the window to tasbar
                if (!state.taskBarList.includes(key)) {
                    state.taskBarList.push(key);
                }
            }
            // Unfocus all other windows
            Object.keys(state.windows).forEach((windowKey) => {
                if (windowKey !== key) {
                    state.windows[windowKey as WindowKey].isFocused = false;
                }
            });
            // Focus the current window
            state.windows[key].isFocused = true;

            // Update z-index open queue
            state.openQueue = state.openQueue.filter((k) => k !== key);
            state.openQueue.push(key);
        },

        closeWindow: (state, action: PayloadAction<WindowKey>) => {
            const key = action.payload;
            state.windows[key].isOpen = false;
            state.windows[key].isFocused = false;
            state.windows[key].isMinimized = false;

            // Remove from open queue
            state.openQueue = state.openQueue.filter((k) => k !== key);

            // Remove from taskbar list
            state.taskBarList = state.taskBarList.filter((k) => k !== key);

            if (state.openQueue.length > 0) {
                const topWindowKey = state.openQueue[state.openQueue.length - 1];
                state.windows[topWindowKey].isFocused = true;
            }
        },


        focusWindow: (state, action: PayloadAction<WindowKey>) => {
            const key = action.payload;

            if (state.windows[key].isMinimized) return;

            Object.keys(state.windows).forEach((windowKey) => {
                state.windows[windowKey as WindowKey].isFocused = false;
            });
            state.windows[key].isFocused = true;

            state.openQueue = state.openQueue.filter((k) => k !== key);
            state.openQueue.push(key);
        },

        unfocusAllWindows: (state) => {
            Object.keys(state.windows).forEach((windowKey) => {
                state.windows[windowKey as WindowKey].isFocused = false;
            });
        },

        updateWindowPosition: (state, action: PayloadAction<{ key: WindowKey; position: WindowPosition }>) => {
            const { key, position } = action.payload;
            state.windows[key].position = position;
        },

        minimizeWindow: (state, action: PayloadAction<WindowKey>) => {
            const key = action.payload;
            state.windows[key].isMinimized = true;
            state.windows[key].isFocused = false;

            if (state.openQueue.length > 0) {
                state.openQueue = state.openQueue.filter((k) =>
                    k !== key && !state.windows[k as WindowKey].isMinimized);

                if (state.openQueue.length > 0) {
                    const topWindowKey = state.openQueue[state.openQueue.length - 1];
                    state.windows[topWindowKey].isFocused = true;
                }
            }
        },

        setMaximizedOff: (state, action: PayloadAction<WindowKey>) => {
            const key = action.payload;
            state.windows[key].isMaximized = false;
            // Don't restore the saved position, just keep the current one
        },

        maximizeWindow: (state, action: PayloadAction<WindowKey>) => {
            const key = action.payload;
            const currentWindow = state.windows[key];
            if (currentWindow.isMaximized) {
                currentWindow.isMaximized = false;
                if (currentWindow.savedPosition) {
                    currentWindow.position = currentWindow.savedPosition;
                    currentWindow.savedPosition = null;
                }
            } else {
                currentWindow.isMaximized = true;
                currentWindow.savedPosition = { ...currentWindow.position };
                currentWindow.position = {
                    x: 0, y: 0,
                    width: window.innerWidth || 800,
                    height: (window.innerHeight - TASKBAR_HEIGHT) || 600
                }
            }
        },

        resizeWindow: (state, action: PayloadAction<{ key: WindowKey; width: number; height: number }>) => {
            const { key, width, height } = action.payload;
            if (state.windows[key]) {
                state.windows[key].position.width = width;
                state.windows[key].position.height = height;
            }
        },
    }
});


export const {
    openWindow,
    closeWindow,
    focusWindow,
    unfocusAllWindows,
    updateWindowPosition,
    minimizeWindow,
    setMaximizedOff,
    maximizeWindow,
    resizeWindow
} = windowsSlice.actions;

export default windowsSlice.reducer;