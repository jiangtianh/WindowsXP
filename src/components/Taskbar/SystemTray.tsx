import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMuted } from '../../services/volumeSlice';

import VolumeControllerModal from './VolumeControllerModal';

import volumeIcon from '@assets/icons/Volume32x32.webp';
import volumeMuteIcon from '@assets/icons/Mute32x32.webp';
import fullscreenIcon from '@assets/icons/FullScreen32x32.webp';



const SystemTray = () => {

    const [time, setTime] = useState(new Date());
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const [showVolumeController, setShowVolumeController] = useState(false);

    const isMuted = useSelector(selectMuted);
    const volumeControlIcon = isMuted ? volumeMuteIcon : volumeIcon;

    const enterFullScreen = () => {
        if (isFullscreen) {
            // Exit full-screen mode
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            // Enter full-screen mode
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if ((document.documentElement as any).mozRequestFullScreen) {
                (document.documentElement as any).mozRequestFullScreen();
            } else if ((document.documentElement as any).webkitRequestFullscreen) {
                (document.documentElement as any).webkitRequestFullscreen();
            } else if ((document.documentElement as any).msRequestFullscreen) {
                (document.documentElement as any).msRequestFullscreen();
            }
            setIsFullscreen(true);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!document.fullscreenElement;
            setIsFullscreen(isCurrentlyFullscreen);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);



    return (
        <div className="system-tray absolute right-0 text-white h-full flex items-center px-1.5 sm:px-3 gap-1 select-none font-family-trebuchet">

            <img src={fullscreenIcon}
                alt="Fullscreen"
                className="w-4 h-4 cursor-pointer"
                onClick={enterFullScreen}
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