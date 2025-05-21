import type { WindowKey, WindowState } from "../types";


import NotepadIcon from "@assets/icons/Notepad128x128.webp";
import ProjectIcon from "@assets/icons/StartMenuPrograms128x128.webp";
import CVIcon from "@assets/icons/FaxSenderInformation128x128.webp";

export const initialWindowState: Record<WindowKey, WindowState> = {
    'Notepad': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 120, y: 120, width: 400, height: 300 },
        savedPosition: null,
        title: 'Notepad',
        icon: NotepadIcon,
    },
    'Projects': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 200, y: 200, width: 400, height: 300 },
        savedPosition: null,
        title: 'My Projects',
        icon: ProjectIcon,
    },
    'CV': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 300, y: 300, width: 400, height: 300 },
        savedPosition: null,
        title: 'My CV',
        icon: CVIcon,
    }
}