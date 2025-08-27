import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const BootPhase = {
    SHUTDOWN: 'SHUTDOWN',
    BIOS: 'BIOS',
    LOADING: 'LOADING',
    LOGIN: 'LOGIN',
    DESKTOP: 'DESKTOP',
} as const;
export type BootPhaseType = typeof BootPhase[keyof typeof BootPhase];


interface BootState {
    currentPhase: BootPhaseType;
}

const initialState: BootState = {
    currentPhase: BootPhase.DESKTOP, // Default should be BIOS
};

export const bootSlice = createSlice({
    name: "boot",
    initialState,
    reducers: {
        setBootPhase: (state, action: PayloadAction<BootPhaseType>) => {
            state.currentPhase = action.payload;
        },
    }
});

export const { setBootPhase } = bootSlice.actions;
export const selectBootPhase = (state: RootState) => state.boot.currentPhase;

export default bootSlice.reducer;