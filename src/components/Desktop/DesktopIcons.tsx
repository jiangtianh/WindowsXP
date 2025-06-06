import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../services/store";
import { updateGridDimensions } from "../../services/Windows/desktopIconSlice";
import DesktopIcon from "./DesktopIcon";
import type { WindowKey } from "../../services/types";

export const GRID_WIDTH = 90;
export const GRID_HEIGHT = 90;


const DesktopIcons: React.FC = () => {
    const dispatch = useDispatch();
    const desktopIcons = useSelector((state: RootState) => state.desktopIcons.desktopIcons);
    const gridDimensions = useSelector((state: RootState) => state.desktopIcons.gridDimensions);
    const paddingX = 12;
    const paddingTop = 20;
    const footerHeight = 32;

    const [showGrid] = useState(false); //!!! DEBUGging purposes ONLY !!!

    useEffect(() => {
        const handleResize = () => {
            // Calculate available space with padding
            const availableWidth = window.innerWidth - (paddingX * 2);
            const availableHeight = window.innerHeight - paddingTop - footerHeight;

            // Calculate grid dimensions based on available space
            const columns = Math.floor(availableWidth / GRID_WIDTH);
            const rows = Math.floor(availableHeight / GRID_HEIGHT);

            dispatch(updateGridDimensions({ columns, rows }));
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [dispatch, paddingX, paddingTop]);

    // const gridTemplateColumns = `repeat(${gridDimensions.columns}, ${GRID_WIDTH}px)`;
    // const gridTemplateRows = `repeat(${gridDimensions.rows}, ${GRID_HEIGHT}px)`;

    return (
        <div className="h-full w-full select-none font-family-tahoma absolute"
            style={{
                paddingTop: `${paddingTop}px`,
                paddingLeft: `${paddingX}px`,
                paddingRight: `${paddingX}px`,
                overflow: 'hidden', // Keep overflow hidden only on icons
                zIndex: 1 // Low z-index so windows appear above
            }}
        >
            <div className="relative w-full h-full">
                {Object.entries(desktopIcons).map(([key, icon]) => (
                    <DesktopIcon
                        key={key}
                        windowKey={key as WindowKey}
                        iconInfo={icon}
                        gridCellSize={{ width: GRID_WIDTH, height: GRID_HEIGHT }}
                    />
                ))}
            </div>

            {
                showGrid && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                        {Array.from({ length: gridDimensions.columns }).map((_, colIndex) => (
                            <div
                                key={`col-${colIndex}`}
                                className="absolute border-l border-white opacity-30 h-full"
                                style={{
                                    left: `${paddingX + (colIndex * GRID_WIDTH)}px`,
                                    top: `${paddingTop}px`,
                                    height: `calc(100% - ${paddingTop}px)`
                                }}
                            />
                        ))}
                        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
                            <div
                                key={`row-${rowIndex}`}
                                className="absolute border-t border-white opacity-30 w-full"
                                style={{
                                    top: `${paddingTop + (rowIndex * GRID_HEIGHT)}px`,
                                    left: `${paddingX}px`,
                                    width: `calc(100% - ${paddingX * 2}px)`
                                }}
                            />
                        ))}
                    </div>
                )
            }
            {
                showGrid && (
                    <div className="absolute bottom-10 right-10 bg-black bg-opacity-70 text-white text-xs p-1 rounded">
                        Grid: {gridDimensions.columns}x{gridDimensions.rows} ({GRID_WIDTH}x{GRID_HEIGHT}px)
                        <br />
                        Padding: {paddingX}px horizontal, {paddingTop}px vertical
                    </div>
                )
            }
        </div >
    );
};

export default DesktopIcons;