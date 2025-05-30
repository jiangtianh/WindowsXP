import type { WindowKey } from "../../../services/types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../services/store";
import { useMemo } from "react";

const VirtualRei: React.FC = () => {

    const windowKey: WindowKey = "VirtualRei";
    const windowState = useSelector((state: RootState) => state.windows.windows[windowKey]);
    const openQueue = useSelector((state: RootState) => state.windows.openQueue);

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


    return (
        <div
            className="flex items-center justify-center absolute"
            style={{
                display: windowState.isMinimized ? 'none' : 'inline-block',
                zIndex: zIndex,
                bottom: '0px',
                right: '0px',
            }}
        >
            <img src="/rei.gif" />
        </div>
    );
};
export default VirtualRei;