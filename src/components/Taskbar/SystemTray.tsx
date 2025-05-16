import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMuted } from '../../services/volumeSlice';

import VolumeControllerModal from './VolumeControllerModal';

import volumeIcon from '@assets/icons/Volume32x32.webp';
import volumeMuteIcon from '@assets/icons/Mute32x32.webp';
import fullscreenIcon from '@assets/icons/FullScreen32x32.webp';



const SystemTray = () => {

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const [showVolumeController, setShowVolumeController] = useState(false);

    const isMuted = useSelector(selectMuted);
    const volumeControlIcon = isMuted ? volumeMuteIcon : volumeIcon;

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit fullscreen: ${err.message}`);
            });
        }
    };




    return (
        <div className="system-tray absolute right-0 text-white h-full flex items-center px-1.5 sm:px-3 gap-1 select-none font-family-trebuchet">

            <img src={fullscreenIcon}
                alt="Fullscreen"
                className="w-4 h-4 cursor-pointer"
                onClick={toggleFullscreen}
            />


            <img src={volumeControlIcon}
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