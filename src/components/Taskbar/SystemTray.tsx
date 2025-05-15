import { useState, useEffect } from 'react';


import volumeIcon from '@assets/icons/volume-icon-sm.webp';
import fullscreenIcon from '@assets/icons/full-screen-icon-sm.webp';

import VolumeControllerModal from './VolumeControllerModal';

const SystemTray = () => {

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 5000);
        return () => clearInterval(timer);
    }, []);


    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    setIsFullscreen(false);
                }).catch(err => {
                    console.error(`Error attempting to exit fullscreen: ${err.message}`);
                });
            }
        }
    };

    const [showVolumeController, setShowVolumeController] = useState(false);


    return (
        <div className="system-tray absolute right-0 text-white h-full flex items-center px-1.5 sm:px-3 gap-1 select-none font-family-trebuchet">

            <img src={fullscreenIcon}
                alt="Fullscreen"
                className="w-4 h-4 cursor-pointer"
                onClick={toggleFullscreen}
            />


            <img src={volumeIcon}
                alt="Volume"
                className="w-4 h-4 cursor-pointer"
                onClick={() => setShowVolumeController(true)}
            />
            <VolumeControllerModal
                isOpen={showVolumeController}
                onClose={() => setShowVolumeController(false)}
            />

            <span className="mx-1px text-xs">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>

        </div>
    )
}
export default SystemTray;