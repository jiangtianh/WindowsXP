import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import type { RootState } from "../../services/store";
import { useRef } from "react";

import type { WindowKey } from "../../services/types";
import type { DesktopIconInfo } from "../../services/types";
import { moveIcon } from "../../services/Windows/desktopIconSlice";
import { openWindow } from "../../services/Windows/windowsSlice";

import "./DesktopIcon.css";

interface DesktopIconProps {
    windowKey: WindowKey;
    iconInfo: DesktopIconInfo;
    gridCellSize: {
        width: number;
        height: number;
    }
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ windowKey, iconInfo, gridCellSize }) => {

    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const nodeRef = useRef<HTMLDivElement>(null);
    const gridDimensions = useSelector((state: RootState) => state.desktopIcons.gridDimensions);


    useEffect(() => {
        setPosition({
            x: iconInfo.coordinates.gridX * gridCellSize.width,
            y: iconInfo.coordinates.gridY * gridCellSize.height
        });
    }, [iconInfo.coordinates.gridX, iconInfo.coordinates.gridY, gridCellSize.width, gridCellSize.height]);

    const handleDragStop = (_e: any, data: { x: number; y: number }) => {
        const gridX = Math.floor(data.x / gridCellSize.width);
        const gridY = Math.floor(data.y / gridCellSize.height);

        const boundedGridX = Math.min(Math.max(0, gridX), gridDimensions.columns - 1);
        const boundedGridY = Math.min(Math.max(0, gridY), gridDimensions.rows - 1);

        if (boundedGridX !== iconInfo.coordinates.gridX || boundedGridY !== iconInfo.coordinates.gridY) {
            dispatch(moveIcon({
                windowKey,
                coordinates: { gridX: boundedGridX, gridY: boundedGridY }
            }));
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected(true);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected(false);
        dispatch(openWindow(windowKey));
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (isSelected) setIsSelected(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSelected]);


    return (
        <Draggable
            nodeRef={nodeRef as React.RefObject<HTMLElement>}
            position={position}
            onStop={handleDragStop}
            bounds="parent"
            grid={[gridCellSize.width, gridCellSize.height]}
        >
            <div
                ref={nodeRef}
                className={`flex justify-center absolute ${isSelected ? 'desktop-icon-active' : ''}`}
                style={{ left: 0, top: 0, width: gridCellSize.width, height: gridCellSize.height }}
            >
                <div className="cursor-pointer flex flex-col items-center gap-0.5"
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                >
                    <img
                        src={iconInfo.icon}
                        alt={iconInfo.title}
                        className={`h-10 w-10 mb-1 ${isSelected ? 'desktop-icon-selected' : 'desktop-icon'}`}
                        draggable="false"
                    />
                    <div
                        className={`text-white text-center inline-block line-clamp-2 ${isSelected ? 'desktop-icon-text-selected' : 'desktop-icon-text'} px-1`}
                        style={{
                            fontSize: '0.7rem',
                            width: 'auto',
                            maxWidth: '76px',
                        }}
                    >
                        {iconInfo.title}
                    </div>
                </div>
            </div>
        </Draggable>
    )
};
export default DesktopIcon;