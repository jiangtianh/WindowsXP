import { useEffect, useState, useRef, useMemo } from "react";
import { Rnd } from "react-rnd";
import { useSelector, useDispatch } from "react-redux";
import type { WindowKey } from "../../services/types";
import type { RootState } from "../../services/store";
import { focusWindow, closeWindow, updateWindowPosition, maximizeWindow, minimizeWindow, setMaximizedOff } from "../../services/Windows/windowsSlice";

import "./WindowWrapper.css";

interface WindowWrapperProps {
    windowKey: WindowKey;
    children: React.ReactNode;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    enableResizing?: boolean;
    hideMinimize?: boolean;
    hideMaximize?: boolean;
    showHelp?: boolean;
}

const WindowWrapper: React.FC<WindowWrapperProps> = ({
    windowKey, children, minWidth = 300, minHeight = 200, maxWidth, maxHeight, enableResizing, hideMaximize, hideMinimize, showHelp
}) => {

    const dispatch = useDispatch();
    const windowState = useSelector((state: RootState) => state.windows.windows[windowKey]);
    const openQueue = useSelector((state: RootState) => state.windows.openQueue);
    const windowRef = useRef<Rnd>(null);

    const [localposition, setLocalPosition] = useState({
        x: windowState.position.x,
        y: windowState.position.y
    });
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

    const effectiveSize = useMemo(() => {
        return {
            width: windowState.position.width ?? minWidth,
            height: windowState.position.height ?? minHeight
        };
    }, [windowState.position.width, windowState.position.height, minWidth, minHeight]);


    const windowName = useSelector((state: RootState) => state.windows.windows[windowKey].title);

    if (!windowState.isOpen) {
        return null;
    }

    const handleFocus = () => {
        if (!windowState.isFocused) {
            dispatch(focusWindow(windowKey));
        }
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(closeWindow(windowKey));
    };
    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(minimizeWindow(windowKey));
    };
    const handleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(maximizeWindow(windowKey));
    };

    const handleResizeStart = (_e: any, _direction: any, ref: HTMLElement) => {
        const currentRect = ref.getBoundingClientRect();
        setLocalPosition({
            x: currentRect.left,
            y: currentRect.top
        });
        if (windowState.isMaximized) {
            dispatch(setMaximizedOff(windowKey));
        }
    };
    const handleResizeStop = (_e: any, _direction: any, ref: HTMLElement, _delta: any, position: { x: number; y: number }) => {
        dispatch(updateWindowPosition({
            key: windowKey,
            position: {
                x: position.x,
                y: position.y,
                width: parseInt(ref.style.width, 10) || windowState.position.width,
                height: parseInt(ref.style.height, 10) || windowState.position.height
            }
        }));
        setLocalPosition({
            x: position.x,
            y: position.y
        });
        // If window was maximized, turn off maximized state but keep current position
        if (windowState.isMaximized) {
            // Just turn off the isMaximized flag without restoring saved position
            dispatch(setMaximizedOff(windowKey));
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
            ref={windowRef}
            className={`window cursor-default ${windowState.isFocused ? '' : 'window-unfocused'} window-wrapper`}
            style={{ display: windowState.isMinimized ? 'none' : 'inline-block', zIndex: zIndex }}
            size={effectiveSize}
            position={localposition}
            dragHandleClassName="title-bar"
            bounds="parent"
            onMouseDown={handleFocus}
            onDrag={handleDrag}
            onDragStop={handleDragStop}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
            disableDragging={windowState.isMaximized}
            enableResizing={enableResizing !== false}
            minWidth={minWidth}
            minHeight={minHeight}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
        >
            <div onClick={handleWindowClick} className="w-full h-full cursor-default">
                <div className="title-bar select-none">
                    <div className="title-bar-text">
                        <img src={windowState.icon} alt={windowName} className="w-4 h-4 inline-block mr-1" />
                        {windowName}
                    </div>

                    <div className="title-bar-controls">
                        {!hideMinimize && (
                            <button aria-label="Minimize" className="cursor-pointer" onClick={handleMinimize}></button>
                        )}
                        {!hideMaximize && (
                            <button
                                aria-label={windowState.isMaximized ? "Restore" : "Maximize"}
                                className="cursor-pointer"
                                onClick={handleMaximize}
                            >
                            </button>
                        )}
                        {showHelp && (
                            <button aria-label="Help" className="cursor-pointer"></button>
                        )}
                        <button aria-label="Close" className="cursor-pointer" onClick={handleClose}></button>
                    </div>
                </div>

                <div className="window-body flex-grow h-[calc(100%-28px)] w-[calc(100%-6px)] overflow-auto cursor-default">
                    {children}
                </div>
            </div>
        </Rnd>
    )
};
export default WindowWrapper;
