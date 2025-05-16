import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../services/store";
import TaskbarWindowButton from "./TaskbarWindowButton";


const TaskbarWindows: React.FC = () => {

    const dispatch = useDispatch();
    const openWindows = useSelector((state: RootState) => state.windows.taskBarList);

    return (
        <div className="flex h-full ml-px sm:ml-2 sm:gap-0.5">
            {openWindows.map((windowKey) => (
                <TaskbarWindowButton key={windowKey} windowKey={windowKey} />
            ))}
        </div>
    )
};
export default TaskbarWindows;