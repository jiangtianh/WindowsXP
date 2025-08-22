import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setBootPhase, BootPhase } from '../../services/bootStatusSlice';
import { openWindow } from '../../services/Windows/windowsSlice';

import { TASKBAR_HEIGHT } from '.';
import './StartMenuModal.css';
import type { WindowKey } from '../../services/types';
import { NotepadIcon, MinesweeperIcon, ProjectIcon, CVIcon, MyDocumentsIcon, ContactMeIcon, SystemPropertiesIcon, WinampIcon, PinballIcon, MyPicturesIcon, WeatherIcon } from '../../services/Windows/initialWindowState';

type StartMenuModalContent = {
    id: WindowKey;
    title: string;
    icon: string;
    description?: string;
};


const leftSideContent: StartMenuModalContent[] = [
    {
        id: 'ContactMe',
        title: "Contact Me",
        icon: ContactMeIcon,
        description: "Get in touch with me"
    },
    {
        id: 'Winamp',
        title: "Winamp",
        icon: WinampIcon,
    },
    {
        id: 'Weather',
        title: "Weather",
        icon: WeatherIcon,
        description: "Check the weather forecast"
    },
    {
        id: 'Notepad',
        title: "Notepad",
        icon: NotepadIcon,
    },
    {
        id: 'Minesweeper',
        title: "Minesweeper",
        icon: MinesweeperIcon,
    },
    {
        id: 'Pinball',
        title: "Pinball",
        icon: PinballIcon,
    }
];

const rightSideContent: StartMenuModalContent[] = [
    {
        id: 'MyDocuments',
        title: "My Documents",
        icon: MyDocumentsIcon,
    },
    {
        id: 'Projects',
        title: "My Projects",
        icon: ProjectIcon,
    },
    {
        id: 'MyPictures',
        title: "My Pictures",
        icon: MyPicturesIcon,
    },
    {
        id: 'CV',
        title: "My CV",
        icon: CVIcon,
    },
    {
        id: 'SystemProperties',
        title: "System Properties",
        icon: SystemPropertiesIcon,
    }
];




interface StartMenuModalProps {
    open: boolean;
    onClose: () => void;
};

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

    if (!open) return null;

    const handleLogoff = () => {
        dispatch(setBootPhase(BootPhase.LOGIN));
    };
    const handlePowerOff = () => {
        dispatch(setBootPhase(BootPhase.SHUTDOWN));
    };
    const handleOpenWindow = (windowKey: WindowKey) => {
        dispatch(openWindow(windowKey));
        onClose();
    };

    return (
        <div
            ref={modalRef}
            className="fixed left-0 start-menu-modal overflow-hidden flex flex-col select-none w-[320px] h-[450px] md:w-[430px] md:h-[530px] z-10000"
            style={{
                bottom: `${TASKBAR_HEIGHT}px`
            }}
        >
            {/* Header with User Icon and Name */}
            <div className="start-menu-modal-header h-16 w-full flex flex-shrink-0 items-center px-2 gap-2">
                <img src='/icons/user-icon.webp' alt="User Icon" className="start-menu-modal-profile-shadow w-11 h-11 rounded-lg border-white border-1" />
                <p className="text-lg text-white start-menu-modal-text-shadow font-family-trebuchet">Jiangtian Han</p>
            </div>


            <div className="relative w-full h-full px-0.5 font-family-tahoma">
                <hr className="w-full start-menu-modal-divider" />

                <div className="w-full h-full flex">
                    {/* Left Side Content */}
                    <div className="w-7/12 h-full bg-white p-1">
                        {leftSideContent.map((item) => (
                            <div key={item.id} className="flex py-2">
                                <div
                                    className="flex w-full h-10 items-center gap-1.5 px-0.5 cursor-pointer start-menu-modal-component"
                                    onClick={() => handleOpenWindow(item.id)}
                                >
                                    <img src={item.icon} alt={item.title} className="w-7 h-7 md:w-9 md:h-9" />
                                    <div>
                                        <p>{item.title}</p>
                                        {item.description && (
                                            <p style={{ fontSize: '10px', color: 'rgb(156 163 175)' }}>{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side Content */}
                    <div className="w-5/12 h-full px-1 py-2 start-menu-modal-right-container">
                        {rightSideContent.map((item) => (
                            <div
                                key={item.id}
                                className="flex w-full h-10 items-center gap-1.5 px-0.5 cursor-pointer start-menu-modal-component"
                                onClick={() => handleOpenWindow(item.id)}
                            >
                                <img src={item.icon} alt={item.title} className="w-6 h-6 md:w-7 md:h-7" />
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Bottom Footer */}
            <div className="h-12 w-full start-menu-modal-footer flex flex-shrink-0 justify-end items-center gap-3 px-2 font-family-trebuchet">
                <a className="cursor-pointer p-1 flex items-center gap-1 h-10 rounded-xs"
                    onClick={handleLogoff}
                >
                    <img src='/icons/Logout64x64.webp' className="w-6 h-6 md:w-7 md:h-7" alt="Power Off" />
                    <p className="text-white text-xxs">Log Off</p>
                </a>

                <a className="cursor-pointer p-1 flex items-center gap-1 h-10 rounded-xs"
                    onClick={handlePowerOff}
                >
                    <img src='/icons/Power64x64.webp' className="w-6 h-6 md:w-7 md:h-7" alt="Power Off" />
                    <p className="text-white">Turn Off Computer</p>
                </a>
            </div>
        </div>
    );
};
export default StartMenuModal;