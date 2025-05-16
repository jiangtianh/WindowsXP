import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVolume, toggleMute, selectMuted, selectVolume } from '../../services/volumeSlice';

import volumeIcon from '@assets/icons/Volume32x32.webp';

interface VolumeControllerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const VolumeControllerModal: React.FC<VolumeControllerModalProps> = ({ isOpen, onClose }) => {
    const volume = useSelector(selectVolume);
    const muted = useSelector(selectMuted);
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setVolume(parseInt(e.target.value)));
    };

    const handleMuteToggle = () => {
        dispatch(toggleMute());
    };

    if (!isOpen) return null;

    return (
        // <div className="f>
        <div className="window fixed bottom-10 right-5 md:right-9 w-24" ref={modalRef}>
            <div className="title-bar">
                <div className="title-bar-text flex items-center gap-1">
                    <img src={volumeIcon} alt="Volume" className="w-4 h-4" />
                    Control
                </div>
            </div>

            <div className="h-52 window-body text-black">
                <div className="flex items-center h-9/10">
                    <label className="pr-4" htmlFor="volumeSlider">Volume:</label>
                    <div className="is-vertical">
                        <input
                            id="volumeSlider"
                            type="range"
                            min="0"
                            max="100"
                            step={5}
                            value={volume}
                            className="has-box-indicator"
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>

                <div className="flex items-center h-1/10">
                    <input
                        type="checkbox"
                        id="mute"
                        checked={muted}
                        onChange={handleMuteToggle}
                    />
                    <label htmlFor="mute">Mute</label>
                </div>
            </div>
        </div>
        // </div >
    )
}
export default VolumeControllerModal;