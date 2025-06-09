import TaskbarWindows from './TaskbarWindows';


interface TaskbarLeftProps {
    startMenuModalOpen: boolean;
    setStartMenuModalOpen: (open: boolean) => void;
}

const TaskbarLeft: React.FC<TaskbarLeftProps> = ({ startMenuModalOpen, setStartMenuModalOpen }) => {

    const handleStartButtonClick = () => {
        if (startMenuModalOpen) {
            setStartMenuModalOpen(false);
        } else {
            setStartMenuModalOpen(true);
        }
    };

    return (
        <>
            <div className="overflow-hidden h-full flex items-center flex-grow">
                <div
                    className="start-button text-white h-full text-lg cursor-pointer flex items-center flex-shrink-0"
                    onClick={handleStartButtonClick}
                >
                    <div className="flex items-center gap-1 pr-5 pl-2 italic font-bold select-none">
                        <img src='/icons/XPlogo_32x32.webp' alt="Start" width={'28px'} />
                        <span>start</span>
                    </div>
                </div>

                <TaskbarWindows />
            </div>
        </>
    )
}
export default TaskbarLeft;