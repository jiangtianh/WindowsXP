import SystemTray from './SystemTray';
import TaskbarLeft from './TaskbarLeft';

import './Taskbar.css';

export const TASKBAR_HEIGHT = 32; // px

const Taskbar: React.FC = () => {

    return (
        <div className="taskbar absolute bottom-0 w-full flex items-center justify-between z-10000 overflow-hidden"
            style={{ height: `${TASKBAR_HEIGHT}px` }}
        >
            <TaskbarLeft />
            <SystemTray />
        </div>
    );
};

export default Taskbar;