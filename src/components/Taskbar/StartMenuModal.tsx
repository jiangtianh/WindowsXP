import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setBootPhase, BootPhase } from '../../services/bootStatusSlice';

import { TASKBAR_HEIGHT } from '.';
import './StartMenuModal.css';
import userIcon from "@assets/icons/user-icon.webp";
import powerIcon from "@assets/icons/Power64x64.webp";
import logoutIcon from "@assets/icons/Logout64x64.webp";

interface StartMenuModalProps {
    open: boolean;
    onClose: () => void;
}

const StartMenuModal: React.FC<StartMenuModalProps> = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handleClick = (e: MouseEvent) => {
            // Make sure the click didn't happen on the start button itself
            const startButton = document.querySelector('.start-button');
            if (startButton && startButton.contains(e.target as Node)) {
                // Skip processing if click was on start button
                return;
            }

            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open, onClose]);

    // if (!open) return null; // Uncomment this line if you want to conditionally render the modal based on `open` prop

    const handleLogoff = () => {
        dispatch(setBootPhase(BootPhase.LOGIN));
    };
    const handlePowerOff = () => {
        dispatch(setBootPhase(BootPhase.SHUTDOWN));
    };

    return (
        <div
            ref={modalRef}
            className="absolute left-0 start-menu-modal overflow-hidden z-10000 flex flex-col select-none w-[320px] h-[450px] md:w-[430px] md:h-[530px]"
            style={{ bottom: `${TASKBAR_HEIGHT}px` }}
        >
            <div className="start-menu-modal-header h-16 w-full flex flex-shrink-0 items-center px-2 gap-2">
                <img src={userIcon} alt="User Icon" className="start-menu-modal-profile-shadow w-11 h-11 rounded-lg border-white border-1" />
                <p className="text-lg text-white start-menu-modal-text-shadow font-family-trebuchet">Jiangtian Han</p>
            </div>

            <div className="relative w-full h-full px-0.5">
                <hr className="w-full start-menu-modal-divider" />

                <div className="w-full h-full flex">
                    <div className="w-7/12 h-full bg-white p-1">

                    </div>

                    <div className="w-5/12 h-full p-1 start-menu-modal-right-container">

                    </div>
                </div>
            </div>

            <div className="h-12 w-full start-menu-modal-footer flex flex-shrink-0 justify-end items-center gap-3 px-2">
                <a className="cursor-pointer p-1 flex items-center gap-1 h-10 rounded-xs"
                    onClick={handleLogoff}
                >
                    <img src={logoutIcon} className="w-6 h-6 md:w-7 md:h-7" alt="Power Off" />
                    <p className="text-white text-xxs">Log Off</p>
                </a>

                <a className="cursor-pointer p-1 flex items-center gap-1 h-10 rounded-xs"
                    onClick={handlePowerOff}
                >
                    <img src={powerIcon} className="w-6 h-6 md:w-7 md:h-7" alt="Power Off" />
                    <p className="text-white text-xxs">Turn Off Computer</p>
                </a>

            </div>

        </div>
    );
};
export default StartMenuModal;