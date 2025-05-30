import type { WindowKey } from "../../../services/types";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../services/store";
import { useMemo } from "react";
import { focusWindow } from "../../../services/Windows/windowsSlice";

const VirtualRei: React.FC = () => {

    const windowKey: WindowKey = "VirtualRei";
    const windowState = useSelector((state: RootState) => state.windows.windows[windowKey]);
    const openQueue = useSelector((state: RootState) => state.windows.openQueue);

    const dispatch = useDispatch();

    const zIndex = useMemo(() => {
        const baseIndex = 100;
        const queuePosition = openQueue.indexOf(windowKey);
        if (queuePosition === -1) {
            return baseIndex;
        }
        return baseIndex + queuePosition + 1;
    }, [openQueue, windowKey])


    if (!windowState.isOpen) {
        return null;
    }

    const handleFocus = () => {
        if (!windowState.isFocused) {
            dispatch(focusWindow(windowKey));
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleFocus();
    };

    return (
        <div
            className={`flex items-center justify-center absolute cursor-pointer ${windowState.isFocused ? '' : 'opacity-85'
                }`}
            style={{
                display: windowState.isMinimized ? 'none' : 'inline-block',
                zIndex: zIndex,
                bottom: '4px',
                right: '0px',
            }}
            onClick={handleClick}
        >
            <img src="/rei.gif" />
        </div>
    );
};
export default VirtualRei;