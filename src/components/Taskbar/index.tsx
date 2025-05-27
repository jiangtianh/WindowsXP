import SystemTray from './SystemTray';
import TaskbarLeft from './TaskbarLeft';
import StartMenuModal from './StartMenuModal';

import './Taskbar.css';

export const TASKBAR_HEIGHT = 32; // px

const Taskbar: React.FC = () => {

    return (
        <>
            <div className="taskbar absolute bottom-0 w-full flex items-center z-10000"
                style={{ height: `${TASKBAR_HEIGHT}px` }}
            >
                <TaskbarLeft />
                <SystemTray />
            </div>
            <StartMenuModal />
        </>
    );
};

export default Taskbar;