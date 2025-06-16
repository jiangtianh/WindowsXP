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
    },
    {
        metaData: {
            artist: 'Yoko Takahashi',
            title: 'Fly Me to the Moon (Yoko Takahashi Acid Bossa Version)',
        },
        url: '/music/YokoTakahashi-FlyMeToTheMoon(YOKOTAKAHASHIAcidBossaVersion).mp3',
    },
    {
        metaData: {
            artist: "Rosa Walton",
            title: "I Really Want to Stay At Your House",
        },
        url: "/music/IReallyWanttoStayAtYourHousebyRosaWalton.mp3",
    },
    {
        metaData: {
            artist: "河南说唱之神",
            title: "唉(pt.1)",
        },
        url: "/music/唉pt.1.mp3",
    },
    {
        metaData: {
            artist: "Juice WRLD",
            title: "Back in Chicago",
        },
        url: "/music/BackinChicago.mp3",
    },
    {
        metaData: {
            artist: "Hi Fi Set",
            title: "Sky Restaurant",
        },
        url: "/music/HiFiSet-SkyRestaurant.mp3",
    },
    {
        metaData: {
            artist: "Sunset Rollercoaster",
            title: "Burgundy Red",
        },
        url: "/music/BurgundyRed.mp3",
    },
    {
        metaData: {
            artist: "Arianne",
            title: "KOMM, SUSSER TOD M-10 Director's Edit Version | Evangelion Finally",
        },
        url: "/music/KOMM, SUSSER TOD M-10 Director's Edit Version  Evangelion Finally.mp3"
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