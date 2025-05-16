export type WindowKey = 'Notepad' | 'Projects';

export interface WindowPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface WindowState {
    isOpen: boolean;
    isFocused: boolean;
    isMaximized: boolean;
    isMinimized: boolean;
    position: WindowPosition;
    savedPosition: WindowPosition | null;
    title: string;
    icon: string;
}

export interface WindowsState {
    windows: Record<WindowKey, WindowState>;
    openQueue: WindowKey[];
    taskBarList: WindowKey[];
}



// Desktop Icon Types
export interface DesktopIconCoordinates {
    gridX: number;
    gridY: number;
}

export interface DesktopIconInfo {
    title: string;
    icon: string;
    coordinates: DesktopIconCoordinates;
}

export interface DesktopIconsState {
    desktopIcons: Record<WindowKey, DesktopIconInfo>;
    gridDimensions: {
        columns: number;
        rows: number;
    };
}