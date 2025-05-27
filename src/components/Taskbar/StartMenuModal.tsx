import { useDispatch } from 'react-redux';
import { setBootPhase, BootPhase } from '../../services/bootStatusSlice';

import { TASKBAR_HEIGHT } from '.';
import './StartMenuModal.css';
import userIcon from "@assets/icons/user-icon.webp";
import powerIcon from "@assets/icons/Power64x64.webp";
import logoutIcon from "@assets/icons/Logout64x64.webp";



const StartMenuModal: React.FC = () => {
    const dispatch = useDispatch();
    const handleLogoff = () => {
        dispatch(setBootPhase(BootPhase.LOGIN));
    };
    const handlePowerOff = () => {
        dispatch(setBootPhase(BootPhase.SHUTDOWN));
    };

    return (
        <div
            className="absolute left-0 start-menu-modal overflow-hidden z-10000 flex flex-col"
            style={{ bottom: `${TASKBAR_HEIGHT}px` }}
        >
            <div className="start-menu-modal-header h-16 w-full flex flex-shrink-0 items-center px-2 gap-2">
                <img src={userIcon} alt="User Icon" className="start-menu-modal-profile-shadow w-11 h-11 rounded-lg border-white border-1" />
                <p className="text-lg text-white start-menu-modal-text-shadow font-family-trebuchet">Jiangtian Han</p>
            </div>

            <div className="relative w-full h-full px-0.5">

            </div>

            <div className="h-12 w-full start-menu-modal-footer flex flex-shrink-0 justify-end items-center gap-3 px-2">
                <a className="cursor-pointer p-1 flex items-center gap-1 h-10 rounded-xs"
                    onClick={handleLogoff}
                >
                    <img src={logoutIcon} className="w-7 h-7" alt="Power Off" />
                    <p className="text-white text-xxs">Log Off</p>
                </a>

                <a className="cursor-pointer p-1 flex items-center gap-1 h-10 rounded-xs"
                    onClick={handlePowerOff}
                >
                    <img src={powerIcon} className="w-7 h-7" alt="Power Off" />
                    <p className="text-white text-xxs">Turn Off Computer</p>
                </a>

            </div>

        </div>
    );
};
export default StartMenuModal;