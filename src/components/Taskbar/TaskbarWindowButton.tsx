import type { WindowKey } from "../../services/types";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../services/store";
import { openWindow, focusWindow } from "../../services/Windows/windowsSlice";

import "./TaskbarWindowButton.css"

interface TaskbarWindowButtonProps {
    windowKey: WindowKey;
}

const TaskbarWindowButton: React.FC<TaskbarWindowButtonProps> = ({ windowKey }) => {
    const dispatch = useDispatch();
    const currentWindow = useSelector((state: RootState) => state.windows.windows[windowKey]);

    const handleClick = () => {
        if (currentWindow.isMinimized) {
            dispatch(openWindow(windowKey));
        } else {
            dispatch(focusWindow(windowKey));
        }
    };

    const isActive = currentWindow.isFocused;

    return (
        <div
            onClick={handleClick}
            style={{ flex: '0 1 160px' }}
            className="flex items-center h-full gap-1 py-1 mt-px cursor-pointer select-none min-w-[32px] max-w-[160px]"
        >
            <div className={`flex items-center px-2 w-full h-full hover:brightness-110 rounded-sm taskbar-window-button${isActive ? "-active" : ""}`}>
                <img src={currentWindow.icon} alt={currentWindow.title} className="h-4 w-4 flex-shrink-0" />
                <span className="truncate text-white ml-1">{currentWindow.title}</span>
            </div>
        </div>
    )
};
export default TaskbarWindowButton;