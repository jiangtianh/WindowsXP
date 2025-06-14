import type { WindowKey } from "../../../services/types";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../services/store";
import { useMemo, useEffect, useState, useRef } from "react";
import { focusWindow, updateWindowPosition } from "../../../services/Windows/windowsSlice";
import { Rnd } from "react-rnd";

const VirtualReiPic = '/rei.gif';

const VirtualRei: React.FC = () => {

    const windowKey: WindowKey = "VirtualRei";
    const windowState = useSelector((state: RootState) => state.windows.windows[windowKey]);
    const openQueue = useSelector((state: RootState) => state.windows.openQueue);

    const dispatch = useDispatch();

    const [localposition, setLocalPosition] = useState({
        x: windowState.position.x,
        y: windowState.position.y
    });

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (windowState.isOpen) {
            // Get desktop dimensions
            const desktopElement = document.getElementById('desktop');
            if (desktopElement) {
                const desktopRect = desktopElement.getBoundingClientRect();
                const imgWidth = imgRef.current?.width || 164;
                const imgHeight = imgRef.current?.height || 200;

                // Position at bottom right with 20px padding
                const x = desktopRect.width - imgWidth;
                const y = desktopRect.height - imgHeight;

                // Update Redux store
                dispatch(updateWindowPosition({
                    key: windowKey,
                    position: {
                        ...windowState.position,
                        x,
                        y
                    }
                }));
            }
        }
    }, [windowState.isOpen]);


    useEffect(() => {
        setLocalPosition({
            x: windowState.position.x,
            y: windowState.position.y
        });
    }, [windowState.position.x, windowState.position.y]);

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

    const handleDrag = (_e: any, d: { x: number; y: number }) => {
        setLocalPosition({ x: d.x, y: d.y });
    };
    const handleDragStop = (_e: any, d: { x: number; y: number }) => {
        dispatch(updateWindowPosition({
            key: windowKey,
            position: {
                ...windowState.position,
                x: d.x,
                y: d.y
            }
        }));
    };
    const handleWindowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleFocus();
    }

    return (
        <Rnd
            className={`${windowState.isFocused ? '' : 'opacity-85'}`}
            style={{ zIndex: zIndex }}
            bounds="parent"
            dragHandleClassName="virtual-rei-img"
            enableResizing={false}
            onMouseDown={handleFocus}
            onDrag={handleDrag}
            onDragStop={handleDragStop}
            position={localposition}

        >
            <img
                ref={imgRef}
                onClick={handleWindowClick}
                className="virtual-rei-img select-none cursor-pointer"
                draggable={false}
                src={VirtualReiPic}
                onDragStart={(e) => e.preventDefault()}
            />
        </Rnd>



        // <div
        //     className={`flex items-center justify-center absolute cursor-pointer ${windowState.isFocused ? '' : 'opacity-85'
        //         }`}
        //     style={{
        //         display: windowState.isMinimized ? 'none' : 'inline-block',
        //         zIndex: zIndex,
        //         bottom: '4px',
        //         right: '0px',
        //     }}
        //     onClick={handleClick}
        // >
        //     <img src={VirtualReiPic} />
        // </div>
    );
};
export default VirtualRei;