import { useSelector } from "react-redux";
import type { RootState } from "../../services/store";
import TaskbarWindowButton from "./TaskbarWindowButton";


const TaskbarWindows: React.FC = () => {

    const openWindows = useSelector((state: RootState) => state.windows.taskBarList);

    return (
        <div className="flex h-full ml-px sm:ml-2 sm:gap-0.5 overflow-hidden flex-grow">
            {openWindows.map((windowKey) => (
                <TaskbarWindowButton key={windowKey} windowKey={windowKey} />
            ))}
        </div>
    )
};
export default TaskbarWindows;