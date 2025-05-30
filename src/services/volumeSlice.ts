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

const applyVolumeToAudio = (volume: number, muted: boolean) => {
    const effectiveVolume = muted ? 0 : volume / 100;

    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach((element) => {
        if (element instanceof HTMLAudioElement || element instanceof HTMLVideoElement) {
            element.volume = effectiveVolume;
        }
    });
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
        try {
            // Try same-origin iframe access
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
                // Control audio/video in iframe
                const iframeAudio = iframeDoc.querySelectorAll('audio, video');
                iframeAudio.forEach((element) => {
                    if (element instanceof HTMLAudioElement || element instanceof HTMLVideoElement) {
                        element.volume = effectiveVolume;
                        element.muted = muted;
                    }
                });

                // Control canvas games in iframe using Web Audio API
                const iframeWindow = iframe.contentWindow;
                if (iframeWindow) {
                    // Try to control Web Audio API contexts
                    if ((iframeWindow as any).audioContext && (iframeWindow as any).masterGainNode) {
                        (iframeWindow as any).masterGainNode.gain.value = effectiveVolume;
                    }

                    // Try Howler.js if used
                    if ((iframeWindow as any).Howler) {
                        (iframeWindow as any).Howler.volume(effectiveVolume);
                        (iframeWindow as any).Howler.mute(muted);
                    }

                    // Send custom event to iframe canvas games
                    iframeWindow.dispatchEvent(new CustomEvent('volumeChange', {
                        detail: { volume: effectiveVolume, muted }
                    }));
                }
            }
        } catch (error) {
            // Cross-origin iframe - use postMessage instead
            console.log('Cross-origin iframe detected, using postMessage');
        }

        // For cross-origin iframes, use postMessage
        try {
            iframe.contentWindow?.postMessage({
                type: 'VOLUME_CHANGE',
                volume: effectiveVolume,
                muted: muted,
                source: 'parent'
            }, '*');
        } catch (error) {
            console.log('Failed to send postMessage to iframe');
        }
    });

    // 3. Send global events for any canvas games listening
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('globalVolumeChange', {
            detail: { volume: effectiveVolume, muted }
        }));
    }
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
            applyVolumeToAudio(state.level, state.muted);
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
            applyVolumeToAudio(state.level, state.muted);
        },
    }
});

export const { setVolume, toggleMute } = volumeSlice.actions;
export const selectVolume = (state: RootState) => state.volume.level;
export const selectMuted = (state: RootState) => state.volume.muted;

export default volumeSlice.reducer;