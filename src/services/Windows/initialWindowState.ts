import NotepadIcon from "@/assets/icons/notepad-icon.webp";

export const initialWindowState = {
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
        icon: NotepadIcon,
    }
}