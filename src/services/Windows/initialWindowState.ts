import type { WindowKey, WindowState } from "../types";


export const NotepadIcon = "/icons/Notepad128x128.webp";
export const ProjectIcon = '/icons/StartMenuPrograms128x128.webp'
export const CVIcon = "/icons/FaxSenderInformation128x128.webp";
export const MinesweeperIcon = "/icons/Minesweeper128x128.webp";
export const PinballIcon = "/icons/Pinball128x128.webp";
export const GameControllerIcon = "/icons/GameController128x128.webp";
export const ReiIcon = "/icons/Rei128x128.webp";
export const SolitaireIcon = "/icons/Solitaire128x128.webp";
export const SystemPropertiesIcon = "/icons/SystemProperties128x128.webp";
export const MyDocumentsIcon = "/icons/MyDocuments128x128.webp";
export const ContactMeIcon = "/icons/OutlookExpress128x128.webp";
export const WinampIcon = "/icons/Winamp128x128.webp";
export const MyPicturesIcon = "/icons/MyPictures128x128.webp";

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
        position: { x: 150, y: 120, width: 750, height: 550 },
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
        position: {
            x: 0,
            y: 0,
            width: 0, // Not used
            height: 0 // Not used
        },
        savedPosition: null, // Not used
        title: 'Rei Ayanami',
        icon: ReiIcon,
    },
    'Solitaire': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 20, y: 20, width: 650, height: 600 },
        savedPosition: null,
        title: 'Solitaire',
        icon: SolitaireIcon,
    },
    'SystemProperties': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 100, y: 100, width: 345, height: 400 },
        savedPosition: null,
        title: 'System Properties',
        icon: SystemPropertiesIcon,
    },
    'MyDocuments': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 50, y: 50, width: 600, height: 400 },
        savedPosition: null,
        title: 'My Documents',
        icon: MyDocumentsIcon,
    },
    'ContactMe': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 100, y: 100, width: 600, height: 400 },
        savedPosition: null,
        title: 'Contact Me',
        icon: ContactMeIcon,
    },
    'Winamp': {
        isOpen: false,
        isFocused: false,
        isMaximized: false, // Not used
        isMinimized: false, // Not used
        position: { x: 100, y: 100, width: 0, height: 0 }, // Not used
        savedPosition: null,
        title: 'Winamp',
        icon: WinampIcon,
    },
    'Doom': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 310, y: 190, width: 440, height: 330 },
        savedPosition: null,
        title: 'Doom',
        icon: GameControllerIcon,
    },
    'Pacman': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 310, y: 190, width: 440, height: 330 },
        savedPosition: null,
        title: 'Pacman',
        icon: GameControllerIcon, // Placeholder icon
    },
    'MyPictures': {
        isOpen: false,
        isFocused: false,
        isMaximized: false,
        isMinimized: false,
        position: { x: 100, y: 100, width: 950, height: 650 },
        savedPosition: null,
        title: 'My Pictures',
        icon: MyPicturesIcon,
    }
}