import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { WindowKey } from "../types";

import NotepadIcon from "@/assets/icons/notepad-icon.webp";

export interface DesktopIconCoordinates {
    gridX: number;
    gridY: number;
}

export interface DesktopIconInfo {
    title: string;
    icon: string;
    coordinates: DesktopIconCoordinates;
}


interface DesktopIconsState {
    desktopIcons: Record<WindowKey, DesktopIconInfo>;
    gridDimensions: {
        columns: number;
        rows: number;
    };
}

const initialState: DesktopIconsState = {
    desktopIcons: {
        'Notepad': {
            title: 'Notepad',
            icon: NotepadIcon,
            coordinates: { gridX: 0, gridY: 0 },
        }
    },
    gridDimensions: {
        columns: 2, // Default value
        rows: 6     // Default value
    }
}


export const desktopIconSlice = createSlice({
    name: "desktopIcons",
    initialState,
    reducers: {
        moveIcon: (state, action: PayloadAction<{ windowKey: WindowKey; coordinates: DesktopIconCoordinates }>) => {
            const { windowKey, coordinates } = action.payload;

            // Ensure coordinates are within grid boundaries
            const safeX = Math.min(Math.max(0, coordinates.gridX), state.gridDimensions.columns - 1);
            const safeY = Math.min(Math.max(0, coordinates.gridY), state.gridDimensions.rows - 1);

            // Check if position is already taken
            const isPositionTaken = Object.entries(state.desktopIcons).some(([key, icon]) =>
                key !== windowKey &&
                icon.coordinates.gridX === safeX &&
                icon.coordinates.gridY === safeY
            );

            if (!isPositionTaken) {
                state.desktopIcons[windowKey].coordinates = { gridX: safeX, gridY: safeY };
            }
            // If position is taken, don't update
        },

        updateGridDimensions: (state, action: PayloadAction<{ columns: number; rows: number }>) => {
            state.gridDimensions = action.payload;
        }
    }
});

export const { moveIcon, updateGridDimensions } = desktopIconSlice.actions;

export default desktopIconSlice.reducer;
