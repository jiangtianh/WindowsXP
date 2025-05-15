import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';



interface VolumeState {
    level: number;
    muted: boolean;
    previousLevel: number;
}

const initialState: VolumeState = {
    level: 50,
    muted: false,
    previousLevel: 50,
};

export const volumeSlice = createSlice({
    name: 'volume',
    initialState,

    reducers: {

        setVolume: (state, action: PayloadAction<number>) => {
            const newVolume = Math.min(100, Math.max(0, action.payload));
            state.level = newVolume;
            if (newVolume > 0 && state.muted) {
                state.muted = false;
            }
            if (newVolume > 0) {
                state.previousLevel = newVolume;
            }
            if (newVolume === 0) {
                state.muted = true;
            }
        },

        toggleMute: (state) => {
            if (state.muted) {
                state.muted = false;
                state.level = state.previousLevel;
            } else {
                state.muted = true;
                state.previousLevel = state.level;
                state.level = 0;
            }
        },
    }
});

export const { setVolume, toggleMute } = volumeSlice.actions;
export const selectVolume = (state: RootState) => state.volume.level;
export const selectMuted = (state: RootState) => state.volume.muted;

export default volumeSlice.reducer;