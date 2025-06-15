import { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Webamp from 'webamp';
import { closeWindow, focusWindow } from '../../../services/Windows/windowsSlice';
import type { RootState } from '../../../services/store';
import type { WindowKey } from '../../../services/types';

const initialTracks = [
    {
        metaData: {
            artist: 'Hikaru Utada',
            title: 'One Last Kiss',
        },
        url: '/music/OneLastKiss.mp3',
        duration: 252,
    }
];


const WinampPlayer = () => {
    const windowKey: WindowKey = 'Winamp';
    const windowState = useSelector((state: RootState) => state.windows.windows[windowKey]);
    const openQueue = useSelector((state: RootState) => state.windows.openQueue);
    const dispatch = useDispatch();

    const webampRef = useRef<Webamp | null>(null);

    const zIndex = useMemo(() => {
        const baseIndex = 100;
        const queuePosition = openQueue.indexOf(windowKey);
        if (queuePosition === -1) return baseIndex;
        return baseIndex + queuePosition + 1;
    }, [openQueue, windowKey]);

    useEffect(() => {
        const webamp = new Webamp({
            initialTracks,
            zIndex: zIndex,
        });
        if (Webamp.browserIsSupported()) {
            const container = document.getElementById('webamp-container')
            if (container) {
                webamp.renderWhenReady(container).then(() => {
                    const webampElements = document.querySelectorAll(
                        '#main-window, #playlist-window , #equalizer-window'
                    );
                    if (webampElements.length > 0) {
                        console.log('Webamp elements found:', webampElements);
                        const handleWebampClick = () => {

                            dispatch(focusWindow(windowKey));

                        };
                        webampElements.forEach((element) => {
                            element.addEventListener('mousedown', handleWebampClick);
                        });
                    }
                })
            } else {
                console.error('Element with ID "webamp-container" not found')
            }
        };
        webampRef.current = webamp
        webampRef.current?.onClose(() => dispatch(closeWindow(windowKey)));
        return () => {
            webamp.dispose()
        }
    }, [windowState.isOpen])

    useEffect(() => {
        const webamp = document.getElementById('webamp');
        if (webamp) {
            webamp.style.zIndex = zIndex.toString();
        } else {
            console.error('Element with ID "webamp" not found');
        }
    }, [zIndex]);


    if (!windowState.isOpen) {
        return null;
    };

    return (
        <div id="webamp-container" />
    );
};

export default WinampPlayer;