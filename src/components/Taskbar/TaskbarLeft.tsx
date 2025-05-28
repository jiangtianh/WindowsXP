import { useState } from 'react';

import startLogo from '@assets/icons/XPlogo_32x32.webp';

import TaskbarWindows from './TaskbarWindows';
import StartMenuModal from './StartMenuModal';

const TaskbarLeft: React.FC = () => {
    const [startMenuModalOpen, setStartMenuModalOpen] = useState(false);

    const handleStartButtonClick = () => {
        if (startMenuModalOpen) {
            setStartMenuModalOpen(false);
        } else {
            setStartMenuModalOpen(true);
        }
    };

    return (
        <>
            <div className="overflow-hidden h-full flex items-center">
                <div
                    className="start-button text-white h-full text-lg cursor-pointer flex items-center"
                    onClick={handleStartButtonClick}
                >
                    <div className="flex items-center gap-1 pr-5 pl-2 italic font-bold select-none">
                        <img src={startLogo} alt="Start" width={'28px'} />
                        <span>start</span>
                    </div>
                </div>

                <TaskbarWindows />
            </div>
            <StartMenuModal open={startMenuModalOpen} onClose={() => setStartMenuModalOpen(false)} />
        </>
    )
}
export default TaskbarLeft;