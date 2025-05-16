import startLogo from '@assets/icons/XPlogo_32x32.webp';

import TaskbarWindows from './TaskbarWindows';

const TaskbarLeft: React.FC = () => {
    return (
        <div className="overflow-hidden h-full flex items-center">
            <div
                className="start-button text-white h-full text-lg cursor-pointer flex items-center"
                onClick={() => console.log('Start button clicked!')}
            >
                <div className="flex items-center gap-1 pr-5 pl-2 italic font-bold select-none">
                    <img src={startLogo} alt="Start" width={'28px'} />
                    <span>start</span>
                </div>
            </div>

            <TaskbarWindows />
        </div>
    )
}
export default TaskbarLeft;