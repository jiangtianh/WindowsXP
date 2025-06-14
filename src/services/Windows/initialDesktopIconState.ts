import type { WindowKey, DesktopIconInfo } from "../types"
import { NotepadIcon, ProjectIcon, CVIcon, MinesweeperIcon, PinballIcon, GameControllerIcon, ReiIcon, SolitaireIcon, SystemPropertiesIcon, ContactMeIcon } from "./initialWindowState";

export const initialDesktopIconState: Partial<Record<WindowKey, DesktopIconInfo>> = {
    'Projects': {
        title: 'My Projects',
        icon: ProjectIcon,
        coordinates: { gridX: 0, gridY: 1 },
    },
    'Notepad': {
        title: 'Notepad',
        icon: NotepadIcon,
        coordinates: { gridX: 0, gridY: 3 },
    },
    'CV': {
        title: 'My CV',
        icon: CVIcon,
        coordinates: { gridX: 0, gridY: 2 },
    },
    "Minesweeper": {
        title: 'Minesweeper',
        icon: MinesweeperIcon,
        coordinates: { gridX: 0, gridY: 4 },
    },
    'jsdos': {
        title: 'Jsdos',
        icon: GameControllerIcon,
        coordinates: { gridX: 1, gridY: 1 },
    },
    'Pinball': {
        title: 'Pinball',
        icon: PinballIcon,
        coordinates: { gridX: 1, gridY: 2 },
    },
    'VirtualRei': {
        title: 'Rei Ayanami',
        icon: ReiIcon,
        coordinates: { gridX: 0, gridY: 5 },
    },
    'Solitaire': {
        title: 'Solitaire',
        icon: SolitaireIcon,
        coordinates: { gridX: 1, gridY: 3 },
    },
    'SystemProperties': {
        title: 'System Properties',
        icon: SystemPropertiesIcon,
        coordinates: { gridX: 0, gridY: 0 },
    },
    'ContactMe': {
        title: 'Contact Me',
        icon: ContactMeIcon,
        coordinates: { gridX: 1, gridY: 0 },
    }
}
