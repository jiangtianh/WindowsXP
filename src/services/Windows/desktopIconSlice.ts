import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WindowKey, DesktopIconCoordinates } from "../types";
import { initialDesktopIconState } from "./initialDesktopIconState";

const initialState = {
    desktopIcons: initialDesktopIconState,
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
