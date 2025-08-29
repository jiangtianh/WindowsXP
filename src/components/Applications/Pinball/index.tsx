import type { WindowKey } from "../../../services/types";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../services/store";
import { selectVolume, selectMuted } from "../../../services/volumeSlice";

import { Rnd } from "react-rnd";
import { focusWindow, closeWindow, updateWindowPosition, maximizeWindow, minimizeWindow, setMaximizedOff } from "../../../services/Windows/windowsSlice";

const Pinball: React.FC = () => {
    const windowKey: WindowKey = "Pinball";
    const dispatch = useDispatch();
    const windowState = useSelector((state: RootState) => state.windows.windows[windowKey]);
    const windowName = useSelector((state: RootState) => state.windows.windows[windowKey]?.title);
    const openQueue = useSelector((state: RootState) => state.windows.openQueue);
    const volumeLevel = useSelector(selectVolume);
    const isMuted = useSelector(selectMuted);

    const windowRef = useRef<Rnd>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const effectiveSize = useMemo(() => {
        return {
            width: windowState.position.width || 300,
            height: windowState.position.height || 200
        };
    }, [windowState.position.width, windowState.position.height]);


    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [localposition, setLocalPosition] = useState({
        x: windowState?.position.x || 200,
        y: windowState?.position.y || 100
    });

    const applyVolumeToIframe = useCallback(() => {
        const iframe = iframeRef.current;
        if (!iframe || !iframe.contentWindow) return;

        const effectiveVolume = isMuted ? 0 : volumeLevel / 100;
        try {
            iframe.contentWindow.postMessage({
                type: 'VOLUME_CHANGE',
                volume: effectiveVolume,
                muted: isMuted,
                source: 'parent'
            }, '*');

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc) {
                // Control any audio/video elements
                const audioElements = iframeDoc.querySelectorAll('audio, video');
                audioElements.forEach((element) => {
                    if (element instanceof HTMLAudioElement || element instanceof HTMLVideoElement) {
                        element.volume = effectiveVolume;
                        element.muted = isMuted;
                    }
                });
                // Send custom event to canvas games
                iframe.contentWindow.dispatchEvent(new CustomEvent('volumeChange', {
                    detail: { volume: effectiveVolume, muted: isMuted }
                }));
            }
        } catch (error) {
            console.debug('Cross-origin iframe, using postMessage only');
        }
    }, [volumeLevel, isMuted]);

    // Listen for messages from iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'GAME_READY' && event.data.source === 'pinball') {
                console.log('Pinball game is ready, applying volume');
                setTimeout(applyVolumeToIframe, 100);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [applyVolumeToIframe]);

    const focusIframeAndCanvas = useCallback(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        try {
            iframe.focus();
            const doc = iframe.contentDocument || iframe.contentWindow?.document;
            const canvas = doc?.getElementById("canvas");
            if (canvas) {
                canvas.focus();
                canvas.dispatchEvent(
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true,
                        view: iframe.contentWindow,
                    })
                );
            }
        } catch (e) {
            console.debug("Could not focus canvas (cross-origin):", e);
        }
    }, []);

    useEffect(() => {
        if (windowState?.isFocused && !isDragging && !isResizing && !windowState?.isMinimized) {
            const delay = windowState?.isMaximized ? 300 : 100; // Longer delay for maximized windows
            const timeout = setTimeout(focusIframeAndCanvas, delay);
            return () => clearTimeout(timeout);
        }
    }, [
        windowState?.isFocused,
        windowState?.isMaximized,
        windowState?.isMinimized,
        isDragging,
        isResizing,
        focusIframeAndCanvas
    ]);

    useEffect(() => {
        if (windowState?.position) {
            setLocalPosition({
                x: windowState.position.x,
                y: windowState.position.y
            });
        }
    }, [windowState?.position]);

    const zIndex = useMemo(() => {
        const baseIndex = 100;
        const queuePosition = openQueue.indexOf(windowKey);
        return queuePosition === -1 ? baseIndex : baseIndex + queuePosition + 1;
    }, [openQueue, windowKey]);

    if (!windowState?.isOpen) {
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

    const handleResizeStart = (_e: any, _direction: any) => {
        setIsResizing(true);
        handleFocus();
        if (windowState.isMaximized) {
            dispatch(setMaximizedOff(windowKey));
        }
    };

    const handleResizeStop = (_e: any, _direction: any, ref: HTMLElement, _delta: any, position: { x: number; y: number }) => {
        setIsResizing(false);
        dispatch(updateWindowPosition({
            key: windowKey,
            position: {
                x: position.x,
                y: position.y,
                width: parseInt(ref.style.width, 10) || windowState.position.width,
                height: parseInt(ref.style.height, 10) || windowState.position.height
            }
        }));
    };


    const handleDragStart = () => {
        setIsDragging(true);
        handleFocus();
    };

    const handleDrag = (_e: any, d: { x: number; y: number }) => {
        setLocalPosition({ x: d.x, y: d.y });
    };

    const handleDragStop = (_e: any, d: { x: number; y: number }) => {
        setIsDragging(false);
        dispatch(updateWindowPosition({
            key: windowKey,
            position: { ...windowState.position, x: d.x, y: d.y }
        }));
    };

    const handleWindowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleFocus();
    };

    const showOverlay = !windowState.isFocused;

    return (
        <Rnd
            ref={windowRef}
            className={`window cursor-default ${windowState.isFocused ? '' : 'window-unfocused'} window-wrapper`}
            style={{ display: windowState.isMinimized ? 'none' : 'inline-block', zIndex: zIndex }}
            size={effectiveSize}
            position={localposition}
            dragHandleClassName="title-bar"
            bounds="parent"
            onMouseDown={handleFocus} // This should trigger focus
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragStop={handleDragStop}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
            disableDragging={windowState.isMaximized}
            minWidth={300}
            minHeight={200}
        >
            <div onClick={handleWindowClick} className="w-full h-full cursor-default">
                <div className="title-bar select-none">
                    <div className="title-bar-text">
                        <img src={windowState.icon} alt={windowName} className="w-4 h-4 inline-block mr-1" />
                        {windowName}
                    </div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" className="cursor-pointer" onClick={handleMinimize}></button>
                        <button
                            aria-label={windowState.isMaximized ? "Restore" : "Maximize"}
                            className={`cursor-pointer`}
                            onClick={handleMaximize}
                        >
                        </button>
                        <button aria-label="Close" className="cursor-pointer" onClick={handleClose}></button>
                    </div>
                </div>

                <div className="window-body flex-grow h-[calc(100%-28px)] w-[calc(100%-6px)] overflow-auto cursor-default">
                    <div className="w-full h-full bg-black relative">
                        <iframe
                            ref={iframeRef}
                            src="/pinball/index.html"
                            className="w-full h-full border-0 cursor-default"
                            title="Space Cadet Pinball"
                            style={{
                                pointerEvents: isDragging || isResizing ? 'none' : 'auto'
                            }}
                            allow="autoplay"
                            tabIndex={0}
                        />
                        {showOverlay && !windowState.isFocused && (
                            <div
                                className="absolute inset-0 z-10 cursor-default"
                                onClick={handleFocus}
                                style={{
                                    backgroundColor: 'transparent'
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Rnd>
    );
};

export default Pinball;