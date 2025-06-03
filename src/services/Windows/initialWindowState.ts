import type { WindowKey, WindowState } from "../types";


import NotepadIcon from "@assets/icons/Notepad128x128.webp";
import ProjectIcon from "@assets/icons/StartMenuPrograms128x128.webp";
import CVIcon from "@assets/icons/FaxSenderInformation128x128.webp";
import MinesweeperIcon from "@assets/icons/Minesweeper128x128.webp";
import PinballIcon from "@assets/icons/Pinball128x128.webp";
import GameControllerIcon from "@assets/icons/GameController128x128.webp";
import ReiIcon from "@assets/icons/Rei128x128.webp";

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
        position: { x: 150, y: 120, width: 750, height: 450 },
        savedPosition: null,
        title: 'My Projects',
        icon: ProjectIcon,
    },
    'CV': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 300, y: 100, width: 400, height: 300 },
        savedPosition: null,
        title: 'My CV',
        icon: CVIcon,
    },
    'Minesweeper': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 200, y: 200, width: 205, height: 305 },
        savedPosition: null,
        title: 'Minesweeper',
        icon: MinesweeperIcon,
    },
    'jsdos': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 310, y: 190, width: 440, height: 330 },
        savedPosition: null,
        title: 'Jsdos',
        icon: GameControllerIcon,
    },
    'Pinball': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 350, y: 250, width: 400, height: 300 },
        savedPosition: null,
        title: 'Pinball',
        icon: PinballIcon,
    },
    'VirtualRei': {
        isOpen: false,
        isFocused: false,
        isMaximized: false, // Not used
        isMinimized: false, // Not used
        position: { x: 0, y: 0, width: 0, height: 0 }, // Not used
        savedPosition: null, // Not used
        title: 'Rei Ayanami',
        icon: ReiIcon,
    },
    'Solitaire': {
        isOpen: true,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 20, y: 20, width: 650, height: 600 },
        savedPosition: null,
        title: 'Solitaire',
        icon: NotepadIcon, // Placeholder icon, replace with actual Solitaire icon
    }
}