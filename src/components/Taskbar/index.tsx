import { useState } from 'react';

import SystemTray from './SystemTray';
import TaskbarLeft from './TaskbarLeft';
import StartMenuModal from './StartMenuModal';

import './Taskbar.css';

export const TASKBAR_HEIGHT = 32; // px

const Taskbar: React.FC = () => {

    const [startMenuModalOpen, setStartMenuModalOpen] = useState(false);

    return (
        <>
            <div className="taskbar absolute bottom-0 w-full flex items-center justify-between z-10000 overflow-hidden"
                style={{ height: `${TASKBAR_HEIGHT}px` }}
            >
                <TaskbarLeft
                    startMenuModalOpen={startMenuModalOpen}
                    setStartMenuModalOpen={setStartMenuModalOpen}
                />
                <SystemTray />
            </div>
            <StartMenuModal open={startMenuModalOpen} onClose={() => setStartMenuModalOpen(false)} />
        </>
    );
};

export default Taskbar;